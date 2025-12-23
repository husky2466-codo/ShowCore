import { z } from 'zod'
import { router, publicProcedure, protectedProcedure, adminProcedure } from '../router'
import { prisma } from '../../db'

export const userRouter = router({
  // Get current user
  me: protectedProcedure.query(async ({ ctx }) => {
    return prisma.user.findUnique({
      where: { id: ctx.user.id },
      include: {
        technician: true,
        company: true,
      },
    })
  }),

  // Get user by ID (public profiles)
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.user.findUnique({
        where: { id: input.id, deletedAt: null },
        select: {
          id: true,
          role: true,
          createdAt: true,
          technician: {
            select: {
              displayName: true,
              bio: true,
              avatarUrl: true,
              location: true,
              tier: true,
              isVerified: true,
            },
          },
          company: {
            select: {
              name: true,
              description: true,
              logoUrl: true,
              website: true,
            },
          },
        },
      })
    }),

  // Update current user
  update: protectedProcedure
    .input(z.object({
      email: z.string().email().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      return prisma.user.update({
        where: { id: ctx.user.id },
        data: input,
      })
    }),

  // Admin: List all users
  adminList: adminProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(20),
      cursor: z.string().optional(),
      role: z.enum(['USER', 'TECHNICIAN', 'COMPANY', 'ADMIN']).optional(),
    }))
    .query(async ({ input }) => {
      const users = await prisma.user.findMany({
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        where: {
          deletedAt: null,
          role: input.role,
        },
        orderBy: { createdAt: 'desc' },
        include: {
          technician: { select: { displayName: true } },
          company: { select: { name: true } },
        },
      })

      let nextCursor: string | undefined
      if (users.length > input.limit) {
        const nextItem = users.pop()
        nextCursor = nextItem?.id
      }

      return { users, nextCursor }
    }),

  // Soft delete (admin only)
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.user.update({
        where: { id: input.id },
        data: { deletedAt: new Date() },
      })
    }),
})

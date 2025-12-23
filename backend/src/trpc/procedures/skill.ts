import { z } from 'zod'
import { router, publicProcedure, adminProcedure } from '../router'
import { prisma } from '../../db'

export const skillRouter = router({
  // List all skills
  list: publicProcedure
    .input(z.object({
      category: z.string().optional(),
    }))
    .query(async ({ input }) => {
      return prisma.skill.findMany({
        where: { category: input.category },
        orderBy: [{ category: 'asc' }, { name: 'asc' }],
      })
    }),

  // Get skill by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.skill.findUnique({
        where: { id: input.id },
        include: {
          technicians: {
            where: { isVerified: true },
            take: 10,
            include: { technician: { select: { displayName: true, tier: true } } },
          },
        },
      })
    }),

  // Admin: Create skill
  create: adminProcedure
    .input(z.object({
      name: z.string().min(1).max(100),
      category: z.string().min(1).max(50),
      description: z.string().max(500).optional(),
    }))
    .mutation(async ({ input }) => {
      return prisma.skill.create({ data: input })
    }),

  // Admin: Update skill
  update: adminProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().min(1).max(100).optional(),
      category: z.string().min(1).max(50).optional(),
      description: z.string().max(500).optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input
      return prisma.skill.update({ where: { id }, data })
    }),

  // Admin: Verify technician skill
  verify: adminProcedure
    .input(z.object({
      technicianId: z.string(),
      skillId: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      return prisma.technicianSkill.update({
        where: {
          technicianId_skillId: {
            technicianId: input.technicianId,
            skillId: input.skillId,
          },
        },
        data: {
          isVerified: true,
          verifiedAt: new Date(),
          verifiedBy: ctx.user.id,
        },
      })
    }),
})

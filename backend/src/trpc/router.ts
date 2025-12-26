import { initTRPC, TRPCError } from '@trpc/server'
import { OpenApiMeta } from 'trpc-openapi'
import type { Context } from './context.js'

// Import entity routers
import { userRouter } from './procedures/user.js'
import { technicianRouter } from './procedures/technician.js'
import { companyRouter } from './procedures/company.js'
import { skillRouter } from './procedures/skill.js'
import { bookingRouter } from './procedures/booking.js'
import { messageRouter } from './procedures/message.js'
import { showProofRouter } from './procedures/showProof.js'
import { reviewRouter } from './procedures/review.js'
import { disputeRouter } from './procedures/dispute.js'
import { notificationRouter } from './procedures/notification.js'
import { onboardingRouter } from './procedures/onboarding.js'
import { aiAssistantRouter } from './procedures/aiAssistant.js'

const t = initTRPC.context<Context>().meta<OpenApiMeta>().create()

export const router = t.router
export const publicProcedure = t.procedure

// Protected procedure - requires authentication
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in' })
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  })
})

// Admin procedure - requires admin role
export const adminProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in' })
  }
  if (ctx.user.role !== 'ADMIN') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' })
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  })
})

export const appRouter = router({
  user: userRouter,
  technician: technicianRouter,
  company: companyRouter,
  skill: skillRouter,
  booking: bookingRouter,
  message: messageRouter,
  showProof: showProofRouter,
  review: reviewRouter,
  dispute: disputeRouter,
  notification: notificationRouter,
  onboarding: onboardingRouter,
  aiAssistant: aiAssistantRouter,
})

export type AppRouter = typeof appRouter

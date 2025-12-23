import { initTRPC, TRPCError } from '@trpc/server'
import type { Context } from './context'

// Import entity routers
import { userRouter } from './procedures/user'
import { technicianRouter } from './procedures/technician'
import { companyRouter } from './procedures/company'
import { skillRouter } from './procedures/skill'
import { bookingRouter } from './procedures/booking'
import { messageRouter } from './procedures/message'
import { showProofRouter } from './procedures/showProof'
import { reviewRouter } from './procedures/review'
import { disputeRouter } from './procedures/dispute'
import { notificationRouter } from './procedures/notification'
import { onboardingRouter } from './procedures/onboarding'
import { aiAssistantRouter } from './procedures/aiAssistant'

const t = initTRPC.context<Context>().create()

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

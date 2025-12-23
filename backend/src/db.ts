import { PrismaClient } from '@prisma/client'

// For edge runtimes, you may need @prisma/adapter-*
// See: https://www.prisma.io/docs/orm/prisma-client/deployment/edge

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma = globalThis.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

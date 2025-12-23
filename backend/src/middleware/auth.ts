import type { MiddlewareHandler } from 'hono'

/**
 * Authentication Middleware
 *
 * TODO: Implement your authentication strategy
 *
 * Options:
 *
 * 1. Clerk (https://clerk.com/docs/quickstarts/hono)
 *    - Managed auth with social logins, MFA, etc.
 *    - npm install @clerk/clerk-sdk-node
 *
 *    import { clerkMiddleware, getAuth } from '@clerk/hono'
 *
 *    export const authMiddleware = clerkMiddleware()
 *
 *    // In context.ts:
 *    const auth = getAuth(c)
 *    const user = auth.userId ? await clerkClient.users.getUser(auth.userId) : null
 *
 * 2. Lucia (https://lucia-auth.com/)
 *    - Self-hosted session-based auth
 *    - npm install lucia @lucia-auth/adapter-prisma
 *
 *    import { lucia } from './lucia'
 *
 *    export const authMiddleware: MiddlewareHandler = async (c, next) => {
 *      const sessionId = c.req.cookie('session')
 *      if (sessionId) {
 *        const { session, user } = await lucia.validateSession(sessionId)
 *        c.set('user', user)
 *        c.set('session', session)
 *      }
 *      await next()
 *    }
 *
 * 3. Custom JWT
 *    - Self-managed JWT tokens
 *    - npm install jose
 *
 *    import { jwtVerify } from 'jose'
 *
 *    export const authMiddleware: MiddlewareHandler = async (c, next) => {
 *      const token = c.req.header('Authorization')?.replace('Bearer ', '')
 *      if (token) {
 *        try {
 *          const { payload } = await jwtVerify(token, secret)
 *          c.set('user', payload)
 *        } catch {
 *          // Invalid token - continue without user
 *        }
 *      }
 *      await next()
 *    }
 */

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  // Placeholder - replace with real auth implementation
  //
  // Example: Extract user from session/token
  // const token = c.req.header('Authorization')?.replace('Bearer ', '')
  // const user = token ? await verifyToken(token) : null
  // c.set('user', user)

  await next()
}

/**
 * Require authentication middleware
 * Use this to protect routes that require a logged-in user
 */
export const requireAuth: MiddlewareHandler = async (c, next) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  await next()
}

/**
 * Require admin role middleware
 * Use this to protect admin-only routes
 */
export const requireAdmin: MiddlewareHandler = async (c, next) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  if (user.role !== 'ADMIN') {
    return c.json({ error: 'Forbidden' }, 403)
  }
  await next()
}

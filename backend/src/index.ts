import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { trpcServer } from '@hono/trpc-server'
import { serve } from '@hono/node-server'
import { appRouter } from './trpc/router.js'
import { createContext } from './trpc/context.js'

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('/*', cors({
  origin: (origin) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3010',
      'http://localhost:5173',
      'https://showcore-app.vercel.app',
    ]
    // Allow all Vercel preview deployments
    if (origin && (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app'))) {
      return origin
    }
    return allowedOrigins[0]
  },
  credentials: true,
}))

// Health check
app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }))

// tRPC handler
app.use('/trpc/*', trpcServer({
  router: appRouter,
  createContext,
}))

// 404 handler
app.notFound((c) => c.json({ error: 'Not Found' }, 404))

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err)
  return c.json({ error: 'Internal Server Error' }, 500)
})

// Start local server for development
const port = 3001
console.log(`Server starting on http://localhost:${port}`)
serve({
  fetch: app.fetch,
  port,
})

// Export for Vercel Functions
export default app

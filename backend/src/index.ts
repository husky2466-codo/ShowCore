import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { trpcServer } from '@hono/trpc-server'
import { appRouter } from './trpc/router'
import { createContext } from './trpc/context'

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('/*', cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3010',
    'http://localhost:5173',
  ],
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

// Export for different runtimes
export default app

// For Cloudflare Workers
export const fetch = app.fetch

// For Node.js (with @hono/node-server)
// import { serve } from '@hono/node-server'
// serve({ fetch: app.fetch, port: 8787 })

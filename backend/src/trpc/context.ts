import type { Context as HonoContext } from 'hono'

// TODO: Replace with your auth implementation
export interface User {
  id: string
  email: string
  role: 'USER' | 'TECHNICIAN' | 'COMPANY' | 'ADMIN'
}

export interface Context {
  user: User | null
}

export async function createContext(c: HonoContext): Promise<Context> {
  // TODO: Implement authentication
  //
  // Example with Clerk:
  // import { getAuth } from '@clerk/hono'
  // const auth = getAuth(c)
  // const user = auth.userId ? await getUser(auth.userId) : null
  //
  // Example with custom JWT:
  // const token = c.req.header('Authorization')?.replace('Bearer ', '')
  // const user = token ? await verifyToken(token) : null
  //
  // Example with Lucia:
  // const session = await lucia.validateSession(sessionId)
  // const user = session?.user ?? null

  // Placeholder - replace with real auth
  return {
    user: null,
  }
}

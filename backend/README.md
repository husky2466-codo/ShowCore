# ShowCore Backend

Generated backend scaffolding using tRPC + Hono + Prisma.

## Stack

- **Hono** — Edge-ready HTTP framework
- **tRPC** — Type-safe RPC (end-to-end TypeScript)
- **Prisma** — Database ORM with type-safe queries
- **PostgreSQL** — Primary database
- **Zod** — Runtime validation

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Database

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/showcore"
```

### 3. Initialize Database

```bash
# Push schema to database (development)
npm run db:push

# Or run migrations (production)
npm run db:migrate

# Open Prisma Studio to view data
npm run db:studio
```

### 4. Run Development Server

```bash
# With Wrangler (Cloudflare Workers)
npm run dev

# With Node.js
npm run dev:node
```

Server runs at `http://localhost:8787`

## Project Structure

```
src/
├── index.ts           # Hono app entry point
├── db.ts              # Prisma client singleton
├── trpc/
│   ├── router.ts      # Root tRPC router
│   ├── context.ts     # Request context (auth)
│   └── procedures/    # Entity CRUD procedures
│       ├── user.ts
│       ├── technician.ts
│       ├── company.ts
│       ├── skill.ts
│       ├── booking.ts
│       ├── message.ts
│       ├── showProof.ts
│       ├── review.ts
│       ├── dispute.ts
│       ├── notification.ts
│       ├── onboarding.ts
│       └── aiAssistant.ts
└── middleware/
    └── auth.ts        # Auth middleware (TODO)
```

## What to Implement

The generated code is scaffolding. You need to:

### 1. Authentication

Implement auth in `src/middleware/auth.ts` and `src/trpc/context.ts`:

- **Clerk** — Managed auth with social logins
- **Lucia** — Self-hosted session-based auth
- **Custom JWT** — Self-managed tokens

See `src/middleware/auth.ts` for implementation examples.

### 2. Authorization

The procedures have placeholder authorization checks marked with `// TODO`. Update these to enforce proper permissions.

### 3. Business Logic

Add custom procedures for complex operations:

- XP tier progression calculations
- Lottery eligibility checks
- AI show proof analysis integration
- Payment processing
- Email notifications

### 4. File Uploads

Add file upload handling for:

- Profile avatars
- Company logos
- Show proof media
- Message attachments

Consider using Cloudflare R2, AWS S3, or similar.

### 5. Real-time Features

For real-time messaging and notifications:

- tRPC subscriptions (WebSocket)
- Cloudflare Durable Objects
- Pusher/Ably integration

## tRPC Client Setup

In your frontend, create a tRPC client:

```typescript
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../backend/src/trpc/router'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8787/trpc',
      headers: () => ({
        Authorization: `Bearer ${getToken()}`,
      }),
    }),
  ],
})

// Usage
const technicians = await trpc.technician.list.query({ limit: 20 })
const booking = await trpc.booking.create.mutate({ ... })
```

For React Query integration:

```typescript
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../backend/src/trpc/router'

export const trpc = createTRPCReact<AppRouter>()
```

## API Routes

All routes are under `/trpc/*`:

### User
- `user.me` — Get current user
- `user.getById` — Get user by ID
- `user.update` — Update current user
- `user.adminList` — List all users (admin)

### Technician
- `technician.list` — Search technicians
- `technician.getById` — Get technician profile
- `technician.create` — Create profile
- `technician.update` — Update profile
- `technician.addSkill` — Add skill
- `technician.removeSkill` — Remove skill

### Company
- `company.list` — List companies
- `company.getById` — Get company
- `company.create` — Create profile
- `company.update` — Update profile

### Booking
- `booking.list` — List my bookings
- `booking.getById` — Get booking details
- `booking.create` — Create booking
- `booking.update` — Update booking
- `booking.accept` — Accept booking
- `booking.cancel` — Cancel booking
- `booking.complete` — Mark complete

### Message
- `message.list` — List messages for booking
- `message.send` — Send message
- `message.markRead` — Mark as read

### ShowProof
- `showProof.list` — List approved proofs
- `showProof.myList` — List my proofs
- `showProof.create` — Submit proof
- `showProof.review` — Review proof (admin)

### Review
- `review.listForUser` — List reviews for user
- `review.stats` — Get review stats
- `review.create` — Create review
- `review.respond` — Respond to review

### Dispute
- `dispute.myList` — List my disputes
- `dispute.getById` — Get dispute
- `dispute.create` — File dispute
- `dispute.adminList` — List all (admin)
- `dispute.updateStatus` — Update status (admin)

### Notification
- `notification.list` — List notifications
- `notification.unreadCount` — Get unread count
- `notification.markRead` — Mark as read
- `notification.markAllRead` — Mark all read

### Onboarding
- `onboarding.getTasks` — Get tasks
- `onboarding.getProgress` — Get progress
- `onboarding.completeTask` — Complete task
- `onboarding.skipTask` — Skip task

### AI Assistant
- `aiAssistant.getConversation` — Get/create conversation
- `aiAssistant.sendMessage` — Send message
- `aiAssistant.clearHistory` — Clear history

## Deployment

### Cloudflare Workers

```bash
# Login to Cloudflare
wrangler login

# Deploy
npm run deploy
```

Create `wrangler.toml`:

```toml
name = "showcore-backend"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[vars]
DATABASE_URL = "your-database-url"
```

### Other Platforms

Adjust `src/index.ts` exports for your target:

- **Vercel**: Export as default
- **Node.js**: Use `@hono/node-server`
- **Bun**: Works out of the box

## Testing

```bash
npm run test
```

See `tests.md` for test specifications.

---

*Generated by Design OS*

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ShowCore is an AV technician marketplace connecting audio/visual professionals with companies needing event services. It's a monorepo with a React frontend and Hono/tRPC backend.

## Rule
- **Always use 'subagents' when completing tasks.**
Subagents are intended to be used when you need to complete a task that requires multiple steps or is complex. For example, if you need to complete a task that requires multiple steps, you can use a subagent to break down the task into smaller steps. You can also use a subagent to complete a task that requires multiple steps, but you can also use a subagent to complete a task that requires fewer steps. No need to use Subagents for simple questions or two step tasks. 
- **Always use 'subagents' when completing tasks.**
- **Always use 'subagents' when completing tasks.**
- **Always use 'subagents' when completing tasks.**


## Commands

### Root (run from Showcore/)
```bash
npm run dev          # Start frontend only (Vite on localhost:5173)
npm run dev:api      # Start backend only
npm run dev:all      # Start both frontend and backend concurrently
npm run build        # Build all workspaces
npm run lint         # Lint all workspaces
```

### Frontend (apps/web/)
```bash
npm run dev          # Vite dev server
npm run build        # Production build with type checking
npm run preview      # Preview production build
npm run lint         # ESLint
```

### Backend (backend/)
```bash
npm run dev          # Wrangler dev (Cloudflare Workers local)
npm run dev:node     # Node.js local dev with tsx watch
npm run deploy       # Deploy to Cloudflare Workers
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes to database
npm run db:migrate   # Create and run migrations
npm run db:studio    # Open Prisma Studio GUI
npm run db:seed      # Seed database (tsx prisma/seed.ts)
npm run test         # Run Vitest tests
npm run typecheck    # TypeScript type checking
```

## Architecture

### Monorepo Structure
```
Showcore/
├── apps/web/         # React 18 + Vite frontend
├── backend/          # Hono + tRPC + Prisma API
├── design-system/    # Design tokens (colors, typography)
├── data-model/       # Domain model documentation
└── instructions/     # Implementation guides
```

### Frontend (apps/web/src/)
- **Router**: `lib/router.tsx` - React Router with lazy-loaded pages
- **Auth**: `hooks/useAuth.tsx` - Auth context (Clerk integration placeholder, currently localStorage mock)
- **Layout**: `components/AppLayout.tsx` wraps authenticated routes with sidebar navigation
- **Pages**: `pages/` - Route components including admin portal (`pages/admin/`)
- **Sections**: `sections/` - Feature modules with components, types, and data
- **Styling**: Tailwind CSS with dark mode, theme stored in `showcore_theme` localStorage key
- **i18n**: `i18n.ts` - English, Spanish, French translations

### Backend (backend/src/)
- **Entry**: `index.ts` - Hono app with CORS, health check, tRPC mount
- **tRPC Router**: `trpc/router.ts` - Combines 12 entity routers (user, technician, company, skill, booking, message, showProof, review, dispute, notification, onboarding, aiAssistant)
- **Procedures**: `trpc/procedures/` - CRUD operations with Zod validation
- **Context**: `trpc/context.ts` - Request context with user (auth placeholder)
- **Database**: Prisma with PostgreSQL, schema at `prisma/schema.prisma`

### API Communication
Frontend uses tRPC client configured in `lib/trpc.ts`. Currently most hooks in `hooks/` return mock data - real tRPC integration is TODO.

### Key Database Models (Prisma)
- **User**: Base account with role (USER, TECHNICIAN, COMPANY, ADMIN)
- **Technician**: Professional profile with tier (BEGINNER→PRO), XP points, skills
- **Company**: Business profile with subscription tier
- **Booking**: Job engagement between technician and company
- **ShowProof**: Work verification with AI scoring
- **Review**: Bidirectional ratings on completed bookings

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, TypeScript, Vite, React Router 7, Tailwind CSS 3 |
| State | React Query, React Context, React Hook Form + Zod |
| Backend | Hono, tRPC 10, Prisma 5, Zod |
| Database | PostgreSQL |
| Auth | Clerk (configured, not yet integrated) |
| i18n | i18next (en, es, fr) |
| Deployment | Vercel (frontend), Cloudflare Workers (backend) |

## Path Aliases

Frontend uses `@/*` → `./src/*` (configured in tsconfig.json and vite.config.ts)

## Environment Variables

### Frontend (apps/web/)
- `VITE_API_URL` - Backend API base URL (default: http://localhost:3001/api)
- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk auth key

### Backend (backend/)
- `DATABASE_URL` - PostgreSQL connection string

## Theme System

Theme initialization happens in `main.tsx` before React renders to prevent flash. Three localStorage keys:
- `showcore_theme` - "light", "dark", or "system"
- `showcore_font_size` - "small", "medium", or "large"
- `showcore_language` - "en", "es", or "fr"

## Current Implementation Status

- Frontend UI: Mostly complete with mock data
- Backend tRPC procedures: Scaffolded, need business logic
- Auth integration: Placeholder - needs Clerk connection
- API hooks: Return mock data - need tRPC client integration

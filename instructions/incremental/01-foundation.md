# Milestone 1: Foundation

Set up the project infrastructure, database, and authentication.

---

## Project Setup

### 1. Initialize Project
```bash
# Using Vite
npm create vite@latest showcore -- --template react-ts
cd showcore
npm install
```

### 2. Install Dependencies
```bash
# Core
npm install react-router-dom lucide-react

# Styling
npm install tailwindcss @tailwindcss/vite

# tRPC Client
npm install @trpc/client @trpc/react-query @tanstack/react-query

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod
```

### 3. Configure Tailwind CSS v4
```css
/* src/index.css */
@import "tailwindcss";
```

### 4. Add Google Fonts
```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono&display=swap" rel="stylesheet">
```

---

## Database

### 1. Set Up Backend
```bash
cd backend
npm install
```

### 2. Configure Database
```env
# backend/.env
DATABASE_URL="postgresql://user:password@localhost:5432/showcore"
```

### 3. Generate Prisma Client
```bash
npm run db:generate
npm run db:push
```

### 4. Seed Data (Optional)
```bash
npm run db:seed
```

---

## Backend Server

### 1. Start Development Server
```bash
npm run dev
# Server runs at http://localhost:8787
```

### 2. Verify Health Check
```bash
curl http://localhost:8787/health
# {"status":"ok","timestamp":"..."}
```

---

## Frontend tRPC Client

### 1. Create Client
```typescript
// src/lib/trpc.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../backend/src/trpc/router'

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
```

### 2. Set Up React Query (Optional)
```typescript
// src/lib/trpc-react.ts
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../../backend/src/trpc/router'

export const trpc = createTRPCReact<AppRouter>()
```

---

## Authentication

Implement authentication in `backend/src/middleware/auth.ts`. Choose one:

### Option A: Clerk
```bash
npm install @clerk/clerk-sdk-node
```

### Option B: Custom JWT
```bash
npm install jose
```

### Option C: Session-based
```bash
npm install lucia @lucia-auth/adapter-prisma
```

See `backend/src/middleware/auth.ts` for implementation examples.

---

## Verify Setup

- [ ] Frontend runs at `http://localhost:5173`
- [ ] Backend runs at `http://localhost:8787`
- [ ] Health check returns OK
- [ ] Database migrations applied
- [ ] tRPC client can query backend

---

*Next: Milestone 2 - Application Shell*

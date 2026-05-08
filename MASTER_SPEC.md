# ShowCore — Master Specification

> Technician discovery marketplace connecting AV (audio-visual) professionals with live event companies. Brings transparency, fair compensation, and quality discovery to the live events industry through verified profiles, market analytics, and community-building tools.

---

## Status: RETIRED

This repository has been retired and consolidated to this single specification document. Full pre-wipe history is preserved at the git tag `pre-wipe-final`. Last active push: 2026-02-09. Repo size at retirement: ~47 MB, 164 TypeScript/TSX source files.

There is a separate `Myro-Productions-Portfolio/ShowCore` repo on a different account; this document covers ONLY `husky2466-codo/ShowCore`.

---

## 1. Original Vision

ShowCore set out to be the central marketplace for the AV (audio-visual) live-events industry — the hub where freelance technicians (lighting designers, A1/A2 audio engineers, video engineers, riggers, console programmers) find work, and where production companies and event clients find verified, ranked talent. The product treats the marketplace itself as a transparency engine: instead of pay being a black box negotiated job-by-job, the platform aggregates booking data into public rate guidance; instead of trust being purely word-of-mouth, the platform validates skills with show proof + AI/admin review and bidirectional reviews.

Core market gaps it addressed:

1. **Unfair compensation** — technicians lacked rate visibility. Solution: transparent job postings with suggested pay bands and real-time market analytics.
2. **Hard promotion** — companies and gear manufacturers struggled to reach the right technicians. Solution: company profile pages with subscription tiers (Free / Basic / Pro / Enterprise) and a paid promotion surface.
3. **Poor discovery** — finding reliable technicians is hard. Solution: search ranked by tier, verification, reviews, and proximity, with the ranking algorithm exposed for transparency.
4. **Trust gaps** — no shared accountability layer. Solution: show proof verification (AI + admin), bidirectional reviews, insurance verification + badges, and a formal dispute resolution flow with admin mediation and arbitration escalation.
5. **Industry fragmentation** — no central community hub. Solution: bookings, real-time messaging, mentorship, an XP system tied to verified work, and a lottery surfacing newer technicians for visibility boosts.

---

## 2. Target Users (Two-Sided Marketplace)

**Side A — Technicians (supply).** Freelance AV professionals across audio, lighting, video, rigging, console programming, and crew chief / production roles. They build profiles with verified skills, hourly rates, location, insurance status, show-proof portfolio, and tier (Beginner -> Experienced -> Advanced -> Pro) earned via XP from verified work + reviews.

**Side B — Companies (demand).** Production companies, AV rental houses, event producers, and corporate clients who post jobs, request specific technicians, manage bookings end-to-end, and pay through the platform. Companies sit on a subscription tier (FREE / BASIC / PRO / ENTERPRISE) gating analytics archive depth, featured listings, and promotion features.

**Side C — Admins (platform ops).** Internal staff using a separate admin portal to verify credentials, mediate disputes, moderate content, monitor platform health, and manage feature flags and broadcast announcements.

A future fourth role (USER, distinct from TECHNICIAN/COMPANY) was scaffolded for clients hiring through a company envelope and for prospective accounts not yet committing to a side.

---

## 3. Feature Surface

The product was sliced into nine top-level "sections," each with a spec.md, tests.md, and component code. All nine were specified in detail and partially built.

1. **Technician Discovery** — keyword search; filters for skill, tier, location radius, hourly rate range, verification, insurance; ranked grid of technician cards with tier badges, randomized public IDs, ratings, distance; saved/bookmark shortlists for subscribers; transparent ranking-score breakdown.
2. **Bookings & Messaging** — direct bookings and open job postings with applicant flow; counter-offer negotiation; contracts + deposits; lifecycle states (PENDING / ACCEPTED / IN_PROGRESS / COMPLETED / CANCELLED / DISPUTED); per-booking message threads with attachments; calendar + list views; cancellation policies; invoice generation for technicians; payment release on completion.
3. **Show Proof & XP** — technicians upload photos, videos, console files, documents, or full portfolio entries scoped per-proof to public / private / clients-only; AI scores proofs and admins approve/reject; XP awarded on approval + on client review; tier progression Beginner -> Pro; lottery tickets earned by activity, with periodic draws granting visibility boosts to surface newer technicians.
4. **Reviews & Trust** — bidirectional 1-5 star reviews tied to bookings, with optional written feedback and a private response field; helpful voting; trust signals (verified ID, insurance + expiry, certifications, background check); review-edit flow when post-show communication changes context; technicians only earn XP after a client review is filed (proof alone is portfolio-only).
5. **Market Analytics** — overview dashboard with average market rate, trending skills, regional insights; filtered drill-down by skill / tier / region / event type / date range; multiple chart types (line, bar, distribution); save/load named layouts; personal benchmarking against market; AI-powered predictions; **archive depth gated by company subscription tier** (Pro/Enterprise unlock 1-3 years historical).
6. **Authentication** — email+password, magic link, and OAuth (Google, Apple, Microsoft Exchange via Clerk); unified registration with role selector (Technician or Company); email verification before full access; profile-completion wizard role-specific; password reset.
7. **Settings** — profile, notification preferences (per channel + per event type), payment methods, account configuration, theme.
8. **Admin Portal** — separate admin UI for user management, credential verification, dispute mediation, content moderation, platform analytics, system health monitoring, broadcast announcements, audit log, feature flags, refund/payment dispute handling, featured listings management.
9. **Dashboard & Onboarding** — personalized dashboard per role; onboarding tasks bucketed PROFILE / TRUST / PAYMENT / ENGAGEMENT with REQUIRED / RECOMMENDED / OPTIONAL priorities; XP rewards on completion; AI assistant conversation pinned to dashboard with persistent context (current route, role, onboarding progress) and suggested-action buttons.

---

## 4. Tech Stack (As Built)

**Frontend (`apps/web`)**
- React 18 + TypeScript, Vite 6
- React Router v7 (`react-router-dom`)
- Tailwind CSS v3 (spec called for v4 — actual repo settled on v3 + tailwind.config.js + postcss + autoprefixer)
- TanStack React Query v4 + tRPC v10 client (`@trpc/client`, `@trpc/react-query`)
- React Hook Form + Zod for forms/validation
- Clerk React (`@clerk/clerk-react` ^5.15) for auth
- i18next + i18next-browser-languagedetector + i18next-http-backend (i18n-ready, locales in `public/locales`)
- lucide-react for icons

**Backend (`backend/`)**
- Hono (HTTP framework, edge-ready)
- tRPC v10 (type-safe RPC, end-to-end TypeScript)
- Prisma ORM
- PostgreSQL
- Zod for runtime validation
- Designed to deploy on Cloudflare Workers (wrangler) OR Node.js (`@hono/node-server`) OR Vercel (default export). Final deployment target was Vercel Functions — see commits like "Export HTTP methods for Vercel Functions compatibility" and "Add .js extensions to all ESM local imports."

**Hosting**
- `vercel.json` at repo root: build via `cd apps/web && npm install && npm run build`, output `apps/web/dist`, SPA rewrite `/(.*)` -> `/index.html`. Backend deployed as Vercel Functions.

**Monorepo**
- npm workspaces: `apps/*`, `packages/*`. Root scripts: `dev` -> web, `dev:api` -> api, `dev:all` -> concurrently both.

---

## 5. Repo Layout (Pre-Wipe)

```
ShowCore/
  README.md                         export package overview
  product-overview.md               product description + features
  package.json                      workspaces root
  vercel.json                       Vercel deploy config
  .vercelignore
  prompts/
    one-shot-prompt.md              full implementation prompt
    section-prompt.md               template for incremental builds
  instructions/
    one-shot-instructions.md        complete impl spec
    incremental/
      01-foundation.md              project init + auth scaffold
      02-shell.md                   app shell
      03-authentication.md          auth flows
      04-dashboard-and-onboarding.md
      05-technician-discovery.md
      06-bookings-and-messaging.md
      07-show-proof-and-xp.md
      08-reviews-and-trust.md
      09-market-analytics.md
      10-settings.md
      11-admin-portal.md
  design-system/
    colors.json                     primary=amber, secondary=yellow, neutral=zinc
    typography.json                 DM Sans (UI), IBM Plex Mono (code)
  data-model/
    data-model.md                   entity descriptions + relationships
  shell/                            shared shell components/hooks/context
  sections/                         per-section spec.md, tests.md, components
    technician-discovery/
    bookings-and-messaging/
    show-proof-and-xp/
    reviews-and-trust/
    market-analytics/
    authentication/
    settings/
    admin-portal/
    dashboard-and-onboarding/
  apps/
    web/                            React+Vite SPA (164 TS/TSX files)
      src/
        main.tsx, main-simple.tsx
        i18n.ts
        components/    AppLayout, ErrorBoundary, ...
        hooks/         useAuth, useApi, useBookings, useNotifications,
                       usePayments, useWebSocket, useTheme, useDebounce, ...
        lib/           trpc client, router, aiResponses
        pages/         LoginPage, RegisterPage, EmailVerificationPage,
                       BookingsPage, ShowProofPage, AnalyticsPage,
                       SettingsPage, ProfileCompletionPage, ...
        sections/      mirrors top-level sections/
        types/
      public/locales/  i18n bundles
      tests/           e2e + helpers
  backend/
    prisma/schema.prisma            422-line full data model
    src/
      index.ts                      Hono app
      db.ts                         Prisma singleton
      trpc/
        router.ts                   root router
        context.ts                  request context (auth)
        procedures/                 per-entity CRUD: user, technician,
                                    company, skill, booking, message,
                                    showProof, review, dispute,
                                    notification, onboarding, aiAssistant
      middleware/auth.ts            scaffolded
    api/                            Vercel Functions entry
```

---

## 6. Data Model (Prisma)

The complete schema lives at `backend/prisma/schema.prisma` (422 lines, preserved on the `pre-wipe-final` tag). Core models:

- **User** — `id`, `email` (unique), `passwordHash?`, `emailVerified`, `role` (USER/TECHNICIAN/COMPANY/ADMIN), soft-delete via `deletedAt`. One-to-one with Technician OR Company.
- **Technician** — `displayName`, `bio`, `avatarUrl`, `location`, `hourlyRate` (Decimal 10,2), `tier` (BEGINNER/EXPERIENCED/ADVANCED/PRO), `xpPoints`, `isVerified`, `hasInsurance`, `insuranceExpiry`. Has many TechnicianSkill, ShowProof, Booking.
- **Company** — `name`, `description`, `logoUrl`, `website`, `location`, `subscriptionTier` (FREE/BASIC/PRO/ENTERPRISE), `subscriptionEnds`. Has many Booking.
- **Skill** + **TechnicianSkill** join model with `isVerified`, `verifiedAt`, `verifiedBy` (admin user id).
- **Booking** — `title`, `description`, `eventDate`, `eventEndDate`, `location`, `hourlyRate`, `estimatedHours`, `totalAmount`, `status` (PENDING/ACCEPTED/IN_PROGRESS/COMPLETED/CANCELLED/DISPUTED). Has many Message, Review; one-to-one optional Dispute.
- **Message** — booking-scoped, `senderId`, `content`, `attachments` (JSON array), `readAt`.
- **ShowProof** — `proofType` (PHOTO/VIDEO/CONSOLE_FILE/DOCUMENT/PORTFOLIO), `mediaUrls` JSON, `status` (PENDING/AI_REVIEWED/APPROVED/REJECTED), `aiScore`, `aiAnalysis` JSON, `reviewedBy`, `reviewNotes`, `xpAwarded`.
- **Review** — booking + author + subject, 1-5 `rating`, `content`, technician `response`. Uniqueness: `(bookingId, authorId)`.
- **Dispute** — booking-scoped (one per booking), filer + respondent, `reason`, `description`, `evidence` JSON, `status` (OPEN/UNDER_REVIEW/ARBITRATION/RESOLVED/DISMISSED), `resolution`, `resolvedBy`.
- **Notification** — typed (BOOKING_REQUEST, BOOKING_ACCEPTED, BOOKING_CANCELLED, MESSAGE_RECEIVED, REVIEW_RECEIVED, XP_MILESTONE, SHOW_PROOF_APPROVED/REJECTED, DISPUTE_UPDATE, LOTTERY_ELIGIBLE, ONBOARDING_REMINDER, SYSTEM), `actionUrl`, `readAt`.
- **OnboardingProgress** (per user) + **OnboardingTask** catalog with `category` (PROFILE/TRUST/PAYMENT/ENGAGEMENT), `priority` (REQUIRED/RECOMMENDED/OPTIONAL), `targetRoute`, `xpReward`, `forRole`.
- **AIAssistantConversation** + **AIAssistantMessage** with `sender` (USER/ASSISTANT), `content`, `suggestedActions` JSON `[{label, targetRoute}]`, persisted `context` JSON (current route, role, progress).

---

## 7. Integrations and External Dependencies

- **Auth**: Clerk (`@clerk/clerk-react` 5.15.x) — social logins + magic link + email/password. Backend `middleware/auth.ts` scaffolded; alternates documented were Lucia (self-hosted sessions) or custom JWT.
- **Database**: PostgreSQL via Prisma. Backend README references `DATABASE_URL` and `DIRECT_URL` env vars (compatible with Supabase / Neon / RDS pooled connections).
- **Hosting**: Vercel (final). Cloudflare Workers + wrangler initially scaffolded.
- **File uploads** (planned, not finalized): Cloudflare R2 or AWS S3 for avatars, company logos, show-proof media, message attachments.
- **Real-time** (planned): tRPC subscriptions over WebSocket, Cloudflare Durable Objects, or Pusher/Ably. `useWebSocket.ts` hook present in frontend.
- **Payments** (planned, not implemented): No payment provider wired. Stripe Connect was the implied target given the marketplace + payouts model.
- **AI**: AI assistant chat (frontend `aiResponses.ts`); show-proof AI analysis recorded `aiScore` + `aiAnalysis` JSON in schema, but the analysis pipeline itself was a TODO.
- **Geocoding / location radius**: not externally integrated; `location` stored as plain string. Radius search was a planned filter.
- **i18n**: i18next pipeline with HTTP backend; locale bundles under `apps/web/public/locales`.

---

## 8. Design Decisions

- **Monorepo with npm workspaces** instead of pnpm/turborepo — simple, single root lockfile, frontend and backend independently deployable.
- **tRPC end-to-end** over REST/OpenAPI — the entire app is TypeScript, and tRPC's type inference removed the need for a separate API contract layer.
- **Prisma over Drizzle** — richer schema-first DSL fit the wide entity surface (12+ models, many relations, soft-delete).
- **Section-first architecture** — every feature has a self-contained `spec.md` + `tests.md` + components folder, mirrored under both top-level `sections/` and `apps/web/src/sections/`. This was driven by the "Design OS" generator that produced the package and was meant to keep AI agents in narrow, well-scoped contexts.
- **Two implementation paths documented** — `prompts/one-shot-prompt.md` for a single-shot AI build and `instructions/incremental/01-11.md` for a milestone-by-milestone build. The repo was generated for AI-driven implementation from day one.
- **Separate admin portal** rather than role-flagged routes inside the user app — cleaner permission model and lets ops UI evolve independently.
- **Tier + XP system** as the trust spine — verified work is the only path to higher tiers, and tiers (not just star ratings) drive search ranking. This is what makes the marketplace worth being on for top technicians.
- **Lottery / visibility boost** — explicit anti-rich-get-richer mechanic so newer Beginner/Experienced technicians get surfaced periodically.
- **Bidirectional reviews tied to bookings, not free-form** — every review is booking-anchored, eliminating drive-by reviews.
- **Subscription tier gates analytics depth, not core access** — companies can use the marketplace for free; data archives are the upsell.
- **Soft deletes** (`deletedAt`) across all primary entities — needed for dispute trails, audit, and review history continuity.
- **Color system: amber primary, yellow secondary, zinc neutral** — high-contrast, "stage lighting" palette appropriate for AV industry brand.

---

## 9. Status When Retired

Built and present in the codebase:

- Complete Prisma schema (12 entities, 11 enums)
- Backend tRPC scaffold with procedures for every entity (auth/authorization marked TODO inline)
- Frontend React app with 164 TS/TSX files: AppLayout, ErrorBoundary, all major pages (Login, Register, EmailVerification, ProfileCompletion, Bookings, ShowProof, Analytics, Settings), auth/booking/notification/payment/api/websocket hooks, tRPC client, i18n setup, e2e test scaffolding
- Vercel deployment configuration; commit history shows iterative deploy fixes (ESM `.js` import extensions, circular dep break, tsc skip, Vercel Functions HTTP method exports, WCAG AA contrast pass, ARIA fixes)
- Color/typography design system tokens

Specified but not implemented (TODOs in code or named in backend README):

- Real authentication wiring (Clerk integration started; backend `middleware/auth.ts` is a stub)
- Authorization checks on tRPC procedures
- XP tier-progression calculation engine
- Lottery eligibility + draw scheduling
- Show-proof AI analysis pipeline
- Payment processing (Stripe Connect implied)
- Email notifications
- File upload pipeline (R2/S3)
- Real-time messaging transport (WebSocket / subscriptions / Pusher)
- Geocoding for radius search

GitHub state: 0 issues (open or closed), 0 PRs (open or closed). Single branch (`master`). No pre-existing tags.

---

## 10. Known Issues / Lessons Learned

- **Tailwind version drift** — README and instructions specified Tailwind v4; actual `apps/web/package.json` shipped v3.4 + postcss + autoprefixer because v4's PostCSS-less pipeline conflicted with the existing Vite setup.
- **Vercel Functions ESM friction** — multiple commits (`Add .js extensions to all ESM local imports`, `Break circular dependency by extracting tRPC initialization`, `Export HTTP methods for Vercel Functions compatibility`, `Set empty buildCommand to skip tsc build`) document the painful lift to make a Hono+tRPC backend run as Vercel Functions. Lesson: pick the runtime target before scaffolding the backend, not after.
- **Auth left as a stub** — Clerk was wired in the frontend but the backend tRPC `context.ts` never authenticated requests. Anyone running this would have the entire API open.
- **No CI** — no GitHub Actions, no lint/test gates. Quality enforcement was manual.
- **Spec-vs-code drift** — `sections/` contained the design source-of-truth specs; `apps/web/src/sections/` contained code that may or may not match. Future agent rebuilds should treat the top-level `sections/` specs (and this MASTER_SPEC) as canonical.
- **Two ShowCore repos exist on different accounts** (`husky2466-codo/ShowCore` and `Myro-Productions-Portfolio/ShowCore`). Always confirm which is intended before touching anything.

---

## 11. Rebuild Guidance for a Future Agent Mesh

If a future Claude (or agent fleet) is asked to rebuild ShowCore from this spec, here is the recommended sequencing:

1. **Decide hosting first.** Pick Vercel (Functions) OR a real Node/Hono service OR Cloudflare Workers and stick with it. Most of the deploy churn in the original repo came from indecision here.
2. **Pick the auth provider before writing any procedure.** Clerk is the path of least resistance and the original repo's intended choice; wire it through `backend/src/trpc/context.ts` so every procedure has a `ctx.user` from day one. Do NOT scaffold procedures with TODO authorization comments — close the auth loop first.
3. **Schema-first.** Restore `backend/prisma/schema.prisma` from the `pre-wipe-final` tag verbatim — it is the most complete artifact and was already battle-tested across all 12 procedure files.
4. **Build by section, in this order, gating each on green tests:** Authentication -> Dashboard & Onboarding -> Technician Discovery -> Bookings & Messaging -> Show Proof & XP -> Reviews & Trust -> Market Analytics -> Settings -> Admin Portal. This matches the original `instructions/incremental/01-11.md` ordering.
5. **Use the section spec.md files as the source of truth for behavior**, the prisma schema for shape, this MASTER_SPEC for vision and integrations.
6. **Resolve the planned-but-unbuilt list early:** payments (Stripe Connect), file uploads (R2 or S3 + presigned URLs), real-time (start with HTTP polling for messages, upgrade to WebSocket only when needed), email (Resend or Postmark), and an AI pipeline for show-proof analysis (Claude or OpenAI vision). Don't ship a marketplace without payments + file uploads.
7. **Add CI on day one** — lint, typecheck, test, prisma validate. The original repo's late-stage deploy churn was a CI vacuum.
8. **Treat the lottery and tier-progression rules as core IP and write them as pure, well-tested functions** — they are the trust mechanism.
9. **Data privacy / compliance** — show-proof PHOTO/VIDEO uploads of live events may include audience members; build retention controls and per-proof privacy (`public` / `private` / `clients-only`) into v1, not later.

---

## 12. References

- **Pre-wipe history:** `git tag pre-wipe-final` on this repo preserves the entire codebase as it stood at retirement.
- **Sister repo:** `Myro-Productions-Portfolio/ShowCore` (different account, different codebase, do not conflate).
- **Original generators:** the package was produced by an internal "Design OS" tool — README footers and the per-section structure both reference it. There is no public link.
- **Design tokens:** amber/yellow/zinc + DM Sans + IBM Plex Mono (`design-system/colors.json`, `design-system/typography.json`).
- **Stack docs (as of retirement):** Hono v4, tRPC v10, Prisma latest, React 18, Vite 6, React Router 7, TanStack Query v4, Clerk React 5, Tailwind v3.

---

*Retired and consolidated to this spec. Future builds should start here.*

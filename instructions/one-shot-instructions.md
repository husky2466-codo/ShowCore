# ShowCore Implementation Instructions

Complete implementation guide for ShowCore - a technician discovery marketplace.

---

## Milestone 1: Foundation

### Project Setup
1. Initialize React project with TypeScript
2. Configure Tailwind CSS v4
3. Add Google Fonts: DM Sans, IBM Plex Mono
4. Set up routing (React Router or framework-native)

### Database
1. Configure Prisma with PostgreSQL
2. Apply the schema from `backend/schema.prisma`
3. Run migrations: `npx prisma migrate dev`
4. Seed sample data

### Backend
1. Set up Hono server with tRPC
2. Implement authentication middleware
3. Configure CORS for frontend origin
4. Deploy to edge runtime (Cloudflare Workers recommended)

### Authentication
1. Choose auth provider (Clerk, NextAuth, custom)
2. Implement login/register flows
3. Set up protected routes
4. Add session management

---

## Milestone 2: Application Shell

### Layout
1. Create AppShell with header and sidebar
2. Implement MainNav component
3. Add UserMenu with avatar dropdown
4. Set up mobile navigation

### Navigation Structure
- Dashboard (home)
- Discover (technician search)
- Bookings
- Messages
- Show Proof
- Analytics
- Settings

### Components
- `AppShell.tsx` - Main layout wrapper
- `MainNav.tsx` - Navigation menu
- `UserMenu.tsx` - User avatar and dropdown
- `AIAssistantWidget.tsx` - Floating AI helper

---

## Milestone 3: Authentication

### Screens
- Login (`/login`)
- Register (`/register`)
- Password Reset Request (`/forgot-password`)
- Password Reset (`/reset-password`)
- Email Verification (`/verify-email`)
- Profile Completion (`/complete-profile`)

### Features
- Email/password authentication
- Social login (Google, etc.)
- Password strength validation
- Email verification flow
- Role selection (Technician vs Company)

### tRPC Procedures
- `user.me` - Get current user
- `user.update` - Update profile

---

## Milestone 4: Dashboard & Onboarding

### Dashboard
- Welcome banner with user greeting
- Quick stats (bookings, earnings, XP)
- Recent activity feed
- Onboarding progress tracker

### Onboarding
- Multi-step checklist
- Task completion tracking
- Skip option for optional tasks
- Progress persistence

### AI Assistant
- Floating widget in bottom-right
- Contextual suggestions
- Quick actions
- Chat interface

### tRPC Procedures
- `onboarding.getTasks`
- `onboarding.completeTask`
- `onboarding.skipTask`
- `aiAssistant.sendMessage`

---

## Milestone 5: Technician Discovery

### Search
- Text search by name/skill
- Filter panel (location, tier, rate, skills)
- Sort options (rating, rate, distance)
- Pagination with infinite scroll

### Profile Cards
- Avatar, name, tier badge
- Skills list with verification icons
- Hourly rate display
- Rating and review count
- Quick contact button

### Profile Detail
- Full bio and experience
- Verified skills gallery
- Show proof portfolio
- Reviews section
- Booking CTA

### tRPC Procedures
- `technician.list` - Search/filter
- `technician.getById` - Full profile
- `skill.list` - Available skills

---

## Milestone 6: Bookings & Messaging

### Booking Flow
1. Select technician
2. Choose dates/hours
3. Add event details
4. Confirm and send request
5. Await technician response

### Booking Management
- List view with status filters
- Calendar view
- Booking detail modal
- Accept/decline actions
- Cancellation flow

### Messaging
- Thread list by booking
- Real-time message updates
- File attachments
- Read receipts

### tRPC Procedures
- `booking.list`
- `booking.create`
- `booking.accept`
- `booking.cancel`
- `booking.complete`
- `message.list`
- `message.send`

---

## Milestone 7: Show Proof & XP

### Show Proof Upload
- Multi-file upload (photos, videos)
- Event details form
- Skills demonstrated selection
- Submit for verification

### XP Dashboard
- Current XP and tier
- Progress to next tier
- XP history log
- Milestone rewards

### Lottery System
- Eligibility requirements
- Entry status
- Drawing schedule
- Winner announcements

### tRPC Procedures
- `showProof.create`
- `showProof.myList`
- `showProof.list` (approved gallery)

---

## Milestone 8: Reviews & Trust

### Reviews
- Bidirectional reviews (tech ↔ company)
- 5-star rating with categories
- Written feedback
- Response capability

### Trust Profile
- Overall rating
- Insurance verification badge
- Show proof count
- Dispute history (if any)

### Disputes
- File dispute flow
- Evidence upload
- Admin review status
- Resolution outcome

### tRPC Procedures
- `review.create`
- `review.listForUser`
- `review.respond`
- `review.stats`
- `dispute.create`
- `dispute.myList`

---

## Milestone 9: Market Analytics

### Rate Guidance
- Skill-based rate ranges
- Experience level modifiers
- Location adjustments
- Trend indicators

### Market Trends
- Demand by skill over time
- Rate changes by region
- Seasonal patterns
- Comparison tools

### Dashboard
- Metric cards
- Interactive charts
- Saved layouts
- Export options

---

## Milestone 10: Settings

### Profile Settings
- Personal info
- Bio and skills
- Portfolio images
- Availability calendar

### Account Settings
- Email preferences
- Password change
- Two-factor auth
- Account deletion

### Notification Settings
- Email notifications
- Push notifications
- In-app notifications
- Digest frequency

### Payment Settings
- Payout method
- Billing info
- Transaction history
- Invoice settings

---

## Milestone 11: Admin Portal

### User Management
- User list with search/filter
- User detail view
- Role management
- Account actions (suspend, delete)

### Content Moderation
- Show proof review queue
- Approval/rejection workflow
- XP award automation
- Flagged content

### Dispute Resolution
- Dispute queue
- Evidence review
- Resolution actions
- Notification triggers

### Platform Analytics
- User growth metrics
- Booking volume
- Revenue tracking
- System health

---

## Testing

Each section includes a `tests.md` file with:
- User flow tests
- Edge cases
- Error states
- Empty states
- Authorization checks

Use any testing framework (Jest, Vitest, Playwright) and adapt the test cases accordingly.

---

*Generated by Design OS*

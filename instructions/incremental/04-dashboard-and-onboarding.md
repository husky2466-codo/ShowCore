# Milestone 4: Dashboard & Onboarding

Create the main dashboard and onboarding experience.

---

## Dashboard Components

### WelcomeBanner
Personalized greeting with user name and role.

**Content:**
- Greeting based on time of day
- User's display name
- Quick action buttons
- Onboarding progress (if incomplete)

### QuickStats
Key metrics at a glance.

**Technician Stats:**
- Total earnings (this month)
- Completed bookings
- Current XP / tier
- Average rating

**Company Stats:**
- Active bookings
- Technicians hired
- Total spend
- Pending reviews

### RecentActivity
Activity feed with recent events.

**Event Types:**
- New booking requests
- Messages received
- Reviews posted
- XP earned
- Show proofs approved

### OnboardingChecklist
Progress tracker for new users.

**Tasks:**
- Complete profile
- Add skills
- Upload avatar
- Set availability
- First booking

---

## Onboarding Flow

### Task Structure
```typescript
interface OnboardingTask {
  id: string
  title: string
  description: string
  status: 'pending' | 'completed' | 'skipped'
  isOptional: boolean
  action: string // Button text
  href: string   // Link target
}
```

### Progress Tracking
- Store task completion in database
- Show progress bar (e.g., 3/5 complete)
- Allow skipping optional tasks
- Celebrate completion

---

## AI Assistant

### Widget Placement
Floating button in bottom-right corner.

### Features
- Collapsible panel
- Conversation history
- Suggested questions
- Quick actions

### Quick Actions
- "Find technicians near me"
- "Check my bookings"
- "Upload show proof"
- "View my earnings"

### tRPC Procedures
```typescript
trpc.aiAssistant.getConversation.query()
trpc.aiAssistant.sendMessage.mutate({ content })
trpc.aiAssistant.clearHistory.mutate()
```

---

## Implementation

### 1. Create Dashboard Page
Reference: `sections/dashboard-and-onboarding/components/`

### 2. Fetch Dashboard Data
```typescript
// Parallel queries
const [stats, activity, tasks] = await Promise.all([
  trpc.dashboard.stats.query(),
  trpc.dashboard.activity.query({ limit: 10 }),
  trpc.onboarding.getTasks.query(),
])
```

### 3. Add AI Assistant
Reference: `shell/components/AIAssistant/`

---

## Verify

- [ ] Dashboard shows personalized greeting
- [ ] Stats display correct values
- [ ] Activity feed updates
- [ ] Onboarding checklist tracks progress
- [ ] Tasks can be completed/skipped
- [ ] AI Assistant opens and responds

---

*Next: Milestone 5 - Technician Discovery*

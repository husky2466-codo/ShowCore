# Milestone 11: Admin Portal

Platform administration and moderation tools.

---

## Admin Layout

### Separate Navigation
Admin portal uses its own navigation, separate from the main app.

### Admin Nav Items
- Dashboard
- Users
- Content Moderation
- Disputes
- Analytics
- System Health
- Settings

### Access Control
- ADMIN role required
- Redirect non-admins to main app
- Audit logging for admin actions

---

## Admin Dashboard

### Key Metrics
- Total users (techs + companies)
- Active bookings
- Pending verifications
- Open disputes
- Revenue (if applicable)

### Quick Actions
- Review pending show proofs
- Handle urgent disputes
- View flagged content
- Recent admin activity

### Alerts
- System health issues
- Unusual activity patterns
- Pending escalations

---

## User Management

### User List
- Search by name/email
- Filter by role, status, tier
- Sort by date, activity
- Pagination

### User Detail
- Full profile info
- Account status
- Activity log
- Admin notes
- Action history

### Admin Actions
- Verify email manually
- Reset password
- Change role
- Suspend account
- Delete account
- Award/deduct XP
- Add admin note

---

## Content Moderation

### Show Proof Queue
- Pending submissions
- Oldest first priority
- Quick approve/reject
- Bulk actions

### Review Interface
- View media files
- Read description
- Check skills claimed
- AI analysis results (if enabled)
- Approve with XP amount
- Reject with reason

### Flagged Content
- User-reported content
- Auto-flagged by system
- Review and take action

---

## Dispute Resolution

### Dispute Queue
- Open disputes
- Priority by age
- Filter by type
- Assigned to me

### Dispute Detail
- Booking information
- Both parties' accounts
- Evidence submitted
- Communication history
- Similar past disputes

### Resolution Actions
- Contact parties
- Request more info
- Issue refund
- Warning to user
- Suspend account
- Close as resolved
- Add internal notes

---

## Platform Analytics

### User Metrics
- New registrations over time
- User retention
- Active users (DAU/MAU)
- Conversion rates

### Booking Metrics
- Booking volume
- Completion rate
- Average booking value
- Popular skills

### Financial Metrics
- Platform revenue
- Transaction volume
- Payout totals
- Subscription breakdown

### Content Metrics
- Show proofs submitted
- Approval rate
- Average review score
- Report volume

---

## System Health

### Service Status
- API response times
- Error rates
- Database health
- Queue depths

### Infrastructure
- Server metrics
- Storage usage
- Bandwidth

### Alerts
- Configure thresholds
- Notification channels
- Incident history

---

## tRPC Procedures

```typescript
// Admin user list
const users = await trpc.user.adminList.query({
  role: 'TECHNICIAN',
  status: 'ACTIVE',
  limit: 50,
})

// Review show proof
await trpc.showProof.review.mutate({
  id: 'proof-1',
  status: 'APPROVED',
  xpAwarded: 100,
  reviewNotes: 'Great documentation',
})

// Update dispute
await trpc.dispute.updateStatus.mutate({
  id: 'dispute-1',
  status: 'RESOLVED',
  resolution: 'REFUND_PARTIAL',
  internalNotes: 'Issued 50% refund due to...',
})
```

---

## Implementation

### 1. Create Admin Pages
Reference: `sections/admin-portal/components/`

### 2. Role Protection
Middleware to check admin role.

### 3. Audit Logging
Log all admin actions with timestamps.

---

## Verify

- [ ] Only admins can access
- [ ] User search works
- [ ] Can approve/reject show proofs
- [ ] XP awards correctly
- [ ] Dispute resolution flow works
- [ ] Analytics display correctly
- [ ] Actions are logged

---

*Implementation Complete!*

Continue to frontend tests using the test specifications in each section.

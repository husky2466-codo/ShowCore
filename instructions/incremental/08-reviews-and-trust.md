# Milestone 8: Reviews & Trust

Bidirectional reviews, trust badges, and dispute resolution.

---

## Review System

### Bidirectional Reviews
- Technician reviews Company (after job)
- Company reviews Technician (after job)
- One review per party per booking

### Review Form
- Overall rating (1-5 stars)
- Category ratings:
  - Communication
  - Professionalism
  - Quality of work / Payment promptness
- Written feedback (required, min 20 chars)
- Anonymous option (optional)

### Timing
- Available after booking COMPLETED
- Reminder sent after 48 hours
- Expires after 30 days

---

## Review Display

### ReviewCard
- Reviewer avatar and name
- Star rating
- Written feedback
- Date posted
- Response (if any)

### ReviewStats
- Average overall rating
- Total review count
- Rating distribution (5-star bar chart)
- Category averages

### Review Response
- Subject can respond once
- Response appears under review
- Professional response guidelines

---

## Trust Profile

### Trust Score Components
- Review average
- Response rate
- Show proof count
- Dispute history
- Account age

### Verification Badges
- **Verified Identity**: ID check passed
- **Insurance Verified**: Current policy confirmed
- **Background Check**: Completed check
- **Top Rated**: 4.8+ average

### Badge Display
- Icon + label
- Verification date
- "Verified by ShowCore"

---

## Dispute Resolution

### Filing a Dispute
- Available on booking detail
- Select reason category:
  - Payment issue
  - No-show
  - Quality issue
  - Safety concern
  - Other
- Describe issue
- Upload evidence (optional)

### Dispute Flow
1. **OPEN** - Dispute filed
2. **UNDER_REVIEW** - Admin assigned
3. **RESOLVED** - Decision made
4. **CLOSED** - Archived

### Resolution Actions
- Refund (full/partial)
- Account warning
- Account suspension
- No action (dismissed)

---

## tRPC Procedures

```typescript
// Create review
await trpc.review.create.mutate({
  bookingId: 'booking-1',
  overallRating: 5,
  communication: 5,
  professionalism: 4,
  quality: 5,
  content: 'Excellent work! Highly professional...',
})

// List reviews for user
const reviews = await trpc.review.listForUser.query({
  userId: 'user-123',
  limit: 10,
})

// Get review stats
const stats = await trpc.review.stats.query({
  userId: 'user-123',
})

// Respond to review
await trpc.review.respond.mutate({
  reviewId: 'review-1',
  response: 'Thank you for the feedback...',
})

// File dispute
await trpc.dispute.create.mutate({
  bookingId: 'booking-1',
  reason: 'PAYMENT_ISSUE',
  description: 'Payment was not received...',
})
```

---

## Implementation

### 1. Create Review Components
Reference: `sections/reviews-and-trust/components/`

### 2. Calculate Trust Score
Server-side aggregation of trust factors.

### 3. Badge Verification
Admin-controlled badge assignment.

---

## Verify

- [ ] Can submit review after booking
- [ ] Review appears on profile
- [ ] Stats calculate correctly
- [ ] Can respond to reviews
- [ ] Dispute form submits
- [ ] Trust badges display
- [ ] Rating distribution chart works

---

*Next: Milestone 9 - Market Analytics*

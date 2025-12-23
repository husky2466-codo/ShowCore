# Backend Test Instructions

These test instructions are **framework-agnostic**. Adapt to your setup (Vitest, Jest, Supertest, etc.).

## Setup

```typescript
import { createTRPCProxyClient, httpLink } from '@trpc/client'
import type { AppRouter } from '../src/trpc/router'

const client = createTRPCProxyClient<AppRouter>({
  links: [httpLink({ url: 'http://localhost:8787/trpc' })],
})
```

---

## User API Tests

### user.me

**Success (authenticated):**
- Returns current user with technician/company profile
- Includes email, role, createdAt

**Unauthorized:**
- Returns 401 when not authenticated

### user.getById

**Success:**
- Returns public user profile
- Does not include email for non-self users
- Includes technician or company profile data

**Not Found:**
- Returns null for non-existent ID
- Returns null for soft-deleted users

### user.update

**Success:**
- Updates email address
- Returns updated user

**Validation:**
- Rejects invalid email format

---

## Technician API Tests

### technician.list

**Success:**
- Returns paginated technicians
- Excludes soft-deleted records
- Includes verified skills

**Filtering:**
- Filters by tier (BEGINNER, EXPERIENCED, ADVANCED, PRO)
- Filters by location (case-insensitive contains)
- Filters by skill ID
- Filters by hourly rate range

**Pagination:**
- Returns correct page size
- Cursor-based pagination works correctly

**Empty State:**
- Returns empty array when no matches

### technician.getById

**Success:**
- Returns full technician profile
- Includes skills with verification status
- Includes approved show proofs

**Not Found:**
- Returns null for non-existent ID

### technician.create

**Success:**
- Creates technician profile
- Updates user role to TECHNICIAN
- Returns created profile

**Conflict:**
- Returns error if profile already exists

**Validation:**
- Requires displayName (1-100 chars)
- hourlyRate must be positive

### technician.addSkill / removeSkill

**Success:**
- Adds/removes skill from profile
- Returns updated skill list

**Not Found:**
- Returns error if technician profile doesn't exist
- Returns error if skill doesn't exist

---

## Booking API Tests

### booking.list

**Success:**
- Returns bookings for current user
- Works for both technician and company users
- Filters by status

**Pagination:**
- Cursor-based pagination works

### booking.create

**Success (company):**
- Creates booking with correct data
- Calculates totalAmount from hourlyRate * estimatedHours
- Status defaults to PENDING

**Forbidden:**
- Returns error if user is not a company

**Validation:**
- Requires technicianId, title, eventDate, hourlyRate
- eventDate must be in the future

### booking.accept

**Success (technician):**
- Changes status to ACCEPTED
- Only technician can accept

**Bad Request:**
- Returns error if not PENDING status

**Forbidden:**
- Returns error if not the assigned technician

### booking.cancel

**Success:**
- Changes status to CANCELLED
- Either party can cancel

**Bad Request:**
- Cannot cancel COMPLETED bookings

### booking.complete

**Success (company):**
- Changes status to COMPLETED
- Only company can mark complete

**Bad Request:**
- Must be ACCEPTED or IN_PROGRESS

---

## Message API Tests

### message.list

**Success:**
- Returns messages for booking
- Ordered by createdAt ascending
- Includes sender info

**Forbidden:**
- Returns error if not a participant

### message.send

**Success:**
- Creates message
- Returns message with sender

**Validation:**
- Content required (1-5000 chars)
- Attachments must be valid URLs

---

## ShowProof API Tests

### showProof.create

**Success:**
- Creates show proof with PENDING status
- Requires technician profile

**Validation:**
- At least 1 mediaUrl required
- Max 10 mediaUrls
- Valid proofType enum

### showProof.review (admin)

**Approve:**
- Sets status to APPROVED
- Awards XP to technician
- Sets reviewedBy and reviewedAt

**Reject:**
- Sets status to REJECTED
- No XP awarded
- Includes reviewNotes

---

## Review API Tests

### review.create

**Success:**
- Creates review for completed booking
- Determines subject automatically
- One review per party per booking

**Bad Request:**
- Booking must be COMPLETED
- Cannot review same booking twice

**Forbidden:**
- Must be a participant

### review.stats

**Success:**
- Returns average, count, distribution
- Distribution shows counts per rating (1-5)

**Empty:**
- Returns zero average and count when no reviews

---

## Dispute API Tests

### dispute.create

**Success:**
- Creates dispute
- Sets booking status to DISPUTED
- Determines respondent automatically

**Conflict:**
- Cannot create if dispute already exists

### dispute.updateStatus (admin)

**Success:**
- Updates status
- Sets resolution, resolvedBy, resolvedAt when resolved

---

## Notification API Tests

### notification.list

**Success:**
- Returns user's notifications
- Filters by unreadOnly

### notification.markAllRead

**Success:**
- Marks all unread as read
- Returns count of updated

---

## Authentication Tests

**Protected procedures:**
- Return 401 without valid session

**Admin procedures:**
- Return 401 without valid session
- Return 403 without ADMIN role

---

## Authorization Tests

**Owner checks:**
- Users can only update their own profiles
- Users can only access their own bookings/messages
- Users can only respond to reviews about them

**Participant checks:**
- Only booking participants can view messages
- Only booking participants can file disputes

---

## Edge Cases

- [ ] Very long text inputs (max lengths enforced)
- [ ] Unicode and emoji in text fields
- [ ] Empty arrays vs null for optional arrays
- [ ] Concurrent updates (optimistic locking)
- [ ] Rate limiting on sensitive endpoints
- [ ] SQL injection attempts in search queries

---

## Performance Tests

- [ ] Pagination with large datasets (1000+ records)
- [ ] Complex queries with multiple joins
- [ ] Batch operations

---

## Sample Test Data

```typescript
// Authenticated user context
const technicianUser = {
  id: 'user-tech-1',
  email: 'tech@example.com',
  role: 'TECHNICIAN' as const,
}

const companyUser = {
  id: 'user-company-1',
  email: 'company@example.com',
  role: 'COMPANY' as const,
}

const adminUser = {
  id: 'user-admin-1',
  email: 'admin@example.com',
  role: 'ADMIN' as const,
}

// Sample entities
const sampleTechnician = {
  displayName: 'John Tech',
  bio: 'Experienced AV technician',
  location: 'Los Angeles, CA',
  hourlyRate: 75,
}

const sampleBooking = {
  technicianId: 'tech-1',
  title: 'Corporate Event',
  eventDate: new Date('2025-02-01'),
  hourlyRate: 75,
  estimatedHours: 8,
}

const sampleShowProof = {
  title: 'Concert Setup',
  proofType: 'PHOTO' as const,
  mediaUrls: ['https://example.com/photo1.jpg'],
}
```

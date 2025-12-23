# Milestone 6: Bookings & Messaging

Manage bookings and real-time messaging.

---

## Booking Flow

### Step 1: Select Technician
- From discovery or direct link
- View profile summary
- Check availability

### Step 2: Event Details
- Event title
- Event date and time
- Location (venue address)
- Estimated hours
- Event description/notes

### Step 3: Rate Confirmation
- Technician's hourly rate
- Estimated total
- Any additional fees

### Step 4: Send Request
- Review all details
- Submit booking request
- Notification to technician

---

## Booking States

| Status | Description |
|--------|-------------|
| PENDING | Awaiting technician response |
| ACCEPTED | Technician confirmed |
| IN_PROGRESS | Event underway |
| COMPLETED | Event finished |
| CANCELLED | Cancelled by either party |
| DISPUTED | Under dispute resolution |

---

## Booking Views

### List View
- Tabs: Upcoming, Past, All
- Filter by status
- Sort by date
- Search by title/technician

### BookingCard
- Event title
- Date and time
- Technician/company info
- Status badge
- Action buttons

### Calendar View
- Month calendar grid
- Event indicators
- Click to view details

### Booking Detail
- Full event information
- Participants
- Message thread
- Action buttons (Accept, Cancel, Complete)
- Dispute option

---

## Messaging

### Thread List
- Organized by booking
- Last message preview
- Unread indicator
- Timestamp

### MessageThread
- Message history
- Sender avatars
- Timestamps
- Read receipts
- File attachments

### Message Input
- Text input
- Emoji picker (optional)
- File attachment button
- Send button

---

## Real-time Updates

### Options
1. **Polling**: Simple, works everywhere
2. **WebSockets**: Real-time, more complex
3. **SSE**: Server-sent events
4. **Pusher/Ably**: Managed real-time service

### Events to Handle
- New message received
- Message read
- Booking status changed
- Typing indicator (optional)

---

## tRPC Procedures

```typescript
// List bookings
const bookings = await trpc.booking.list.query({
  status: 'PENDING',
  limit: 20,
})

// Create booking
await trpc.booking.create.mutate({
  technicianId: 'tech-123',
  title: 'Corporate Event',
  eventDate: new Date('2025-02-15'),
  location: '123 Main St',
  hourlyRate: 75,
  estimatedHours: 8,
})

// Accept/Cancel/Complete
await trpc.booking.accept.mutate({ id: 'booking-1' })
await trpc.booking.cancel.mutate({ id: 'booking-1' })
await trpc.booking.complete.mutate({ id: 'booking-1' })

// Messages
const messages = await trpc.message.list.query({ bookingId: 'booking-1' })
await trpc.message.send.mutate({
  bookingId: 'booking-1',
  content: 'Hello!',
})
```

---

## Implementation

### 1. Create Booking Pages
Reference: `sections/bookings-and-messaging/components/`

### 2. Add Real-time (Optional)
For real-time messaging, integrate WebSockets or polling.

### 3. Handle Notifications
Show toast/notification when booking status changes.

---

## Verify

- [ ] Can create new booking
- [ ] Booking list shows correct data
- [ ] Calendar view displays events
- [ ] Technician can accept/decline
- [ ] Messages send and receive
- [ ] Cancel/complete flows work
- [ ] Notifications trigger

---

*Next: Milestone 7 - Show Proof & XP*

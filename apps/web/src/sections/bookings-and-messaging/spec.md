# Bookings & Messaging Specification

## Overview
The Bookings & Messaging section enables clients to request services through direct bookings or open job postings, manage the full booking lifecycle from offer to payment, and communicate with technicians about specific bookings. Technicians can manage their calendar, track time, and generate invoices while clients can approve contracts, submit deposits, and pay for completed work.

## User Flows

### For Clients

**Creating Bookings**
- Browse technician profiles and initiate a direct booking request
- Post an open booking for multiple technicians to apply to
- Specify service type, dates, duration, location, and budget
- Add detailed requirements and special requests
- Receive applications from interested technicians (for open bookings)

**Managing Booking Offers**
- Review incoming booking offers or applications from technicians
- Compare multiple offers for open bookings
- Accept, decline, or counter-offer with different rates, dates, or durations
- Negotiate terms through counter-offers until agreement is reached

**Booking Lifecycle Management**
- Review and sign service contracts before work begins
- Submit required deposits to confirm bookings
- View upcoming, active, and past bookings in list and calendar views
- Track booking status (pending, confirmed, in-progress, completed, cancelled)
- Cancel bookings and manage cancellation policies

**Communication & Completion**
- Send and receive booking-specific messages with technicians
- Receive notifications when technicians start/stop time tracking
- Review time logs and approve/dispute hours worked
- Receive invoices for completed work
- Submit final payment through the platform

**Calendar & Overview**
- View all bookings in a calendar interface
- Filter bookings by status, technician, or service type
- See booking details and status at a glance
- Manage scheduling conflicts

### For Technicians

**Responding to Bookings**
- Receive notifications for direct booking requests
- Browse and apply to open bookings posted by clients
- Review booking details and client requirements
- Accept, decline, or counter-offer with different rates, dates, or durations
- Negotiate terms until agreement is reached

**Booking Preparation**
- Generate and send service contracts for client approval
- Set deposit requirements and amounts
- Configure cancellation policies
- Prepare for upcoming confirmed bookings

**Work Execution**
- View upcoming, active, and past bookings in list and calendar views
- Start and stop time tracking during service delivery
- Log hours worked with notes and details
- Track billable vs non-billable time
- Communicate with clients about booking-specific matters

**Invoicing & Payment**
- Generate invoices based on tracked time and agreed rates
- Include deposit deductions in final invoices
- Send invoices to clients through the platform
- Track payment status (pending, paid, overdue)
- Manage payment disputes

**Calendar & Overview**
- View all bookings in a calendar interface
- Manage availability and prevent double-bookings
- See booking status and client information
- Track earnings and completed bookings

## UI Requirements

**Bookings List View**
- Tabbed interface showing pending, confirmed, in-progress, completed, and cancelled bookings
- Each booking card displays: client/technician name and avatar, service type, dates, duration, location, rate, status
- Quick actions: view details, message, accept/decline, counter-offer
- Filter by date range, service type, status, or client/technician
- Search by client/technician name or booking reference

**Bookings Calendar View**
- Monthly calendar with bookings displayed as color-coded events
- Color coding by status: pending (yellow), confirmed (blue), in-progress (green), completed (gray), cancelled (red)
- Click on booking to view details or manage
- Day/week/month view toggles
- Visual indicators for conflicts or overlapping bookings
- Sync with external calendars option

**Create Direct Booking Form (Client)**
- Select technician from saved list or search
- Choose service type from technician's offerings
- Date picker with start/end dates
- Duration input (hours or days)
- Location field with autocomplete
- Budget/rate specification
- Description field for detailed requirements
- File upload for reference materials
- Submit to send booking request to technician

**Create Open Booking Form (Client)**
- Similar fields as direct booking
- Mark as "Open Booking" to receive multiple applications
- Option to set application deadline
- Visibility settings (public or invite-only)
- Maximum number of applicants setting

**Booking Detail View**
- Comprehensive overview with all booking information
- Timeline showing booking status progression
- Contract section with view/sign functionality
- Deposit status and payment button
- Time tracking logs with start/stop times and notes
- Invoice section with download and payment options
- Messaging thread specific to this booking
- Counter-offer history showing all negotiations
- Cancellation button with policy information

**Open Booking Applications (Client)**
- List of technicians who applied
- Each application shows: technician profile, proposed rate, availability, cover message
- Compare applicants side-by-side
- Accept one applicant (automatically declines others)
- Message applicants with questions
- Close booking to new applications

**Offer/Counter-Offer Interface**
- Display current offer terms: rate, dates, duration
- Counter-offer form to modify any terms
- Message field to explain counter-offer reasoning
- Visual diff showing what's changing
- Accept/decline buttons for receiving offers
- History of all offers and counter-offers
- Notification when other party responds

**Contract Management**
- Template-based contract generation
- Editable contract fields (terms, scope, deliverables, cancellation policy)
- E-signature interface for both parties
- PDF download of signed contracts
- Contract status: draft, pending signature, signed
- Archive of all contracts per booking

**Deposit & Payment Interface**
- Deposit amount and percentage display
- Payment method selection (stored or new)
- Secure payment processing
- Payment confirmation and receipt
- Deposit deduction shown on final invoice
- Refund information for cancellations
- Payment history and transaction log

**Time Tracking (Technician)**
- Start/stop timer for active bookings
- Manual time entry for past work
- Time log with date, start/end times, duration, and notes
- Edit/delete time entries (before client approval)
- Total hours tracked per booking
- Breakdown by billable/non-billable time
- Export time logs

**Time Review (Client)**
- View all time entries for a booking
- See total hours and cost estimate
- Approve or dispute individual entries
- Add notes to disputed entries
- Notification system for disputes
- Lock approved entries from editing

**Invoice Generation (Technician)**
- Auto-generate invoice from tracked time and agreed rate
- Manual invoice creation option
- Line items for different services or time periods
- Automatic deposit deduction
- Tax and fee calculations
- Custom invoice notes and payment terms
- Preview before sending
- Send invoice directly to client
- Track invoice status (draft, sent, viewed, paid)

**Invoice Management (Client)**
- Receive invoice notifications
- View invoice details and breakdown
- Verify against time logs
- Download PDF invoice
- Pay invoice through platform
- Dispute invoices with messaging
- Payment confirmation and receipt
- Archive of all invoices

**Messaging Panel**
- Booking-specific message threads
- Real-time message delivery
- Message composer with text formatting
- File attachments for sharing documents or images
- Read receipts and typing indicators
- Message search within booking
- Notification badges for unread messages
- Quick replies for common responses

**Booking Status Indicators**
- Visual badges for each status state
- Progress bar showing booking lifecycle stages
- Alerts for action items (contract needs signing, deposit due, invoice pending)
- Countdown timers for upcoming bookings
- Overdue payment warnings

**Mobile Responsive Design**
- Stacked cards for bookings list on mobile
- Simplified calendar view for small screens
- Bottom sheet modals for booking details
- Touch-friendly buttons and forms
- Swipe gestures for quick actions
- Mobile-optimized messaging interface

**Light & Dark Mode**
- Status colors adapt for visibility in both modes
- Calendar events readable in dark mode
- Form inputs with appropriate contrast
- Message bubbles styled for both themes

## Role-Based Views

### Company View
- **Primary actions**: Create bookings, post open bookings, review applications
- **Booking cards show**: Technician info, service details, payment status
- **Calendar focus**: Event scheduling, crew management
- **Financial flow**: Pay deposits, approve time, pay invoices
- **Messaging context**: Communicate with hired technicians

### Technician View
- **Primary actions**: Respond to requests, apply to open bookings, track time
- **Booking cards show**: Client info, service details, earnings
- **Calendar focus**: Availability management, workload
- **Financial flow**: Set rates, track time, generate invoices, receive payments
- **Messaging context**: Communicate with clients about jobs

### Shared UI Components
- Bookings list with role-appropriate card content
- Calendar view (same component, different data emphasis)
- Booking detail view (actions change based on role)
- Messaging panel (identical functionality)
- Offer/counter-offer interface (bidirectional)

## Configuration
- shell: true

# Data Model

## Entities

### User
Base account for all platform users. A user can be a technician, company, client, or admin. Handles authentication, email verification, and account-level settings.

### Technician
An AV professional who offers their services on the platform. Has a public profile with skills, hourly rate, location, tier ranking (Beginner to Pro), XP points, verification status, and insurance information.

### Company
A business that hires technicians for events and projects. Has a company profile, subscription tier (Free, Basic, Pro, Enterprise), and can post jobs and manage bookings.

### Skill
A verified capability that a technician possesses, such as audio mixing, lighting design, video engineering, or rigging. Skills can be verified through certifications, show proof, or portfolio evidence.

### Booking
A job engagement between a company and a technician. Includes event details, agreed rate, dates, status (pending, accepted, completed, cancelled), and payment information.

### Message
A communication sent between users within a conversation thread. Supports text content and file attachments for coordinating bookings and projects.

### ShowProof
Verified evidence of completed work submitted by a technician. Includes photos, console files, videos, or documents. Goes through AI analysis and admin review for verification, awarding XP upon approval.

### Review
Rating and written feedback left by one party about another after a completed booking. Bidirectional — both technicians and companies can review each other.

### Dispute
A formal complaint filed when issues arise during or after a booking. Escalates through admin review and optional arbitration for resolution.

### Notification
System alerts delivered to users for important events like booking requests, messages, XP milestones, review reminders, and lottery eligibility.

### OnboardingTask
A setup task for technicians or companies to complete during onboarding. Tracks completion status (not_started, in_progress, completed, skipped), category (profile, trust, payment, engagement), priority (required, recommended, optional), and links to specific app sections for completion. Awards XP upon completion for technicians.

### AIAssistantConversation
A conversation thread between a user and the AI assistant. Stores messages, context about current app state (current route, user role, onboarding progress), and suggested actions. Persists across sessions for continuity.

### AIAssistantMessage
A single message in an AI assistant conversation. Can be from user or assistant, includes timestamp, may contain suggested action buttons with labels and target routes.

## Relationships

- User has one Technician or Company profile
- Technician has many Skills
- Technician has many ShowProofs
- Technician has many Bookings
- Company has many Bookings
- Booking belongs to both a Technician and a Company
- Booking has many Messages (conversation thread)
- Booking may have one Review from each party
- Booking may have one Dispute
- Review belongs to a Booking and links two Users (reviewer and reviewee)
- Dispute belongs to a Booking and involves two Users
- Notification belongs to a User
- User has one OnboardingProgress (tracking all tasks)
- User has many AIAssistantConversations
- OnboardingTask belongs to a category (profile, trust, payment, engagement)
- AIAssistantConversation has many AIAssistantMessages
- Notification may link to an OnboardingTask

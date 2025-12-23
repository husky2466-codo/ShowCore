# Reviews & Trust Specification

## Overview
The Reviews & Trust section manages the credibility and reputation systems that enable trust between clients and technicians. Reviews are mandatory for technicians to gain XP from completed shows, though technicians can upload show proof for portfolio purposes without client reviews. The system includes optional trust signals (verified ID, insurance, certifications, background check), helpful voting on reviews, dispute resolution processes, and the ability to edit reviews when post-communication provides new perspective.

## User Flows

### Client Flows
- Browse technician profiles and view their reviews, ratings, and trust signals
- After a show completes, receive prompt to leave a review for technicians who worked the show
- Write review including rating (1-5 stars), written feedback, and specific skill ratings
- Submit review which triggers XP award to technician and becomes visible on their profile
- Edit previously submitted reviews if circumstances or understanding changes
- Vote reviews as helpful or not helpful to surface quality feedback
- Respond to technician reviews privately via email (no public responses on platform)
- Initiate dispute process if there's a problem with a show or technician
- Attempt self-resolution with technician through guided conversation prompts
- Request admin mediation if self-resolution fails
- Escalate to formal arbitration if mediation doesn't resolve the issue
- View trust signals on technician profiles (verified ID, insurance, certifications, background check status)

### Technician Flows
- Upload show proof (photos, documents) for portfolio even if client hasn't reviewed yet
- Receive notification when client submits a review
- Gain XP only after client review is submitted (show proof alone doesn't grant XP)
- View own reviews and rating statistics on profile
- Respond to reviews privately through email (initiated from platform, handled via email)
- Vote reviews from other technicians as helpful or not helpful when browsing profiles
- Add optional trust signals to profile to increase credibility
- Upload verified ID for identity verification badge
- Upload proof of insurance for insurance verification badge
- Upload certifications (technical, safety, professional) for certification badges
- Complete background check process with clear disclaimer that it's primarily for high confidential events
- See background check disclaimer: "Background checks are typically only required for high-security or confidential events. Most shows don't require this verification."
- Initiate dispute process if there's a problem with a client or show
- Attempt self-resolution with client through guided conversation prompts
- Request admin mediation if self-resolution fails
- Escalate to formal arbitration if mediation doesn't resolve the issue
- View portfolio of show proof uploads with indication of which shows have reviews vs. which are portfolio-only

### Admin Flows
- Monitor review quality and flag inappropriate reviews
- Mediate disputes when self-resolution fails between parties
- Review dispute details, communications, and evidence from both parties
- Facilitate resolution and communicate decision to both parties
- Manage escalation to formal arbitration when mediation fails
- Verify trust signal documentation (ID, insurance, certifications)
- Approve or reject trust signal submissions
- Monitor background check completion status
- View analytics on review volume, dispute frequency, and trust signal adoption

## UI Requirements

### Technician Profile - Reviews Section
- Overall rating display (average stars out of 5) prominently shown
- Total number of reviews received
- Distribution chart showing count of 1-star, 2-star, 3-star, 4-star, 5-star reviews
- Trust signals displayed as badges (verified ID badge, insured badge, certified badge, background check badge)
- Background check badge shows subtle info icon with disclaimer about typical use cases
- List of reviews sorted by most recent or most helpful
- Each review shows: client name/avatar, date, star rating, written feedback, helpful vote count
- Helpful/not helpful voting buttons on each review (shows vote count)
- Reviews can display "Edited" indicator if review was modified after initial submission
- Filter reviews by rating (all, 5-star, 4-star, etc.)
- Skills breakdown showing average ratings for specific skills mentioned in reviews

### Review Submission Form
- Star rating selector (1-5 stars) with descriptive labels
- Text area for written review (minimum character count guidance)
- Optional skill-specific ratings (punctuality, communication, technical skill, professionalism)
- Character counter showing remaining characters
- Preview of how review will appear
- Submit button with confirmation that review will be public and award XP to technician
- Option to submit anonymously or with name/company visible

### Review Edit Interface
- Access to edit button on own reviews
- Edit form pre-populated with existing review content
- Clear indication that editing will mark review as "Edited"
- Timestamp showing original submission date and last edit date
- Save changes button with confirmation

### Trust Signals Management (Technician)
- Trust signals dashboard showing status of each verification type
- Verified ID section: upload interface for government-issued ID, status indicator (pending/verified/rejected)
- Insurance section: upload interface for insurance certificate, status indicator, expiration date tracking
- Certifications section: upload interface for certification documents, list of approved certifications, status for each
- Background check section: clear disclaimer box at top stating "Background checks are primarily needed for high-security or confidential events. Most shows don't require this verification unless specifically requested by the client."
- Background check initiation button with third-party service integration
- Status tracking for background check process (not started/in progress/completed/expired)
- Visual badges preview showing how badges will appear on profile

### Trust Signals Display (Public Profile)
- Badge row showing earned trust signals
- Each badge clickable to show verification details and date verified
- Background check badge shows verification date and expiration (if applicable)
- Unearned badges shown as greyed out or not displayed (configurable by technician)

### Dispute Resolution Interface
- Dispute initiation form with issue category selection and description
- Stage indicator showing current stage (self-resolution / mediation / arbitration)
- Self-resolution stage: guided conversation interface with suggested prompts and message threading
- Message history between parties with timestamps
- Option to mark dispute as resolved or escalate to mediation
- Mediation stage: admin dashboard showing dispute details, evidence uploads, communication history
- Admin response interface for mediation decisions
- Notification system for status updates and responses
- Arbitration stage: formal submission interface with evidence uploads, statements, and final decision display
- Dispute history view showing all past disputes and their resolutions

### Show Proof Portfolio (Technician)
- Gallery view of uploaded show proof (photos, documents)
- Each show proof entry shows: show name, date, uploaded files, review status
- Clear indicator showing "Review Received - XP Awarded" or "Portfolio Only - No XP"
- Upload interface for adding show proof with drag-and-drop support
- Ability to add show proof even when review hasn't been submitted yet
- Tagging system for organizing portfolio items by skill, equipment type, or event type

### Review Prompts & Notifications
- Client notification after show completion prompting review submission
- Reminder notification if review not submitted after 7 days
- Technician notification when review is received
- Technician notification when review is edited
- Email notification when response is received (since responses are private via email)
- Dispute status change notifications for both parties

### Helpful Voting System
- Helpful/not helpful buttons on each review
- Vote count display showing net helpful votes
- User can change vote or remove vote
- Indication of whether current user has voted on each review
- Sorting option to show most helpful reviews first

### Review Statistics Dashboard (Technician)
- Overview of rating trends over time (graph)
- Average rating by skill category
- Response rate to reviews
- Helpful vote statistics on received reviews
- Review count by star rating
- Recent reviews feed

## Role-Based Views

### Technician View
- View reviews received from companies
- Leave reviews for companies they worked with
- See their overall rating and review stats
- Respond to reviews
- Manage verification badges (insurance, certifications)
- File disputes for unfair reviews

### Company View
- View reviews received from technicians
- Leave reviews for technicians they hired
- See their company rating and review stats
- Respond to reviews
- View technician verification status
- File disputes for unfair reviews

### Shared Features
- Bidirectional review system (both can review each other)
- Same review form structure
- Same dispute resolution process
- Trust scores visible to both parties

## Configuration
- shell: true

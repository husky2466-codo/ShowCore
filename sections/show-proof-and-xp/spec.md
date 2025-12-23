# Show Proof & XP Specification

## Overview
Technicians upload show proofs (photos, documentation) to build their portfolio and earn XP towards tier progression. The system includes privacy controls, client verification for bonus XP, and a lottery system that gives newer technicians visibility boosts. XP is earned through verified shows, quality ratings, and milestone achievements, with four progression tiers from Beginner to Pro.

## User Flows

### Technician Flows
- Upload show proof with photos and documentation
- Set privacy level (public/private/clients-only) for each show proof
- View AI analysis results on uploaded show proofs
- Track XP progress and current tier status
- View XP breakdown (base XP, bonuses, milestones)
- See lottery tickets earned and upcoming draw date
- View tier requirements and progress to next tier
- Review show proof history with XP earned per show
- See visibility boost status when lottery is won

### Client Flows
- View technician's show proofs (respecting privacy settings)
- Verify/endorse completed show proofs
- Award star ratings (1-5★) for completed shows

### System Flows
- Award 30 XP base for verified show
- Award +10 XP bonus for 4-5★ review
- Award +20 XP bonus for complex/large show
- Award +10 XP bonus for first show with new company
- Calculate tier based on total XP (Beginner 0-999, Experienced 1000-2999, Advanced 3000-5999, Pro 6000+)
- Award lottery tickets (Complete show: 1, 5★ review: 2, Refer technician: 3, Complete mentorship: 2)
- Conduct weekly lottery draws from ticket pool
- Apply 7-day visibility boost to lottery winners
- Display "Featured Newcomer" badge on winner profiles

## UI Requirements

### Show Proof Upload
- Photo upload interface with multiple image support
- Documentation/notes text field
- Privacy level selector (public/private/clients-only)
- Show details (venue, date, role, complexity indicator)
- Submit button with confirmation

### Show Proof Detail View
- Photo gallery/carousel
- Show information (venue, date, role)
- Privacy status indicator
- AI analysis results section (when available)
- Verification status (pending/verified by client)
- Star rating display (when rated)
- XP awarded breakdown
- Edit/delete options for technician

### XP Dashboard
- Current XP total with visual progress bar
- Current tier badge with name
- Progress to next tier (XP needed)
- Tier system reference (all four tiers with XP ranges)
- Recent XP activity feed
- XP breakdown by source (verified shows, bonuses, milestones)

### Lottery System
- Current ticket count
- Next draw countdown/date
- Ticket earning opportunities list
- How tickets were earned (activity log)
- Lottery rules explanation
- Winner announcement (when active)
- Visibility boost status (when won)
- "Featured Newcomer" badge display

### Portfolio Gallery
- Grid/list view of show proofs
- Filter by privacy level
- Sort by date, XP earned, rating
- Show verification status indicators
- Quick stats (total shows, total XP, average rating)

### Client Verification Interface
- List of shows pending verification
- Show proof detail view
- Verify/endorse button
- Star rating selector (1-5★)
- Optional feedback text field
- Submit verification

## Role-Based Views

### Technician View (Primary)
- Full access to all features
- Upload and manage show proofs
- Track XP progress and tier status
- View lottery tickets and participate in draws
- Build portfolio for client discovery

### Company View (Limited)
- View technician show proofs (respecting privacy settings)
- Verify/endorse shows they booked the technician for
- Award star ratings for completed work
- Cannot upload show proofs or earn XP
- No access to lottery system

### Navigation Visibility
- **Technicians**: Show Proof & XP appears in main navigation
- **Companies**: Section hidden from main nav; verification accessed via booking completion flow or technician profile

## Configuration
- shell: true

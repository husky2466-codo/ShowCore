# Dashboard Section Specification

## Overview
The Dashboard is the first page users see after login. It provides a personalized overview of their account status, prominent onboarding checklist for new users, quick stats, recent activity, and AI-powered recommendations.

## User Flows

### 1. View Dashboard (All Users)
- User logs in and lands on Dashboard
- Sees personalized welcome banner with name and time-based greeting
- Views quick stats relevant to their role
- Sees recent activity feed

### 2. Complete Onboarding Tasks (New Users)
- User sees prominent onboarding checklist card
- Views progress bar showing completion percentage
- Clicks on task to navigate to relevant section
- Task status updates when completed
- Can dismiss checklist after completing required tasks

### 3. Get AI Recommendations
- User sees AI suggestion cards based on context
- Clicks suggestion to navigate to recommended action
- Can dismiss individual suggestions
- Suggestions update based on activity and progress

## UI Requirements

### Dashboard Layout
- Full-width welcome banner at top
- Two-column grid on desktop (left: checklist + stats, right: activity)
- Single column on mobile with stacked widgets
- AI Assistant widget always visible (bottom-right, part of shell)

### Onboarding Checklist Card
- Prominent placement in left column
- Progress bar with percentage (e.g., "4 of 11 complete - 36%")
- Tasks grouped by category (Profile, Trust, Payment, Engagement)
- Each task shows: icon, title, status badge, XP reward (technicians), action button
- "Dismiss" option after required tasks complete

### Quick Stats Card
- Role-specific metrics in compact grid
- Technicians: Current tier, XP progress, active bookings, pending proofs, unread messages
- Companies: Active bookings, pending reviews, unread messages, technicians hired

### Recent Activity Feed
- Chronological list of recent events
- Each item: icon, title, description, timestamp
- Click to navigate to related item
- Shows last 10 items with "View all" link

### Welcome Banner
- Time-based greeting ("Good morning/afternoon/evening")
- User's name and avatar
- Summary message ("You're 36% set up" or "All caught up!")

## Role-Based Views

### Technician View
- XP and tier progress in stats
- Show proof related activity
- Onboarding tasks include insurance, skill verification, payout setup

### Company View
- Booking and hiring stats
- Review-related activity
- Onboarding tasks include payment method, team invites

## Responsive Behavior
- Desktop (1024px+): Two-column layout
- Tablet (768px-1023px): Two-column with narrower columns
- Mobile (<768px): Single column, stacked widgets

## Design Tokens Applied
- Primary (amber): Progress bar fill, action buttons, XP badges
- Secondary (yellow): Highlights, hover states
- Neutral (zinc): Card backgrounds, text, borders
- Success (green): Completed task indicators
- Typography: DM Sans for all text

## Navigation
- Dashboard is the default landing page after login
- Accessible via Home icon in main navigation
- Route: /

## Configuration
- shell: true

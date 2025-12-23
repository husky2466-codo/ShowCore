# Technician Discovery Specification

## Overview
The Technician Discovery section allows companies and clients to search, filter, and browse AV technician profiles. Users can find technicians using full-text search, advanced filters, and location-based radius search, with results ranked by a transparent algorithm that considers tier, verification status, reviews, and proximity.

## User Flows
- Search for technicians by keyword (name, skills, bio)
- Filter results by skill, tier (Beginner/Experienced/Advanced/Pro), location radius, hourly rate range, verification status, and insurance status
- Browse paginated search results as cards
- View ranking score breakdown for transparency
- Click a technician card to view their full profile
- Save/bookmark technicians for later (if subscribed)

## UI Requirements
- Search bar with keyword input at top
- FilterPanel with collapsible filter groups (skills multi-select, tier checkboxes, location with radius slider, rate range slider, verification/insurance toggles)
- TechnicianCard grid showing: avatar, name, randomized ID, tier badge, skills tags, hourly rate, location, verification badge, insurance badge, average rating with review count, distance from search location
- Pagination controls at bottom
- Empty state when no results match filters
- Loading skeleton during search
- Mobile-responsive layout (stacked filters on mobile)

## Role-Based Views

### Company View (Primary)
- Full search and filter functionality
- "Request Booking" button on technician cards and profiles
- Save/bookmark technicians to shortlists
- View technician availability calendars
- Compare multiple technicians side-by-side

### Technician View (Secondary)
- Can browse other technicians for networking
- "Connect" or "Message" button instead of "Request Booking"
- See how their own profile appears in search results (preview mode)
- No booking functionality when viewing other technicians
- May see limited results based on subscription tier

## Configuration
- shell: true

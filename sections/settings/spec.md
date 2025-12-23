# Settings Specification

## Overview
The Settings section provides comprehensive account management for both technicians and companies. Users can manage their profile information, notification preferences, payment settings, security options, privacy controls, and overall account configuration. Settings are organized into logical groups with role-specific options for technicians (payout methods, availability) and companies (billing, team management).

## User Flows
- View and edit profile information (name, bio, contact details, photo/logo)
- Update skills, rates, and professional details (technicians)
- Manage company information and hiring needs (companies)
- Change password and update security settings
- Configure notification preferences (email, push, SMS) by category
- Set up and manage payout methods: bank account, PayPal (technicians)
- Configure billing information and view invoices (companies)
- Link and unlink OAuth accounts (Google, Apple, Microsoft Exchange)
- Manage connected third-party integrations
- Adjust privacy settings (profile visibility, contact preferences)
- Set appearance preferences (light/dark mode, accessibility options)
- Configure availability calendar settings (technicians)
- Manage team members and permissions (companies)
- View active sessions and revoke device access
- Request account data export (GDPR compliance)
- Deactivate or delete account

## UI Requirements
- Sidebar navigation with grouped settings categories
- Profile section with avatar/logo upload, editable fields, and preview
- Security section with password change form and active sessions list
- Notifications section with grouped toggle switches (bookings, messages, marketing, etc.)
- Payment section with saved methods, add/edit/remove controls
- Privacy section with visibility toggles and data management options
- Appearance section with theme selector (light/dark/system)
- Connected accounts section showing linked OAuth providers with add/remove buttons
- Danger zone section for account deactivation/deletion with confirmation modals
- Success/error toast notifications for all save actions
- Auto-save indicator or explicit "Save Changes" buttons per section
- Mobile-responsive layout (sidebar collapses to top navigation on small screens)
- Loading skeletons while fetching settings data
- Validation feedback on required fields

## Role-Based Views

### Technician Settings
- Profile management: name, bio, skills (multi-select), hourly rate range, location, portfolio links, profile photo
- Payout methods section: bank account (routing/account numbers), PayPal email, set default method
- Availability calendar settings: default working hours, time zone, blackout dates
- Skills & certifications: add/remove verified skills, upload certification documents
- Insurance information: upload/update insurance verification documents
- Tier display: current tier (Beginner/Experienced/Advanced/Pro), XP progress bar (read-only)
- No billing/invoices section
- Profile visibility toggle: public (searchable) or private (bookings only)

### Company Settings
- Company profile: company name, industry, logo, website, location, hiring needs description
- Billing & invoices section: payment method for subscription, view/download past invoices, update billing address
- Team management (if applicable): invite members, assign roles/permissions, remove access
- Subscription tier display: current plan (Free/Basic/Pro/Enterprise), upgrade/downgrade options
- No payout methods section
- Technician shortlists preferences: default booking request templates
- Profile visibility: always public (for discovery by technicians)

### Shared Settings (Both Roles)
- Security: change password, enable/disable two-factor authentication, view active sessions
- Notifications: email preferences (bookings, messages, reviews, system updates), push notification toggles, SMS alerts
- Connected accounts: manage OAuth providers (Google, Apple, Microsoft Exchange)
- Privacy: email visibility, phone visibility, data sharing preferences, marketing communications opt-in/out
- Appearance: light/dark/system theme, font size, reduced motion
- Account management: export account data, deactivate account, delete account

## Data Requirements
- User profile data: name, email, phone, bio, location, photo/logo URL
- Role-specific data: skills array, rates, company details
- Security data: password hash (change only), OAuth provider IDs, active sessions (device, location, last active)
- Notification preferences: boolean flags per notification category
- Payment data: encrypted payout methods (technicians), billing info (companies)
- Privacy settings: visibility toggles, consent flags
- Appearance preferences: theme selection, accessibility options
- Account status: active, deactivated, deletion scheduled

## Configuration
- shell: true

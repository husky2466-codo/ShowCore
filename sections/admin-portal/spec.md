# Admin Portal Specification

## Overview
The Admin Portal is an internal platform administration dashboard for managing the ShowCore marketplace. It provides comprehensive tools for platform administrators to oversee user accounts, resolve disputes, verify credentials, moderate content, monitor platform health, and maintain overall system integrity. This is a separate administrative interface, distinct from the user-facing application, with role-based access control for different admin responsibilities.

## User Flows
- View dashboard with key metrics, alerts, and recent activity summary
- Search and filter users (technicians and companies) with advanced criteria
- View detailed user profiles including booking history, reviews, earnings/spending, and account status
- Suspend or unsuspend user accounts with reason logging
- Review and verify technician credentials, certifications, and insurance documents
- Manage dispute cases: view details, communicate with involved parties, review evidence, make resolutions
- Moderate flagged content: review reported profiles, inappropriate reviews, and user complaints
- View platform analytics: user growth trends, booking statistics, revenue metrics, engagement rates
- Monitor system health: error logs, performance metrics, uptime status, API health
- Create and broadcast platform-wide announcements or targeted notifications
- Generate and export reports (user activity, financial summaries, dispute trends)
- Manage admin accounts and permissions
- Review audit logs of admin actions
- Configure platform settings and feature flags
- Handle refund requests and payment disputes
- Manage featured listings and promotional content

## UI Requirements
- Data-dense dashboard layout with metric cards, charts, and activity feeds
- Advanced search with filters (role, status, date range, location, tier/plan)
- Sortable, filterable data tables with pagination and bulk selection
- Quick action buttons and dropdown menus for common tasks
- Status indicators and badges (verified, suspended, pending, resolved, flagged)
- Inline editing capabilities for certain fields
- Modal dialogs for detailed views and confirmation prompts
- Tabbed interfaces for organizing complex information (user details, dispute history)
- Charts and graphs for analytics visualization (line charts, bar graphs, pie charts)
- Real-time notifications for urgent admin alerts (new disputes, high-priority flags)
- Contextual help tooltips for admin-specific terminology
- Breadcrumb navigation for multi-level views
- Export buttons for downloading data as CSV/PDF
- Activity timeline for tracking user actions and admin interventions
- Color-coded severity levels (info, warning, critical) for alerts
- Responsive layout optimized for desktop use (minimal mobile optimization needed)
- Loading states and empty states for all data views
- Bulk action controls (select all, bulk suspend, bulk verify)
- Search with autocomplete and recent searches

## Admin Roles

### Super Admin
- Full platform access and control
- Manage admin accounts and assign roles
- Configure platform settings and feature flags
- Access all user data and admin tools
- Perform irreversible actions (account deletion, data purges)
- View complete audit logs
- Manage payment and billing configurations

### Support Admin
- User account management (view, suspend, unsuspend)
- Dispute resolution and mediation
- Credential verification
- Refund processing
- View user data and communication history
- Cannot modify platform settings or admin accounts
- Limited to reversible actions with proper logging

### Content Moderator
- Review and moderate flagged content
- Manage reported reviews and profiles
- Handle user complaints
- Issue warnings or temporary restrictions
- Cannot access financial data or perform account suspensions
- Focus on content quality and community guidelines enforcement

### Analytics Viewer (Read-Only)
- View platform analytics and reports
- Export data for analysis
- Monitor system health metrics
- Cannot modify any user data or settings
- Used for stakeholder reporting and business intelligence

## Data Requirements

### User Management Data
- User profiles: ID, name, email, phone, role (technician/company), registration date, last active
- Account status: active, suspended, deactivated, deleted, pending verification
- Verification status: email verified, phone verified, credentials verified, insurance verified
- Financial data: total earnings (technicians), total spending (companies), pending payouts, transaction history
- Activity metrics: total bookings, completion rate, cancellation rate, response time
- Reviews and ratings: average rating, total reviews received/given, flagged reviews
- Suspension history: suspension count, reasons, duration, admin notes

### Dispute Data
- Dispute ID, creation date, status (open, in progress, resolved, escalated)
- Involved parties: technician, company, booking reference
- Dispute type: payment issue, no-show, quality complaint, breach of terms
- Evidence: messages, photos, booking details, payment records
- Admin notes and actions taken
- Resolution details: outcome, refund amount, penalties applied
- Communication thread between parties and admin

### Content Moderation Data
- Flagged items: type (review, profile, message), reporter, reported user, reason, timestamp
- Moderation status: pending review, under investigation, resolved, dismissed
- Content details: original content, context, user history
- Moderator actions: warning issued, content removed, account restricted
- Appeal status and resolution

### Platform Analytics Data
- User growth: new registrations, active users, churn rate (daily/weekly/monthly)
- Booking metrics: total bookings, completed bookings, cancellation rate, average booking value
- Revenue metrics: GMV (gross merchandise value), platform fees collected, payout volume
- Engagement metrics: messages sent, profile views, search activity, review submission rate
- Geographical distribution: users by location, bookings by region
- Tier/plan distribution: technician tiers, company subscription plans
- Conversion funnels: signup to booking, discovery to hire

### System Health Data
- Error logs: timestamp, severity, error type, affected users, stack trace
- Performance metrics: API response times, page load times, database query performance
- Uptime status: service availability, scheduled maintenance, incident history
- Resource utilization: server load, database connections, storage usage
- Integration health: third-party API status (payment processors, email services, SMS providers)

### Audit Log Data
- Admin action logs: admin user, action type, timestamp, affected resource, before/after values
- Login history: admin logins, failed attempts, IP addresses
- Permission changes: role modifications, access grants/revokes
- Data exports: who exported what data, when, for what purpose

## Configuration
- shell: false

## Admin Portal Navigation Structure
Since this is a standalone admin interface (shell: false), it has its own navigation:

### Primary Navigation
- Dashboard (home/overview)
- Users (technicians and companies)
- Disputes
- Moderation
- Analytics
- System Health
- Settings (platform configuration)
- Admin Management (for Super Admins only)

### Secondary Features
- Global search (users, bookings, disputes)
- Notification center (admin alerts)
- Quick actions menu
- Profile/logout dropdown

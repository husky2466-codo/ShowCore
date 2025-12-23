# Authentication Specification

## Overview
Authentication provides login, registration, and account recovery flows for both technicians and companies. Users can authenticate via email/password, magic link, or OAuth providers (Google, Apple, Microsoft Exchange). New users complete a unified registration with role selection, followed by email verification and profile completion before accessing the platform.

## User Flows
- Login with email/password
- Login with magic link (passwordless email)
- Login with OAuth (Google, Apple, Microsoft Exchange)
- Register new account with role selection (Technician or Company)
- Email verification flow
- Profile completion onboarding (required before full access)
- Password reset/recovery
- Logout

## UI Requirements
- Login page with email/password form, magic link option, and OAuth buttons
- Registration page with email, password, role selector, and OAuth options
- Email verification pending screen with resend option
- Magic link sent confirmation screen
- Password reset request form
- Password reset form (from email link)
- Profile completion wizard (role-specific fields)
- Error states for invalid credentials, expired links, etc.
- Loading states during authentication
- Mobile-responsive centered card layout

## Role-Based Views

### Technician Registration
- Profile completion includes: name, skills, location, hourly rate range, bio
- Optional: profile photo, portfolio links

### Company Registration
- Profile completion includes: company name, industry, location, typical hiring needs
- Optional: company logo, website

### Shared
- Same login flow for both roles
- Same password recovery flow
- Role stored in account, determines post-login experience

## Configuration
- shell: false

# Milestone 10: Settings

User preferences, account management, and configuration.

---

## Settings Layout

### Navigation Tabs
- Profile
- Account
- Notifications
- Privacy
- Payments
- Connected Accounts
- Appearance

---

## Profile Settings

### Personal Info
- Display name
- Bio/About
- Location
- Phone number
- Profile photo upload

### Technician-Specific
- Skills management
- Hourly rate
- Availability calendar
- Portfolio links
- Resume/CV upload

### Company-Specific
- Company name
- Industry
- Company size
- Logo upload
- Website URL

---

## Account Settings

### Email
- Primary email
- Change email flow
- Email verification

### Password
- Change password
- Require current password
- Strength requirements

### Two-Factor Auth
- Enable/disable 2FA
- SMS or authenticator app
- Backup codes

### Account Actions
- Deactivate account
- Delete account (with confirmation)
- Download data

---

## Notification Settings

### Email Notifications
- Booking requests
- Messages
- Reviews received
- XP milestones
- Lottery results
- Marketing emails

### Push Notifications
- Enable/disable all
- Per-category toggles
- Quiet hours

### Digest Settings
- Immediate vs daily digest
- Weekly summary
- Time zone

---

## Privacy Settings

### Profile Visibility
- Public profile
- Searchable
- Show on leaderboards

### Data Sharing
- Analytics participation
- Marketing use

### Blocking
- Blocked users list
- Unblock action

---

## Payment Settings

### For Technicians (Payout)
- Payout method (bank, PayPal)
- Bank account details
- Payout schedule
- Transaction history
- Tax forms (1099)

### For Companies (Billing)
- Payment method
- Saved cards
- Billing address
- Invoice history
- Subscription management

---

## Connected Accounts

### Social Logins
- Google (connect/disconnect)
- LinkedIn (connect/disconnect)
- Facebook (connect/disconnect)

### Integrations
- Calendar sync (Google/Outlook)
- Portfolio links (LinkedIn, Behance)

---

## Appearance Settings

### Theme
- Light mode
- Dark mode
- System preference

### Display
- Compact mode
- Language selection
- Date/time format

---

## Implementation

### 1. Create Settings Pages
Reference: `sections/settings/components/`

### 2. Settings Layout
Tabbed interface with sidebar navigation.

### 3. Form Handling
React Hook Form with validation.

---

## tRPC Procedures

```typescript
// Get current user
const user = await trpc.user.me.query()

// Update user
await trpc.user.update.mutate({
  email: 'new@email.com',
})

// Update technician profile
await trpc.technician.update.mutate({
  displayName: 'John Tech',
  bio: 'Updated bio...',
  hourlyRate: 85,
})

// Update company profile
await trpc.company.update.mutate({
  name: 'ACME Corp',
  industry: 'Entertainment',
})
```

---

## Verify

- [ ] Profile changes save correctly
- [ ] Password change works
- [ ] 2FA setup flows
- [ ] Notification preferences persist
- [ ] Payment methods can be added
- [ ] Theme toggle works
- [ ] Account deletion flow

---

*Next: Milestone 11 - Admin Portal*

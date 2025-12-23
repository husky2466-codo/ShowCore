# Milestone 2: Application Shell

Create the main navigation and layout components.

---

## Layout Structure

```
┌─────────────────────────────────────────┐
│  Header (Logo, Search, User Menu)       │
├─────────┬───────────────────────────────┤
│         │                               │
│  Side   │     Main Content Area         │
│  Nav    │                               │
│         │                               │
│         │                               │
├─────────┴───────────────────────────────┤
│  AI Assistant Widget (floating)         │
└─────────────────────────────────────────┘
```

---

## Components

### AppShell.tsx
Main layout wrapper with header, sidebar, and content area.

**Props:**
- `children` - Page content

**Features:**
- Responsive sidebar (collapsible on mobile)
- Header with logo and user menu
- Dark mode support

### MainNav.tsx
Navigation menu with links and icons.

**Navigation Items:**
- Dashboard (home icon)
- Discover (search icon)
- Bookings (calendar icon)
- Messages (message-square icon)
- Show Proof (camera icon)
- Analytics (bar-chart icon)
- Settings (settings icon)

**Features:**
- Active state highlighting
- Collapsed mode for mobile
- Badge counts for notifications

### UserMenu.tsx
Avatar dropdown with user options.

**Menu Items:**
- Profile
- Settings
- Switch Role (if applicable)
- Sign Out

### AIAssistantWidget.tsx
Floating chat widget for AI assistance.

**Features:**
- Collapsible panel
- Message history
- Quick action buttons
- Contextual suggestions

---

## Implementation

### 1. Create Shell Components
Reference: `shell/components/`

### 2. Set Up Router
```typescript
// src/App.tsx
<BrowserRouter>
  <AppShell>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/bookings" element={<Bookings />} />
      {/* ... */}
    </Routes>
  </AppShell>
</BrowserRouter>
```

### 3. Add Auth Context
```typescript
// src/context/AuthContext.tsx
// Provides current user to all components
```

---

## Styling

### Colors
- Primary: `amber-500`
- Secondary: `yellow-400`
- Neutral: `zinc-*`
- Dark mode: `dark:bg-zinc-900`

### Typography
- Headings: `font-sans` (DM Sans)
- Body: `font-sans` (DM Sans)
- Code: `font-mono` (IBM Plex Mono)

---

## Verify

- [ ] Shell renders with header and sidebar
- [ ] Navigation links work
- [ ] User menu shows and hides
- [ ] Mobile responsive layout
- [ ] Dark mode toggle works
- [ ] AI widget opens/closes

---

*Next: Milestone 3 - Authentication*

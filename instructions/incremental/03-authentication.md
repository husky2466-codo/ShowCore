# Milestone 3: Authentication

Implement login, registration, and account flows.

---

## Screens

| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | Login | Email/password sign in |
| `/register` | Register | Account creation |
| `/forgot-password` | PasswordResetRequest | Request reset email |
| `/reset-password` | PasswordReset | Set new password |
| `/verify-email` | EmailVerification | Confirm email |
| `/complete-profile` | ProfileCompletion | Role selection, details |

---

## Login Flow

### Components
- Email input with validation
- Password input with show/hide toggle
- Remember me checkbox
- Forgot password link
- Social login buttons (optional)

### Validation
- Email: valid format required
- Password: minimum length check

### Error States
- Invalid credentials
- Account locked
- Unverified email

---

## Registration Flow

### Steps
1. Email and password
2. Role selection (Technician or Company)
3. Basic profile info
4. Email verification

### Validation
- Email: unique, valid format
- Password: min 8 chars, strength indicator
- Terms acceptance required

---

## Password Reset

### Request Flow
1. Enter email
2. Receive reset link
3. Click link (verify token)
4. Set new password
5. Redirect to login

### Components
- PasswordResetRequest - email input
- PasswordReset - new password form

---

## Email Verification

### Flow
1. User registers
2. Verification email sent
3. User clicks link
4. Token validated
5. Account activated

### States
- Pending verification
- Verification success
- Token expired
- Resend option

---

## Profile Completion

After registration, collect:

### Technician
- Display name
- Bio
- Location
- Skills (multi-select)
- Hourly rate

### Company
- Company name
- Industry
- Size
- Location
- Logo upload

---

## tRPC Procedures

```typescript
// Already created in backend
trpc.user.me.query()
trpc.user.update.mutate({ ... })
```

---

## Implementation

### 1. Create Auth Pages
Reference: `sections/authentication/components/`

### 2. Add Protected Routes
```typescript
// ProtectedRoute wrapper
if (!user) return <Navigate to="/login" />
```

### 3. Implement Auth Context
```typescript
// useAuth hook
const { user, login, logout, isLoading } = useAuth()
```

---

## Verify

- [ ] Login works with valid credentials
- [ ] Registration creates new account
- [ ] Password reset flow complete
- [ ] Email verification works
- [ ] Profile completion saves data
- [ ] Protected routes redirect

---

*Next: Milestone 4 - Dashboard & Onboarding*

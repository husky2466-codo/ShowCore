# Milestone 7: Show Proof & XP

Upload show proofs, earn XP, and progress through tiers.

---

## Show Proof Upload

### Upload Form
- **Title**: Event/show name
- **Proof Type**: Photo, Video, Document
- **Media Files**: Multiple file upload (max 10)
- **Description**: What happened, your role
- **Skills Demonstrated**: Multi-select skills
- **Event Date**: When the event occurred

### Validation
- At least 1 media file required
- Max 10 files per proof
- Supported formats: jpg, png, mp4, pdf
- Max file size: 50MB per file

### Submission
- Preview before submit
- Submit for verification
- Status: PENDING

---

## Verification Flow

### Status Progression
1. **PENDING** - Submitted, awaiting review
2. **APPROVED** - Verified, XP awarded
3. **REJECTED** - Not approved, with notes

### Admin Review (see Admin Portal)
- View submitted proof
- Check AI analysis (if enabled)
- Approve or reject
- Add review notes
- Award XP amount

---

## XP System

### Tier Progression
| Tier | XP Required | Badge Color |
|------|-------------|-------------|
| BEGINNER | 0 | Gray |
| EXPERIENCED | 500 | Blue |
| ADVANCED | 2000 | Purple |
| PRO | 5000 | Gold |

### XP Sources
- Show proof approval: 50-200 XP
- Completed booking: 100 XP
- Positive review received: 25 XP
- Profile completion: 50 XP
- Skill verification: 30 XP

### XP Dashboard
- Current XP total
- Current tier with badge
- Progress bar to next tier
- XP history log
- Milestone rewards

---

## Show Proof Gallery

### My Proofs
- List of submitted proofs
- Filter by status
- Sort by date
- Delete/edit pending proofs

### Public Gallery
- Approved proofs only
- Filter by skill
- Filter by technician
- Infinite scroll

### ShowProofCard
- Thumbnail preview
- Title and date
- Skills demonstrated
- XP earned badge
- Status indicator

### ShowProofDetail
- Full media viewer
- Description
- Skills list
- Approval date
- XP awarded

---

## Lottery System

### Eligibility
- Minimum tier (EXPERIENCED+)
- Active in last 30 days
- No pending disputes
- Profile complete

### Entry
- Automatic entry if eligible
- Manual opt-in option
- View entry status

### Drawings
- Weekly/monthly schedule
- Random winner selection
- Notification of win
- Prize details

---

## tRPC Procedures

```typescript
// Create show proof
await trpc.showProof.create.mutate({
  title: 'Corporate Gala AV Setup',
  proofType: 'PHOTO',
  mediaUrls: ['https://...', 'https://...'],
  description: 'Full AV setup for 500-person event',
  skillIds: ['skill-1', 'skill-2'],
  eventDate: new Date('2025-01-15'),
})

// List my proofs
const myProofs = await trpc.showProof.myList.query({
  status: 'APPROVED',
  limit: 20,
})

// Public gallery
const gallery = await trpc.showProof.list.query({
  skillId: 'skill-audio',
  limit: 20,
})
```

---

## Implementation

### 1. Create Show Proof Pages
Reference: `sections/show-proof-and-xp/components/`

### 2. File Upload
Use Cloudflare R2, AWS S3, or Uploadthing for file storage.

### 3. XP Calculations
Server-side XP awarding on proof approval.

---

## Verify

- [ ] Can upload multi-file proof
- [ ] Proof list shows correct statuses
- [ ] XP dashboard shows current tier
- [ ] Progress bar calculates correctly
- [ ] Approved proofs appear in gallery
- [ ] Lottery eligibility displays

---

*Next: Milestone 8 - Reviews & Trust*

# Milestone 5: Technician Discovery

Search, filter, and browse technician profiles.

---

## Search Interface

### Search Bar
- Text search (name, skills, bio)
- Debounced input
- Recent searches
- Search suggestions

### Filter Panel
- **Location**: City/region with radius
- **Tier**: Beginner, Experienced, Advanced, Pro
- **Skills**: Multi-select from skill list
- **Rate Range**: Min/max hourly rate
- **Availability**: Date range picker
- **Rating**: Minimum rating

### Sort Options
- Relevance (default)
- Rating (high to low)
- Rate (low to high / high to low)
- Distance (nearest first)
- Experience (most XP)

---

## Results Display

### TechnicianCard
Grid/list card for search results.

**Content:**
- Avatar image
- Display name
- Tier badge (color-coded)
- Location
- Verified skills (top 3)
- Hourly rate
- Rating (stars + count)
- Quick actions (View, Contact)

### Pagination
- Infinite scroll OR page numbers
- Show result count
- Loading skeletons

### Empty State
- "No technicians found"
- Suggestions to adjust filters
- Clear filters button

---

## Technician Profile

### Profile Header
- Large avatar
- Name and tier
- Location
- Verified badges (insurance, skills)
- Contact button
- Favorite/save button

### Bio Section
- About text
- Years of experience
- Languages spoken

### Skills Gallery
- Skill cards with verification status
- Proficiency level (if applicable)
- Show proof count per skill

### Portfolio
- Show proof gallery
- Photo/video thumbnails
- View details modal

### Reviews Section
- Average rating breakdown
- Recent reviews
- Pagination
- Response rate indicator

### Booking CTA
- Prominent "Request Booking" button
- Availability indicator
- Starting rate display

---

## tRPC Procedures

```typescript
// Search technicians
const technicians = await trpc.technician.list.query({
  search: 'audio engineer',
  location: 'Los Angeles',
  tiers: ['ADVANCED', 'PRO'],
  skillIds: ['skill-1', 'skill-2'],
  minRate: 50,
  maxRate: 150,
  limit: 20,
  cursor: nextCursor,
})

// Get technician detail
const technician = await trpc.technician.getById.query({
  id: 'tech-123'
})

// Get available skills
const skills = await trpc.skill.list.query()
```

---

## Implementation

### 1. Create Discovery Page
Reference: `sections/technician-discovery/components/`

### 2. Add URL State
Sync filters with URL for shareable links:
```
/discover?tier=PRO&skill=audio&minRate=75
```

### 3. Implement Infinite Scroll
```typescript
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(...)
```

---

## Verify

- [ ] Search returns relevant results
- [ ] All filters work correctly
- [ ] Sorting works
- [ ] Profile page shows all sections
- [ ] Skill verification badges display
- [ ] Reviews load and paginate
- [ ] Mobile layout is responsive

---

*Next: Milestone 6 - Bookings & Messaging*

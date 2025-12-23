// =============================================================================
// Data Types
// =============================================================================

export type TechnicianTier = 'Beginner' | 'Experienced' | 'Advanced' | 'Pro'

export type VerificationStatus = 'unverified' | 'verified' | 'expired'

export type InsuranceStatus = 'none' | 'verified' | 'expired'

export interface Skill {
  name: string
  verified: boolean
}

export interface Location {
  city: string
  state: string
  distance: number
}

export interface Technician {
  id: string
  randomizedId: string
  name: string
  avatarUrl: string | null
  bio: string
  tier: TechnicianTier
  xp: number
  hourlyRate: number
  location: Location
  skills: Skill[]
  verificationStatus: VerificationStatus
  insuranceStatus: InsuranceStatus
  averageRating: number
  reviewCount: number
  rankingScore: number
  isBookmarked: boolean
}

export interface Filters {
  availableSkills: string[]
  tiers: TechnicianTier[]
  rateRange: { min: number; max: number }
  radiusOptions: number[]
}

export interface SearchState {
  query: string
  selectedSkills: string[]
  selectedTiers: TechnicianTier[]
  locationZip: string
  radius: number
  rateMin: number
  rateMax: number
  verifiedOnly: boolean
  insuredOnly: boolean
  page: number
  totalResults: number
  totalPages: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface TechnicianDiscoveryProps {
  /** List of technicians to display in search results */
  technicians: Technician[]
  /** Available filter options */
  filters: Filters
  /** Current search/filter state */
  searchState: SearchState
  /** Whether search is currently loading */
  isLoading?: boolean
  /** Called when user submits a search query */
  onSearch?: (query: string) => void
  /** Called when user changes filter values */
  onFilterChange?: (filters: Partial<SearchState>) => void
  /** Called when user clears all filters */
  onClearFilters?: () => void
  /** Called when user clicks a technician card to view profile */
  onViewProfile?: (id: string) => void
  /** Called when user bookmarks/unbookmarks a technician */
  onToggleBookmark?: (id: string) => void
  /** Called when user clicks to view ranking breakdown */
  onViewRanking?: (id: string) => void
  /** Called when user changes page */
  onPageChange?: (page: number) => void
}

export interface TechnicianCardProps {
  /** The technician data to display */
  technician: Technician
  /** Called when user clicks the card */
  onClick?: () => void
  /** Called when user clicks the bookmark button */
  onBookmark?: () => void
  /** Called when user clicks to view ranking */
  onViewRanking?: () => void
}

export interface FilterPanelProps {
  /** Available filter options */
  filters: Filters
  /** Current filter state */
  searchState: SearchState
  /** Called when any filter value changes */
  onChange?: (filters: Partial<SearchState>) => void
  /** Called when user clears all filters */
  onClear?: () => void
}

// Show Proof & XP - Type Definitions

export type ShowProofStatus =
  | 'pending_ai'      // Awaiting AI analysis
  | 'pending_admin'   // AI complete, awaiting admin review
  | 'approved'        // Verified and XP awarded
  | 'rejected';       // Did not meet verification requirements

export type PrivacyLevel =
  | 'public'          // Visible to everyone
  | 'private'         // Only visible to technician
  | 'clients_only';   // Only visible to verified clients

export type EventType =
  | 'corporate'
  | 'festival'
  | 'wedding'
  | 'theater'
  | 'concert'
  | 'conference';

export type MediaType =
  | 'photos'
  | 'videos'
  | 'console_screenshots';

export type ComplexityLevel =
  | 'standard'        // Base XP only
  | 'complex';        // Eligible for +50 XP bonus

export type TierLevel =
  | 'Beginner'        // 0-999 XP
  | 'Experienced'     // 1000-2999 XP
  | 'Advanced'        // 3000-5999 XP
  | 'Pro';            // 6000+ XP

export type XPBonusType =
  | 'high_rating'     // +10 XP for 4-5 star review
  | 'complexity'      // +20 XP for complex show
  | 'new_client';     // +10 XP for first show with company

export type TicketEarnType =
  | 'show_completion' // 1 ticket
  | 'five_star_review'// 2 tickets
  | 'referral'        // 3 tickets
  | 'mentorship';     // 2 tickets

export type XPActivityType =
  | 'show_verified'
  | 'show_uploaded'
  | 'show_rejected';

export interface AIAnalysis {
  detectedEquipment: string[];
  venueType: string;
  estimatedAttendance: string;
  confidence: number;
  flags: string[];
}

export interface ClientVerification {
  verified: boolean;
  verifiedBy: string | null;
  verifiedByUserId: string | null;
  verifiedDate: string | null;
  starRating: 1 | 2 | 3 | 4 | 5 | null;
  feedback: string | null;
}

export interface XPBonus {
  type: XPBonusType;
  amount: number;
  reason: string;
}

export interface XPAwarded {
  baseXp: number;
  bonuses: XPBonus[];
  totalXp: number;
}

export interface ShowProof {
  id: string;
  technicianId: string;
  title: string;
  venue: string;
  eventType: EventType;
  eventDate: string;
  uploadDate: string;
  role: string;
  description: string;
  mediaUrls: string[];
  mediaTypes: MediaType[];
  privacy: PrivacyLevel;
  status: ShowProofStatus;
  complexity: ComplexityLevel;
  aiAnalysis: AIAnalysis | null;
  clientVerification: ClientVerification;
  xpAwarded: XPAwarded | null;
  rejectionReason?: string;
}

export interface XPBreakdown {
  verifiedShows: number;
  highRatings: number;
  complexity: number;
  newClients: number;
  milestones: number;
}

export interface XPActivity {
  date: string;
  type: XPActivityType;
  description: string;
  xpEarned: number;
}

export interface TechnicianXPProfile {
  technicianId: string;
  currentTier: TierLevel;
  totalXp: number;
  xpToNextTier: number | null;
  totalShows: number;
  verifiedShows: number;
  averageRating: number;
  xpBreakdown: XPBreakdown;
  recentActivity: XPActivity[];
}

export interface TicketHistoryEntry {
  date: string;
  earned: number;
  reason: string;
  type: TicketEarnType;
}

export interface VisibilityBoost {
  wonDate: string;
  expiresDate: string;
  drawId: string;
}

export interface LotteryStatus {
  technicianId: string;
  currentTickets: number;
  nextDrawDate: string;
  ticketHistory: TicketHistoryEntry[];
  activeBoost: VisibilityBoost | null;
  featuredNewcomer: boolean;
  lifetimeTicketsEarned: number;
  lifetimeDrawsEntered: number;
  lifetimeWins: number;
}

export interface TierDefinition {
  tier: TierLevel;
  minXp: number;
  maxXp: number | null;
  badge: string;
  benefits: string[];
}

// Props interfaces for components

export interface ShowProofUploadData {
  title: string;
  venue: string;
  eventType: EventType;
  eventDate: string;
  role: string;
  description: string;
  complexity: ComplexityLevel;
  privacy: PrivacyLevel;
  mediaFiles: File[];
}

export interface ShowProofCardProps {
  showProof: ShowProof;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface ShowProofDetailProps {
  showProof: ShowProof;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export interface ShowProofUploadProps {
  onUpload: (data: ShowProofUploadData) => Promise<void>;
  onCancel: () => void;
  isUploading: boolean;
  editingShowProof?: ShowProof;
  onCancelEdit?: () => void;
}

export interface XPDashboardProps {
  profile: TechnicianXPProfile;
  tierDefinitions: TierDefinition[];
}

export interface XPProgressBarProps {
  currentXp: number;
  currentTier: TierLevel;
  xpToNextTier: number | null;
  tierDefinitions: TierDefinition[];
}

export interface XPActivityFeedProps {
  activities: XPActivity[];
  maxItems?: number;
}

export interface LotteryDashboardProps {
  lotteryStatus: LotteryStatus;
  onViewRules: () => void;
}

export interface LotteryTicketHistoryProps {
  history: TicketHistoryEntry[];
  maxItems?: number;
}

export interface ClientVerificationFormProps {
  showProof: ShowProof;
  onVerify: (data: { starRating: 1 | 2 | 3 | 4 | 5; feedback?: string }) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export interface PortfolioGalleryProps {
  showProofs: ShowProof[];
  currentFilter: 'all' | PrivacyLevel;
  currentSort: 'date' | 'xp' | 'rating';
  onFilterChange: (filter: 'all' | PrivacyLevel) => void;
  onSortChange: (sort: 'date' | 'xp' | 'rating') => void;
  onViewShowProof: (id: string) => void;
}

export interface TierBadgeProps {
  tier: TierLevel;
  size?: 'sm' | 'md' | 'lg';
}

export interface VisibilityBoostIndicatorProps {
  boost: VisibilityBoost;
}

export interface ShowProofStatsProps {
  totalShows: number;
  totalXp: number;
  averageRating: number;
  verifiedShows: number;
}

export interface AIAnalysisDisplayProps {
  analysis: AIAnalysis;
}

// Main section props combining all functionality
export interface ShowProofAndXPProps {
  showProofs: ShowProof[];
  technicianProfile: TechnicianXPProfile;
  lotteryStatus: LotteryStatus;
  tierDefinitions: TierDefinition[];

  // Show proof actions
  onUploadShowProof: (data: ShowProofUploadData) => Promise<void>;
  onEditShowProof: (id: string, data: Partial<ShowProofUploadData>) => Promise<void>;
  onDeleteShowProof: (id: string) => Promise<void>;

  // Client verification actions
  onVerifyShowProof: (id: string, data: { starRating: 1 | 2 | 3 | 4 | 5; feedback?: string }) => Promise<void>;

  // View actions
  onViewShowProofDetail: (id: string) => void;
  onViewLotteryRules: () => void;

  // Loading states
  isUploadingShowProof?: boolean;
  isVerifyingShowProof?: boolean;
}

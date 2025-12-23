// Reviews & Trust Section - TypeScript Types

// ============================================================================
// Review Types
// ============================================================================

export interface SkillRatings {
  punctuality: number;
  communication: number;
  technicalSkill: number;
  professionalism: number;
  organization?: number; // For client reviews
  paymentPromptness?: number; // For client reviews
}

export interface Review {
  id: string;
  bookingId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerCompany: string | null;
  revieweeId: string;
  revieweeName: string;
  reviewerType: 'client' | 'technician';
  rating: number; // 1-5 stars
  feedback: string;
  skillRatings: SkillRatings;
  createdAt: string; // ISO 8601 timestamp
  editedAt: string | null; // ISO 8601 timestamp
  isEdited: boolean;
  helpfulVotes: number;
  notHelpfulVotes: number;
  xpAwarded: number | null; // XP amount if awarded (only for client reviews of technicians)
  isAnonymous: boolean;
}

// ============================================================================
// Trust Profile Types
// ============================================================================

export type VerificationStatus = 'not_submitted' | 'pending' | 'verified' | 'rejected' | 'expired';

export interface VerifiedId {
  status: VerificationStatus;
  verifiedAt: string | null; // ISO 8601 timestamp
  documentType: string | null; // e.g., "Driver's License", "Passport"
  expiresAt: string | null; // ISO 8601 timestamp
  submittedAt?: string; // ISO 8601 timestamp (for pending status)
}

export interface Insurance {
  status: VerificationStatus;
  verifiedAt: string | null; // ISO 8601 timestamp
  provider: string | null;
  policyNumber: string | null;
  coverageAmount: number | null; // In dollars
  expiresAt: string | null; // ISO 8601 timestamp
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  status: VerificationStatus;
  verifiedAt: string | null; // ISO 8601 timestamp
  issuedAt: string | null; // ISO 8601 timestamp
  expiresAt: string | null; // ISO 8601 timestamp (null if doesn't expire)
}

export type BackgroundCheckStatus = 'not_submitted' | 'in_progress' | 'completed' | 'expired';

export interface BackgroundCheck {
  status: BackgroundCheckStatus;
  completedAt: string | null; // ISO 8601 timestamp
  provider: string | null;
  expiresAt: string | null; // ISO 8601 timestamp
  disclaimer: string; // Disclaimer about when background checks are needed
}

export interface TrustProfile {
  id: string;
  technicianId: string;
  technicianName: string;
  verifiedId: VerifiedId;
  insurance: Insurance;
  certifications: Certification[];
  backgroundCheck: BackgroundCheck;
  trustScore: number; // 0-100 score based on all verifications
  lastUpdated: string; // ISO 8601 timestamp
}

// ============================================================================
// Dispute Types
// ============================================================================

export type DisputeStage = 'self_resolution' | 'mediation' | 'arbitration';

export type DisputeStatus = 'active' | 'under_review' | 'awaiting_decision' | 'resolved' | 'closed';

export type DisputeCategory =
  | 'inaccurate_venue_information'
  | 'no_show'
  | 'non_payment'
  | 'equipment_damage'
  | 'late_arrival'
  | 'poor_quality_work'
  | 'safety_violation'
  | 'contract_breach'
  | 'other';

export interface DisputeMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string; // ISO 8601 timestamp
  attachments?: string[]; // URLs to uploaded evidence files
}

export interface ArbitrationDetails {
  arbitratorId: string;
  arbitratorName: string;
  filingDate: string; // ISO 8601 timestamp
  hearingDate: string; // ISO 8601 timestamp
  technicianEvidence: string[];
  clientEvidence: string[];
}

export interface DisputeResolution {
  decision: string;
  decidedBy: string; // User ID of mediator or arbitrator
  decidedAt: string; // ISO 8601 timestamp
  paymentDeadline?: string; // ISO 8601 timestamp
  paymentStatus?: 'pending' | 'completed' | 'failed';
}

export interface Dispute {
  id: string;
  bookingId: string;
  initiatorId: string;
  initiatorName: string;
  initiatorType: 'client' | 'technician';
  respondentId: string;
  respondentName: string;
  respondentType: 'client' | 'technician';
  stage: DisputeStage;
  category: DisputeCategory;
  description: string;
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
  status: DisputeStatus;
  messages: DisputeMessage[];
  mediatorId?: string;
  mediatorName?: string;
  mediatorNotes?: string;
  arbitrationDetails?: ArbitrationDetails;
  resolution: DisputeResolution | null;
  resolvedAt: string | null; // ISO 8601 timestamp
}

// ============================================================================
// Review Statistics Types
// ============================================================================

export interface RatingBreakdown {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface ReviewStats {
  technicianId: string;
  technicianName: string;
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: RatingBreakdown;
  skillAverages: {
    punctuality: number;
    communication: number;
    technicalSkill: number;
    professionalism: number;
  };
  totalHelpfulVotes: number; // Net helpful votes (helpful - notHelpful)
  portfolioItemsWithXP: number; // Show proofs that have reviews and awarded XP
  portfolioItemsWithoutXP: number; // Show proofs uploaded without reviews (portfolio only)
}

// ============================================================================
// UI Component Props Types
// ============================================================================

export interface ReviewsAndTrustProps {
  // Data
  reviews: Review[];
  trustProfiles: TrustProfile[];
  disputes: Dispute[];
  reviewStats: Record<string, ReviewStats>; // Keyed by technicianId
  currentUserId?: string; // For determining if user can vote/edit
  currentUserType?: 'client' | 'technician' | 'admin';

  // Review callbacks
  onSubmitReview?: (review: Omit<Review, 'id' | 'createdAt' | 'helpfulVotes' | 'notHelpfulVotes' | 'isEdited' | 'editedAt'>) => void;
  onEditReview?: (reviewId: string, updates: Partial<Review>) => void;
  onVoteReview?: (reviewId: string, voteType: 'helpful' | 'not_helpful') => void;
  onRemoveVote?: (reviewId: string) => void;
  onFilterReviews?: (filters: { rating?: number; sortBy?: 'recent' | 'helpful' }) => void;

  // Trust profile callbacks
  onUploadVerifiedId?: (technicianId: string, file: File, documentType: string) => void;
  onUploadInsurance?: (technicianId: string, file: File, details: { provider: string; policyNumber: string; coverageAmount: number; expiresAt: string }) => void;
  onUploadCertification?: (technicianId: string, file: File, details: { name: string; issuingOrganization: string; issuedAt: string; expiresAt?: string }) => void;
  onInitiateBackgroundCheck?: (technicianId: string) => void;
  onUpdateTrustProfile?: (technicianId: string, updates: Partial<TrustProfile>) => void;

  // Dispute callbacks
  onInitiateDispute?: (dispute: Omit<Dispute, 'id' | 'createdAt' | 'updatedAt' | 'messages' | 'status' | 'resolution' | 'resolvedAt'>) => void;
  onSendDisputeMessage?: (disputeId: string, message: string, attachments?: File[]) => void;
  onEscalateDispute?: (disputeId: string, toStage: DisputeStage) => void;
  onResolveDispute?: (disputeId: string, resolution: DisputeResolution) => void;
  onMarkDisputeResolved?: (disputeId: string) => void;

  // Show proof / portfolio callbacks
  onUploadShowProof?: (technicianId: string, bookingId: string, files: File[], metadata: { showName: string; showDate: string; tags?: string[] }) => void;
  onViewPortfolio?: (technicianId: string) => void;

  // Admin callbacks (for mediation)
  onAssignMediator?: (disputeId: string, mediatorId: string) => void;
  onAddMediatorNotes?: (disputeId: string, notes: string) => void;
  onApproveVerification?: (technicianId: string, verificationType: 'id' | 'insurance' | 'certification', itemId?: string) => void;
  onRejectVerification?: (technicianId: string, verificationType: 'id' | 'insurance' | 'certification', reason: string, itemId?: string) => void;
}

// ============================================================================
// Form Types
// ============================================================================

export interface ReviewSubmissionForm {
  rating: number;
  feedback: string;
  skillRatings: SkillRatings;
  isAnonymous: boolean;
}

export interface DisputeInitiationForm {
  category: DisputeCategory;
  description: string;
}

export interface TrustProfileUploadForm {
  verificationType: 'id' | 'insurance' | 'certification' | 'background_check';
  file?: File;
  documentType?: string; // For ID
  provider?: string; // For insurance
  policyNumber?: string; // For insurance
  coverageAmount?: number; // For insurance
  expiresAt?: string; // For insurance/certification
  certificationName?: string; // For certification
  issuingOrganization?: string; // For certification
  issuedAt?: string; // For certification
}

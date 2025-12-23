/**
 * Dashboard Types
 *
 * Type definitions for the Dashboard section including onboarding progress,
 * quick stats, activity feed, and AI-powered recommendations.
 */

// ============================================================================
// Base Types
// ============================================================================

/**
 * User role determines dashboard content and metrics
 */
export type UserRole = 'technician' | 'company';

/**
 * Technician tier levels
 */
export type TechnicianTier = 'Beginner' | 'Experienced' | 'Advanced' | 'Pro';

/**
 * Company subscription tiers
 */
export type CompanyTier = 'Free' | 'Basic' | 'Pro' | 'Enterprise';

// ============================================================================
// Onboarding Types
// ============================================================================

/**
 * Onboarding task categories
 */
export type OnboardingCategory = 'profile' | 'trust' | 'payment' | 'engagement';

/**
 * Onboarding task status
 */
export type OnboardingTaskStatus = 'pending' | 'in-progress' | 'completed' | 'skipped';

/**
 * Individual onboarding task
 */
export interface OnboardingTask {
  id: string;
  category: OnboardingCategory;
  title: string;
  description: string;
  icon: string;
  status: OnboardingTaskStatus;
  xpReward?: number; // For technicians only
  isRequired: boolean;
  actionLabel: string;
  actionUrl: string;
  estimatedMinutes?: number;
  order: number;
}

/**
 * Onboarding progress summary
 */
export interface OnboardingProgress {
  totalTasks: number;
  completedTasks: number;
  requiredCompleted: number;
  requiredTotal: number;
  percentComplete: number;
  canDismiss: boolean;
  isDismissed: boolean;
  tasks: OnboardingTask[];
}

// ============================================================================
// Stats Types
// ============================================================================

/**
 * Base dashboard stats
 */
export interface BaseDashboardStats {
  activeBookings: number;
  unreadMessages: number;
}

/**
 * Technician-specific dashboard stats
 */
export interface TechnicianDashboardStats extends BaseDashboardStats {
  role: 'technician';
  currentTier: TechnicianTier;
  xp: number;
  xpToNextTier: number;
  xpProgress: number; // Percentage 0-100
  pendingShowProofs: number;
  totalEarnings: number;
  avgRating: number;
  totalReviews: number;
}

/**
 * Company-specific dashboard stats
 */
export interface CompanyDashboardStats extends BaseDashboardStats {
  role: 'company';
  subscriptionTier: CompanyTier;
  pendingReviews: number;
  techniciansHired: number;
  totalSpent: number;
  avgRating: number;
  totalReviews: number;
}

/**
 * Union type for dashboard stats
 */
export type DashboardStats = TechnicianDashboardStats | CompanyDashboardStats;

// ============================================================================
// Activity Feed Types
// ============================================================================

/**
 * Activity item type
 */
export type ActivityType =
  | 'booking-request'
  | 'booking-confirmed'
  | 'booking-completed'
  | 'booking-cancelled'
  | 'message-received'
  | 'review-received'
  | 'show-proof-approved'
  | 'show-proof-rejected'
  | 'xp-earned'
  | 'tier-advanced'
  | 'payment-received'
  | 'payment-sent'
  | 'dispute-opened'
  | 'dispute-resolved'
  | 'application-received'
  | 'application-accepted'
  | 'application-rejected';

/**
 * Individual activity item
 */
export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  timestamp: string; // ISO datetime
  relativeTime: string; // e.g., "2 hours ago"
  actionUrl?: string;
  metadata?: Record<string, unknown>; // Type-specific additional data
}

// ============================================================================
// AI Recommendation Types
// ============================================================================

/**
 * AI suggestion type
 */
export type AISuggestionType =
  | 'complete-profile'
  | 'upload-show-proof'
  | 'request-review'
  | 'apply-to-booking'
  | 'post-booking'
  | 'verify-skill'
  | 'add-payout-method'
  | 'upgrade-tier'
  | 'respond-to-message'
  | 'complete-onboarding';

/**
 * AI-powered suggestion card
 */
export interface AISuggestion {
  id: string;
  type: AISuggestionType;
  title: string;
  description: string;
  icon: string;
  priority: 'high' | 'medium' | 'low';
  actionLabel: string;
  actionUrl: string;
  dismissible: boolean;
  estimatedImpact?: string; // e.g., "Boost profile visibility by 40%"
}

// ============================================================================
// Welcome Banner Types
// ============================================================================

/**
 * Time of day for greeting
 */
export type TimeOfDay = 'morning' | 'afternoon' | 'evening';

/**
 * Welcome banner data
 */
export interface WelcomeBanner {
  greeting: string; // e.g., "Good morning"
  userName: string;
  userAvatar?: string;
  summaryMessage: string; // e.g., "You're 36% set up" or "All caught up!"
  timeOfDay: TimeOfDay;
}

// ============================================================================
// Component Props Types
// ============================================================================

/**
 * Dashboard layout props
 */
export interface DashboardLayoutProps {
  userRole: UserRole;
  welcomeBanner: WelcomeBanner;
  onboardingProgress: OnboardingProgress | null; // null if dismissed or 100% complete
  stats: DashboardStats;
  recentActivity: ActivityItem[];
  aiSuggestions: AISuggestion[];
  onDismissOnboarding: () => void;
  onCompleteTask: (taskId: string) => void;
  onDismissSuggestion: (suggestionId: string) => void;
  onViewAllActivity: () => void;
  isLoading?: boolean;
}

/**
 * Onboarding checklist card props
 */
export interface OnboardingChecklistProps {
  progress: OnboardingProgress;
  onDismiss: () => void;
  onTaskClick: (task: OnboardingTask) => void;
  isLoading?: boolean;
}

/**
 * Quick stats card props
 */
export interface QuickStatsProps {
  stats: DashboardStats;
  isLoading?: boolean;
}

/**
 * Recent activity feed props
 */
export interface RecentActivityFeedProps {
  activities: ActivityItem[];
  onViewAll: () => void;
  onActivityClick: (activity: ActivityItem) => void;
  isLoading?: boolean;
}

/**
 * AI suggestions card props
 */
export interface AISuggestionsCardProps {
  suggestions: AISuggestion[];
  onDismiss: (suggestionId: string) => void;
  onSuggestionClick: (suggestion: AISuggestion) => void;
  isLoading?: boolean;
}

/**
 * Welcome banner component props
 */
export interface WelcomeBannerProps {
  banner: WelcomeBanner;
}

/**
 * Stat item for grid display
 */
export interface StatItem {
  label: string;
  value: string | number;
  icon: string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
    label: string;
  };
  actionUrl?: string;
}

/**
 * Onboarding task card props
 */
export interface OnboardingTaskCardProps {
  task: OnboardingTask;
  onClick: (task: OnboardingTask) => void;
}

/**
 * Activity item card props
 */
export interface ActivityItemCardProps {
  activity: ActivityItem;
  onClick: (activity: ActivityItem) => void;
}

/**
 * AI suggestion item props
 */
export interface AISuggestionItemProps {
  suggestion: AISuggestion;
  onDismiss: (suggestionId: string) => void;
  onClick: (suggestion: AISuggestion) => void;
}

// ============================================================================
// Sample Data Types
// ============================================================================

/**
 * Sample data structure for dashboard section
 */
export interface DashboardSampleData {
  _meta: {
    description: string;
    models: Array<{
      name: string;
      description: string;
      fields: Record<string, string>;
    }>;
  };
  technicianOnboardingProgress: OnboardingProgress;
  companyOnboardingProgress: OnboardingProgress;
  technicianStats: TechnicianDashboardStats;
  companyStats: CompanyDashboardStats;
  technicianActivity: ActivityItem[];
  companyActivity: ActivityItem[];
  technicianAISuggestions: AISuggestion[];
  companyAISuggestions: AISuggestion[];
  technicianWelcomeBanner: WelcomeBanner;
  companyWelcomeBanner: WelcomeBanner;
}

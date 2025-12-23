/**
 * Admin Portal Types
 *
 * Type definitions for the internal platform administration dashboard including
 * user management, dispute resolution, content moderation, analytics, and system health.
 */

// ============================================================================
// Admin & Authentication Types
// ============================================================================

/**
 * Admin user roles with different permission levels
 */
export type AdminRole =
  | 'super_admin'
  | 'support_admin'
  | 'content_moderator'
  | 'analytics_viewer';

/**
 * Permission types for role-based access control
 */
export type Permission =
  | 'manage_users'
  | 'suspend_users'
  | 'verify_credentials'
  | 'resolve_disputes'
  | 'moderate_content'
  | 'view_analytics'
  | 'manage_platform_settings'
  | 'manage_admins'
  | 'process_refunds'
  | 'view_audit_logs'
  | 'export_data';

/**
 * Admin user profile
 */
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  permissions: Permission[];
  lastLogin: string;
  avatar?: string;
  createdAt: string;
}

// ============================================================================
// Dashboard Types
// ============================================================================

/**
 * Platform-wide dashboard metrics
 */
export interface DashboardMetrics {
  totalUsers: number;
  totalTechnicians: number;
  totalCompanies: number;
  activeBookings: number;
  completedBookingsThisMonth: number;
  revenue: {
    thisMonth: number;
    lastMonth: number;
    percentChange: number;
  };
  disputes: {
    open: number;
    resolved: number;
    averageResolutionTime: string; // e.g., "2.5 days"
  };
  flaggedContent: {
    pending: number;
    resolvedToday: number;
  };
  userGrowth: {
    newUsersToday: number;
    newUsersThisWeek: number;
    newUsersThisMonth: number;
  };
}

/**
 * Severity levels for alerts
 */
export type AlertSeverity = 'info' | 'warning' | 'critical';

/**
 * Alert type categories
 */
export type AlertType =
  | 'dispute'
  | 'payment_issue'
  | 'flagged_content'
  | 'system_error'
  | 'security'
  | 'user_report';

/**
 * Dashboard alert requiring admin attention
 */
export interface DashboardAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  timestamp: string;
  actionRequired: boolean;
  relatedEntityId?: string; // ID of user, dispute, etc.
  relatedEntityType?: 'user' | 'dispute' | 'booking' | 'content';
}

/**
 * Recent activity type
 */
export type ActivityType =
  | 'user_registered'
  | 'booking_completed'
  | 'dispute_opened'
  | 'content_flagged'
  | 'user_suspended'
  | 'credential_verified'
  | 'refund_processed';

/**
 * Recent platform activity
 */
export interface RecentActivity {
  id: string;
  type: ActivityType;
  description: string;
  user?: string; // User name if applicable
  timestamp: string;
  metadata?: Record<string, any>;
}

// ============================================================================
// User Management Types
// ============================================================================

/**
 * Account status for managed users
 */
export type AccountStatus =
  | 'active'
  | 'suspended'
  | 'pending_verification'
  | 'banned'
  | 'deactivated';

/**
 * Verification status flags
 */
export interface VerificationStatus {
  emailVerified: boolean;
  phoneVerified: boolean;
  credentialsVerified: boolean;
  insuranceVerified: boolean;
}

/**
 * Extended user profile for admin management
 */
export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'technician' | 'company';
  accountStatus: AccountStatus;
  verificationStatus: VerificationStatus;
  profilePhoto?: string;
  location: string;
  joinDate: string;
  lastActive: string;

  // Activity metrics
  totalBookings: number;
  completionRate: number;
  cancellationRate: number;
  averageRating: number;
  totalReviews: number;
  flagCount: number;

  // Financial data
  totalEarnings?: number; // For technicians
  totalSpent?: number; // For companies
  pendingPayouts?: number; // For technicians

  // Admin notes
  suspensionHistory: SuspensionRecord[];
  adminNotes: AdminNote[];

  // Additional info
  tier?: string; // For technicians
  subscriptionTier?: string; // For companies
}

/**
 * Suspension record
 */
export interface SuspensionRecord {
  id: string;
  reason: string;
  duration: string; // e.g., "7 days", "permanent"
  startDate: string;
  endDate?: string;
  adminId: string;
  adminName: string;
  notes?: string;
}

/**
 * Admin note on a user
 */
export interface AdminNote {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
  category: 'general' | 'warning' | 'positive' | 'investigation';
}

/**
 * User search filters
 */
export interface UserSearchFilters {
  role?: 'technician' | 'company';
  accountStatus?: AccountStatus[];
  verificationStatus?: {
    emailVerified?: boolean;
    credentialsVerified?: boolean;
    insuranceVerified?: boolean;
  };
  location?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  tier?: string;
  minBookings?: number;
  minRating?: number;
}

// ============================================================================
// Dispute Resolution Types
// ============================================================================

/**
 * Dispute status
 */
export type DisputeStatus =
  | 'open'
  | 'under_review'
  | 'awaiting_response'
  | 'resolved'
  | 'escalated';

/**
 * Dispute type categories
 */
export type DisputeType =
  | 'payment_issue'
  | 'no_show'
  | 'quality_complaint'
  | 'equipment_damage'
  | 'breach_of_terms'
  | 'cancellation_fee'
  | 'other';

/**
 * Parties involved in a dispute
 */
export interface DisputeParties {
  technician: {
    id: string;
    name: string;
    email: string;
  };
  company: {
    id: string;
    name: string;
    email: string;
  };
}

/**
 * Evidence attached to dispute
 */
export interface DisputeEvidence {
  type: 'message' | 'photo' | 'document' | 'booking_details' | 'payment_record';
  url?: string;
  description: string;
  uploadedBy: 'technician' | 'company' | 'admin';
  uploadedAt: string;
}

/**
 * Message in dispute thread
 */
export interface DisputeMessage {
  id: string;
  sender: 'technician' | 'company' | 'admin';
  senderName: string;
  content: string;
  timestamp: string;
  attachments?: string[];
  isInternal?: boolean; // Admin-only notes
}

/**
 * Dispute resolution outcome
 */
export interface DisputeResolution {
  outcome: 'technician_favor' | 'company_favor' | 'split' | 'no_fault' | 'both_penalized';
  refundAmount?: number;
  penaltyAmount?: number;
  appliedTo?: 'technician' | 'company' | 'both';
  reasoning: string;
  resolvedBy: string; // Admin ID
  resolvedAt: string;
}

/**
 * Dispute case
 */
export interface Dispute {
  id: string;
  bookingId: string;
  type: DisputeType;
  status: DisputeStatus;
  parties: DisputeParties;
  description: string;
  evidence: DisputeEvidence[];
  messages: DisputeMessage[];
  createdAt: string;
  lastUpdatedAt: string;
  assignedAdmin?: string;
  resolution?: DisputeResolution;
}

// ============================================================================
// Content Moderation Types
// ============================================================================

/**
 * Flagged content types
 */
export type FlaggedContentType = 'review' | 'profile' | 'message' | 'photo';

/**
 * Moderation status
 */
export type ModerationStatus = 'pending' | 'under_review' | 'resolved' | 'dismissed';

/**
 * Moderation action taken
 */
export type ModerationAction =
  | 'approve'
  | 'remove'
  | 'warn_user'
  | 'suspend_user'
  | 'ban_user'
  | 'edit_content';

/**
 * Flagged content item
 */
export interface FlaggedContent {
  id: string;
  type: FlaggedContentType;
  content: string; // Original content
  contentUrl?: string; // For photos
  reporter: {
    id: string;
    name: string;
    email: string;
  };
  reportedUser: {
    id: string;
    name: string;
    email: string;
    role: 'technician' | 'company';
  };
  reason: string;
  additionalDetails?: string;
  status: ModerationStatus;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  action?: ModerationAction;
  actionNotes?: string;
}

// ============================================================================
// Analytics Types
// ============================================================================

/**
 * Time series data point
 */
export interface TimeSeriesData {
  date: string;
  value: number;
}

/**
 * Platform analytics overview
 */
export interface PlatformAnalytics {
  userGrowth: {
    technicians: TimeSeriesData[];
    companies: TimeSeriesData[];
    total: TimeSeriesData[];
  };
  bookingTrends: {
    totalBookings: TimeSeriesData[];
    completedBookings: TimeSeriesData[];
    cancelledBookings: TimeSeriesData[];
    averageBookingValue: TimeSeriesData[];
  };
  revenueData: {
    gmv: TimeSeriesData[]; // Gross merchandise value
    platformFees: TimeSeriesData[];
    payoutVolume: TimeSeriesData[];
  };
  topCategories: {
    category: string;
    bookingCount: number;
    revenue: number;
  }[];
  geographicalDistribution: {
    location: string;
    userCount: number;
    bookingCount: number;
  }[];
  engagementMetrics: {
    messagesSent: number;
    profileViews: number;
    searchQueries: number;
    reviewSubmissions: number;
  };
}

// ============================================================================
// System Health Types
// ============================================================================

/**
 * System health status
 */
export type SystemHealthStatus = 'healthy' | 'degraded' | 'down';

/**
 * System component
 */
export type SystemComponent =
  | 'api'
  | 'database'
  | 'cache'
  | 'payment_processor'
  | 'email_service'
  | 'sms_service'
  | 'storage';

/**
 * Overall system health
 */
export interface SystemHealth {
  status: SystemHealthStatus;
  uptime: string; // e.g., "99.98%"
  uptimeDays: number;
  errorRate: number; // Percentage
  averageResponseTime: number; // Milliseconds
  activeUsers: number;
  peakConcurrentUsers: number;
  lastIncident?: string; // ISO timestamp
}

/**
 * System alert
 */
export interface SystemAlert {
  id: string;
  severity: AlertSeverity;
  component: SystemComponent;
  message: string;
  timestamp: string;
  resolved: boolean;
  resolvedAt?: string;
}

/**
 * Error log entry
 */
export interface ErrorLog {
  id: string;
  timestamp: string;
  severity: 'error' | 'warning' | 'critical';
  component: SystemComponent;
  errorType: string;
  message: string;
  affectedUsers?: number;
  stackTrace?: string;
  resolved: boolean;
}

/**
 * Performance metric
 */
export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  threshold: number;
}

/**
 * Integration health status
 */
export interface IntegrationHealth {
  name: string;
  status: SystemHealthStatus;
  lastChecked: string;
  uptime: string;
  responseTime?: number;
  errorCount?: number;
}

// ============================================================================
// Audit Log Types
// ============================================================================

/**
 * Admin action types for audit logging
 */
export type AdminActionType =
  | 'user_suspended'
  | 'user_unsuspended'
  | 'user_banned'
  | 'credential_verified'
  | 'dispute_resolved'
  | 'content_removed'
  | 'refund_processed'
  | 'setting_changed'
  | 'admin_created'
  | 'permission_changed';

/**
 * Audit log entry
 */
export interface AuditLogEntry {
  id: string;
  adminId: string;
  adminName: string;
  actionType: AdminActionType;
  timestamp: string;
  affectedResource: {
    type: 'user' | 'dispute' | 'content' | 'setting' | 'admin';
    id: string;
    name?: string;
  };
  changes?: {
    before: any;
    after: any;
  };
  reason?: string;
  ipAddress: string;
}

// ============================================================================
// Navigation Types
// ============================================================================

/**
 * Admin navigation item
 */
export interface AdminNavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  requiredPermissions?: Permission[];
  badgeCount?: number;
}

/**
 * Admin quick action
 */
export interface AdminQuickAction {
  id: string;
  label: string;
  icon: string;
  action: string;
  requiredPermissions?: Permission[];
}

// ============================================================================
// Component Props Types
// ============================================================================

/**
 * Dashboard view props
 */
export interface DashboardProps {
  metrics: DashboardMetrics;
  alerts: DashboardAlert[];
  recentActivity: RecentActivity[];
  onDismissAlert: (alertId: string) => void;
  onViewAlert: (alert: DashboardAlert) => void;
}

/**
 * User management view props
 */
export interface UserManagementProps {
  users: ManagedUser[];
  filters: UserSearchFilters;
  onSearch: (query: string) => void;
  onFilter: (filters: UserSearchFilters) => void;
  onViewUser: (userId: string) => void;
  onSuspendUser: (userId: string, reason: string, duration: string) => Promise<void>;
  onUnsuspendUser: (userId: string) => Promise<void>;
  onVerifyCredentials: (userId: string) => Promise<void>;
  onAddNote: (userId: string, note: string, category: AdminNote['category']) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Dispute resolution view props
 */
export interface DisputeResolutionProps {
  disputes: Dispute[];
  onViewDispute: (disputeId: string) => void;
  onAssignToSelf: (disputeId: string) => Promise<void>;
  onSendMessage: (disputeId: string, message: string, isInternal: boolean) => Promise<void>;
  onResolveDispute: (disputeId: string, resolution: DisputeResolution) => Promise<void>;
  onEscalate: (disputeId: string, reason: string) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Content moderation view props
 */
export interface ContentModerationProps {
  flaggedContent: FlaggedContent[];
  onReview: (contentId: string, action: ModerationAction, notes?: string) => Promise<void>;
  onDismiss: (contentId: string, reason: string) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Analytics view props
 */
export interface AnalyticsProps {
  analytics: PlatformAnalytics;
  dateRange: { start: string; end: string };
  onChangeDateRange: (range: { start: string; end: string }) => void;
  onExportData: (dataType: string) => void;
}

/**
 * System health view props
 */
export interface SystemHealthProps {
  systemHealth: SystemHealth;
  alerts: SystemAlert[];
  errorLogs: ErrorLog[];
  performanceMetrics: PerformanceMetric[];
  integrations: IntegrationHealth[];
  onRefresh: () => void;
  onResolveAlert: (alertId: string) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Admin management view props (Super Admin only)
 */
export interface AdminManagementProps {
  admins: AdminUser[];
  onCreateAdmin: (email: string, role: AdminRole) => Promise<void>;
  onUpdateRole: (adminId: string, role: AdminRole) => Promise<void>;
  onRevokeAccess: (adminId: string) => Promise<void>;
  isLoading?: boolean;
}

// ============================================================================
// Sample Data Types
// ============================================================================

/**
 * Sample data structure for admin portal
 */
export interface AdminPortalSampleData {
  _meta: {
    description: string;
    models: Array<{
      name: string;
      description: string;
      fields: Record<string, string>;
    }>;
  };
  currentAdmin: AdminUser;
  dashboardMetrics: DashboardMetrics;
  dashboardAlerts: DashboardAlert[];
  recentActivity: RecentActivity[];
  sampleTechnicians: ManagedUser[];
  sampleCompanies: ManagedUser[];
  sampleDisputes: Dispute[];
  flaggedContent: FlaggedContent[];
  platformAnalytics: PlatformAnalytics;
  systemHealth: SystemHealth;
  systemAlerts: SystemAlert[];
  performanceMetrics: PerformanceMetric[];
  integrations: IntegrationHealth[];
  adminNavigation: AdminNavItem[];
  quickActions: AdminQuickAction[];
}

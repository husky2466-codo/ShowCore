/**
 * Settings Types
 *
 * Type definitions for comprehensive account settings management including
 * profile, security, notifications, payments, privacy, appearance, and account management.
 */

// ============================================================================
// Base User & Profile Types
// ============================================================================

/**
 * User role determines available settings sections
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

/**
 * Base user profile shared between roles
 */
export interface UserProfile {
  id: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
  lastUpdatedAt: string;
}

/**
 * Technician-specific settings profile
 */
export interface TechnicianSettingsProfile extends UserProfile {
  role: 'technician';
  name: string;
  profilePhoto?: string;
  bio: string;
  location: string;
  skills: string[];
  hourlyRateRange: {
    min: number;
    max: number;
  };
  portfolioLinks: string[];
  certifications: Certification[];
  insuranceDocuments: InsuranceDocument[];
  tier: TechnicianTier;
  xp: number;
  xpToNextTier: number;
  defaultAvailability: AvailabilitySettings;
  timezone: string;
  profileVisibility: 'public' | 'private';
}

/**
 * Company-specific settings profile
 */
export interface CompanySettingsProfile extends UserProfile {
  role: 'company';
  companyName: string;
  companyLogo?: string;
  industry: string;
  website?: string;
  location: string;
  hiringNeeds: string;
  teamMembers: TeamMember[];
  subscriptionTier: CompanyTier;
  billingInfo: BillingInfo;
}

/**
 * Union type for role-based profiles
 */
export type SettingsProfile = TechnicianSettingsProfile | CompanySettingsProfile;

// ============================================================================
// Technician-Specific Types
// ============================================================================

/**
 * Certification document
 */
export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  documentUrl?: string;
  verified: boolean;
}

/**
 * Insurance document
 */
export interface InsuranceDocument {
  id: string;
  type: 'general-liability' | 'equipment' | 'professional-liability';
  provider: string;
  policyNumber: string;
  coverageAmount: number;
  expiryDate: string;
  documentUrl?: string;
  verified: boolean;
}

/**
 * Default availability settings
 */
export interface AvailabilitySettings {
  defaultWorkingHours: {
    monday: TimeRange | null;
    tuesday: TimeRange | null;
    wednesday: TimeRange | null;
    thursday: TimeRange | null;
    friday: TimeRange | null;
    saturday: TimeRange | null;
    sunday: TimeRange | null;
  };
  blackoutDates: string[]; // ISO date strings
}

/**
 * Time range for availability
 */
export interface TimeRange {
  start: string; // "HH:MM" format
  end: string; // "HH:MM" format
}

/**
 * Payout method types
 */
export type PayoutMethodType = 'bank_account' | 'paypal';

/**
 * Base payout method
 */
export interface BasePayoutMethod {
  id: string;
  type: PayoutMethodType;
  isDefault: boolean;
  createdAt: string;
}

/**
 * Bank account payout method
 */
export interface BankAccountPayoutMethod extends BasePayoutMethod {
  type: 'bank_account';
  bankName: string;
  accountHolderName: string;
  accountNumberLast4: string; // Last 4 digits only
  routingNumber: string;
  accountType: 'checking' | 'savings';
}

/**
 * PayPal payout method
 */
export interface PayPalPayoutMethod extends BasePayoutMethod {
  type: 'paypal';
  email: string;
  verified: boolean;
}

/**
 * Union type for payout methods
 */
export type PayoutMethod = BankAccountPayoutMethod | PayPalPayoutMethod;

// ============================================================================
// Company-Specific Types
// ============================================================================

/**
 * Team member with role and permissions
 */
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
  lastActive: string;
  avatar?: string;
}

/**
 * Billing information
 */
export interface BillingInfo {
  paymentMethods: PaymentMethod[];
  billingAddress: BillingAddress;
  invoices: Invoice[];
}

/**
 * Payment method for subscriptions
 */
export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_transfer';
  isDefault: boolean;
  cardBrand?: string; // 'visa' | 'mastercard' | 'amex' | 'discover'
  last4: string;
  expiryMonth?: number;
  expiryYear?: number;
  createdAt: string;
}

/**
 * Billing address
 */
export interface BillingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

/**
 * Invoice record
 */
export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
  downloadUrl: string;
}

// ============================================================================
// Shared Settings Types
// ============================================================================

/**
 * Notification preferences
 */
export interface NotificationPreferences {
  bookings: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  messages: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  reviews: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  systemUpdates: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  marketingCommunications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

/**
 * Connected OAuth account
 */
export interface ConnectedAccount {
  id: string;
  provider: 'google' | 'apple' | 'microsoft';
  email: string;
  connectedAt: string;
  isConnected: boolean;
}

/**
 * Privacy settings
 */
export interface PrivacySettings {
  emailVisibility: 'public' | 'connections' | 'private';
  phoneVisibility: 'public' | 'connections' | 'private';
  profileVisibility: 'public' | 'private'; // For technicians
  allowDataSharing: boolean;
  allowMarketingCommunications: boolean;
}

/**
 * Appearance settings
 */
export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  reducedMotion: boolean;
  language: string; // ISO language code
}

/**
 * Two-factor authentication settings
 */
export interface TwoFactorAuth {
  enabled: boolean;
  method?: 'sms' | 'authenticator';
  phoneNumber?: string; // For SMS method
  backupCodes?: string[];
}

/**
 * Active session
 */
export interface ActiveSession {
  id: string;
  deviceName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

/**
 * Security settings
 */
export interface SecuritySettings {
  twoFactorAuth: TwoFactorAuth;
  activeSessions: ActiveSession[];
  lastPasswordChange: string;
}

/**
 * Account status
 */
export type AccountStatus = 'active' | 'deactivated' | 'deletion_scheduled';

/**
 * Account management settings
 */
export interface AccountManagement {
  status: AccountStatus;
  deletionScheduledDate?: string; // ISO date string if deletion is scheduled
  dataExportRequested: boolean;
  dataExportAvailableUntil?: string; // ISO date string
}

// ============================================================================
// Settings Navigation Types
// ============================================================================

/**
 * Settings section identifier
 */
export type SettingsSectionId =
  | 'profile'
  | 'security'
  | 'notifications'
  | 'payment' // For technicians (payout methods)
  | 'billing' // For companies
  | 'privacy'
  | 'appearance'
  | 'connected-accounts'
  | 'team' // For companies
  | 'account';

/**
 * Settings section for navigation
 */
export interface SettingsSection {
  id: SettingsSectionId;
  label: string;
  icon: string;
  visible: boolean; // Role-based visibility
}

/**
 * Settings navigation group
 */
export interface SettingsNavigationGroup {
  label: string;
  sections: SettingsSection[];
}

// ============================================================================
// Form Data Types
// ============================================================================

/**
 * Profile update form data (technician)
 */
export interface TechnicianProfileUpdateData {
  name: string;
  bio: string;
  location: string;
  phone?: string;
  skills: string[];
  hourlyRateRange: {
    min: number;
    max: number;
  };
  portfolioLinks: string[];
  timezone: string;
  profileVisibility: 'public' | 'private';
}

/**
 * Profile update form data (company)
 */
export interface CompanyProfileUpdateData {
  companyName: string;
  industry: string;
  location: string;
  phone?: string;
  website?: string;
  hiringNeeds: string;
}

/**
 * Union type for profile update data
 */
export type ProfileUpdateData =
  | TechnicianProfileUpdateData
  | CompanyProfileUpdateData;

/**
 * Password change form data
 */
export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

/**
 * Bank account form data
 */
export interface BankAccountFormData {
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: 'checking' | 'savings';
}

/**
 * PayPal form data
 */
export interface PayPalFormData {
  email: string;
}

/**
 * Payment method form data (for companies)
 */
export interface PaymentMethodFormData {
  cardNumber: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
  cardholderName: string;
  billingAddress: BillingAddress;
}

/**
 * Team member invitation data
 */
export interface TeamMemberInviteData {
  email: string;
  role: 'admin' | 'member';
}

// ============================================================================
// Component Props Types
// ============================================================================

/**
 * Settings layout props
 */
export interface SettingsLayoutProps {
  currentSection: SettingsSectionId;
  navigationGroups: SettingsNavigationGroup[];
  onNavigate: (sectionId: SettingsSectionId) => void;
  children: React.ReactNode;
}

/**
 * Profile settings props
 */
export interface ProfileSettingsProps {
  profile: SettingsProfile;
  onUpdateProfile: (data: ProfileUpdateData) => Promise<void>;
  onUploadPhoto: (file: File) => Promise<string>;
  isLoading?: boolean;
  error?: string | null;
}

/**
 * Security settings props
 */
export interface SecuritySettingsProps {
  securitySettings: SecuritySettings;
  onChangePassword: (data: PasswordChangeData) => Promise<void>;
  onEnable2FA: (method: 'sms' | 'authenticator') => Promise<void>;
  onDisable2FA: () => Promise<void>;
  onRevokeSession: (sessionId: string) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

/**
 * Notification settings props
 */
export interface NotificationSettingsProps {
  preferences: NotificationPreferences;
  onUpdatePreferences: (preferences: NotificationPreferences) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

/**
 * Payment settings props (technicians)
 */
export interface PaymentSettingsProps {
  payoutMethods: PayoutMethod[];
  onAddBankAccount: (data: BankAccountFormData) => Promise<void>;
  onAddPayPal: (data: PayPalFormData) => Promise<void>;
  onRemoveMethod: (methodId: string) => Promise<void>;
  onSetDefaultMethod: (methodId: string) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

/**
 * Billing settings props (companies)
 */
export interface BillingSettingsProps {
  billingInfo: BillingInfo;
  subscriptionTier: CompanyTier;
  onAddPaymentMethod: (data: PaymentMethodFormData) => Promise<void>;
  onRemovePaymentMethod: (methodId: string) => Promise<void>;
  onSetDefaultPaymentMethod: (methodId: string) => Promise<void>;
  onUpdateBillingAddress: (address: BillingAddress) => Promise<void>;
  onDownloadInvoice: (invoiceId: string) => void;
  onUpgradeTier: (tier: CompanyTier) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

/**
 * Privacy settings props
 */
export interface PrivacySettingsProps {
  privacySettings: PrivacySettings;
  onUpdatePrivacy: (settings: PrivacySettings) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

/**
 * Appearance settings props
 */
export interface AppearanceSettingsProps {
  appearanceSettings: AppearanceSettings;
  onUpdateAppearance: (settings: AppearanceSettings) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

/**
 * Connected accounts props
 */
export interface ConnectedAccountsProps {
  connectedAccounts: ConnectedAccount[];
  onConnectAccount: (provider: 'google' | 'apple' | 'microsoft') => Promise<void>;
  onDisconnectAccount: (accountId: string) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

/**
 * Team management props (companies)
 */
export interface TeamManagementProps {
  teamMembers: TeamMember[];
  onInviteMember: (data: TeamMemberInviteData) => Promise<void>;
  onRemoveMember: (memberId: string) => Promise<void>;
  onUpdateMemberRole: (memberId: string, role: 'admin' | 'member') => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

/**
 * Account management props
 */
export interface AccountManagementProps {
  accountManagement: AccountManagement;
  onExportData: () => Promise<void>;
  onDeactivateAccount: () => Promise<void>;
  onCancelDeactivation: () => Promise<void>;
  onDeleteAccount: () => Promise<void>;
  onCancelDeletion: () => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

// ============================================================================
// Toast/Alert Types
// ============================================================================

/**
 * Toast notification type
 */
export type ToastType = 'success' | 'error' | 'info' | 'warning';

/**
 * Toast notification
 */
export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number; // milliseconds
}

// ============================================================================
// Sample Data Types
// ============================================================================

/**
 * Sample data structure for settings section
 */
export interface SettingsSampleData {
  _meta: {
    description: string;
    models: Array<{
      name: string;
      description: string;
      fields: Record<string, string>;
    }>;
  };
  technicianProfile: TechnicianSettingsProfile;
  companyProfile: CompanySettingsProfile;
  notificationPreferences: NotificationPreferences;
  samplePayoutMethods: PayoutMethod[];
  sampleBillingInfo: BillingInfo;
  connectedAccounts: ConnectedAccount[];
  privacySettings: PrivacySettings;
  appearanceSettings: AppearanceSettings;
  securitySettings: SecuritySettings;
  accountManagement: AccountManagement;
  settingsNavigation: {
    technician: SettingsNavigationGroup[];
    company: SettingsNavigationGroup[];
  };
  availableSkills: string[];
  availableIndustries: string[];
  availableTimezones: string[];
  availableLanguages: { code: string; name: string }[];
}

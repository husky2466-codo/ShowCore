/**
 * Authentication Types
 *
 * Type definitions for authentication flows including login, registration,
 * email verification, profile completion, and OAuth authentication.
 */

// ============================================================================
// User & Profile Types
// ============================================================================

/**
 * User role determines profile requirements and platform experience
 */
export type UserRole = 'technician' | 'company';

/**
 * Technician-specific profile data
 */
export interface TechnicianProfile {
  name: string;
  skills: string[];
  location: string;
  hourlyRateRange: {
    min: number;
    max: number;
  };
  bio: string;
  profilePhoto?: string;
  portfolioLinks?: string[];
}

/**
 * Company-specific profile data
 */
export interface CompanyProfile {
  companyName: string;
  industry: string;
  location: string;
  typicalHiringNeeds: string;
  companyLogo?: string;
  website?: string;
}

/**
 * User account with role-based profile
 */
export interface User {
  id: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
  profileComplete: boolean;
  createdAt: string;
  profile: TechnicianProfile | CompanyProfile;
}

// ============================================================================
// Form Data Types
// ============================================================================

/**
 * Login form data
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Registration form data
 */
export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole | null;
}

/**
 * Password reset request form data
 */
export interface PasswordResetRequestData {
  email: string;
}

/**
 * Password reset form data (from email link)
 */
export interface PasswordResetData {
  password: string;
  confirmPassword: string;
  token: string;
}

/**
 * Magic link request form data
 */
export interface MagicLinkRequestData {
  email: string;
}

/**
 * Technician profile completion form data
 */
export interface TechnicianProfileCompletionData {
  name: string;
  skills: string[];
  location: string;
  hourlyRateRange: {
    min: number;
    max: number;
  };
  bio: string;
  profilePhoto?: string;
  portfolioLinks?: string[];
}

/**
 * Company profile completion form data
 */
export interface CompanyProfileCompletionData {
  companyName: string;
  industry: string;
  location: string;
  typicalHiringNeeds: string;
  companyLogo?: string;
  website?: string;
}

/**
 * Union type for profile completion data
 */
export type ProfileCompletionData =
  | TechnicianProfileCompletionData
  | CompanyProfileCompletionData;

// ============================================================================
// OAuth Types
// ============================================================================

/**
 * OAuth provider identifiers
 */
export type OAuthProviderId = 'google' | 'apple' | 'microsoft';

/**
 * OAuth provider configuration
 */
export interface OAuthProvider {
  id: OAuthProviderId;
  name: string;
  icon: string;
  enabled: boolean;
}

// ============================================================================
// Authentication State Types
// ============================================================================

/**
 * Authentication state
 */
export interface AuthenticationState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

/**
 * Authentication error
 */
export interface AuthError {
  code: string;
  message: string;
  field?: string;
}

/**
 * Form validation errors
 */
export interface FormErrors {
  [key: string]: string;
}

/**
 * Confirmation message for various auth flows
 */
export interface ConfirmationMessage {
  title: string;
  message: string;
  action: string;
}

// ============================================================================
// Component Props Types
// ============================================================================

/**
 * Login component props
 */
export interface LoginProps {
  onLogin: (data: LoginFormData) => Promise<void>;
  onMagicLinkRequest: (data: MagicLinkRequestData) => Promise<void>;
  onOAuthLogin: (provider: OAuthProviderId) => Promise<void>;
  onNavigateToRegister: () => void;
  onNavigateToPasswordReset: () => void;
  isLoading?: boolean;
  error?: AuthError | null;
  oauthProviders?: OAuthProvider[];
}

/**
 * Registration component props
 */
export interface RegisterProps {
  onRegister: (data: RegisterFormData) => Promise<void>;
  onOAuthLogin: (provider: OAuthProviderId) => Promise<void>;
  onNavigateToLogin: () => void;
  isLoading?: boolean;
  error?: AuthError | null;
  oauthProviders?: OAuthProvider[];
}

/**
 * Email verification component props
 */
export interface EmailVerificationProps {
  email: string;
  onResendVerification: () => Promise<void>;
  onLogout: () => void;
  isLoading?: boolean;
  error?: AuthError | null;
}

/**
 * Magic link confirmation component props
 */
export interface MagicLinkConfirmationProps {
  email: string;
  onResendMagicLink: () => Promise<void>;
  onNavigateToLogin: () => void;
  isLoading?: boolean;
  error?: AuthError | null;
}

/**
 * Password reset request component props
 */
export interface PasswordResetRequestProps {
  onPasswordResetRequest: (data: PasswordResetRequestData) => Promise<void>;
  onNavigateToLogin: () => void;
  isLoading?: boolean;
  error?: AuthError | null;
}

/**
 * Password reset component props
 */
export interface PasswordResetProps {
  token: string;
  onPasswordReset: (data: PasswordResetData) => Promise<void>;
  onNavigateToLogin: () => void;
  isLoading?: boolean;
  error?: AuthError | null;
}

/**
 * Profile completion component props
 */
export interface ProfileCompletionProps {
  role: UserRole;
  onCompleteProfile: (data: ProfileCompletionData) => Promise<void>;
  onLogout: () => void;
  isLoading?: boolean;
  error?: AuthError | null;
}

/**
 * OAuth button component props
 */
export interface OAuthButtonProps {
  provider: OAuthProvider;
  onClick: (providerId: OAuthProviderId) => void;
  disabled?: boolean;
}

/**
 * Role selector component props
 */
export interface RoleSelectorProps {
  selectedRole: UserRole | null;
  onChange: (role: UserRole) => void;
  error?: string;
}

/**
 * Form input component props
 */
export interface FormInputProps {
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'url';
  value: string | number;
  onChange: (value: string | number) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Skills input component props (for technician profile)
 */
export interface SkillsInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  error?: string;
}

/**
 * Rate range input component props (for technician profile)
 */
export interface RateRangeInputProps {
  min: number;
  max: number;
  onChange: (range: { min: number; max: number }) => void;
  error?: string;
}

// ============================================================================
// Sample Data Types
// ============================================================================

/**
 * Sample data structure for authentication section
 */
export interface AuthenticationSampleData {
  _meta: {
    description: string;
    models: Array<{
      name: string;
      description: string;
      fields: Record<string, string>;
    }>;
  };
  users: User[];
  oauthProviders: OAuthProvider[];
  authErrors: AuthError[];
  formValidationStates: {
    login: {
      valid: LoginFormData & { errors: FormErrors };
      invalidEmail: LoginFormData & { errors: FormErrors };
      emptyFields: LoginFormData & { errors: FormErrors };
    };
    register: {
      valid: RegisterFormData & { errors: FormErrors };
      passwordMismatch: RegisterFormData & { errors: FormErrors };
      weakPassword: RegisterFormData & { errors: FormErrors };
      noRole: RegisterFormData & { errors: FormErrors };
    };
    passwordReset: {
      valid: PasswordResetRequestData & { errors: FormErrors };
      invalidEmail: PasswordResetRequestData & { errors: FormErrors };
    };
    profileCompletion: {
      technician: {
        valid: TechnicianProfileCompletionData & { errors: FormErrors };
        missingRequired: TechnicianProfileCompletionData & { errors: FormErrors };
        invalidRateRange: TechnicianProfileCompletionData & { errors: FormErrors };
      };
      company: {
        valid: CompanyProfileCompletionData & { errors: FormErrors };
        missingRequired: CompanyProfileCompletionData & { errors: FormErrors };
      };
    };
  };
  authenticationStates: {
    unauthenticated: AuthenticationState;
    loading: AuthenticationState;
    authenticatedComplete: AuthenticationState;
    authenticatedPendingVerification: AuthenticationState;
    authenticatedPendingProfile: AuthenticationState;
  };
  confirmationMessages: {
    magicLinkSent: ConfirmationMessage;
    passwordResetSent: ConfirmationMessage;
    emailVerificationSent: ConfirmationMessage;
    profileCompletionRequired: ConfirmationMessage;
  };
}

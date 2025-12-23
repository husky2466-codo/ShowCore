/**
 * AI Assistant Types
 *
 * Type definitions for the AI Assistant widget that appears globally in the shell.
 * The assistant provides contextual help, answers questions, and guides users through tasks.
 */

// ============================================================================
// Message Types
// ============================================================================

/**
 * Message sender type
 */
export type MessageSender = 'user' | 'assistant';

/**
 * Message content type
 */
export type MessageContentType = 'text' | 'action' | 'suggestion';

/**
 * Individual message in conversation
 */
export interface AIMessage {
  id: string;
  sender: MessageSender;
  content: string;
  contentType: MessageContentType;
  timestamp: string; // ISO datetime
  relativeTime: string; // e.g., "Just now", "2 minutes ago"
  actions?: SuggestedAction[];
  isTyping?: boolean; // For assistant typing indicator
}

// ============================================================================
// Action Types
// ============================================================================

/**
 * Action types the assistant can execute
 */
export type SuggestedActionType =
  | 'navigate'    // Navigate to a route within the app
  | 'external'    // Open external link in new tab
  | 'modal'       // Open a modal dialog
  | 'inline'      // Inline action with description
  | 'fill_field'  // Fill a single form field
  | 'fill_form'   // Fill multiple form fields at once
  | 'click'       // Click an element
  | 'submit';     // Submit a form

/**
 * Suggested action that assistant can recommend
 */
export interface SuggestedAction {
  id: string;
  label: string;
  type: SuggestedActionType;
  url?: string; // For navigate and external types
  icon?: string;
  description?: string;
  // Form action properties
  fieldId?: string;                     // Target field ID for fill_field
  fieldValue?: string;                  // Value to fill
  formFields?: Record<string, string>;  // Multiple fields for fill_form
  elementId?: string;                   // Target element for click/submit
}

// ============================================================================
// Assistant State Types
// ============================================================================

/**
 * AI Assistant panel state
 */
export type AssistantState = 'closed' | 'minimized' | 'open';

/**
 * AI Assistant context awareness
 */
export interface AssistantContext {
  currentPage: string; // e.g., "/dashboard", "/bookings", "/settings"
  userRole: 'technician' | 'company';
  userId: string;
  onboardingComplete: boolean;
  recentActions?: string[]; // Recent user actions for context
}

/**
 * AI conversation thread
 */
export interface AIConversation {
  id: string;
  messages: AIMessage[];
  context: AssistantContext;
  createdAt: string;
  lastMessageAt: string;
}

// ============================================================================
// Quick Action Types
// ============================================================================

/**
 * Quick action button for common tasks
 */
export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  prompt: string; // Pre-filled prompt when clicked
  category: 'onboarding' | 'help' | 'navigation' | 'tasks';
}

// ============================================================================
// Component Props Types
// ============================================================================

/**
 * AI Assistant Widget props (main container)
 */
export interface AIAssistantWidgetProps {
  state: AssistantState;
  conversation: AIConversation;
  quickActions: QuickAction[];
  onStateChange: (state: AssistantState) => void;
  onSendMessage: (message: string) => Promise<void>;
  onActionClick: (action: SuggestedAction) => void;
  onQuickActionClick: (quickAction: QuickAction) => void;
  isTyping?: boolean;
}

/**
 * AI Assistant Button props (floating button)
 */
export interface AIAssistantButtonProps {
  state: AssistantState;
  hasUnreadMessages?: boolean;
  onClick: () => void;
}

/**
 * AI Assistant Panel props (expanded chat)
 */
export interface AIAssistantPanelProps {
  conversation: AIConversation;
  quickActions: QuickAction[];
  isTyping?: boolean;
  onSendMessage: (message: string) => Promise<void>;
  onActionClick: (action: SuggestedAction) => void;
  onQuickActionClick: (quickAction: QuickAction) => void;
  onMinimize: () => void;
  onClose: () => void;
}

/**
 * AI Message bubble props
 */
export interface AIMessageBubbleProps {
  message: AIMessage;
  onActionClick: (action: SuggestedAction) => void;
}

/**
 * AI Message input props
 */
export interface AIMessageInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isTyping?: boolean;
  placeholder?: string;
}

/**
 * Quick actions grid props
 */
export interface QuickActionsGridProps {
  actions: QuickAction[];
  onActionClick: (quickAction: QuickAction) => void;
}

// ============================================================================
// Sample Data Types
// ============================================================================

/**
 * Sample conversation data for AI Assistant
 */
export interface AIAssistantSampleData {
  _meta: {
    description: string;
    models: Array<{
      name: string;
      description: string;
      fields: Record<string, string>;
    }>;
  };
  technicianConversation: AIConversation;
  companyConversation: AIConversation;
  technicianQuickActions: QuickAction[];
  companyQuickActions: QuickAction[];
  sampleMessages: {
    welcomeMessage: AIMessage;
    onboardingHelp: AIMessage;
    bookingHelp: AIMessage;
    showProofHelp: AIMessage;
  };
}

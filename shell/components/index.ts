export { AppShell, type AppShellProps } from './AppShell'
export { MainNav, type NavItem } from './MainNav'
export { UserMenu, type User } from './UserMenu'
export { AIActionConfirmDialog } from './AIActionConfirmDialog'
export {
  AIAssistantWidget,
  type AIAssistantWidgetProps,
  type AIAssistantState,
  type AssistantState,
  type SuggestedAction,
  type AIMessage,
  type AssistantContext,
  type AIConversation,
  type QuickAction,
} from './AIAssistant'
export {
  useNavigationBadges,
  markSectionVisited,
  isSectionVisited,
  clearVisitedSections,
} from '../hooks/useNavigationBadges'
export {
  useAIActionField,
  useAIActionFields,
} from '../hooks/useAIActionField'
export {
  AIActionProvider,
  useAIActions,
  useAIActionsOptional,
  type PendingAction,
} from '../context/AIActionContext'

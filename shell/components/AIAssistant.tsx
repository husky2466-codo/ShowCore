import { useState, useRef, useEffect } from 'react';
import { X, Minus, Send, Sparkles, ArrowRight, Pencil, FileText, MousePointer } from 'lucide-react';
import { useAIActionsOptional } from '../context/AIActionContext';

// Import types from the product types file
// In a real implementation, these would be moved to a shared types location
export type AssistantState = 'closed' | 'minimized' | 'open';

export interface SuggestedAction {
  id: string;
  label: string;
  type: 'navigate' | 'external' | 'modal' | 'inline' | 'fill_field' | 'fill_form' | 'click' | 'submit';
  url?: string;
  icon?: string;
  description?: string;
  // Form action properties
  fieldId?: string;                     // Target field ID for fill_field
  fieldValue?: string;                  // Value to fill
  formFields?: Record<string, string>;  // Multiple fields for fill_form
  elementId?: string;                   // Target element for click/submit
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  contentType: 'text' | 'action' | 'suggestion';
  timestamp: string;
  relativeTime: string;
  actions?: SuggestedAction[];
  isTyping?: boolean;
}

export interface AssistantContext {
  currentPage: string;
  userRole: 'technician' | 'company';
  userId: string;
  onboardingComplete: boolean;
  recentActions?: string[];
}

export interface AIConversation {
  id: string;
  messages: AIMessage[];
  context: AssistantContext;
  createdAt: string;
  lastMessageAt: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  prompt: string;
  category: 'onboarding' | 'help' | 'navigation' | 'tasks';
}

export interface AIAssistantState {
  state: AssistantState;
  conversation: AIConversation;
  quickActions: QuickAction[];
  isTyping?: boolean;
}

export interface AIAssistantWidgetProps {
  assistantState: AIAssistantState;
  onStateChange: (state: AssistantState) => void;
  onSendMessage: (message: string) => Promise<void>;
  onActionClick: (action: SuggestedAction) => void;
  onQuickActionClick?: (quickAction: QuickAction) => void;
}

/**
 * AI Assistant Widget
 *
 * Provides a floating chat interface with the AI assistant.
 * Can be in three states: closed, minimized, or open.
 */
export function AIAssistantWidget({
  assistantState,
  onStateChange,
  onSendMessage,
  onActionClick,
  onQuickActionClick,
}: AIAssistantWidgetProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const aiActions = useAIActionsOptional();

  // Handle action click - execute via context if available, otherwise fallback to callback
  const handleActionClick = async (action: SuggestedAction) => {
    if (aiActions && (action.type === 'fill_field' || action.type === 'fill_form' || action.type === 'navigate')) {
      await aiActions.executeAction(action);
    }
    onActionClick(action);
  };

  // Get icon for action type
  const getActionIcon = (type: SuggestedAction['type']) => {
    switch (type) {
      case 'navigate':
        return <ArrowRight className="h-3 w-3" />;
      case 'fill_field':
      case 'fill_form':
        return <Pencil className="h-3 w-3" />;
      case 'submit':
        return <FileText className="h-3 w-3" />;
      case 'click':
        return <MousePointer className="h-3 w-3" />;
      default:
        return null;
    }
  };

  // Get button style for action type
  const getActionStyle = (type: SuggestedAction['type']) => {
    switch (type) {
      case 'fill_field':
      case 'fill_form':
        return 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-100 border border-amber-400/30';
      case 'navigate':
        return 'bg-white/10 hover:bg-white/20';
      default:
        return 'bg-white/10 hover:bg-white/20';
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [assistantState.conversation.messages]);

  // Focus input when opening
  useEffect(() => {
    if (assistantState.state === 'open') {
      inputRef.current?.focus();
    }
  }, [assistantState.state]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const message = inputValue;
    setInputValue('');
    await onSendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (assistantState.state === 'closed') {
    return (
      <button
        onClick={() => onStateChange('open')}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg transition-all hover:bg-amber-600 hover:scale-105"
        aria-label="Open AI Assistant"
      >
        <Sparkles className="h-6 w-6" />
      </button>
    );
  }

  if (assistantState.state === 'minimized') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => onStateChange('open')}
          className="flex items-center gap-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 shadow-lg transition-all hover:shadow-xl"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            AI Assistant
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStateChange('closed');
            }}
            className="ml-2 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Close AI Assistant"
          >
            <X className="h-4 w-4 text-zinc-500" />
          </button>
        </button>
      </div>
    );
  }

  // Open state - full chat panel
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col w-96 h-[600px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              AI Assistant
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Always here to help
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onStateChange('minimized')}
            className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
            aria-label="Minimize"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            onClick={() => onStateChange('closed')}
            className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {assistantState.conversation.messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-500/10 mb-4">
              <Sparkles className="h-8 w-8 text-amber-500" />
            </div>
            <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              How can I help you today?
            </h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Ask me anything about ShowCore, your bookings, or how to use the platform.
            </p>
            {/* Quick Actions */}
            {assistantState.quickActions.length > 0 && (
              <div className="grid grid-cols-2 gap-2 w-full">
                {assistantState.quickActions.slice(0, 4).map((action) => (
                  <button
                    key={action.id}
                    onClick={() => onQuickActionClick?.(action)}
                    className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-left transition-colors"
                  >
                    <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                      {action.label}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {assistantState.conversation.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-amber-500 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              {message.actions && message.actions.length > 0 && (
                <div className="mt-2 space-y-1">
                  {message.actions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleActionClick(action)}
                      className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-colors ${getActionStyle(action.type)}`}
                    >
                      {getActionIcon(action.type)}
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
              <p className="text-xs opacity-70 mt-1">{message.relativeTime}</p>
            </div>
          </div>
        ))}

        {assistantState.isTyping && (
          <div className="flex justify-start">
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            disabled={assistantState.isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || assistantState.isTyping}
            className="flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

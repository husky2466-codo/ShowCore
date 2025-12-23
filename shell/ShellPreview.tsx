import { useState } from 'react'
import { Home, Search, Calendar, Award, Star, BarChart3, Settings, HelpCircle } from 'lucide-react'
import { AppShell } from './components/AppShell'
import { useAIActionField, useAIActionsOptional } from './components'
import type { NavItem } from './components/MainNav'
import type { AIAssistantState, SuggestedAction } from './components/AIAssistant'

/**
 * Demo form component that registers fields with the AI Action system
 */
function DemoProfileForm() {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')

  // Register fields for AI targeting
  const nameField = useAIActionField('profile.name', setName, { label: 'Full Name' })
  const bioField = useAIActionField<HTMLTextAreaElement>('profile.bio', setBio, { label: 'Professional Bio' })
  const locationField = useAIActionField('profile.location', setLocation, { label: 'Location' })
  const rateField = useAIActionField('profile.hourlyRate', setHourlyRate, { label: 'Hourly Rate' })

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
        Complete Your Profile
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        Try asking the AI assistant to help fill this form!
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Full Name
          </label>
          <input
            ref={nameField.ref}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Professional Bio
          </label>
          <textarea
            ref={bioField.ref}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about your experience"
            rows={3}
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Location
            </label>
            <input
              ref={locationField.ref}
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, State"
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Hourly Rate ($)
            </label>
            <input
              ref={rateField.ref}
              type="text"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="75"
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <button
          type="button"
          className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-md transition-colors"
        >
          Save Profile
        </button>
      </div>
    </div>
  )
}

export default function ShellPreview() {
  const navigationItems: NavItem[] = [
    { label: 'Dashboard', href: '/', icon: Home },
    { label: 'Technician Discovery', href: '/discovery', icon: Search, isActive: true },
    { label: 'Bookings & Messaging', href: '/bookings', icon: Calendar },
    { label: 'Show Proof & XP', href: '/show-proof', icon: Award },
    { label: 'Reviews & Trust', href: '/reviews', icon: Star },
    { label: 'Market Analytics', href: '/analytics', icon: BarChart3 },
    { label: '', href: '', icon: Search, isDivider: true },
    { label: 'Settings', href: '/settings', icon: Settings },
    { label: 'Help', href: '/help', icon: HelpCircle },
  ]

  const user = {
    name: 'Alex Morgan',
    email: 'alex@example.com',
    avatarUrl: undefined,
  }

  const [aiState, setAiState] = useState<AIAssistantState>({
    state: 'closed',
    conversation: {
      id: 'conv-1',
      messages: [
        {
          id: 'msg-1',
          sender: 'assistant',
          content: "Hi! I'm your ShowCore assistant. I can help you complete your profile, find technicians, and navigate the platform. Try asking me to help fill out your profile!",
          contentType: 'text',
          timestamp: new Date().toISOString(),
          relativeTime: 'Just now',
        },
      ],
      context: {
        currentPage: '/discovery',
        userRole: 'technician',
        userId: 'user-1',
        onboardingComplete: false,
      },
      createdAt: new Date().toISOString(),
      lastMessageAt: new Date().toISOString(),
    },
    quickActions: [
      { id: 'qa-1', label: 'Complete Profile', icon: 'User', prompt: 'Help me complete my profile', category: 'onboarding' },
      { id: 'qa-2', label: 'Find Technicians', icon: 'Search', prompt: 'Find technicians', category: 'navigation' },
      { id: 'qa-3', label: 'View Bookings', icon: 'Calendar', prompt: 'Show my bookings', category: 'navigation' },
      { id: 'qa-4', label: 'Get Help', icon: 'HelpCircle', prompt: 'I need help', category: 'help' },
    ],
    isTyping: false,
  })

  const handleAiStateChange = (newState: 'closed' | 'minimized' | 'open') => {
    setAiState(prev => ({ ...prev, state: newState }))
  }

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      content: message,
      contentType: 'text' as const,
      timestamp: new Date().toISOString(),
      relativeTime: 'Just now',
    }
    setAiState(prev => ({
      ...prev,
      conversation: {
        ...prev.conversation,
        messages: [...prev.conversation.messages, userMsg],
      },
      isTyping: true,
    }))

    // Check if message is about profile/form filling
    const isProfileRelated = message.toLowerCase().includes('profile') ||
      message.toLowerCase().includes('fill') ||
      message.toLowerCase().includes('complete')

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = isProfileRelated ? {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant' as const,
        content: "I'd be happy to help you complete your profile! I can fill in your profile information with suggested values. Click the button below to see a preview of what I'll fill in.",
        contentType: 'text' as const,
        timestamp: new Date().toISOString(),
        relativeTime: 'Just now',
        actions: [
          {
            id: 'action-fill-profile',
            label: 'Fill Profile Info',
            type: 'fill_form' as const,
            icon: 'Pencil',
            description: 'Fill in profile fields with suggested values',
            formFields: {
              'profile.name': 'Alex Morgan',
              'profile.bio': 'Experienced audio engineer with 10+ years in live events. Specialized in large venue sound systems and corporate conferences.',
              'profile.location': 'Los Angeles, CA',
              'profile.hourlyRate': '85',
            },
          },
          {
            id: 'action-navigate-settings',
            label: 'Go to Settings',
            type: 'navigate' as const,
            url: '/settings',
          },
        ],
      } : {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant' as const,
        content: "I can help with that! What would you like to do? You can ask me to help complete your profile, find technicians, or navigate to different sections of the app.",
        contentType: 'text' as const,
        timestamp: new Date().toISOString(),
        relativeTime: 'Just now',
        actions: [
          {
            id: 'action-navigate-settings',
            label: 'Go to Settings',
            type: 'navigate' as const,
            url: '/settings',
          },
        ],
      }

      setAiState(prev => ({
        ...prev,
        conversation: {
          ...prev.conversation,
          messages: [...prev.conversation.messages, aiResponse],
        },
        isTyping: false,
      }))
    }, 1500)
  }

  const handleActionClick = async (action: SuggestedAction) => {
    // The action will be handled by the AIActionContext via executeAction
    // We need to get access to it, but since this component is outside the provider,
    // we pass the action to a child component that can handle it
    console.log('Action clicked:', action)

    // For navigation actions, we can handle them directly
    if (action.type === 'navigate' && action.url) {
      console.log('Navigate to:', action.url)
    }
  }

  const handleQuickActionClick = (action: { prompt: string }) => {
    // Send the quick action's prompt as a message
    handleSendMessage(action.prompt)
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={user}
      notificationCount={3}
      onNavigate={(href) => console.log('Navigate to:', href)}
      onLogout={() => console.log('Logout')}
      onNotificationsClick={() => console.log('Open notifications')}
      showAIAssistant={true}
      aiAssistantState={aiState}
      onAIAssistantStateChange={handleAiStateChange}
      onAIAssistantSendMessage={handleSendMessage}
      onAIAssistantActionClick={handleActionClick}
      onAIAssistantQuickActionClick={handleQuickActionClick}
    >
      <div className="p-6 sm:p-8">
        <div className="max-w-4xl">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            AI Assistant Demo
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Click the AI Assistant button in the bottom right and ask it to help fill your profile!
          </p>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Demo Profile Form */}
            <DemoProfileForm />

            {/* Instructions */}
            <div className="rounded-lg border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10 p-6">
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-4">
                How to Test
              </h3>
              <ol className="space-y-3 text-sm text-amber-700 dark:text-amber-300">
                <li className="flex gap-2">
                  <span className="font-bold">1.</span>
                  <span>Click the sparkle button in the bottom right corner</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">2.</span>
                  <span>Type "Help me complete my profile" or click "Complete Profile"</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">3.</span>
                  <span>Click "Fill Profile Info" in the AI response</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">4.</span>
                  <span>Review the values in the confirmation dialog</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">5.</span>
                  <span>Click "Fill Fields" to populate the form!</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

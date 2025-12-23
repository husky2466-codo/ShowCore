import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Home, Search, Calendar, Award, Star, BarChart3, Settings, HelpCircle } from 'lucide-react'
import { AppShell } from './shell/AppShell'
import type { NavItem } from './shell/MainNav'

export function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const navigationItems: NavItem[] = [
    { label: 'Dashboard', href: '/', icon: Home, isActive: location.pathname === '/' },
    { label: 'Discover', href: '/discovery', icon: Search, isActive: location.pathname === '/discovery' },
    { label: 'Bookings', href: '/bookings', icon: Calendar, isActive: location.pathname === '/bookings' },
    { label: 'Show Proof', href: '/show-proof', icon: Award, isActive: location.pathname === '/show-proof' },
    { label: 'Reviews', href: '/reviews', icon: Star, isActive: location.pathname === '/reviews' },
    { label: 'Analytics', href: '/analytics', icon: BarChart3, isActive: location.pathname === '/analytics' },
    { label: '', href: '', icon: Search, isDivider: true },
    { label: 'Settings', href: '/settings', icon: Settings, isActive: location.pathname === '/settings' },
    { label: 'Help', href: '/help', icon: HelpCircle },
  ]

  const currentUser = {
    name: 'Demo User',
    email: 'demo@showcore.com',
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={currentUser}
      notificationCount={3}
      onNavigate={(href) => navigate(href)}
      onLogout={() => console.log('Logout')}
      onNotificationsClick={() => console.log('Notifications')}
      showAIAssistant={false}
    >
      <Outlet />
    </AppShell>
  )
}

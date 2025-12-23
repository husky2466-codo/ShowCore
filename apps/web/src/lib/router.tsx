import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { DiscoveryPage } from '@/pages/DiscoveryPage'
import { BookingsPage } from '@/pages/BookingsPage'
import { ShowProofPage } from '@/pages/ShowProofPage'
import { ReviewsPage } from '@/pages/ReviewsPage'
import { AnalyticsPage } from '@/pages/AnalyticsPage'
import { SettingsPage } from '@/pages/SettingsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'discovery', element: <DiscoveryPage /> },
      { path: 'bookings', element: <BookingsPage /> },
      { path: 'show-proof', element: <ShowProofPage /> },
      { path: 'reviews', element: <ReviewsPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])

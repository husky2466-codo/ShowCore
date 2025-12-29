import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Simple test component
function SimpleApp() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-amber-600 mb-4">ShowCore Test</h1>
      <p className="text-lg text-gray-700 mb-4">
        ✅ React is working!
      </p>
      <p className="text-lg text-gray-700 mb-4">
        ✅ Tailwind CSS is working!
      </p>
      <div className="bg-amber-100 border border-amber-400 text-amber-700 px-4 py-3 rounded">
        If you can see this styled content, the basic setup is working.
        The issue might be with routing, authentication, or complex components.
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SimpleApp />
  </StrictMode>,
)
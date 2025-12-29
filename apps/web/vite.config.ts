import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['lucide-react'],
          'form-vendor': ['react-hook-form', 'zod'],
          'i18n-vendor': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          'query-vendor': ['@tanstack/react-query'],
          'trpc-vendor': ['@trpc/client', '@trpc/react-query'],
          'auth-vendor': ['@clerk/clerk-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})

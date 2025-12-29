import React from 'react'

interface LogoProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ variant = 'light', size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8', 
    lg: 'h-10'
  }

  const logoSrc = variant === 'light' ? '/logo/showcore-logo.png' : '/logo/showcore-logo-white.png'

  return (
    <img
      src={logoSrc}
      alt="ShowCore"
      className={`w-auto ${sizeClasses[size]} ${className}`}
    />
  )
}
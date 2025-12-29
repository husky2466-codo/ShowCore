import { useEffect, useRef, ReactNode, useCallback } from 'react'
import { createPortal } from 'react-dom'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  /**
   * Title for screen readers (aria-label)
   */
  ariaLabel?: string
  /**
   * ID of the element that labels the modal (aria-labelledby)
   */
  ariaLabelledBy?: string
  /**
   * ID of the element that describes the modal (aria-describedby)
   */
  ariaDescribedBy?: string
  /**
   * Whether clicking the backdrop should close the modal
   */
  closeOnBackdropClick?: boolean
  /**
   * Whether pressing Escape should close the modal
   */
  closeOnEscape?: boolean
  /**
   * Additional CSS classes for the backdrop
   */
  backdropClassName?: string
  /**
   * Additional CSS classes for the modal container
   */
  className?: string
  /**
   * The initial element to focus when the modal opens
   */
  initialFocusRef?: React.RefObject<HTMLElement>
}

/**
 * Accessible Modal Component
 *
 * Features:
 * - Proper ARIA attributes (role="dialog", aria-modal="true")
 * - Focus trapping within the modal
 * - Sets inert attribute on main content when open
 * - Returns focus to the triggering element when closed
 * - Closes on Escape key press
 * - Closes on backdrop click (configurable)
 * - Renders via portal to avoid z-index issues
 */
export function Modal({
  isOpen,
  onClose,
  children,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  backdropClassName = '',
  className = '',
  initialFocusRef,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  // Get all focusable elements within the modal
  const getFocusableElements = useCallback(() => {
    if (!modalRef.current) return []

    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ')

    return Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
    )
  }, [])

  // Handle keyboard events for focus trapping and escape
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return

    // Close on Escape
    if (event.key === 'Escape' && closeOnEscape) {
      event.preventDefault()
      onClose()
      return
    }

    // Focus trap on Tab
    if (event.key === 'Tab') {
      const focusableElements = getFocusableElements()
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        // Shift + Tab: going backwards
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab: going forwards
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }
  }, [isOpen, closeOnEscape, onClose, getFocusableElements])

  // Set up and clean up modal effects
  useEffect(() => {
    const rootElement = document.getElementById('root')

    if (isOpen) {
      // Store the currently focused element to restore later
      previousActiveElement.current = document.activeElement as HTMLElement

      // Set inert on the main content to hide it from screen readers
      // and prevent interaction while modal is open
      if (rootElement) {
        rootElement.setAttribute('inert', '')
        rootElement.setAttribute('aria-hidden', 'true')
      }

      // Prevent body scroll
      document.body.style.overflow = 'hidden'

      // Focus the modal or initial focus element
      requestAnimationFrame(() => {
        if (initialFocusRef?.current) {
          initialFocusRef.current.focus()
        } else {
          // Focus the first focusable element or the modal itself
          const focusableElements = getFocusableElements()
          if (focusableElements.length > 0) {
            focusableElements[0].focus()
          } else {
            modalRef.current?.focus()
          }
        }
      })

      // Add keyboard event listener
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      // Clean up
      if (rootElement) {
        rootElement.removeAttribute('inert')
        rootElement.removeAttribute('aria-hidden')
      }

      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)

      // Restore focus to the previously focused element
      if (previousActiveElement.current && isOpen) {
        previousActiveElement.current.focus()
      }
    }
  }, [isOpen, getFocusableElements, handleKeyDown, initialFocusRef])

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${backdropClassName}`}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
        className={`focus:outline-none ${className}`}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal

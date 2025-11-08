import React, { forwardRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Box } from './box'

// MUI Drawer component interface
export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  // MUI specific props
  open?: boolean
  onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void
  anchor?: 'left' | 'top' | 'right' | 'bottom'
  variant?: 'temporary' | 'persistent' | 'permanent'
  PaperProps?: {
    sx?: object
    className?: string
    [key: string]: any
  }
  hideBackdrop?: boolean
  disableEscapeKeyDown?: boolean
  disableBackdropClick?: boolean
  sx?: object
  children?: React.ReactNode
}

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({
    open = false,
    onClose,
    anchor = 'left',
    variant = 'temporary',
    PaperProps = {},
    hideBackdrop = false,
    disableEscapeKeyDown = false,
    disableBackdropClick = false,
    sx,
    children,
    className,
    ...props
  }, ref) => {

    const [internalOpen, setInternalOpen] = useState(open)

    // Sync internal state with prop
    useEffect(() => {
      setInternalOpen(open)
    }, [open])

    const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
      if (disableBackdropClick && reason === 'backdropClick') return
      if (disableEscapeKeyDown && reason === 'escapeKeyDown') return
      setInternalOpen(false)
      onClose?.(event, reason)
    }

    // Handle escape key
    useEffect(() => {
      if (!disableEscapeKeyDown && internalOpen) {
        const handleEscape = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            handleClose(event, 'escapeKeyDown')
          }
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
      }
    }, [internalOpen, disableEscapeKeyDown, onClose])

    if (!internalOpen) return null

    // Get drawer positioning classes based on anchor
    const getDrawerClasses = () => {
      const baseClasses = [
        'fixed bg-white shadow-xl',
        'transform transition-transform duration-300 ease-in-out',
        'z-50'
      ]

      switch (anchor) {
        case 'left':
          return [
            ...baseClasses,
            'left-0 top-0 h-full',
            internalOpen ? 'translate-x-0' : '-translate-x-full'
          ]
        case 'right':
          return [
            ...baseClasses,
            'right-0 top-0 h-full',
            internalOpen ? 'translate-x-0' : 'translate-x-full'
          ]
        case 'top':
          return [
            ...baseClasses,
            'top-0 left-0 w-full',
            internalOpen ? 'translate-y-0' : '-translate-y-full'
          ]
        case 'bottom':
          return [
            ...baseClasses,
            'bottom-0 left-0 w-full',
            internalOpen ? 'translate-y-0' : 'translate-y-full'
          ]
        default:
          return baseClasses
      }
    }

    // Merge PaperProps styles
    const paperStyles = PaperProps.sx || {}
    const paperClassName = PaperProps.className || ''

    // Convert sx props to inline styles
    const drawerStyles = { ...paperStyles, ...sx }

    return (
      <>
        {/* Backdrop */}
        {!hideBackdrop && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40"
            onClick={() => !disableBackdropClick && handleClose({}, 'backdropClick')}
          />
        )}

        {/* Drawer */}
        <Box
          ref={ref}
          className={cn(
            getDrawerClasses(),
            paperClassName,
            className
          )}
          sx={drawerStyles}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          {children}
        </Box>
      </>
    )
  }
)

Drawer.displayName = 'Drawer'

export { Drawer }
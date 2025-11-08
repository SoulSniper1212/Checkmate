import React, { forwardRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Box } from './box'

// MUI Dialog component interfaces
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  // MUI specific props
  open?: boolean
  onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  fullWidth?: boolean
  fullScreen?: boolean
  scroll?: 'body' | 'paper'
  hideBackdrop?: boolean
  disableEscapeKeyDown?: boolean
  disableBackdropClick?: boolean
  sx?: object
  children?: React.ReactNode
}

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  // MUI specific props
  id?: string
  sx?: object
  children?: React.ReactNode
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  // MUI specific props
  dividers?: boolean
  sx?: object
  children?: React.ReactNode
}

export interface DialogActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  // MUI specific props
  disableSpacing?: boolean
  sx?: object
  children?: React.ReactNode
}

// Dialog main component
const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({
    open = false,
    onClose,
    maxWidth = 'sm',
    fullWidth = false,
    fullScreen = false,
    scroll = 'paper',
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

    // Map MUI maxWidth to Tailwind classes
    const getMaxWidthClasses = () => {
      if (fullScreen) return 'max-w-none w-full h-full m-0 rounded-none'
      if (!maxWidth) return 'max-w-none'
      switch (maxWidth) {
        case 'xs':
          return 'max-w-xs'
        case 'sm':
          return 'max-w-sm'
        case 'md':
          return 'max-w-md'
        case 'lg':
          return 'max-w-lg'
        case 'xl':
          return 'max-w-xl'
        default:
          return 'max-w-sm'
      }
    }

    // Build dialog classes
    const dialogClasses = [
      'bg-white rounded-lg shadow-xl',
      'relative z-50',
      'transform transition-all duration-300',
      getMaxWidthClasses(),
      fullWidth && 'w-full',
      fullScreen ? 'w-full h-full m-0 rounded-none' : 'my-8 mx-auto',
      className
    ].filter(Boolean).join(' ')

    // Convert sx props to inline styles
    const dialogStyle = sx || {}

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        {!hideBackdrop && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => !disableBackdropClick && handleClose({}, 'backdropClick')}
          />
        )}

        {/* Dialog container */}
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            ref={ref}
            className={cn(dialogClasses)}
            style={dialogStyle}
            role="dialog"
            aria-modal="true"
            {...props}
          >
            <div className={scroll === 'body' ? 'overflow-visible' : 'overflow-auto max-h-[90vh]'}>
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

// DialogTitle component
const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, id, sx, children, ...props }, ref) => {

    // Build title classes
    const classes = [
      'text-lg font-semibold text-gray-900',
      'px-6 pt-6 pb-4',
      'border-b border-gray-200',
      className
    ].filter(Boolean).join(' ')

    // Convert sx props to inline styles
    const titleStyle = sx || {}

    return (
      <h2
        ref={ref}
        id={id}
        className={cn(classes)}
        style={titleStyle}
        {...props}
      >
        {children}
      </h2>
    )
  }
)

// DialogContent component
const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, dividers = false, sx, children, ...props }, ref) => {

    // Build content classes
    const classes = [
      'px-6 py-4',
      dividers && 'border-y border-gray-200',
      className
    ].filter(Boolean).join(' ')

    // Convert sx props to inline styles
    const contentStyle = sx || {}

    return (
      <div
        ref={ref}
        className={cn(classes)}
        style={contentStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// DialogActions component
const DialogActions = forwardRef<HTMLDivElement, DialogActionsProps>(
  ({ className, disableSpacing = false, sx, children, ...props }, ref) => {

    // Build actions classes
    const classes = [
      'px-6 py-4',
      'flex items-center',
      'justify-end',
      !disableSpacing && 'space-x-2',
      className
    ].filter(Boolean).join(' ')

    // Convert sx props to inline styles
    const actionsStyle = sx || {}

    return (
      <div
        ref={ref}
        className={cn(classes)}
        style={actionsStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Set display names
Dialog.displayName = 'Dialog'
DialogTitle.displayName = 'DialogTitle'
DialogContent.displayName = 'DialogContent'
DialogActions.displayName = 'DialogActions'

export { Dialog, DialogTitle, DialogContent, DialogActions }
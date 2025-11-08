import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// Popover component interfaces
export interface PopoverProps {
  // MUI specific props
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
  anchorEl?: HTMLElement | null
  anchorOrigin?: {
    vertical: 'top' | 'center' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
  }
  transformOrigin?: {
    vertical: 'top' | 'center' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
  }
  children: React.ReactNode
  className?: string
  sx?: object
}

export interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  children: React.ReactNode
}

export interface PopoverContentProps {
  children: React.ReactNode
  className?: string
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  sx?: object
}

// Popover context
const PopoverContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
}>({
  open: false,
  setOpen: () => {},
  triggerRef: { current: null }
})

// Popover root component
const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({
    open: controlledOpen,
    onOpenChange,
    defaultOpen = false,
    anchorEl,
    anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
    transformOrigin = { vertical: 'top', horizontal: 'left' },
    children,
    className,
    sx
  }, ref) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const triggerRef = useRef<HTMLElement>(null)

    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : internalOpen
    const setOpen = (newOpen: boolean) => {
      if (isControlled) {
        onOpenChange?.(newOpen)
      } else {
        setInternalOpen(newOpen)
        onOpenChange?.(newOpen)
      }
    }

    // Close popover when clicking outside
    useEffect(() => {
      if (!open) return

      const handleClickOutside = (event: MouseEvent) => {
        if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
          setOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open, setOpen])

    // Close popover on escape key
    useEffect(() => {
      if (!open) return

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setOpen(false)
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, setOpen])

    const popoverStyle = {
      ...sx,
      zIndex: 50,
    }

    return (
      <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
        <div ref={ref} className={cn('relative', className)} style={popoverStyle}>
          {children}
        </div>
      </PopoverContext.Provider>
    )
  }
)

// Popover trigger component
const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ asChild = false, children, ...props }, ref) => {
    const { open, setOpen, triggerRef } = React.useContext(PopoverContext)
    const internalRef = useRef<HTMLButtonElement>(null)

    // Set ref to both internal and provided ref
    React.useImperativeHandle(ref, () => internalRef.current!)
    React.useImperativeHandle(triggerRef, () => internalRef.current!)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setOpen(!open)
      props.onClick?.(event)
    }

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement
      return React.cloneElement(child, {
        ref: internalRef,
        onClick: handleClick,
        'aria-expanded': open,
        'aria-haspopup': 'true',
        ...props
      })
    }

    return (
      <button
        ref={internalRef}
        type="button"
        onClick={handleClick}
        aria-expanded={open}
        aria-haspopup="true"
        {...props}
      >
        {children}
      </button>
    )
  }
)

// Popover content component
const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({
    children,
    className,
    align = 'center',
    side = 'bottom',
    sideOffset = 4,
    sx
  }, ref) => {
    const { open, triggerRef } = React.useContext(PopoverContext)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const contentRef = useRef<HTMLDivElement>(null)

    // Calculate position based on trigger element
    useEffect(() => {
      if (!open || !triggerRef.current || !contentRef.current) return

      const trigger = triggerRef.current
      const content = contentRef.current
      const triggerRect = trigger.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()

      let top = 0
      let left = 0

      // Calculate vertical position
      switch (side) {
        case 'top':
          top = triggerRect.top - contentRect.height - sideOffset
          break
        case 'bottom':
          top = triggerRect.bottom + sideOffset
          break
        default:
          top = triggerRect.bottom + sideOffset
      }

      // Calculate horizontal position
      switch (align) {
        case 'start':
          left = triggerRect.left
          break
        case 'center':
          left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
          break
        case 'end':
          left = triggerRect.right - contentRect.width
          break
        default:
          left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
      }

      // Ensure content stays within viewport
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      if (left < 8) left = 8
      if (left + contentRect.width > viewportWidth - 8) {
        left = viewportWidth - contentRect.width - 8
      }

      if (top < 8) top = 8
      if (top + contentRect.height > viewportHeight - 8) {
        top = triggerRect.top - contentRect.height - sideOffset
      }

      setPosition({ top, left })
    }, [open, align, side, sideOffset, triggerRef])

    if (!open) return null

    const contentStyle = {
      position: 'fixed' as const,
      top: `${position.top}px`,
      left: `${position.left}px`,
      ...sx
    }

    return (
      <div
        ref={contentRef}
        className={cn(
          'z-50 w-72 rounded-md border bg-white p-4 text-gray-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        style={contentStyle}
      >
        {children}
      </div>
    )
  }
)

Popover.displayName = 'Popover'
PopoverTrigger.displayName = 'PopoverTrigger'
PopoverContent.displayName = 'PopoverContent'

export { Popover, PopoverTrigger, PopoverContent }
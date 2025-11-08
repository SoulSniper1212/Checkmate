import React, { forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'

// MUI Tooltip component interfaces
export interface TooltipProps {
  // MUI specific props
  title: React.ReactNode
  placement?: 'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start' | 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start' | 'top'
  arrow?: boolean
  disableFocusListener?: boolean
  disableHoverListener?: boolean
  disableTouchListener?: boolean
  enterDelay?: number
  leaveDelay?: number
  onClose?: () => void
  onOpen?: () => void
  open?: boolean
  sx?: object
  children: React.ReactElement<any, any>
}

// Tooltip component
const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({
    title,
    placement = 'bottom',
    arrow = true,
    disableFocusListener = false,
    disableHoverListener = false,
    disableTouchListener = false,
    enterDelay = 100,
    leaveDelay = 0,
    onClose,
    onOpen,
    open: controlledOpen,
    sx,
    children
  }, ref) => {

    const [internalOpen, setInternalOpen] = useState(false)
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

    const isControlled = controlledOpen !== undefined
    const isOpen = isControlled ? controlledOpen : internalOpen

    const handleOpen = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      const newTimeoutId = setTimeout(() => {
        setInternalOpen(true)
        onOpen?.()
      }, enterDelay)
      setTimeoutId(newTimeoutId)
    }

    const handleClose = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      const newTimeoutId = setTimeout(() => {
        setInternalOpen(false)
        onClose?.()
      }, leaveDelay)
      setTimeoutId(newTimeoutId)
    }

    const getPlacementClasses = () => {
      switch (placement) {
        case 'top':
          return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
        case 'top-start':
          return 'bottom-full left-0 mb-2'
        case 'top-end':
          return 'bottom-full right-0 mb-2'
        case 'bottom':
          return 'top-full left-1/2 transform -translate-x-1/2 mt-2'
        case 'bottom-start':
          return 'top-full left-0 mt-2'
        case 'bottom-end':
          return 'top-full right-0 mt-2'
        case 'left':
          return 'right-full top-1/2 transform -translate-y-1/2 mr-2'
        case 'left-start':
          return 'right-full top-0 mr-2'
        case 'left-end':
          return 'right-full bottom-0 mr-2'
        case 'right':
          return 'left-full top-1/2 transform -translate-y-1/2 ml-2'
        case 'right-start':
          return 'left-full top-0 ml-2'
        case 'right-end':
          return 'left-full bottom-0 ml-2'
        default:
          return 'top-full left-1/2 transform -translate-x-1/2 mt-2'
      }
    }

    const getArrowClasses = () => {
      switch (placement) {
        case 'top':
        case 'top-start':
        case 'top-end':
          return 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full'
        case 'bottom':
        case 'bottom-start':
        case 'bottom-end':
          return 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full'
        case 'left':
        case 'left-start':
        case 'left-end':
          return 'right-0 top-1/2 transform -translate-y-1/2 translate-x-full'
        case 'right':
        case 'right-start':
        case 'right-end':
          return 'left-0 top-1/2 transform -translate-y-1/2 -translate-x-full'
        default:
          return 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full'
      }
    }

    const getArrowRotation = () => {
      switch (placement) {
        case 'top':
        case 'top-start':
        case 'top-end':
          return 'rotate-0'
        case 'bottom':
        case 'bottom-start':
        case 'bottom-end':
          return 'rotate-180'
        case 'left':
        case 'left-start':
        case 'left-end':
          return '-rotate-90'
        case 'right':
        case 'right-start':
        case 'right-end':
          return 'rotate-90'
        default:
          return 'rotate-180'
      }
    }

    const tooltipStyle = sx || {}

    const childElement = React.cloneElement(children, {
      ...children.props,
      onMouseEnter: disableHoverListener ? undefined : handleOpen,
      onMouseLeave: disableHoverListener ? undefined : handleClose,
      onFocus: disableFocusListener ? undefined : handleOpen,
      onBlur: disableFocusListener ? undefined : handleClose,
      onTouchStart: disableTouchListener ? undefined : handleOpen,
      onTouchEnd: disableTouchListener ? undefined : handleClose,
    })

    return (
      <div ref={ref} className="relative inline-block">
        {childElement}

        {isOpen && (
          <div
            className={cn(
              'absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-lg',
              'pointer-events-none',
              'transition-opacity duration-200',
              isOpen ? 'opacity-100' : 'opacity-0',
              getPlacementClasses()
            )}
            style={tooltipStyle}
            role="tooltip"
          >
            {title}

            {arrow && (
              <div
                className={cn(
                  'absolute w-2 h-2 bg-gray-900',
                  getArrowClasses(),
                  getArrowRotation()
                )}
              >
                <div className="w-full h-full bg-gray-900 transform rotate-45"></div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)

Tooltip.displayName = 'Tooltip'

// Additional tooltip components for shadcn compatibility
const TooltipProvider = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props}>{children}</div>;
};

const TooltipTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, ...props }, ref) => {
    return (
      <button ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

TooltipTrigger.displayName = 'TooltipTrigger';

const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-lg pointer-events-none"
        {...props}
      >
        {children}
      </div>
    );
  }
);

TooltipContent.displayName = 'TooltipContent';

export { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent };
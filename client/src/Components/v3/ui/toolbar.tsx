import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Box } from './box'

// MUI Toolbar component interface
export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  // MUI specific props
  variant?: 'dense' | 'regular' | 'medium'
  disableGutters?: boolean
  sx?: object
  children?: React.ReactNode
}

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  ({
    className,
    variant = 'regular',
    disableGutters = false,
    sx,
    children,
    ...props
  }, ref) => {

    // Get variant classes
    const getVariantClasses = () => {
      switch (variant) {
        case 'dense':
          return 'min-h-[48px]'
        case 'regular':
          return 'min-h-[64px]'
        case 'medium':
          return 'min-h-[72px]'
        default:
          return 'min-h-[64px]'
      }
    }

    // Build Toolbar classes
    const toolbarClasses = [
      'flex items-center',
      getVariantClasses(),
      !disableGutters && 'px-4',
      className
    ].filter(Boolean).join(' ')

    // Convert sx props to inline styles
    const toolbarStyles = sx || {}

    return (
      <Box
        ref={ref}
        className={cn(toolbarClasses)}
        sx={toolbarStyles}
        role="toolbar"
        {...props}
      >
        {children}
      </Box>
    )
  }
)

Toolbar.displayName = 'Toolbar'

export { Toolbar }
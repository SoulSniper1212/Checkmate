import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Box } from './box'

// MUI AppBar component interface
export interface AppBarProps extends React.HTMLAttributes<HTMLDivElement> {
  // MUI specific props
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative'
  color?: 'default' | 'inherit' | 'primary' | 'secondary' | 'transparent'
  elevation?: number
  sx?: object
  children?: React.ReactNode
}

const AppBar = forwardRef<HTMLDivElement, AppBarProps>(
  ({
    className,
    position = 'fixed',
    color = 'primary',
    elevation = 4,
    sx,
    children,
    ...props
  }, ref) => {

    // Get position classes
    const getPositionClasses = () => {
      switch (position) {
        case 'fixed':
          return 'fixed top-0 left-0 right-0 z-50'
        case 'absolute':
          return 'absolute top-0 left-0 right-0'
        case 'sticky':
          return 'sticky top-0 z-50'
        case 'static':
          return 'static'
        case 'relative':
          return 'relative'
        default:
          return 'fixed top-0 left-0 right-0 z-50'
      }
    }

    // Get color/background classes
    const getColorClasses = () => {
      switch (color) {
        case 'default':
          return 'bg-gray-50 border-b border-gray-200'
        case 'inherit':
          return 'bg-inherit'
        case 'primary':
          return 'bg-blue-600 text-white'
        case 'secondary':
          return 'bg-gray-800 text-white'
        case 'transparent':
          return 'bg-transparent border-none'
        default:
          return 'bg-blue-600 text-white'
      }
    }

    // Get elevation/shadow classes
    const getElevationClasses = () => {
      switch (elevation) {
        case 0:
          return 'shadow-none'
        case 1:
          return 'shadow-sm'
        case 2:
          return 'shadow'
        case 3:
          return 'shadow-md'
        case 4:
          return 'shadow-lg'
        case 5:
          return 'shadow-xl'
        case 6:
          return 'shadow-2xl'
        default:
          return `shadow-lg`
      }
    }

    // Build AppBar classes
    const appBarClasses = [
      'w-full',
      getPositionClasses(),
      getColorClasses(),
      getElevationClasses(),
      className
    ].filter(Boolean).join(' ')

    // Convert sx props to inline styles
    const appBarStyles = sx || {}

    return (
      <Box
        ref={ref}
        className={cn(appBarClasses)}
        sx={appBarStyles}
        role="banner"
        {...props}
      >
        {children}
      </Box>
    )
  }
)

AppBar.displayName = 'AppBar'

export { AppBar }
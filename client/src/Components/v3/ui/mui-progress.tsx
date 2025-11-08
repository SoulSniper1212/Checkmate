import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Box } from './box'

// MUI Progress component interfaces
export interface LinearProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  // MUI specific props
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query'
  value?: number
  valueBuffer?: number
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  sx?: object
  children?: React.ReactNode
}

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  // MUI specific props
  variant?: 'determinate' | 'indeterminate'
  value?: number
  size?: number | string
  thickness?: number
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  disableShrink?: boolean
  sx?: object
  children?: React.ReactNode
}

// LinearProgress component
const LinearProgress = forwardRef<HTMLDivElement, LinearProgressProps>(
  ({
    className,
    variant = 'indeterminate',
    value = 0,
    color = 'primary',
    sx,
    ...props
  }, ref) => {
    const getColorClasses = () => {
      switch (color) {
        case 'secondary':
          return 'bg-blue-500'
        case 'error':
          return 'bg-red-500'
        case 'info':
          return 'bg-blue-400'
        case 'success':
          return 'bg-green-500'
        case 'warning':
          return 'bg-yellow-500'
        case 'primary':
        default:
          return 'bg-primary'
      }
    }

    const progressStyle = sx || {}

    if (variant === 'determinate') {
      return (
        <Box
          ref={ref}
          className={cn(
            'w-full bg-gray-200 rounded-full overflow-hidden',
            className
          )}
          style={progressStyle}
          {...props}
        >
          <Box
            className={cn(
              'h-full transition-all duration-300 ease-out',
              getColorClasses()
            )}
            style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          />
        </Box>
      )
    }

    // Indeterminate progress
    return (
      <Box
        ref={ref}
        className={cn(
          'w-full bg-gray-200 rounded-full overflow-hidden',
          className
        )}
        style={progressStyle}
        {...props}
      >
        <Box
          className={cn(
            'h-full animate-pulse',
            getColorClasses()
          )}
          style={{ width: '40%' }}
        />
      </Box>
    )
  }
)

// CircularProgress component
const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  ({
    className,
    variant = 'indeterminate',
    value = 0,
    size = 40,
    thickness = 3.6,
    color = 'primary',
    disableShrink = false,
    sx,
    children,
    ...props
  }, ref) => {
    const getColorClasses = () => {
      switch (color) {
        case 'secondary':
          return 'text-blue-500'
        case 'error':
          return 'text-red-500'
        case 'info':
          return 'text-blue-400'
        case 'success':
          return 'text-green-500'
        case 'warning':
          return 'text-yellow-500'
        case 'primary':
        default:
          return 'text-primary'
      }
    }

    const progressStyle = {
      width: typeof size === 'number' ? `${size}px` : size,
      height: typeof size === 'number' ? `${size}px` : size,
      ...sx
    }

    const radius = (typeof size === 'number' ? size : 40) / 2
    const circumference = 2 * Math.PI * (radius - thickness)
    const strokeDashoffset = variant === 'determinate'
      ? circumference - (value / 100) * circumference
      : 0

    return (
      <Box
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center',
          getColorClasses(),
          className
        )}
        style={progressStyle}
        {...props}
      >
        <svg
          className="absolute"
          width="100%"
          height="100%"
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
          <circle
            className="text-gray-200"
            strokeWidth={thickness}
            fill="transparent"
            r={radius - thickness}
            cx={radius}
            cy={radius}
          />
          <circle
            className={cn(
              'transition-all duration-300 ease-out',
              variant === 'indeterminate' && !disableShrink && 'animate-spin'
            )}
            strokeWidth={thickness}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            r={radius - thickness}
            cx={radius}
            cy={radius}
            transform={`rotate(-90 ${radius} ${radius})`}
          />
        </svg>
        {children && (
          <Box className="absolute inset-0 flex items-center justify-center">
            {children}
          </Box>
        )}
      </Box>
    )
  }
)

// Set display names
LinearProgress.displayName = 'LinearProgress'
CircularProgress.displayName = 'CircularProgress'

// Export individual components and a default Progress (LinearProgress)
export { LinearProgress, CircularProgress }

// Progress as alias for LinearProgress for backward compatibility
const Progress = LinearProgress
export { Progress }

export default Progress
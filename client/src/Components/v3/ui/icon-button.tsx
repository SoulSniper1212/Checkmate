import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Box } from './box'

// MUI IconButton component interface
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // MUI specific props
  size?: 'small' | 'medium' | 'large'
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  disabled?: boolean
  disableRipple?: boolean
  edge?: 'start' | 'end' | 'false'
  sx?: object
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({
    className,
    size = 'medium',
    color = 'default',
    disabled = false,
    disableRipple = false,
    edge = 'false',
    sx,
    children,
    onClick,
    ...props
  }, ref) => {

    // Map MUI size to Tailwind classes
    const getSizeClasses = () => {
      switch (size) {
        case 'small':
          return 'w-8 h-8 p-1'
        case 'large':
          return 'w-12 h-12 p-3'
        case 'medium':
        default:
          return 'w-10 h-10 p-2'
      }
    }

    // Map MUI color to Tailwind classes
    const getColorClasses = () => {
      switch (color) {
        case 'primary':
          return 'text-blue-600 hover:bg-blue-50 focus:bg-blue-100'
        case 'secondary':
          return 'text-gray-600 hover:bg-gray-50 focus:bg-gray-100'
        case 'success':
          return 'text-green-600 hover:bg-green-50 focus:bg-green-100'
        case 'error':
          return 'text-red-600 hover:bg-red-50 focus:bg-red-100'
        case 'info':
          return 'text-cyan-600 hover:bg-cyan-50 focus:bg-cyan-100'
        case 'warning':
          return 'text-yellow-600 hover:bg-yellow-50 focus:bg-yellow-100'
        case 'inherit':
          return 'text-inherit hover:bg-inherit focus:bg-inherit'
        default:
          return 'text-gray-700 hover:bg-gray-50 focus:bg-gray-100'
      }
    }

    // Map MUI edge to margin classes
    const getEdgeClasses = () => {
      switch (edge) {
        case 'start':
          return 'mr-2'
        case 'end':
          return 'ml-2'
        case 'false':
        default:
          return ''
      }
    }

    // Build Tailwind classes
    const classes = [
      'inline-flex items-center justify-center',
      'rounded-md',
      'transition-colors duration-200',
      'focus:outline-none',
      'focus:ring-2 focus:ring-offset-2',
      getSizeClasses(),
      getColorClasses(),
      getEdgeClasses(),
      !disableRipple && 'active:scale-95',
      disabled && 'opacity-50 cursor-not-allowed',
      className
    ].filter(Boolean).join(' ')

    // Convert sx props to inline styles (basic implementation)
    const buttonStyle = sx || {}

    return (
      <button
        ref={ref}
        className={cn(classes)}
        style={buttonStyle}
        disabled={disabled}
        onClick={onClick}
        type={props.type || 'button'}
        {...props}
      >
        {children}
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'

export { IconButton }
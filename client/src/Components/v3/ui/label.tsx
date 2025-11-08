import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// MUI Label component interfaces
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  // MUI specific props
  variant?: 'standard' | 'outlined'
  size?: 'small' | 'medium'
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  disabled?: boolean
  required?: boolean
  error?: boolean
  sx?: object
}

// Label component with forwardRef for proper ref forwarding
const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({
    className,
    variant = 'standard',
    size = 'medium',
    color = 'primary',
    disabled = false,
    required = false,
    error = false,
    sx,
    children,
    ...props
  }, ref) => {

    // Map MUI size to Tailwind classes
    const getSizeClasses = () => {
      switch (size) {
        case 'small':
          return 'text-xs'
        case 'medium':
        default:
          return 'text-sm'
      }
    }

    // Map MUI color to Tailwind classes
    const getColorClasses = () => {
      if (disabled) {
        return 'text-gray-400'
      }

      if (error) {
        return 'text-red-500'
      }

      switch (color) {
        case 'primary':
          return 'text-blue-600'
        case 'secondary':
          return 'text-gray-600'
        case 'error':
          return 'text-red-600'
        case 'warning':
          return 'text-yellow-600'
        case 'info':
          return 'text-cyan-600'
        case 'success':
          return 'text-green-600'
        default:
          return 'text-gray-700'
      }
    }

    // Build label classes
    const labelClasses = [
      'block font-medium',
      getSizeClasses(),
      getColorClasses(),
      'mb-1',
      disabled && 'cursor-not-allowed',
      className
    ].filter(Boolean).join(' ')

    // Convert sx props to inline styles
    const labelStyle = sx || {}

    return (
      <label
        ref={ref}
        className={cn(labelClasses)}
        style={labelStyle}
        {...props}
      >
        {children}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
    )
  }
)

Label.displayName = 'Label'

export { Label }
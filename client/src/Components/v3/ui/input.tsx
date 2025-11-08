import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// MUI Input component interfaces
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // MUI specific props
  variant?: 'outlined' | 'filled' | 'standard'
  size?: 'small' | 'medium'
  error?: boolean
  disabled?: boolean
  fullWidth?: boolean
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  helperText?: string
  label?: string
  required?: boolean
  sx?: object
}

// Input component with forwardRef for proper ref forwarding
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    variant = 'outlined',
    size = 'medium',
    error = false,
    disabled = false,
    fullWidth = false,
    startAdornment,
    endAdornment,
    helperText,
    label,
    required = false,
    sx,
    type,
    ...props
  }, ref) => {

    // Map MUI variant to Tailwind classes
    const getVariantClasses = () => {
      switch (variant) {
        case 'outlined':
          return 'border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        case 'filled':
          return 'bg-gray-100 rounded-t-md border-b-2 border-gray-300 focus:border-blue-500 border-t-0 border-l-0 border-r-0'
        case 'standard':
          return 'border-b-2 border-gray-300 focus:border-blue-500 rounded-none border-t-0 border-l-0 border-r-0'
        default:
          return 'border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
      }
    }

    // Map MUI size to Tailwind classes
    const getSizeClasses = () => {
      switch (size) {
        case 'small':
          return 'px-2 py-1 text-sm h-8'
        case 'medium':
          return 'px-3 py-2 text-base h-10'
        default:
          return 'px-3 py-2 text-base h-10'
      }
    }

    // Map MUI error state to Tailwind classes
    const getErrorClasses = () => {
      if (error) {
        return 'border-red-500 focus:ring-red-500 focus:border-red-500'
      }
      return ''
    }

    // Build input classes
    const inputClasses = [
      'w-full outline-none bg-white',
      getVariantClasses(),
      getSizeClasses(),
      getErrorClasses(),
      disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
      'transition-colors duration-200',
      startAdornment && 'pl-10',
      endAdornment && 'pr-10',
      className
    ].filter(Boolean).join(' ')

    // Build container classes
    const containerClasses = [
      'relative',
      fullWidth ? 'w-full' : 'w-auto'
    ].filter(Boolean).join(' ')

    // Build label classes
    const labelClasses = [
      'absolute left-3 transition-all duration-200 bg-white px-1',
      size === 'small' ? '-top-2 text-xs' : '-top-3 text-sm',
      'text-gray-600',
      'focus-within:text-blue-500',
      error && 'text-red-500',
      disabled && 'text-gray-400'
    ].filter(Boolean).join(' ')

    // Convert sx props to inline styles
    const inputStyle = sx || {}

    return (
      <div className={containerClasses}>
        {label && (
          <label className={labelClasses}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {startAdornment && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {startAdornment}
            </div>
          )}

          <input
            type={type}
            ref={ref}
            className={cn(inputClasses)}
            style={inputStyle}
            disabled={disabled}
            {...props}
          />

          {endAdornment && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {endAdornment}
            </div>
          )}
        </div>

        {helperText && (
          <p className={cn(
            'mt-1 text-xs',
            error ? 'text-red-500' : 'text-gray-500',
            disabled && 'text-gray-400'
          )}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
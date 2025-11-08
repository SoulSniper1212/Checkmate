import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// MUI Textarea component interfaces
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  // MUI specific props
  variant?: 'outlined' | 'filled' | 'standard'
  size?: 'small' | 'medium'
  error?: boolean
  disabled?: boolean
  fullWidth?: boolean
  helperText?: string
  label?: string
  required?: boolean
  minRows?: number
  maxRows?: number
  sx?: object
}

// Textarea component with forwardRef for proper ref forwarding
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    variant = 'outlined',
    size = 'medium',
    error = false,
    disabled = false,
    fullWidth = false,
    helperText,
    label,
    required = false,
    minRows = 3,
    maxRows,
    sx,
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
          return 'px-2 py-1 text-sm'
        case 'medium':
          return 'px-3 py-2 text-base'
        default:
          return 'px-3 py-2 text-base'
      }
    }

    // Map MUI error state to Tailwind classes
    const getErrorClasses = () => {
      if (error) {
        return 'border-red-500 focus:ring-red-500 focus:border-red-500'
      }
      return ''
    }

    // Build textarea classes
    const textareaClasses = [
      'w-full outline-none bg-white resize-none',
      getVariantClasses(),
      getSizeClasses(),
      getErrorClasses(),
      disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
      'transition-colors duration-200',
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
    const textareaStyle = {
      ...sx,
      minHeight: minRows ? `${minRows * 1.5}rem` : undefined,
      maxHeight: maxRows ? `${maxRows * 1.5}rem` : undefined,
    }

    return (
      <div className={containerClasses}>
        {label && (
          <label className={labelClasses}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          className={cn(textareaClasses)}
          style={textareaStyle}
          disabled={disabled}
          rows={minRows}
          {...props}
        />

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

Textarea.displayName = 'Textarea'

export { Textarea }
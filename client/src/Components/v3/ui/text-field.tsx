import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Box } from './box'
import { Typography } from './typography'

// MUI TextField component interface
export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  // MUI specific props
  variant?: 'outlined' | 'filled' | 'standard'
  size?: 'small' | 'medium'
  label?: string
  placeholder?: string
  helperText?: string
  error?: boolean
  disabled?: boolean
  required?: boolean
  fullWidth?: boolean
  type?: string
  multiline?: boolean
  rows?: number
  maxRows?: number
  minRows?: number
  InputProps?: object
  inputProps?: object
  sx?: object
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  focused?: boolean
  autoComplete?: string
  autoFocus?: boolean
  defaultValue?: string | number
  id?: string
  name?: string
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  value?: string | number | readonly string[]
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({
    className,
    variant = 'outlined',
    size = 'medium',
    label,
    placeholder,
    helperText,
    error = false,
    disabled = false,
    required = false,
    fullWidth = false,
    type = 'text',
    multiline = false,
    rows = 1,
    maxRows,
    minRows,
    InputProps = {},
    inputProps = {},
    sx,
    color = 'primary',
    focused,
    autoComplete,
    autoFocus,
    defaultValue,
    id,
    name,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    onKeyUp,
    value,
    children,
    ...props
  }, ref) => {

    // Map MUI variant to Tailwind classes
    const getVariantClasses = () => {
      switch (variant) {
        case 'outlined':
          return 'border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        case 'filled':
          return 'bg-gray-100 rounded-t-md border-b-2 border-gray-300 focus:border-blue-500'
        case 'standard':
          return 'border-b-2 border-gray-300 focus:border-blue-500 rounded-none'
        default:
          return 'border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
      }
    }

    // Map MUI size to Tailwind classes
    const getSizeClasses = () => {
      if (multiline) {
        switch (size) {
          case 'small':
            return 'px-2 py-1 text-sm'
          case 'medium':
            return 'px-3 py-2 text-base'
          default:
            return 'px-3 py-2 text-base'
        }
      } else {
        switch (size) {
          case 'small':
            return 'px-2 py-1 text-sm h-8'
          case 'medium':
            return 'px-3 py-2 text-base h-10'
          default:
            return 'px-3 py-2 text-base h-10'
        }
      }
    }

    // Map MUI color to Tailwind classes
    const getColorClasses = () => {
      if (error) {
        return 'border-red-500 focus:ring-red-500 focus:border-red-500'
      }
      return ''
    }

    // Build input classes
    const inputClasses = [
      'w-full outline-none bg-transparent',
      getVariantClasses(),
      getSizeClasses(),
      getColorClasses(),
      disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
      'transition-colors duration-200',
      className
    ].filter(Boolean).join(' ')

    // Build container classes
    const containerClasses = [
      'relative',
      fullWidth ? 'w-full' : 'w-auto',
      sx && sx.width
    ].filter(Boolean).join(' ')

    // Build label classes
    const labelClasses = [
      'absolute left-3 transition-all duration-200 bg-white px-1',
      size === 'small' ? '-top-2 text-xs' : '-top-3 text-sm',
      'text-gray-600',
      focused && 'text-blue-500',
      error && 'text-red-500',
      disabled && 'text-gray-400'
    ].filter(Boolean).join(' ')

    return (
      <Box className={containerClasses}>
        {label && variant === 'outlined' && (
          <label className={labelClasses} htmlFor={id}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            className={inputClasses}
            type={type}
            placeholder={!label ? placeholder : ''}
            disabled={disabled}
            required={required}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            defaultValue={defaultValue}
            id={id}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            value={value}
            {...inputProps}
            {...InputProps}
            {...props}
          />

          {children}
        </div>

        {helperText && (
          <Typography
            variant="caption"
            className={cn(
              'mt-1',
              error ? 'text-red-500' : 'text-gray-500',
              disabled && 'text-gray-400'
            )}
          >
            {helperText}
          </Typography>
        )}
      </Box>
    )
  }
)

TextField.displayName = 'TextField'

export { TextField }
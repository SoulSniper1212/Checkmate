import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// MUI Checkbox component interfaces
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  // MUI specific props
  size?: 'small' | 'medium'
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default'
  disabled?: boolean
  disableRipple?: boolean
  checked?: boolean | string
  defaultChecked?: boolean
  indeterminate?: boolean
  icon?: React.ReactNode
  checkedIcon?: React.ReactNode
  indeterminateIcon?: React.ReactNode
  inputProps?: object
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  sx?: object
}

// Checkbox component
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    className,
    size = 'medium',
    color = 'primary',
    disabled = false,
    disableRipple = false,
    checked,
    defaultChecked = false,
    indeterminate = false,
    icon,
    checkedIcon,
    indeterminateIcon,
    inputProps = {},
    onChange,
    sx,
    ...props
  }, ref) => {

    const getSizeClasses = () => {
      switch (size) {
        case 'small':
          return 'w-4 h-4'
        case 'medium':
        default:
          return 'w-5 h-5'
      }
    }

    const getColorClasses = () => {
      if (disabled) {
        return 'border-gray-300 bg-gray-100 cursor-not-allowed'
      }

      switch (color) {
        case 'primary':
          return 'border-blue-600 text-blue-600 focus:ring-blue-500'
        case 'secondary':
          return 'border-gray-600 text-gray-600 focus:ring-gray-500'
        case 'success':
          return 'border-green-600 text-green-600 focus:ring-green-500'
        case 'error':
          return 'border-red-600 text-red-600 focus:ring-red-500'
        case 'warning':
          return 'border-yellow-600 text-yellow-600 focus:ring-yellow-500'
        case 'info':
          return 'border-cyan-600 text-cyan-600 focus:ring-cyan-500'
        case 'default':
        default:
          return 'border-gray-600 text-gray-600 focus:ring-gray-500'
      }
    }

    const classes = [
      'rounded border-2',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'cursor-pointer',
      !disableRipple && 'active:scale-95',
      getSizeClasses(),
      getColorClasses(),
      className
    ].filter(Boolean).join(' ')

    const checkboxStyle = sx || {}

    // Default icons
    const defaultCheckedIcon = (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
    )

    const defaultIndeterminateIcon = (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        <rect x="6" y="11" width="12" height="2" />
      </svg>
    )

    return (
      <div className="relative inline-flex items-center">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            'absolute opacity-0 w-full h-full cursor-pointer',
            disabled && 'cursor-not-allowed'
          )}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={onChange}
          {...inputProps}
          {...props}
        />

        <div
          className={cn(
            classes,
            'flex items-center justify-center',
            (checked === true || indeterminate) ? 'bg-current' : 'bg-transparent'
          )}
          style={checkboxStyle}
        >
          {indeterminate ? (
            indeterminateIcon || defaultIndeterminateIcon
          ) : checked === true ? (
            checkedIcon || defaultCheckedIcon
          ) : (
            icon || null
          )}
        </div>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
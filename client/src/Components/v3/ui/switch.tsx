import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// MUI Switch component interfaces
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  // MUI specific props
  size?: 'small' | 'medium'
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default'
  disabled?: boolean
  disableRipple?: boolean
  checked?: boolean
  defaultChecked?: boolean
  icon?: React.ReactNode
  checkedIcon?: React.ReactNode
  inputProps?: object
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  sx?: object
}

// Switch component
const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({
    className,
    size = 'medium',
    color = 'primary',
    disabled = false,
    disableRipple = false,
    checked,
    defaultChecked = false,
    icon,
    checkedIcon,
    inputProps = {},
    onChange,
    sx,
    ...props
  }, ref) => {

    const getSizeClasses = () => {
      switch (size) {
        case 'small':
          return {
            track: 'w-7 h-4',
            thumb: 'w-3 h-3',
            translate: 'translate-x-3'
          }
        case 'medium':
        default:
          return {
            track: 'w-11 h-6',
            thumb: 'w-5 h-5',
            translate: 'translate-x-5'
          }
      }
    }

    const getColorClasses = () => {
      if (disabled) {
        return {
          track: 'bg-gray-300',
          thumb: 'bg-white',
          checkedTrack: 'bg-gray-400',
          checkedThumb: 'bg-white'
        }
      }

      switch (color) {
        case 'primary':
          return {
            track: 'bg-gray-300',
            thumb: 'bg-white',
            checkedTrack: 'bg-blue-600',
            checkedThumb: 'bg-white'
          }
        case 'secondary':
          return {
            track: 'bg-gray-300',
            thumb: 'bg-white',
            checkedTrack: 'bg-gray-600',
            checkedThumb: 'bg-white'
          }
        case 'success':
          return {
            track: 'bg-gray-300',
            thumb: 'bg-white',
            checkedTrack: 'bg-green-600',
            checkedThumb: 'bg-white'
          }
        case 'error':
          return {
            track: 'bg-gray-300',
            thumb: 'bg-white',
            checkedTrack: 'bg-red-600',
            checkedThumb: 'bg-white'
          }
        case 'warning':
          return {
            track: 'bg-gray-300',
            thumb: 'bg-white',
            checkedTrack: 'bg-yellow-500',
            checkedThumb: 'bg-white'
          }
        case 'info':
          return {
            track: 'bg-gray-300',
            thumb: 'bg-white',
            checkedTrack: 'bg-cyan-600',
            checkedThumb: 'bg-white'
          }
        case 'default':
        default:
          return {
            track: 'bg-gray-300',
            thumb: 'bg-white',
            checkedTrack: 'bg-gray-600',
            checkedThumb: 'bg-white'
          }
      }
    }

    const sizeClasses = getSizeClasses()
    const colorClasses = getColorClasses()

    const switchStyle = sx || {}

    return (
      <label className={cn('relative inline-flex items-center cursor-pointer', disabled && 'cursor-not-allowed')}>
        <input
          ref={ref}
          type="checkbox"
          className="sr-only"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={onChange}
          {...inputProps}
          {...props}
        />

        <div
          className={cn(
            'relative inline-flex items-center h-full rounded-full transition-colors duration-200 ease-in-out',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            `focus:ring-${color}-500`,
            !disableRipple && 'active:scale-95',
            sizeClasses.track,
            colorClasses.track,
            checked && !disabled && colorClasses.checkedTrack
          )}
          style={switchStyle}
        >
          <span
            className={cn(
              'inline-block rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out',
              'pointer-events-none',
              sizeClasses.thumb,
              checked && !disabled && sizeClasses.translate
            )}
          >
            {checked && checkedIcon ? checkedIcon : !checked && icon ? icon : null}
          </span>
        </div>
      </label>
    )
  }
)

Switch.displayName = 'Switch'

export { Switch }
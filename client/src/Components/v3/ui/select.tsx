import React, { forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Box } from './box'
import { Typography } from './typography'

// MUI Select component interfaces
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
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
  displayEmpty?: boolean
  value?: any
  defaultValue?: any
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
  children?: React.ReactNode
  IconComponent?: React.ComponentType<any>
  MenuProps?: {
    disableScrollLock?: boolean
    MenuListProps?: object
    anchorOrigin?: object
    transformOrigin?: object
  }
  renderValue?: (value: any) => React.ReactNode
  sx?: object
  multiple?: boolean
  native?: boolean
  inputProps?: object
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void
  name?: string
  id?: string
  autoFocus?: boolean
}

export interface MenuItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  // MUI specific props
  value?: any
  disabled?: boolean
  children?: React.ReactNode
  sx?: object
  component?: React.ElementType
  selected?: boolean
}

// Select main component
const Select = forwardRef<HTMLSelectElement, SelectProps>(
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
    displayEmpty = false,
    value,
    defaultValue,
    onChange,
    children,
    IconComponent,
    MenuProps = {},
    renderValue,
    sx,
    multiple = false,
    native = false,
    inputProps = {},
    onBlur,
    onFocus,
    name,
    id,
    autoFocus,
    ...props
  }, ref) => {

    const [isFocused, setIsFocused] = useState(false)

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

    // Build select classes
    const selectClasses = [
      'w-full outline-none bg-white',
      getVariantClasses(),
      getSizeClasses(),
      getErrorClasses(),
      disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
      'transition-colors duration-200',
      'appearance-none',
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
      (isFocused || value) && 'text-blue-500',
      error && 'text-red-500',
      disabled && 'text-gray-400'
    ].filter(Boolean).join(' ')

    // Convert sx props to inline styles
    const selectStyle = sx || {}

    // Handle display value
    const displayValue = (selectedValue: any) => {
      if (renderValue) {
        return renderValue(selectedValue)
      }

      if (!selectedValue && displayEmpty) {
        return (
          <span className="text-sm text-gray-500">
            {placeholder || 'Select an option'}
          </span>
        )
      }

      // Find selected option text
      if (React.Children.toArray(children).length > 0) {
        const selectedOption = React.Children.toArray(children).find(
          (child: any) => child.props?.value === selectedValue
        ) as any
        return selectedOption?.props?.children || selectedValue
      }

      return selectedValue
    }

    return (
      <Box className={containerClasses}>
        {label && variant === 'outlined' && (
          <label className={labelClasses} htmlFor={id}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            className={cn(selectClasses)}
            style={selectStyle}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
            required={required}
            multiple={multiple}
            autoFocus={autoFocus}
            name={name}
            id={id}
            onBlur={(e) => {
              setIsFocused(false)
              onBlur?.(e)
            }}
            onFocus={(e) => {
              setIsFocused(true)
              onFocus?.(e)
            }}
            {...inputProps}
            {...props}
          >
            {children}
          </select>

          {/* Custom dropdown arrow */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {IconComponent ? (
              <IconComponent className="w-5 h-5 text-gray-400" />
            ) : (
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
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

// MenuItem component
const MenuItem = forwardRef<HTMLOptionElement, MenuItemProps>(
  ({ className, value, disabled = false, children, sx, component: Component = 'option', selected, ...props }, ref) => {

    // Build menu item classes
    const classes = [
      'px-3 py-2 text-sm',
      'hover:bg-gray-100',
      disabled && 'opacity-50 cursor-not-allowed',
      selected && 'bg-blue-50 text-blue-600',
      className
    ].filter(Boolean).join(' ')

    // Convert sx props to inline styles
    const menuItemStyle = sx || {}

    if (Component === 'option') {
      // For option elements, we can only render text content, not complex React components
      // Flatten children to text if they contain Box/Stack components
      const getTextContent = (children) => {
        if (typeof children === 'string' || typeof children === 'number') {
          return children;
        }
        if (Array.isArray(children)) {
          return children.map(getTextContent).join('');
        }
        if (children && children.props && children.props.children) {
          return getTextContent(children.props.children);
        }
        return '';
      };

      return (
        <option
          ref={ref}
          value={value}
          disabled={disabled}
          style={menuItemStyle}
          {...props}
        >
          {getTextContent(children)}
        </option>
      )
    }

    return (
      <Component
        ref={ref}
        className={cn(classes)}
        style={menuItemStyle}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

// Additional select components for shadcn compatibility
const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
        {...props}
      >
        {children}
      </div>
    );
  }
);

SelectContent.displayName = 'SelectContent';

const SelectItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        {...props}
      >
        {children}
      </div>
    );
  }
);

SelectItem.displayName = 'SelectItem';

const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      >
        {children}
      </button>
    );
  }
);

SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ children, ...props }, ref) => {
    return (
      <span ref={ref} {...props}>
        {children}
      </span>
    );
  }
);

SelectValue.displayName = 'SelectValue';

// Set display names
Select.displayName = 'Select'
MenuItem.displayName = 'MenuItem'

export { Select, MenuItem, SelectContent, SelectItem, SelectTrigger, SelectValue }
import React, { forwardRef, createContext, useContext } from 'react'
import { cn } from '@/lib/utils'
import { Box } from './box'

// Tab Context
interface TabContextValue {
  value: string
  onChange: (event: React.SyntheticEvent, newValue: string) => void
  orientation?: 'horizontal' | 'vertical'
  variant?: 'standard' | 'scrollable' | 'fullWidth'
}

const TabContext = createContext<TabContextValue | undefined>(undefined)

const useTabContext = () => {
  const context = useContext(TabContext)
  if (!context) {
    throw new Error('Tab components must be used within a TabProvider')
  }
  return context
}

// MUI Tab component interfaces
export interface TabContextProps {
  children: React.ReactNode
  value: string
}

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  // MUI specific props
  orientation?: 'horizontal' | 'vertical'
  variant?: 'standard' | 'scrollable' | 'fullWidth'
  scrollButtons?: 'auto' | false
  allowScrollButtonsMobile?: boolean
  onChange?: (event: React.SyntheticEvent, newValue: string) => void
  value: string
  sx?: object
  children?: React.ReactNode
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // MUI specific props
  value: string
  label?: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  disableFocusRipple?: boolean
  disableRipple?: boolean
  wrapped?: boolean
  iconPosition?: 'top' | 'start' | 'bottom' | 'end'
  sx?: object
  children?: React.ReactNode
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  // MUI specific props
  value: string
  index: string
  sx?: object
  children?: React.ReactNode
}

// TabContext Provider component
export const TabContextProvider: React.FC<TabContextProps> = ({ children, value }) => {
  const [currentValue, setCurrentValue] = React.useState(value)

  React.useEffect(() => {
    setCurrentValue(value)
  }, [value])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentValue(newValue)
  }

  const contextValue: TabContextValue = {
    value: currentValue,
    onChange: handleChange
  }

  return (
    <TabContext.Provider value={contextValue}>
      {children}
    </TabContext.Provider>
  )
}

// TabList component (equivalent to MUI TabList)
const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({
    className,
    orientation = 'horizontal',
    variant = 'standard',
    scrollButtons = 'auto',
    allowScrollButtonsMobile = false,
    onChange,
    value,
    sx,
    children,
    ...props
  }, ref) => {

    const getOrientationClasses = () => {
      switch (orientation) {
        case 'vertical':
          return 'flex-col space-y-1'
        case 'horizontal':
        default:
          return 'flex-row space-x-1'
      }
    }

    const getVariantClasses = () => {
      switch (variant) {
        case 'scrollable':
          return 'overflow-x-auto'
        case 'fullWidth':
          return 'w-full'
        case 'standard':
        default:
          return ''
      }
    }

    const classes = [
      'flex',
      'border-b border-gray-200',
      getOrientationClasses(),
      getVariantClasses(),
      className
    ].filter(Boolean).join(' ')

    const listStyle = sx || {}

    const contextValue: TabContextValue = {
      value,
      onChange: onChange || (() => {}),
      orientation,
      variant
    }

    return (
      <TabContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(classes)}
          style={listStyle}
          role="tablist"
          {...props}
        >
          {children}
        </div>
      </TabContext.Provider>
    )
  }
)

// Tab component
const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({
    className,
    value,
    label,
    icon,
    disabled = false,
    disableFocusRipple = false,
    disableRipple = false,
    wrapped = false,
    iconPosition = 'top',
    sx,
    children,
    ...props
  }, ref) => {

    const { value: selectedValue, onChange } = useTabContext()

    const isSelected = value === selectedValue

    const getIconPositionClasses = () => {
      switch (iconPosition) {
        case 'top':
          return 'flex-col'
        case 'start':
          return 'flex-row'
        case 'bottom':
          return 'flex-col-reverse'
        case 'end':
          return 'flex-row-reverse'
        default:
          return 'flex-row'
      }
    }

    const classes = [
      'flex items-center justify-center',
      getIconPositionClasses(),
      'px-4 py-2',
      'text-sm font-medium',
      'border-b-2 border-transparent',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      'cursor-pointer',
      isSelected
        ? 'text-blue-600 border-blue-600 bg-blue-50'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
      disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-gray-600',
      className
    ].filter(Boolean).join(' ')

    const tabStyle = sx || {}

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onChange(event, value)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isSelected}
        disabled={disabled}
        className={cn(classes)}
        style={tabStyle}
        onClick={handleClick}
        {...props}
      >
        {icon && (
          <span className={iconPosition === 'top' || iconPosition === 'bottom' ? 'mb-1' : 'mr-2'}>
            {icon}
          </span>
        )}
        {label || children}
      </button>
    )
  }
)

// TabPanel component
const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, value, index, sx, children, ...props }, ref) => {
    const { value: selectedValue } = useTabContext()

    if (value !== index) {
      return null
    }

    const classes = [
      'py-4',
      className
    ].filter(Boolean).join(' ')

    const panelStyle = sx || {}

    return (
      <div
        ref={ref}
        role="tabpanel"
        aria-labelledby={`tab-${index}`}
        className={cn(classes)}
        style={panelStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Set display names
TabContextProvider.displayName = 'TabContextProvider'
TabList.displayName = 'TabList'
Tab.displayName = 'Tab'
TabPanel.displayName = 'TabPanel'

export { TabContext, TabList, Tab, TabPanel }
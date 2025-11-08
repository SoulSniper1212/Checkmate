import React, { forwardRef, useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

// Command component interfaces
export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  // Command specific props
  children: React.ReactNode
  className?: string
  filter?: (value: string, search: string) => number
  shouldFilter?: boolean
  loop?: boolean
  sx?: object
}

export interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  sx?: object
}

export interface CommandListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  sx?: object
}

export interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  sx?: object
}

export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: React.ReactNode
  children: React.ReactNode
  className?: string
  sx?: object
}

export interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onSelect?: (value: string) => void
  disabled?: boolean
  children: React.ReactNode
  className?: string
  sx?: object
}

export interface CommandSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  sx?: object
}

// Command context
const CommandContext = React.createContext<{
  search: string
  setSearch: (search: string) => void
  filteredItems: React.RefObject<HTMLDivElement>[]
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  registerItem: (ref: React.RefObject<HTMLDivElement>) => void
  unregisterItem: (ref: React.RefObject<HTMLDivElement>) => void
  shouldFilter: boolean
  loop: boolean
}>({
  search: '',
  setSearch: () => {},
  filteredItems: [],
  selectedIndex: -1,
  setSelectedIndex: () => {},
  registerItem: () => {},
  unregisterItem: () => {},
  shouldFilter: true,
  loop: true
})

// Default filter function
const defaultFilter = (value: string, search: string) => {
  const itemValue = value.toLowerCase().trim()
  const searchValue = search.toLowerCase().trim()

  if (!searchValue) return 1
  if (itemValue === searchValue) return 2
  if (itemValue.startsWith(searchValue)) return 1.5
  if (itemValue.includes(searchValue)) return 1

  return 0
}

// Command root component
const Command = forwardRef<HTMLDivElement, CommandProps>(
  ({
    children,
    className,
    filter = defaultFilter,
    shouldFilter = true,
    loop = true,
    sx,
    ...props
  }, ref) => {
    const [search, setSearch] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [filteredItems, setFilteredItems] = useState<React.RefObject<HTMLDivElement>[]>([])

    const registerItem = (itemRef: React.RefObject<HTMLDivElement>) => {
      setFilteredItems(prev => [...prev, itemRef])
    }

    const unregisterItem = (itemRef: React.RefObject<HTMLDivElement>) => {
      setFilteredItems(prev => prev.filter(ref => ref !== itemRef))
    }

    // Handle keyboard navigation
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (filteredItems.length === 0) return

        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault()
            setSelectedIndex(prev => {
              const nextIndex = prev + 1
              if (nextIndex >= filteredItems.length) {
                return loop ? 0 : prev
              }
              return nextIndex
            })
            break
          case 'ArrowUp':
            event.preventDefault()
            setSelectedIndex(prev => {
              const prevIndex = prev - 1
              if (prevIndex < 0) {
                return loop ? filteredItems.length - 1 : 0
              }
              return prevIndex
            })
            break
          case 'Enter':
            event.preventDefault()
            if (selectedIndex >= 0 && selectedIndex < filteredItems.length) {
              const selectedItem = filteredItems[selectedIndex].current
              if (selectedItem && !selectedItem.getAttribute('data-disabled')) {
                selectedItem.click()
              }
            }
            break
          case 'Escape':
            setSearch('')
            setSelectedIndex(-1)
            break
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [filteredItems, selectedIndex, loop])

    // Scroll selected item into view
    useEffect(() => {
      if (selectedIndex >= 0 && selectedIndex < filteredItems.length) {
        const selectedItem = filteredItems[selectedIndex].current
        if (selectedItem) {
          selectedItem.scrollIntoView({ block: 'nearest' })
        }
      }
    }, [selectedIndex, filteredItems])

    const commandStyle = {
      ...sx
    }

    return (
      <CommandContext.Provider value={{
        search,
        setSearch,
        filteredItems,
        selectedIndex,
        setSelectedIndex,
        registerItem,
        unregisterItem,
        shouldFilter,
        loop
      }}>
        <div
          ref={ref}
          className={cn(
            'flex h-full w-full flex-col overflow-hidden rounded-md bg-white text-gray-950',
            className
          )}
          style={commandStyle}
          {...props}
        >
          {children}
        </div>
      </CommandContext.Provider>
    )
  }
)

// Command input component
const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({
    placeholder,
    value,
    onValueChange,
    className,
    sx,
    ...props
  }, ref) => {
    const { search, setSearch } = React.useContext(CommandContext)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      setSearch(newValue)
      onValueChange?.(newValue)
    }

    const inputValue = value !== undefined ? value : search

    const inputStyle = {
      ...sx
    }

    return (
      <div className="flex items-center border-b px-3">
        <svg
          className="mr-2 h-4 w-4 shrink-0 opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={ref}
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          style={inputStyle}
          {...props}
        />
      </div>
    )
  }
)

// Command list component
const CommandList = forwardRef<HTMLDivElement, CommandListProps>(
  ({ children, className, sx, ...props }, ref) => {
    const listStyle = {
      ...sx
    }

    return (
      <div
        ref={ref}
        className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
        style={listStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Command empty component
const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ children, className, sx, ...props }, ref) => {
    const { search } = React.useContext(CommandContext)

    if (!search) return null

    const emptyStyle = {
      ...sx
    }

    return (
      <div
        ref={ref}
        className={cn('py-6 text-center text-sm text-gray-500', className)}
        style={emptyStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Command group component
const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ heading, children, className, sx, ...props }, ref) => {
    const groupStyle = {
      ...sx
    }

    return (
      <div
        ref={ref}
        className={cn('overflow-hidden p-1 text-gray-950', className)}
        style={groupStyle}
        {...props}
      >
        {heading && (
          <div className="px-2 py-1.5 text-xs font-medium text-gray-500">
            {heading}
          </div>
        )}
        {children}
      </div>
    )
  }
)

// Command item component
const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  ({
    value,
    onSelect,
    disabled = false,
    children,
    className,
    sx,
    ...props
  }, ref) => {
    const { search, setSelectedIndex, registerItem, unregisterItem, shouldFilter } = React.useContext(CommandContext)
    const itemRef = useRef<HTMLDivElement>(null)

    // Combine refs
    React.useImperativeHandle(ref, () => itemRef.current!)

    // Register/unregister item with context
    useEffect(() => {
      registerItem(itemRef)
      return () => unregisterItem(itemRef)
    }, [registerItem, unregisterItem])

    const handleClick = () => {
      if (disabled) return
      onSelect?.(value || '')
    }

    const isSelected = itemRef.current?.getAttribute('data-selected') === 'true'

    const itemStyle = {
      ...sx
    }

    return (
      <div
        ref={itemRef}
        className={cn(
          'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
          'hover:bg-gray-100',
          isSelected && 'bg-gray-100',
          disabled && 'pointer-events-none opacity-50',
          className
        )}
        style={itemStyle}
        onClick={handleClick}
        data-disabled={disabled}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Command separator component
const CommandSeparator = forwardRef<HTMLDivElement, CommandSeparatorProps>(
  ({ className, sx, ...props }, ref) => {
    const separatorStyle = {
      ...sx
    }

    return (
      <div
        ref={ref}
        className={cn('-mx-1 my-1 h-px bg-gray-200', className)}
        style={separatorStyle}
        {...props}
      />
    )
  }
)

Command.displayName = 'Command'
CommandInput.displayName = 'CommandInput'
CommandList.displayName = 'CommandList'
CommandEmpty.displayName = 'CommandEmpty'
CommandGroup.displayName = 'CommandGroup'
CommandItem.displayName = 'CommandItem'
CommandSeparator.displayName = 'CommandSeparator'

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator
}
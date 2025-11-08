import React, { forwardRef, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

// Calendar component interfaces
export interface CalendarProps {
  // Calendar specific props
  mode?: 'single' | 'multiple' | 'range'
  selected?: Date | Date[] | { from?: Date; to?: Date } | undefined
  onSelect?: (date: Date | Date[] | { from?: Date; to?: Date } | undefined) => void
  defaultMonth?: Date
  month?: Date
  disabled?: boolean | ((date: Date) => boolean)
  initialFocus?: boolean
  numberOfMonths?: number
  className?: string
  sx?: object
}

export interface CalendarDayProps {
  date: Date
  selected?: boolean
  disabled?: boolean
  inRange?: boolean
  rangeEnd?: boolean
  rangeStart?: boolean
  onSelect?: (date: Date) => void
  className?: string
}

export interface CalendarHeaderProps {
  month: Date
  onPreviousMonth?: () => void
  onNextMonth?: () => void
  className?: string
}

// Utility functions
const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

const addMonths = (date: Date, months: number) => {
  const result = new Date(date)
  result.setMonth(result.getMonth() + months)
  return result
}

const startOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

const endOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

const isDateInRange = (date: Date, range: { from?: Date; to?: Date }) => {
  if (!range.from) return false
  if (!range.to) return isSameDay(date, range.from)

  return date >= range.from && date <= range.to
}

// Calendar day component
const CalendarDay = forwardRef<HTMLDivElement, CalendarDayProps>(
  ({
    date,
    selected = false,
    disabled = false,
    inRange = false,
    rangeEnd = false,
    rangeStart = false,
    onSelect,
    className
  }, ref) => {
    const handleClick = () => {
      if (!disabled && onSelect) {
        onSelect(date)
      }
    }

    const dayClasses = [
      'h-9 w-9 p-0 text-center text-sm',
      'relative cursor-pointer',
      'rounded-md',
      'transition-colors duration-200',
      'hover:bg-gray-100',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
      selected && 'bg-blue-600 text-white hover:bg-blue-700',
      inRange && 'bg-blue-100 hover:bg-blue-200',
      rangeStart && 'rounded-l-md',
      rangeEnd && 'rounded-r-md',
      disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
      'today' && 'bg-gray-900 text-white hover:bg-gray-800',
      className
    ].filter(Boolean).join(' ')

    const isToday = isSameDay(date, new Date())

    return (
      <div
        ref={ref}
        className={cn(dayClasses)}
        onClick={handleClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
        aria-selected={selected}
        aria-disabled={disabled}
        data-today={isToday}
      >
        <span className="flex h-full w-full items-center justify-center">
          {date.getDate()}
        </span>
      </div>
    )
  }
)

CalendarDay.displayName = 'CalendarDay'

// Calendar header component
const CalendarHeader = forwardRef<HTMLDivElement, CalendarHeaderProps>(
  ({ month, onPreviousMonth, onNextMonth, className }, ref) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]

    return (
      <div
        ref={ref}
        className={cn('flex justify-between items-center mb-4', className)}
      >
        <button
          type="button"
          onClick={onPreviousMonth}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Previous month"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="text-sm font-medium text-gray-900">
          {monthNames[month.getMonth()]} {month.getFullYear()}
        </h2>

        <button
          type="button"
          onClick={onNextMonth}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Next month"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    )
  }
)

CalendarHeader.displayName = 'CalendarHeader'

// Calendar root component
const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({
    mode = 'single',
    selected,
    onSelect,
    defaultMonth,
    month,
    disabled = false,
    initialFocus = false,
    numberOfMonths = 1,
    className,
    sx
  }, ref) => {
    const [currentMonth, setCurrentMonth] = useState(
      month || defaultMonth || startOfMonth(new Date())
    )

    const handlePreviousMonth = () => {
      setCurrentMonth(prev => addMonths(prev, -1))
    }

    const handleNextMonth = () => {
      setCurrentMonth(prev => addMonths(prev, 1))
    }

    const handleSelectDate = (date: Date) => {
      if (disabled) return

      if (mode === 'single') {
        onSelect?.(date)
      } else if (mode === 'multiple') {
        const currentArray = Array.isArray(selected) ? selected : []
        const isSelected = currentArray.some(d => isSameDay(d, date))
        const newArray = isSelected
          ? currentArray.filter(d => !isSameDay(d, date))
          : [...currentArray, date]
        onSelect?.(newArray)
      } else if (mode === 'range') {
        const currentRange = selected as { from?: Date; to?: Date } || {}

        if (!currentRange.from) {
          onSelect?.({ from: date, to: undefined })
        } else if (!currentRange.to && date > currentRange.from) {
          onSelect?.({ from: currentRange.from, to: date })
        } else {
          onSelect?.({ from: date, to: undefined })
        }
      }
    }

    const renderCalendarDays = (month: Date) => {
      const year = month.getFullYear()
      const monthIndex = month.getMonth()
      const daysInMonth = getDaysInMonth(month)
      const firstDayOfMonth = getFirstDayOfMonth(month)
      const days = []

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="h-9 w-9" />)
      }

      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, monthIndex, day)

        let isSelected = false
        let isDisabled = false
        let inRange = false
        let rangeStart = false
        let rangeEnd = false

        if (typeof disabled === 'function') {
          isDisabled = disabled(date)
        } else {
          isDisabled = disabled
        }

        if (mode === 'single') {
          isSelected = selected instanceof Date && isSameDay(date, selected)
        } else if (mode === 'multiple') {
          isSelected = Array.isArray(selected) && selected.some(d => isSameDay(d, date))
        } else if (mode === 'range') {
          const range = selected as { from?: Date; to?: Date } || {}
          isSelected = (range.from && isSameDay(date, range.from)) || (range.to && isSameDay(date, range.to))
          inRange = isDateInRange(date, range)
          rangeStart = range.from && isSameDay(date, range.from)
          rangeEnd = range.to && isSameDay(date, range.to)
        }

        days.push(
          <CalendarDay
            key={day}
            date={date}
            selected={isSelected}
            disabled={isDisabled}
            inRange={inRange}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onSelect={handleSelectDate}
          />
        )
      }

      return days
    }

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const calendarStyle = {
      ...sx
    }

    return (
      <div
        ref={ref}
        className={cn('p-3', className)}
        style={calendarStyle}
      >
        <CalendarHeader
          month={currentMonth}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
        />

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div
              key={day}
              className="h-9 w-9 p-0 text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays(currentMonth)}
        </div>
      </div>
    )
  }
)

Calendar.displayName = 'Calendar'

export { Calendar, CalendarDay, CalendarHeader }
import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Box } from './box'

// MUI Table component interfaces
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  // MUI specific props
  stickyHeader?: boolean
  size?: 'small' | 'medium'
  padding?: 'normal' | 'checkbox' | 'none'
  sx?: object
  children?: React.ReactNode
}

export interface TableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  // MUI specific props
  component?: React.ElementType
  sx?: object
  children?: React.ReactNode
}

export interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  // MUI specific props
  component?: React.ElementType
  stickyHeader?: boolean
  sx?: object
  children?: React.ReactNode
}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  // MUI specific props
  component?: React.ElementType
  sx?: object
  children?: React.ReactNode
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  // MUI specific props
  component?: React.ElementType
  hover?: boolean
  selected?: boolean
  sx?: object
  children?: React.ReactNode
}

export interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  // MUI specific props
  component?: React.ElementType
  scope?: 'col' | 'row'
  padding?: 'normal' | 'checkbox' | 'none'
  variant?: 'head' | 'body' | 'footer'
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  valign?: 'inherit' | 'top' | 'middle' | 'bottom'
  sortDirection?: 'asc' | 'desc' | false
  colSpan?: number
  rowSpan?: number
  sx?: object
  children?: React.ReactNode
}

export interface TablePaginationProps {
  // MUI specific props
  component?: React.ElementType
  count: number
  page: number
  rowsPerPage: number
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
  rowsPerPageOptions?: number[]
  labelRowsPerPage?: string
  labelDisplayedRows?: ({ from, to, count }: { from: number; to: number; count: number }) => string
  showFirstButton?: boolean
  showLastButton?: boolean
  disabled?: boolean
  sx?: object
  // Additional MUI-specific props that should be filtered out from DOM
  ActionsComponent?: React.ComponentType<any>
  slotProps?: any
}

// TableContainer component
const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  ({ className, component: Component = 'div', sx, children, ...props }, ref) => {
    const classes = [
      'w-full overflow-auto',
      className
    ].filter(Boolean).join(' ')

    const containerStyle = sx || {}

    return (
      <Component
        ref={ref}
        className={cn(classes)}
        style={containerStyle}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

// Table component
const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, stickyHeader = false, size = 'medium', padding = 'normal', sx, children, ...props }, ref) => {

    const getSizeClasses = () => {
      switch (size) {
        case 'small':
          return 'text-xs'
        case 'medium':
        default:
          return 'text-sm'
      }
    }

    const getPaddingClasses = () => {
      switch (padding) {
        case 'checkbox':
          return 'p-1'
        case 'none':
          return 'p-0'
        case 'normal':
        default:
          return 'px-4 py-2'
      }
    }

    const classes = [
      'w-full border-collapse',
      'bg-white',
      getSizeClasses(),
      stickyHeader && 'relative',
      className
    ].filter(Boolean).join(' ')

    const tableStyle = sx || {}

    return (
      <table
        ref={ref}
        className={cn(classes)}
        style={tableStyle}
        {...props}
      >
        {children}
      </table>
    )
  }
)

// TableHead component
const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className, component: Component = 'thead', stickyHeader, sx, children, ...props }, ref) => {
    const classes = [
      'bg-gray-50 border-b border-gray-200',
      stickyHeader && 'sticky top-0 z-10',
      className
    ].filter(Boolean).join(' ')

    const headStyle = sx || {}

    return (
      <Component
        ref={ref}
        className={cn(classes)}
        style={headStyle}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

// TableBody component
const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, component: Component = 'tbody', sx, children, ...props }, ref) => {
    const classes = [
      'divide-y divide-gray-200',
      className
    ].filter(Boolean).join(' ')

    const bodyStyle = sx || {}

    return (
      <Component
        ref={ref}
        className={cn(classes)}
        style={bodyStyle}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

// TableRow component
const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, component: Component = 'tr', hover = false, selected = false, sx, children, ...props }, ref) => {

    const classes = [
      'bg-white transition-colors duration-150',
      hover && 'hover:bg-gray-50',
      selected && 'bg-blue-50',
      className
    ].filter(Boolean).join(' ')

    const rowStyle = sx || {}

    return (
      <Component
        ref={ref}
        className={cn(classes)}
        style={rowStyle}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

// TableCell component
const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({
    className,
    component: Component = 'td',
    scope,
    padding = 'normal',
    variant = 'body',
    align = 'left',
    valign = 'middle',
    sortDirection,
    colSpan,
    rowSpan,
    sx,
    children,
    ...props
  }, ref) => {

    const getPaddingClasses = () => {
      switch (padding) {
        case 'checkbox':
          return 'p-1 w-12'
        case 'none':
          return 'p-0'
        case 'normal':
        default:
          return 'px-4 py-2'
      }
    }

    const getAlignClasses = () => {
      switch (align) {
        case 'center':
          return 'text-center'
        case 'right':
        case 'justify':
          return 'text-right'
        case 'left':
        case 'inherit':
        default:
          return 'text-left'
      }
    }

    const getVariantClasses = () => {
      switch (variant) {
        case 'head':
          return 'font-semibold text-gray-900 border-b border-gray-200 bg-gray-50'
        case 'footer':
          return 'font-medium text-gray-700 border-t border-gray-200 bg-gray-50'
        case 'body':
        default:
          return 'text-gray-900'
      }
    }

    const getVerticalAlignClasses = () => {
      switch (valign) {
        case 'top':
          return 'align-top'
        case 'bottom':
          return 'align-bottom'
        case 'middle':
        case 'inherit':
        default:
          return 'align-middle'
      }
    }

    const classes = [
      getVariantClasses(),
      getPaddingClasses(),
      getAlignClasses(),
      getVerticalAlignClasses(),
      className
    ].filter(Boolean).join(' ')

    const cellStyle = sx || {}

    return (
      <Component
        ref={ref}
        className={cn(classes)}
        scope={scope}
        colSpan={colSpan}
        rowSpan={rowSpan}
        style={cellStyle}
        {...props}
      >
        {children}
        {sortDirection && (
          <span className="ml-1">
            {sortDirection === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </Component>
    )
  }
)

// TablePagination component
const TablePagination = forwardRef<HTMLDivElement, TablePaginationProps>(
  ({
    component: Component = 'div',
    count,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    rowsPerPageOptions = [10, 25, 50, 100],
    labelRowsPerPage = 'Rows per page:',
    labelDisplayedRows = ({ from, to, count }) => `${from}-${to} of ${count}`,
    showFirstButton = false,
    showLastButton = false,
    disabled = false,
    sx,
    ActionsComponent,
    slotProps,
    // Filter out other MUI-specific props that shouldn't go to DOM
    ...domProps
  }, ref) => {

    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number
    ) => {
      if (!disabled && onPageChange) {
        onPageChange(event, newPage)
      }
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (!disabled && onRowsPerPageChange) {
        onRowsPerPageChange(event)
      }
    }

    const totalPages = Math.ceil(count / rowsPerPage)
    const from = page * rowsPerPage + 1
    const to = Math.min(page * rowsPerPage + rowsPerPage, count)

    const classes = [
      'flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200',
      disabled && 'opacity-50 cursor-not-allowed'
    ].filter(Boolean).join(' ')

    const paginationStyle = sx || {}

    return (
      <Component
        ref={ref}
        className={cn(classes)}
        style={paginationStyle}
        {...domProps}
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">{labelRowsPerPage}</span>
          <select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            disabled={disabled}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">
            {labelDisplayedRows({ from, to, count })}
          </span>

          <div className="flex items-center space-x-1">
            {showFirstButton && (
              <button
                onClick={(e) => handleChangePage(e, 0)}
                disabled={disabled || page === 0}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ⇤
              </button>
            )}

            <button
              onClick={(e) => handleChangePage(e, page - 1)}
              disabled={disabled || page === 0}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ←
            </button>

            <button
              onClick={(e) => handleChangePage(e, page + 1)}
              disabled={disabled || page >= totalPages - 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              →
            </button>

            {showLastButton && (
              <button
                onClick={(e) => handleChangePage(e, totalPages - 1)}
                disabled={disabled || page >= totalPages - 1}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
              ⇥
              </button>
            )}
          </div>
        </div>
      </Component>
    )
  }
)

// Set display names
TableContainer.displayName = 'TableContainer'
Table.displayName = 'Table'
TableHead.displayName = 'TableHead'
TableBody.displayName = 'TableBody'
TableRow.displayName = 'TableRow'
TableCell.displayName = 'TableCell'
TablePagination.displayName = 'TablePagination'

export {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination
}
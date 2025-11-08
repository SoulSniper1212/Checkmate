import * as React from "react"
import { cn } from "@/lib/utils"

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  component?: 'ul' | 'ol'
  disablePadding?: boolean
  dense?: boolean
  sx?: object
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, component = 'ul', disablePadding = false, dense = false, sx, children, ...props }, ref) => {
    const Component = component
    return (
      <Component
        ref={ref}
        className={cn(
          "list-none",
          !disablePadding && "py-2",
          dense && "py-1",
          className
        )}
        style={sx}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
List.displayName = "List"

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  disablePadding?: boolean
  dense?: boolean
  disableGutters?: boolean
  alignItems?: 'center' | 'flex-start'
  sx?: object
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({
    className,
    disablePadding = false,
    dense = false,
    disableGutters = false,
    alignItems = 'center',
    sx,
    children,
    ...props
  }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(
          "flex",
          !disablePadding && "py-2",
          dense && "py-1",
          !disableGutters && "px-4",
          alignItems === 'center' && "items-center",
          alignItems === 'flex-start' && "items-start",
          className
        )}
        style={sx}
        {...props}
      >
        {children}
      </li>
    )
  }
)
ListItem.displayName = "ListItem"

export interface ListItemButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  component?: React.ElementType
  disabled?: boolean
  disableGutters?: boolean
  dense?: boolean
  selected?: boolean
  sx?: object
}

const ListItemButton = React.forwardRef<HTMLButtonElement, ListItemButtonProps>(
  ({
    className,
    component = 'button',
    disabled = false,
    disableGutters = false,
    dense = false,
    selected = false,
    sx,
    children,
    ...props
  }, ref) => {
    const Component = component
    return (
      <Component
        ref={ref}
        disabled={disabled}
        className={cn(
          "w-full text-left transition-colors duration-150 ease-in-out",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:bg-accent focus:text-accent-foreground focus:outline-none",
          selected && "bg-accent text-accent-foreground",
          !disableGutters && "px-4",
          dense ? "py-1" : "py-2",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        style={sx}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
ListItemButton.displayName = "ListItemButton"

export interface ListItemIconProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: object
}

const ListItemIcon = React.forwardRef<HTMLDivElement, ListItemIconProps>(
  ({ className, sx, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center min-w-[24px] mr-3",
          className
        )}
        style={sx}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ListItemIcon.displayName = "ListItemIcon"

export interface ListItemTextProps extends React.HTMLAttributes<HTMLDivElement> {
  primary?: React.ReactNode
  secondary?: React.ReactNode
  primaryTypographyProps?: object
  secondaryTypographyProps?: object
  inset?: boolean
  sx?: object
}

const ListItemText = React.forwardRef<HTMLDivElement, ListItemTextProps>(
  ({
    className,
    primary,
    secondary,
    primaryTypographyProps = {},
    secondaryTypographyProps = {},
    inset = false,
    sx,
    children,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          inset && "ml-4",
          className
        )}
        style={sx}
        {...props}
      >
        {primary && (
          <span
            className="text-sm font-medium"
            {...primaryTypographyProps}
          >
            {primary}
          </span>
        )}
        {secondary && (
          <span
            className="text-xs text-muted-foreground mt-0.5"
            {...secondaryTypographyProps}
          >
            {secondary}
          </span>
        )}
        {children}
      </div>
    )
  }
)
ListItemText.displayName = "ListItemText"

export {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
}
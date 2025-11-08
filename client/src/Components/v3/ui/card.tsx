import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Box } from './box'

// MUI Card component interfaces
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // MUI specific props
  elevation?: number
  variant?: 'elevation' | 'outlined'
  sx?: object
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  // MUI specific props
  title?: React.ReactNode
  subheader?: React.ReactNode
  avatar?: React.ReactNode
  action?: React.ReactNode
  disableTypography?: boolean
  sx?: object
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  // MUI specific props
  component?: React.ElementType
  sx?: object
}

export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  // MUI specific props
  disableSpacing?: boolean
  sx?: object
}

// Card main component
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'elevation', elevation = 1, sx, children, ...props }, ref) => {

    // Map MUI variant to Tailwind classes
    const getVariantClasses = () => {
      switch (variant) {
        case 'elevation':
          return `shadow-${elevation === 0 ? 'none' : elevation === 1 ? 'sm' : elevation === 2 ? 'md' : elevation === 3 ? 'lg' : elevation === 4 ? 'xl' : '2xl'}`
        case 'outlined':
          return 'border border-gray-200'
        default:
          return 'shadow-sm'
      }
    }

    // Build card classes
    const classes = [
      'bg-white rounded-lg overflow-hidden',
      'transition-all duration-200',
      getVariantClasses(),
      className
    ].filter(Boolean).join(' ')

    // Convert sx props to inline styles (basic implementation)
    const cardStyle = sx || {}

    return (
      <div
        ref={ref}
        className={cn(classes)}
        style={cardStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// CardHeader component
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({
    className,
    title,
    subheader,
    avatar,
    action,
    disableTypography = false,
    sx,
    children,
    ...props
  }, ref) => {

    // Build header classes
    const classes = [
      'p-6 pb-4',
      'flex items-start justify-between',
      className
    ].filter(Boolean).join(' ')

    // Convert sx props to inline styles
    const headerStyle = sx || {}

    return (
      <div
        ref={ref}
        className={cn(classes)}
        style={headerStyle}
        {...props}
      >
        <div className="flex items-center space-x-4 flex-1">
          {avatar && (
            <div className="flex-shrink-0">
              {avatar}
            </div>
          )}
          <div className="flex-1 min-w-0">
            {(title || subheader) && (
              <div>
                {title && (
                  <div className="text-lg font-semibold text-gray-900 leading-tight">
                    {title}
                  </div>
                )}
                {subheader && (
                  <div className="text-sm text-gray-500 mt-1">
                    {subheader}
                  </div>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
        {action && (
          <div className="flex-shrink-0 ml-4">
            {action}
          </div>
        )}
      </div>
    )
  }
)

// CardContent component
const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, component: Component = 'div', sx, children, ...props }, ref) => {

    // Build content classes
    const classes = [
      'p-6 pt-0',
      className
    ].filter(Boolean).join(' ')

    // Convert sx props to inline styles
    const contentStyle = sx || {}

    return (
      <Component
        ref={ref}
        className={cn(classes)}
        style={contentStyle}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

// CardActions component
const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(
  ({ className, disableSpacing = false, sx, children, ...props }, ref) => {

    // Build actions classes
    const classes = [
      'p-6 pt-0',
      'flex items-center',
      !disableSpacing && 'space-x-2',
      className
    ].filter(Boolean).join(' ')

    // Convert sx props to inline styles
    const actionsStyle = sx || {}

    return (
      <div
        ref={ref}
        className={cn(classes)}
        style={actionsStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Set display names
Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardContent.displayName = 'CardContent'
CardActions.displayName = 'CardActions'

export { Card, CardHeader, CardContent, CardActions }
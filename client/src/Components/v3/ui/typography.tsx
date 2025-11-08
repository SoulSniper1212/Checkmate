import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Box, type BoxProps } from './box'

// MUI Typography component interface
export interface TypographyProps extends Omit<BoxProps, 'component'> {
  // MUI specific props
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'button' | 'caption' | 'overline'
  component?: React.ElementType
  gutterBottom?: boolean
  noWrap?: boolean
  paragraph?: boolean
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  textTransform?: string
  marginY?: string | number
  marginX?: string | number
  marginTop?: string | number
  marginBottom?: string | number
  marginLeft?: string | number
  marginRight?: string | number
}

const Typography = forwardRef<HTMLDivElement, TypographyProps>(
  ({
    className,
    variant = 'body1',
    component,
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    align = 'inherit',
    textTransform,
    marginY,
    marginX,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    children,
    ...props
  }, ref) => {
    // Map MUI variants to HTML elements and Tailwind classes
    const getVariantMapping = () => {
      switch (variant) {
        case 'h1':
          return {
            component: component || 'h1',
            className: 'text-3xl font-semibold',
          }
        case 'h2':
          return {
            component: component || 'h2',
            className: 'text-2xl font-medium',
          }
        case 'h3':
          return {
            component: component || 'h3',
            className: 'text-xl font-medium',
          }
        case 'h4':
          return {
            component: component || 'h4',
            className: 'text-lg font-medium',
          }
        case 'h5':
          return {
            component: component || 'h5',
            className: 'text-base font-medium',
          }
        case 'h6':
          return {
            component: component || 'h6',
            className: 'text-sm font-medium',
          }
        case 'subtitle1':
          return {
            component: component || 'h6',
            className: 'text-base font-medium',
          }
        case 'subtitle2':
          return {
            component: component || 'h6',
            className: 'text-sm font-medium',
          }
        case 'body1':
          return {
            component: component || (paragraph ? 'p' : 'span'),
            className: 'text-base',
          }
        case 'body2':
          return {
            component: component || (paragraph ? 'p' : 'span'),
            className: 'text-sm',
          }
        case 'button':
          return {
            component: component || 'span',
            className: 'text-sm font-medium uppercase',
          }
        case 'caption':
          return {
            component: component || 'span',
            className: 'text-xs',
          }
        case 'overline':
          return {
            component: component || 'span',
            className: 'text-xs uppercase tracking-wide',
          }
        default:
          return {
            component: component || 'span',
            className: 'text-base',
          }
      }
    }

    const variantMapping = getVariantMapping()

    // Build Tailwind classes
    const classes = [
      variantMapping.className,
      gutterBottom && 'mb-2',
      noWrap && 'truncate',
      align !== 'inherit' && `text-${align}`,
      textTransform && textTransform !== 'none' && textTransform,
    ].filter(Boolean).join(' ')

    return (
      <Box
        ref={ref}
        component={variantMapping.component}
        className={cn(classes, className)}
        marginY={marginY}
        marginX={marginX}
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        {...props}
      >
        {children}
      </Box>
    )
  }
)

Typography.displayName = 'Typography'

export { Typography }
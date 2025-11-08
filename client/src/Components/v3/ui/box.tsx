import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// MUI Box component interface
export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  // MUI specific props
  component?: React.ElementType
  sx?: object
  display?: 'block' | 'flex' | 'grid' | 'inline' | 'inline-flex' | 'inline-grid' | 'none'
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
  zIndex?: number
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto'
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto'
  width?: string | number
  height?: string | number
  minWidth?: string | number
  minHeight?: string | number
  maxWidth?: string | number
  maxHeight?: string | number
  p?: string | number
  padding?: string | number
  px?: string | number
  py?: string | number
  pt?: string | number
  pr?: string | number
  pb?: string | number
  pl?: string | number
  m?: string | number
  margin?: string | number
  mx?: string | number
  my?: string | number
  mt?: string | number
  mr?: string | number
  mb?: string | number
  ml?: string | number
  marginRight?: string | number
  marginY?: string | number
  marginX?: string | number
  marginTop?: string | number
  marginBottom?: string | number
  marginLeft?: string | number
  flex?: string | number
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around'
  gap?: string | number
  gridTemplateColumns?: string
  gridTemplateRows?: string
  gridGap?: string | number
  gridColumn?: string
  gridRow?: string
  border?: string | number
  borderRight?: number
  borderBottom?: number
  borderColor?: string
  borderRadius?: string | number
  bgcolor?: string
  backgroundColor?: string
  color?: string
  opacity?: number
  textAlign?: 'left' | 'center' | 'right' | 'justify' | 'inherit'
  transform?: string
  transition?: string
  top?: string | number
  left?: string | number
  src?: string
  alt?: string
}

const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({
    className,
    component: Component = 'div',
    sx,
    display,
    position,
    zIndex,
    overflow,
    overflowX,
    overflowY,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    p,
    padding,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    m,
    margin,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    marginRight,
    marginY,
    marginX,
    marginTop,
    marginBottom,
    marginLeft,
    flex,
    flexDirection,
    flexWrap,
    justifyContent,
    alignItems,
    alignContent,
    gap,
    gridTemplateColumns,
    gridTemplateRows,
    gridGap,
    gridColumn,
    gridRow,
    border,
    borderRight,
    borderBottom,
    borderColor,
    borderRadius,
    bgcolor,
    backgroundColor,
    color,
    opacity,
    textAlign,
    transform,
    transition,
    top,
    left,
    src,
    alt,
    children,
    style,
    ...props
  }, ref) => {
    // Convert MUI spacing system to Tailwind classes
    const getSpacingClass = (value: string | number | undefined, prefix: string) => {
      if (!value) return ''
      if (typeof value === 'number') return `${prefix}-${value}`
      return `${prefix}-${value}`
    }

    // Build Tailwind classes from MUI props
    const classes = [
      display && `display-${display}`,
      position && `position-${position}`,
      overflow && `overflow-${overflow}`,
      overflowX && `overflow-x-${overflowX}`,
      overflowY && `overflow-y-${overflowY}`,
      width && typeof width === 'number' && `w-${width}`,
      height && typeof height === 'number' && `h-${height}`,
      minWidth && typeof minWidth === 'number' && `min-w-${minWidth}`,
      minHeight && typeof minHeight === 'number' && `min-h-${minHeight}`,
      maxWidth && typeof maxWidth === 'number' && `max-w-${maxWidth}`,
      maxHeight && typeof maxHeight === 'number' && `max-h-${maxHeight}`,
      getSpacingClass(p, 'p'),
      getSpacingClass(px, 'px'),
      getSpacingClass(py, 'py'),
      getSpacingClass(pt, 'pt'),
      getSpacingClass(pr, 'pr'),
      getSpacingClass(pb, 'pb'),
      getSpacingClass(pl, 'pl'),
      getSpacingClass(m, 'm'),
      getSpacingClass(mx, 'mx'),
      getSpacingClass(my, 'my'),
      getSpacingClass(mt, 'mt'),
      getSpacingClass(mr, 'mr'),
      getSpacingClass(mb, 'mb'),
      getSpacingClass(ml, 'ml'),
      getSpacingClass(marginY, 'my'),
      getSpacingClass(marginX, 'mx'),
      getSpacingClass(marginTop, 'mt'),
      getSpacingClass(marginBottom, 'mb'),
      getSpacingClass(marginLeft, 'ml'),
      flex && `flex-${flex}`,
      flexDirection && `flex-${flexDirection}`,
      flexWrap && `flex-wrap-${flexWrap}`,
      justifyContent && `justify-${justifyContent}`,
      alignItems && `items-${alignItems}`,
      alignContent && `content-${alignContent}`,
      gap && `gap-${gap}`,
      border && `border-${border}`,
      borderRadius && `rounded-${borderRadius}`,
      opacity && `opacity-${opacity}`,
      textAlign && textAlign !== 'inherit' && `text-${textAlign}`,
    ].filter(Boolean).join(' ')

    // Handle custom values that don't map to Tailwind utilities
    const customStyles: React.CSSProperties = {}

    if (width && typeof width === 'string') customStyles.width = width
    if (height && typeof height === 'string') customStyles.height = height
    if (minWidth && typeof minWidth === 'string') customStyles.minWidth = minWidth
    if (minHeight && typeof minHeight === 'string') customStyles.minHeight = minHeight
    if (maxWidth && typeof maxWidth === 'string') customStyles.maxWidth = maxWidth
    if (maxHeight && typeof maxHeight === 'string') customStyles.maxHeight = maxHeight
    if (gap && typeof gap === 'string') customStyles.gap = gap
    if (gridTemplateColumns) customStyles.gridTemplateColumns = gridTemplateColumns
    if (gridTemplateRows) customStyles.gridTemplateRows = gridTemplateRows
    if (gridGap) customStyles.gridGap = gridGap
    if (gridColumn) customStyles.gridColumn = gridColumn
    if (gridRow) customStyles.gridRow = gridRow
    if (border && typeof border === 'string') customStyles.border = border
    if (borderRadius && typeof borderRadius === 'string') customStyles.borderRadius = borderRadius
    if (bgcolor) customStyles.backgroundColor = bgcolor
    if (backgroundColor) customStyles.backgroundColor = backgroundColor
    if (color) customStyles.color = color
    if (transform) customStyles.transform = transform
    if (transition) customStyles.transition = transition
    if (zIndex) customStyles.zIndex = zIndex
    if (top) customStyles.top = top
    if (left) customStyles.left = left
    if (src) customStyles.backgroundImage = `url(${src})`
    if (alt && Component === 'img') customStyles.alt = alt
    if (padding) customStyles.padding = padding
    if (margin) customStyles.margin = margin
    if (marginRight) customStyles.marginRight = marginRight
    if (borderColor) customStyles.borderColor = borderColor

    // Merge sx prop styles
    if (sx) {
      Object.assign(customStyles, sx)
    }

    return (
      <Component
        ref={ref}
        className={cn(classes, className)}
        style={{ ...customStyles, ...style }}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Box.displayName = 'Box'

export { Box }
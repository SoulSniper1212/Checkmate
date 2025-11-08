import React, { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export interface MenuProps {
  children: React.ReactNode
  open: boolean
  onClose: () => void
  anchorEl?: HTMLElement | null
  anchorOrigin?: {
    vertical: 'top' | 'bottom' | 'center'
    horizontal: 'left' | 'center' | 'right'
  }
  transformOrigin?: {
    vertical: 'top' | 'bottom' | 'center'
    horizontal: 'left' | 'center' | 'right'
  }
  className?: string
}

const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({
    children,
    open,
    onClose,
    anchorEl,
    anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
    transformOrigin = { vertical: 'top', horizontal: 'left' },
    className
  }, ref) => {
    const menuRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ top: 0, left: 0 })

    useEffect(() => {
      if (open && anchorEl && menuRef.current) {
        const rect = anchorEl.getBoundingClientRect()
        const menuRect = menuRef.current.getBoundingClientRect()

        let top = rect.top
        let left = rect.left

        // Apply anchor origin
        switch (anchorOrigin.vertical) {
          case 'bottom':
            top = rect.bottom
            break
          case 'center':
            top = rect.top + rect.height / 2
            break
          // 'top' is default
        }

        switch (anchorOrigin.horizontal) {
          case 'right':
            left = rect.right
            break
          case 'center':
            left = rect.left + rect.width / 2
            break
          // 'left' is default
        }

        // Adjust for menu size
        if (anchorOrigin.horizontal === 'center') {
          left = left - menuRect.width / 2
        }
        if (anchorOrigin.vertical === 'center') {
          top = top - menuRect.height / 2
        }

        // Keep menu within viewport
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        if (left + menuRect.width > viewportWidth) {
          left = viewportWidth - menuRect.width - 8
        }
        if (left < 0) {
          left = 8
        }
        if (top + menuRect.height > viewportHeight) {
          top = viewportHeight - menuRect.height - 8
        }
        if (top < 0) {
          top = 8
        }

        setPosition({ top, left })
      }
    }, [open, anchorEl, anchorOrigin])

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          onClose()
        }
      }

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose()
        }
      }

      if (open) {
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscape)
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleEscape)
      }
    }, [open, onClose])

    if (!open) return null

    const transformOriginStyles = {
      transformOrigin: `${transformOrigin.vertical} ${transformOrigin.horizontal}`
    }

    return (
      <div
        ref={menuRef}
        className={cn(
          "fixed z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
          className
        )}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          ...transformOriginStyles
        }}
        role="menu"
        aria-orientation="vertical"
      >
        {children}
      </div>
    )
  }
)

Menu.displayName = "Menu"

export { Menu }
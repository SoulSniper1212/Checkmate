import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonGroupVariants = cva(
  "inline-flex items-center",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      size: {
        sm: "gap-0",
        md: "gap-0",
        lg: "gap-0",
      },
      variant: {
        default: "",
        outlined: "",
        contained: "",
      }
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "md",
      variant: "default",
    },
  }
)

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  disabled?: boolean
  fullWidth?: boolean
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation, size, variant, disabled = false, fullWidth = false, children, ...props }, ref) => {
    const orientationStyles = {
      horizontal: "flex-row",
      vertical: "flex-col",
    }

    const sizeStyles = {
      sm: "",
      md: "",
      lg: "",
    }

    return (
      <div
        ref={ref}
        className={cn(
          buttonGroupVariants({ orientation, size, variant }),
          orientationStyles[orientation],
          sizeStyles[size],
          fullWidth && "w-full",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        role="group"
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            const isFirst = index === 0
            const isLast = index === React.Children.count(children) - 1

            let borderRadiusClasses = ""

            if (orientation === "horizontal") {
              if (isFirst && !isLast) {
                borderRadiusClasses = "rounded-r-none"
              } else if (!isFirst && isLast) {
                borderRadiusClasses = "rounded-l-none"
              } else if (!isFirst && !isLast) {
                borderRadiusClasses = "rounded-none"
              }
            } else {
              if (isFirst && !isLast) {
                borderRadiusClasses = "rounded-b-none"
              } else if (!isFirst && isLast) {
                borderRadiusClasses = "rounded-t-none"
              } else if (!isFirst && !isLast) {
                borderRadiusClasses = "rounded-none"
              }
            }

            // Add border between buttons
            let borderClasses = ""
            if (orientation === "horizontal" && !isLast) {
              borderClasses = "border-r"
            } else if (orientation === "vertical" && !isLast) {
              borderClasses = "border-b"
            }

            return React.cloneElement(child, {
              className: cn(
                child.props.className,
                borderRadiusClasses,
                borderClasses
              ),
              disabled: disabled || child.props.disabled
            })
          }
          return child
        })}
      </div>
    )
  }
)

ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup, buttonGroupVariants }
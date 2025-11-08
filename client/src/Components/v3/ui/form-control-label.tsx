import React from "react"
import { cn } from "@/lib/utils"

export interface FormControlLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  control?: React.ReactNode
  label?: React.ReactNode
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom'
  disabled?: boolean
}

const FormControlLabel = React.forwardRef<HTMLLabelElement, FormControlLabelProps>(
  ({ className, control, label, labelPlacement = 'end', disabled = false, ...props }, ref) => {
    const placementClasses = {
      start: "flex-row-reverse",
      end: "flex-row",
      top: "flex-col",
      bottom: "flex-col-reverse",
    }

    return (
      <label
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2",
          placementClasses[labelPlacement],
          disabled && "opacity-50 cursor-not-allowed",
          "cursor-pointer",
          className
        )}
        {...props}
      >
        {control}
        {label && (
          <span className="text-sm font-medium text-foreground">
            {label}
          </span>
        )}
      </label>
    )
  }
)

FormControlLabel.displayName = "FormControlLabel"

export { FormControlLabel }
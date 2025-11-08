import React from "react"
import { cn } from "@/lib/utils"

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  error?: boolean
  required?: boolean
  fullWidth?: boolean
}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, disabled = false, error = false, required = false, fullWidth = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          fullWidth && "w-full",
          disabled && "opacity-50 cursor-not-allowed",
          error && "text-destructive",
          className
        )}
        {...props}
      />
    )
  }
)

FormControl.displayName = "FormControl"

export { FormControl }
import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const radioVariants = cva(
  "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-primary",
        destructive: "border-destructive",
        success: "border-green-500",
        warning: "border-yellow-500",
        info: "border-blue-500",
      },
      size: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof radioVariants> {}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <input
        type="radio"
        className={cn(radioVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Radio.displayName = "Radio"

export { Radio, radioVariants }
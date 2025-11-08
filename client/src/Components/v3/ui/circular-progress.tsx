import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const progressVariants = cva(
  "animate-spin",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
      },
      variant: {
        default: "text-primary",
        secondary: "text-secondary",
        destructive: "text-destructive",
        accent: "text-accent",
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)

export interface CircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  color?: string
  thickness?: number
  value?: number
  determinate?: boolean
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ className, size, variant, color, thickness = 3.6, determinate, value, style, ...props }, ref) => {
    if (determinate) {
      const radius = 45 - thickness / 2
      const circumference = 2 * Math.PI * radius
      const strokeDashoffset = circumference - (value || 0) / 100 * circumference

      return (
        <div
          ref={ref}
          className={cn(
            "relative inline-flex items-center justify-center",
            progressVariants({ size, variant }),
            className
          )}
          style={style}
          {...props}
        >
          <svg
            className="transform -rotate-90"
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth={thickness}
              fill="none"
              className="opacity-20"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth={thickness}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                stroke: color || undefined,
                transition: 'stroke-dashoffset 0.3s ease'
              }}
            />
          </svg>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          progressVariants({ size, variant }),
          className
        )}
        style={{
          color: color || undefined,
          ...style
        }}
        {...props}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            className="opacity-20"
          />
          <path
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
            className="origin-center"
          />
        </svg>
      </div>
    )
  }
)

CircularProgress.displayName = "CircularProgress"

export { CircularProgress, progressVariants }
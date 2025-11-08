import React from "react"
import { Radio } from "./radio"
import { cn } from "@/lib/utils"

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  row?: boolean
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, name, value, defaultValue, onChange, row = false, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "")
    const currentValue = value !== undefined ? value : internalValue

    const handleChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "space-y-2",
          row && "flex items-center space-x-4 space-y-0",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Radio) {
            return React.cloneElement(child, {
              name: name || child.props.name,
              checked: currentValue === child.props.value,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                child.props.onChange?.(e)
                if (e.target.checked) {
                  handleChange(e.target.value)
                }
              }
            } as React.ComponentProps<typeof Radio>)
          }
          return child
        })}
      </div>
    )
  }
)

RadioGroup.displayName = "RadioGroup"

export { RadioGroup }
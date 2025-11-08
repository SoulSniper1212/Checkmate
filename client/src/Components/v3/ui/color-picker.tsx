import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

const ColorPicker = forwardRef(({ className, value, onChange, ...props }, ref) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value || "#000000"}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "h-10 w-10 rounded border border-input bg-background cursor-pointer",
          className
        )}
        ref={ref}
        {...props}
      />
      <input
        type="text"
        value={value || "#000000"}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        placeholder="#000000"
      />
    </div>
  );
});

ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
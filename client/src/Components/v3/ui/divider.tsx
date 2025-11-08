import React from "react";
import { cn } from "@/lib/utils";

const Divider = React.forwardRef(({ className, orientation = "horizontal", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  );
});

Divider.displayName = "Divider";

export { Divider };
export type DividerProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
};
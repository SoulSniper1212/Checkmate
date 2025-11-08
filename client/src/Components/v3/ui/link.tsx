import React from "react";
import { cn } from "@/lib/utils";

const Link = React.forwardRef(({ className, href, ...props }, ref) => {
  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        "text-primary underline-offset-4 hover:underline",
        className
      )}
      {...props}
    />
  );
});

Link.displayName = "Link";

export { Link };
export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
import { cn } from "@/lib/utils";
import React from "react";

const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6",
        className
      )}
      {...props}
    />
  );
});
GlassCard.displayName = "GlassCard";

export { GlassCard };

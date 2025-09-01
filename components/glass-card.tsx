import type React from "react"
import { cn } from "@/lib/utils"

export function GlassCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/5 bg-white/5 dark:bg-black/30 backdrop-blur-sm shadow-sm",
        "hover:bg-white/[0.06] transition-colors",
        className,
      )}
    >
      {children}
    </div>
  )
}

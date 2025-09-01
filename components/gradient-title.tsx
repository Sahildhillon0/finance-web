import type React from "react"
import { cn } from "@/lib/utils"

export function GradientTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-pretty text-3xl font-bold tracking-tight md:text-5xl", className)}>
      <span className="bg-gradient-to-r from-blue-400 via-blue-200 to-amber-300 bg-clip-text text-transparent">
        {children}
      </span>
    </h2>
  )
}

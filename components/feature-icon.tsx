import type React from "react"
import { cn } from "@/lib/utils"

export function FeatureIcon({
  icon,
  title,
  children,
  className,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("text-center space-y-3", className)}>
      <div
        className="mx-auto h-12 w-12 rounded-full bg-gradient-to-b from-blue-500/80 to-amber-400/70 flex items-center justify-center text-white shadow-sm"
        aria-hidden
      >
        {icon}
      </div>
      <div className="font-medium">{title}</div>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  )
}

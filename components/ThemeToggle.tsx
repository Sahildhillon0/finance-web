"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <Toggle
      aria-label="Toggle theme"
      pressed={isDark}
      onPressedChange={() => setTheme(isDark ? "light" : "dark")}
      className="ml-4"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Toggle>
  )
}

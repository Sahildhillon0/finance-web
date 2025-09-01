"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const nav = [
  { href: "/", label: "Home" },
  { href: "/browse-cars", label: "Browse Cars" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/admin", label: "Admin" },
]

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M12 17.3l-6.18 3.73 1.64-7.03L2 9.24l7.19-.62L12 2l2.81 6.62 7.19.62-5.46 4.76 1.64 7.03z"
      />
    </svg>
  )
}
function CarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11v6a1 1 0 0 1-1 1h-1a2 2 0 0 1-4 0H11a2 2 0 0 1-4 0H6a1 1 0 0 1-1-1v-6zm2.1-1h9.8l-.9-2.8a1 1 0 0 0-1-.7H9a1 1 0 0 0-1 .7L7.1 10zM7 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
      />
    </svg>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-white">
          Foji <span className="text-blue-400">Vehicle</span> <span className="text-amber-300">Loan</span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white",
                pathname === item.href && "bg-blue-600/10 text-white ring-1 ring-blue-500/30",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
          <Link href="/loan-quote">Get Loan Quote</Link>
        </Button>
      </div>

      <div className="mx-auto hidden max-w-6xl grid-cols-2 gap-4 px-4 pb-3 md:grid">
        <Link
          href="/old-cars"
          className="flex items-center gap-3 rounded-2xl border border-white/5 bg-slate-900/50 px-5 py-4 text-white ring-1 ring-white/5 transition hover:bg-white/5"
          aria-label="Browse Classic Cars"
        >
          <StarIcon className="text-slate-300" />
          <div className="flex flex-col">
            <span className="text-base font-semibold">Old Cars</span>
            <span className="text-xs text-slate-400">Vintage & Collector Vehicles</span>
          </div>
        </Link>
        <Link
          href="/new-cars"
          className="flex items-center gap-3 rounded-2xl border border-white/5 bg-slate-900/50 px-5 py-4 text-white ring-1 ring-white/5 transition hover:bg-white/5"
          aria-label="Browse New Cars"
        >
          <CarIcon className="text-slate-300" />
          <div className="flex flex-col">
            <span className="text-base font-semibold">New Cars</span>
            <span className="text-xs text-slate-400">Latest Models & Technology</span>
          </div>
        </Link>
      </div>
    </header>
  )
}

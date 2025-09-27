"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { Heart, MapPin, SearchIcon, ChevronDown, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const router = useRouter()
  const [q, setQ] = useState("")

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    router.push(`/listings?${params.toString()}`)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      {/* Top row: logo, pill search, actions */}
      <div className="container mx-auto px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold">Foji Vehicle Loan</span>
        </Link>

        {/* Pill Search (desktop) */}
        <form
          onSubmit={onSubmit}
          className="ml-2 hidden md:flex items-center flex-1 max-w-[720px]"
          aria-label="Site search"
        >
          <div className="flex w-full items-center rounded-full border bg-background shadow-xs overflow-hidden">
            <Select defaultValue="all" name="category">
              <SelectTrigger className="rounded-full h-10 w-[110px] border-0 pl-4 pr-2">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="used">Used</SelectItem>
              </SelectContent>
            </Select>
            <Separator orientation="vertical" className="h-6" />
            <SearchIcon className="ml-3 size-4 text-muted-foreground" aria-hidden="true" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search or Ask a Question"
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none h-10"
            />
          </div>
        </form>

        {/* Actions (desktop) */}
        <div className="ml-auto hidden md:flex items-center gap-4 text-sm text-muted-foreground">
          {/* Language */}
          <div className="flex items-center">
            <Globe className="mr-1 size-4" aria-hidden="true" />
            <Select defaultValue="en">
              <SelectTrigger className="h-8 w-[100px]">
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Wishlist */}
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Wishlist">
            <Heart className="size-5" />
          </Button>

          {/* Login / Register */}
          <Link href="#" className="hover:text-foreground">
            Login / Register
          </Link>
        </div>
      </div>

      {/* Menu row: primary categories + city selector */}
      <div className="border-t bg-background/80">
        <div className="container mx-auto px-4 h-11 flex items-center justify-between">
          {/* replace plain nav links with dropdowns and swap 'Videos' for a 'Loan' button linking to /loan */}
          <nav className="flex items-center gap-6 text-sm">
            {/* New Cars dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <span className="uppercase tracking-wide">New Cars</span>
                  <ChevronDown className="size-4" aria-hidden="true" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-56">
                <DropdownMenuItem asChild>
                  <Link href="/loan?brand=maruti-suzuki" className="w-full">Maruti Suzuki</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/loan?brand=hyundai" className="w-full">Hyundai</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/loan?brand=tata" className="w-full">Tata</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/loan?brand=mahindra" className="w-full">Mahindra</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/loan?brand=kia" className="w-full">Kia</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/loan?brand=toyota" className="w-full">Toyota</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/loan?brand=honda" className="w-full">Honda</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/loan?brand=volkswagen" className="w-full">Volkswagen</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/loan?brand=mg" className="w-full">MG</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/loan?brand=renault" className="w-full">Renault</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Used Cars dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <span className="uppercase tracking-wide">Used Cars</span>
                  <ChevronDown className="size-4" aria-hidden="true" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-56">
                <DropdownMenuItem asChild>
                  <Link href="/listings?used=1">Buy Car</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/sell">Sell Car</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* News & Reviews dropdown */}

            {/* Loan button instead of Videos */}
            <Link href="/loan" className="ml-1">
              <Button size="sm" className="h-8 px-3 rounded-full">
                Loan
              </Button>
            </Link>
          </nav>

          {/* City selector */}
          <div className="hidden md:flex items-center gap-2">
            <MapPin className="size-4 text-muted-foreground" aria-hidden="true" />
            <Select defaultValue="delhi">
              <SelectTrigger className="h-8 w-[140px]">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delhi">New Delhi</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="bangalore">Bengaluru</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  )
}

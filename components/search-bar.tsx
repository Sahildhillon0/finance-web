"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function SearchBar() {
  const router = useRouter()
  const [q, setQ] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  function onSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)
    router.push(`/listings?${params.toString()}`)
  }

  return (
    <form onSubmit={onSearch} className="grid grid-cols-1 md:grid-cols-6 gap-3">
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search make, model or city"
        className="md:col-span-3"
      />
      <Input
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="Min Price (₹)"
        inputMode="numeric"
      />
      <Input
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Max Price (₹)"
        inputMode="numeric"
      />
      <Button type="submit" className="md:col-span-1">
        Search
      </Button>
    </form>
  )
}

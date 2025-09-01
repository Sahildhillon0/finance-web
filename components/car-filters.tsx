"use client"

import { useMemo, useState, useEffect } from "react"
import useSWR from "swr"
import { CarCard } from "./car-card"
import type { Car, CarType } from "@/types/car"
import { useSearchParams } from "next/navigation"

// Skeleton loader for car cards
function CarCardSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-xl border border-slate-800/50 bg-slate-900/50 p-4">
      <div className="aspect-video w-full rounded-lg bg-slate-800/50"></div>
      <div className="space-y-3">
        <div className="h-5 w-4/5 rounded bg-slate-800/50"></div>
        <div className="h-4 w-3/4 rounded bg-slate-800/50"></div>
        <div className="h-4 w-1/2 rounded bg-slate-800/50"></div>
      </div>
      <div className="h-10 w-full rounded-lg bg-blue-600/20"></div>
    </div>
  )
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function CarFiltersGrid({ lockType }: { lockType?: CarType }) {
  const searchParams = useSearchParams()
  const [q, setQ] = useState("")
  const [status, setStatus] = useState("")
  const [type, setType] = useState<CarType | "">("")
  const [sort, setSort] = useState("newest")

  useEffect(() => {
    const t = (searchParams.get("type") as CarType | "") || ""
    const s = searchParams.get("status") || ""
    const so = searchParams.get("sort") || "newest"
    setType(lockType ?? t)
    setStatus(s)
    setSort(so)
  }, [searchParams, lockType])

  const query = useMemo(() => {
    const s = new URLSearchParams()
    if (q) s.set("q", q)
    if (status) s.set("status", status)
    if (lockType) {
      s.set("type", lockType)
    } else if (type) {
      s.set("type", type)
    }
    s.set("sort", sort)
    s.set("limit", "24")
    return s.toString()
  }, [q, status, type, sort, lockType])

  const { data, isLoading } = useSWR<{ items: Car[] }>(`/api/cars?${query}`, fetcher)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search cars..."
          className="rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-slate-400"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white"
        >
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
        </select>

        {/* Type selector: lock when lockType is provided */}
        {lockType ? (
          <select
            value={lockType}
            disabled
            className="cursor-not-allowed rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2 text-sm text-white/60"
            aria-label="Type"
          >
            <option value={lockType}>{lockType === "new" ? "New" : "Classic"}</option>
          </select>
        ) : (
          <select
            value={type}
            onChange={(e) => setType(e.target.value as CarType | "")}
            className="rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white"
          >
            <option value="">All Types</option>
            <option value="new">New</option>
            <option value="old">Classic</option>
          </select>
        )}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          // Show skeleton loaders while loading
          Array.from({ length: 8 }).map((_, i) => <CarCardSkeleton key={i} />)
        ) : data?.items && data.items.length > 0 ? (
          // Show actual car cards when data is loaded
          data.items.map((car) => (
            <CarCard key={String(car._id)} car={car} />
          ))
        ) : (
          // Show empty state when no cars found
          <div className="col-span-full py-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a2 2 0 01-2.828 0l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-white">No cars found</h3>
            <p className="mt-1 text-slate-400">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  )
}

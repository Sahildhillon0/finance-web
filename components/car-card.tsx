"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { StatusBadge } from "./status-badge"
import type { Car } from "@/types/car"
import { useRouter } from "next/navigation"

export function CarCard({ car, index = 0 }: { car: Car; index?: number }) {
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  const handleViewDetails = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setIsNavigating(true)
    router.push(`/cars/${id}`)
  }
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      className="group rounded-2xl border border-white/5 bg-slate-900/60 p-4 shadow-lg shadow-slate-950/30 ring-1 ring-white/5"
    >
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={car.imageUrl || "/placeholder.svg?height=240&width=480&query=car+photo"}
          alt={car.name}
          width={640}
          height={360}
          className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] md:h-48"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <StatusBadge status={car.status} />
          <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs text-blue-200 ring-1 ring-blue-400/30">
            {car.type === "new" ? "New" : "Classic"}
          </span>
        </div>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white">{car.name}</h3>
      <p className="line-clamp-2 text-sm text-slate-300">{car.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-blue-300">
          <span className="text-xl font-semibold">₹{car.price.toLocaleString("en-IN")}</span>
        </div>
        <button
          onClick={(e) => handleViewDetails(e, car._id)}
          disabled={isNavigating}
          className={`flex items-center justify-center gap-2 rounded-md border border-blue-500/30 bg-blue-600/20 px-3 py-1.5 text-sm text-blue-100 transition hover:bg-blue-600/30 ${isNavigating ? 'opacity-70 cursor-wait' : ''}`}
        >
          {isNavigating ? (
            <>
              <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </>
          ) : (
            'View Details'
          )}
        </button>
      </div>
    </motion.article>
  )
}

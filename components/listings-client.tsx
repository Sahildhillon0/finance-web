"use client"

import useSWR from "swr"
import { useSearchParams } from "next/navigation"
import { Filters } from "@/components/filters"
import { CarCard } from "@/components/car-card"

type Car = {
  id: string
  title: string
  make: string
  model: string
  year: number
  price: number
  km: number
  fuel: string
  body: string
  transmission: string
  location: string
  images?: string[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function ListingsClient() {
  const sp = useSearchParams()
  const query = sp.toString()
  const { data, isLoading } = useSWR<{ cars: Car[] }>(`/api/cars?${query}`, fetcher)

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Browse cars</h1>
      <Filters />
      {isLoading ? (
        <p className="text-muted-foreground">Loading cars…</p>
      ) : data && data.cars.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.cars.map((c) => (
            <CarCard
              key={c.id}
              id={c.id}
              title={c.title}
              price={c.price}
              year={c.year}
              km={c.km}
              fuel={c.fuel}
              images={c.images}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No cars match your search.</p>
      )}
    </div>
  )
}

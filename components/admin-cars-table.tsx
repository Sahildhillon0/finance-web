"use client"

import useSWR, { useSWRConfig } from "swr"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminCarForm } from "@/components/admin-car-form"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type CarsResponse = {
  cars: Array<{
    id: string
    title: string
    make: string
    model: string
    year: number
    price: number
    km: number
    location: string
    condition: "New" | "Used"
    images?: string[]
  }>
}

export function AdminCarsTable() {
  const { mutate } = useSWRConfig()
  const { data, error, isLoading } = useSWR<CarsResponse>("/api/cars", fetcher)

  return (
    <div className="space-y-4">
      {/* creation form */}
      <AdminCarForm onCreated={() => mutate("/api/cars")} />

      {isLoading ? (
        <div className="text-sm text-muted-foreground">Loading...</div>
      ) : error ? (
        <div className="text-sm text-destructive">Failed to load</div>
      ) : (
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Make</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>KM</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Condition</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data?.cars ?? []).map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.images?.[0] || "/placeholder.jpg"}
                      alt=""
                      className="h-10 w-14 object-cover rounded border"
                    />
                  </TableCell>
                  <TableCell className="max-w-[240px] truncate">{c.title}</TableCell>
                  <TableCell>{c.make}</TableCell>
                  <TableCell>{c.model}</TableCell>
                  <TableCell>{c.year}</TableCell>
                  <TableCell>₹{c.price.toLocaleString("en-IN")}</TableCell>
                  <TableCell>{c.km.toLocaleString("en-IN")}</TableCell>
                  <TableCell>{c.location}</TableCell>
                  <TableCell>{c.condition}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

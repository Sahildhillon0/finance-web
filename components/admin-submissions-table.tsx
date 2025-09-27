"use client"

import useSWR, { useSWRConfig } from "swr"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type Submission = {
  id: string
  title: string
  make: string
  model: string
  year: number
  price: number
  km: number
  location: string
  images?: string[]
  seller?: { name: string; phone: string; desc?: string }
}

export function AdminSubmissionsTable() {
  const { mutate } = useSWRConfig()
  const { data, isLoading, error } = useSWR<{ submissions: Submission[] }>("/api/admin/submissions", fetcher)

  async function approve(id: string) {
    const res = await fetch(`/api/admin/approve/${id}`, { method: "POST" })
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      alert(j.error || "Failed to approve")
      return
    }
    mutate("/api/admin/submissions")
    mutate("/api/cars") // refresh approved cars table if open
  }

  return (
    <div className="rounded-lg border overflow-x-auto">
      {isLoading ? (
        <div className="p-4 text-sm text-muted-foreground">Loading...</div>
      ) : error ? (
        <div className="p-4 text-sm text-destructive">Failed to load</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>KM</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data?.submissions ?? []).map((s) => (
              <TableRow key={s.id}>
                <TableCell>
                  <img
                    src={s.images?.[0] || "/placeholder.jpg"}
                    alt=""
                    className="h-10 w-14 object-cover rounded border"
                  />
                </TableCell>
                <TableCell className="max-w-[260px]">
                  <div className="truncate font-medium">{s.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {s.make} • {s.model} • {s.year}
                  </div>
                </TableCell>
                <TableCell>₹{s.price.toLocaleString("en-IN")}</TableCell>
                <TableCell>{s.km.toLocaleString("en-IN")}</TableCell>
                <TableCell>
                  <div className="text-sm">{s.seller?.name ?? "-"}</div>
                  <div className="text-xs text-muted-foreground">{s.seller?.phone ?? ""}</div>
                </TableCell>
                <TableCell>
                  <Button size="sm" onClick={() => approve(s.id)}>
                    Approve
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

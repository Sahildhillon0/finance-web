"use client"

import useSWR from "swr"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function AdminLeadsTable() {
  const { data, error, isLoading } = useSWR<{ leads: any[] }>("/api/leads", fetcher, { refreshInterval: 5000 })

  if (isLoading) return <div className="text-sm text-muted-foreground">Loading...</div>
  if (error) return <div className="text-sm text-destructive">Failed to load</div>

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Car ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data?.leads ?? []).map((l, idx) => (
            <TableRow key={idx}>
              <TableCell>{l.carId}</TableCell>
              <TableCell>{l.name}</TableCell>
              <TableCell>{l.phone}</TableCell>
              <TableCell className="max-w-[420px] truncate">{l.message || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

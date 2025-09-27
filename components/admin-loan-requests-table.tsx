"use client"

import useSWR from "swr"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function AdminLoanRequestsTable() {
  const { data, error, isLoading } = useSWR<{ requests: any[] }>("/api/loan-requests", fetcher, {
    refreshInterval: 5000,
  })

  if (isLoading) return <div className="text-sm text-muted-foreground">Loading...</div>
  if (error) return <div className="text-sm text-destructive">Failed to load</div>

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Vehicle Type</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data?.requests ?? []).map((r, idx) => (
            <TableRow key={idx}>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.mobile}</TableCell>
              <TableCell className="uppercase">{r.state}</TableCell>
              <TableCell className="capitalize">{r.vehicleType}</TableCell>
              <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

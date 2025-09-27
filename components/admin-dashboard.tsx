"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminLoanRequestsTable } from "@/components/admin-loan-requests-table"
import { AdminLeadsTable } from "@/components/admin-leads-table"
import { AdminCarsTable } from "@/components/admin-cars-table"
import { AdminSubmissionsTable } from "@/components/admin-submissions-table" // new tab

export function AdminDashboard() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Admin Panel</h1>
      <p className="text-sm text-muted-foreground mt-1">Demo-only. Data is stored in memory and resets on redeploy.</p>
      <Tabs defaultValue="loan-requests" className="mt-6">
        <TabsList>
          <TabsTrigger value="loan-requests">Loan Requests</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="cars">Cars</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger> {/* new tab */}
        </TabsList>
        <TabsContent value="loan-requests" className="mt-4">
          <AdminLoanRequestsTable />
        </TabsContent>
        <TabsContent value="leads" className="mt-4">
          <AdminLeadsTable />
        </TabsContent>
        <TabsContent value="cars" className="mt-4">
          <AdminCarsTable />
        </TabsContent>
        <TabsContent value="submissions" className="mt-4">
          <AdminSubmissionsTable /> {/* listing pending approvals */}
        </TabsContent>
      </Tabs>
    </section>
  )
}

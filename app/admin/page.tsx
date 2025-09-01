import { redirect } from "next/navigation"
import { getAdminSession } from "@/lib/auth"
import AdminPageClient from "./AdminPageClient"

export const metadata = { title: "Admin Dashboard | Foji Vehicle Loan" }

export default async function AdminPage() {
  const session = await getAdminSession()
  if (!session) {
    redirect("/admin/login")
  }
  return <AdminPageClient />
}

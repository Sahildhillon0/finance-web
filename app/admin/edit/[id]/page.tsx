// app/admin/edit/[id]/page.tsx
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/footer"
import { CarForm } from "@/components/car-form"
import { getAdminSession } from "@/lib/auth"
import { redirect } from "next/navigation"

async function getCar(id: string) {
  const db = await getDb()
  return db.collection("cars").findOne({ _id: new ObjectId(id) })
}

export default async function EditCarPage({ params }: { params: { id: string } }) {
  const session = await getAdminSession()
  if (!session) redirect("/admin/login")

  const car: any = await getCar(params.id)
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-200">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-4 text-3xl font-bold text-white">Edit Car</h1>
        <CarForm existing={{ ...car, _id: String(car._id) }} />
      </main>
      <SiteFooter />
    </div>
  )
}

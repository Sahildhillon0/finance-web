import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function GET() {
  const db = await getDb()
  const col = db.collection("cars")
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const last7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const [total, available, soldThisMonth, recently] = await Promise.all([
    col.countDocuments({}),
    col.countDocuments({ $or: [{ status: "available" }, { availability: "in-stock" }] }),
    col
      .countDocuments({
        $or: [{ status: "sold" }, { availability: "sold" }],
        $orClauses: undefined,
        $and: [{ $or: [{ updatedAt: { $gte: monthStart } }, { createdAt: { $gte: monthStart } }] }],
      })
      .catch(async () => {
        // some Mongo servers may not like mixed $or/$and like above; fallback simple
        return col.countDocuments({ status: "sold", updatedAt: { $gte: monthStart } })
      }),
    col.countDocuments({ createdAt: { $gte: last7 } }),
  ])

  return NextResponse.json({ total, available, soldThisMonth, recently })
}

import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function POST(_: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getDb()
    const col = db.collection("cars")
    const result = await col.updateOne({ id: params.id }, { $set: { approved: true } })
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to approve" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

type Lead = { carId: string; name: string; phone: string; message?: string }

export async function POST(req: Request) {
  const body = (await req.json()) as { carId?: string; name?: string; phone?: string; message?: string }
  if (!body?.carId || !body?.name || !body?.phone) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 })
  }
  const db = await getDb()
  const col = db.collection("leads")
  await col.insertOne({
    carId: body.carId,
    name: body.name,
    phone: body.phone,
    message: body.message || "",
    createdAt: new Date().toISOString(),
  })
  return NextResponse.json({ ok: true })
}

export async function GET() {
  const db = await getDb()
  const col = db.collection("leads")
  const leads = await col.find({}).sort({ _id: -1 }).toArray()
  return NextResponse.json({
    leads: leads.map(({ _id, ...rest }) => rest),
  })
}

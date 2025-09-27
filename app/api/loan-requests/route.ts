import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

type LoanRequest = {
  name: string
  mobile: string
  state: string
  vehicleType: "tractor" | "commercial" | "car"
  createdAt: string
}

export async function POST(req: Request) {
  const body = (await req.json()) as {
    name?: string
    mobile?: string
    state?: string
    vehicleType?: "tractor" | "commercial" | "car"
  }
  if (!body?.name || !body?.mobile || !body?.state || !body?.vehicleType) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 })
  }

  const db = await getDb()
  const col = db.collection("loan_requests")
  await col.insertOne({
    name: body.name,
    mobile: body.mobile,
    state: body.state,
    vehicleType: body.vehicleType,
    createdAt: new Date().toISOString(),
  })
  return NextResponse.json({ ok: true })
}

export async function GET() {
  const db = await getDb()
  const col = db.collection("loan_requests")
  const requests = await col.find({}).sort({ _id: -1 }).toArray()
  return NextResponse.json({
    requests: requests.map(({ _id, ...rest }) => rest),
  })
}

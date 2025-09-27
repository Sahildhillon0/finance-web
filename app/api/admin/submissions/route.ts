import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

type CarDoc = {
  _id?: any
  id: string
  title: string
  make: string
  model: string
  year: number
  price: number
  km: number
  location: string
  images?: string[]
  approved?: boolean
  seller?: { name: string; phone: string; desc?: string }
  createdAt?: Date
}

export async function GET() {
  try {
    const db = await getDb()
    const col = db.collection<CarDoc>("cars")
    const docs = await col.find({ approved: false }).sort({ createdAt: -1 }).toArray()
    const res = docs.map(({ _id, ...rest }) => rest)
    return NextResponse.json({ submissions: res })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to load submissions" }, { status: 500 })
  }
}

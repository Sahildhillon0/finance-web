import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

type Body = {
  name: string
  phone: string
  desc?: string
  model: string
  price: number
  km: number
  images: string[] // Cloudinary URLs
}

type CarDoc = {
  _id?: any
  id: string
  title: string
  make: string
  model: string
  year: number
  price: number
  km: number
  fuel: "Petrol" | "Diesel" | "CNG" | "Electric"
  body: "Hatchback" | "Sedan" | "SUV" | "MPV"
  transmission: "Manual" | "Automatic"
  location: string
  images?: string[]
  condition: "New" | "Used"
  approved?: boolean
  seller?: { name: string; phone: string; desc?: string }
  createdAt?: Date
}

function genId(): string {
  return `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Body>

    // [v0] debug logs
    console.log("[v0] sell route: received images length=", Array.isArray(body?.images) ? body!.images!.length : 0)

    if (!body?.name || !body?.phone || !body?.model || !body?.price || !body?.km) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Very lightweight parsing: try to split make/model/year if user typed "2019 Hyundai i20"
    const parts = String(body.model).split(" ")
    const maybeYear = Number(parts[0])
    const year = !isNaN(maybeYear) && maybeYear > 1990 ? maybeYear : new Date().getFullYear()
    const make = parts.find((p) => isNaN(Number(p))) || "Unknown"
    const model = parts.slice(parts.indexOf(make) + 1).join(" ") || String(body.model)

    const doc: CarDoc = {
      id: genId(),
      title: `${model} (${year})`,
      make,
      model,
      year,
      price: Number(body.price),
      km: Number(body.km),
      fuel: "Petrol",
      body: "Hatchback",
      transmission: "Manual",
      location: "Seller Provided",
      condition: "Used",
      approved: false, // pending approval
      images: Array.isArray(body.images) && body.images.length ? body.images : undefined,
      seller: { name: body.name, phone: body.phone, desc: body.desc },
      createdAt: new Date(),
    }

    const db = await getDb()
    const col = db.collection<CarDoc>("cars")
    await col.insertOne(doc)

    // [v0] debug logs
    console.log("[v0] sell route: inserted car id=", doc.id, " images=", doc.images?.length ?? 0)

    return NextResponse.json({ ok: true, id: doc.id })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to submit" }, { status: 500 })
  }
}

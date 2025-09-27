import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { CarRecord } from "@/data/cars"

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
  approved?: boolean // add approved flag for moderation
}

function genId(): string {
  return `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function toPublic(car: CarDoc) {
  // Strip _id; keep string id used by the app
  const { _id, ...rest } = car
  return rest
}

async function ensureCollection() {
  const db = await getDb()
  return db.collection<CarDoc>("cars")
}

export async function GET(req: Request) {
  try {
    const col = await ensureCollection()

    const { searchParams } = new URL(req.url)
    const q = (searchParams.get("q") ?? "").toLowerCase()
    const make = (searchParams.get("make") ?? "").toLowerCase()
    const model = (searchParams.get("model") ?? "").toLowerCase()
    const fuel = searchParams.get("fuel") ?? ""
    const body = searchParams.get("body") ?? ""
    const minPrice = Number(searchParams.get("minPrice") ?? 0)
    const maxPrice = Number(searchParams.get("maxPrice") ?? Number.MAX_SAFE_INTEGER)
    const maxKm = Number(searchParams.get("maxKm") ?? Number.MAX_SAFE_INTEGER)
    const condition = (searchParams.get("condition") ?? "").toLowerCase()

    const filter: any = { approved: true } // only show approved listings publicly

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { make: { $regex: q, $options: "i" } },
        { model: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
      ]
    }
    if (make) filter.make = { $regex: make, $options: "i" }
    if (model) filter.model = { $regex: model, $options: "i" }
    if (fuel) filter.fuel = fuel
    if (body) filter.body = body
    if (condition) filter.condition = condition === "new" ? "New" : "Used"

    filter.price = { $gte: minPrice, $lte: maxPrice }
    filter.km = { $lte: maxKm }

    const docs = await col.find(filter).sort({ _id: -1 }).toArray()
    return NextResponse.json({ cars: docs.map(toPublic) })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to fetch cars" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<CarRecord>

    const required = [
      "title",
      "make",
      "model",
      "year",
      "price",
      "km",
      "fuel",
      "body",
      "transmission",
      "location",
      "condition",
    ] as const
    
    for (const key of required) {
      if (body[key] === undefined || body[key] === null || body[key] === "") {
        return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 })
      }
    }

    if (typeof body.year !== "number" || typeof body.price !== "number" || typeof body.km !== "number") {
      return NextResponse.json({ error: "year, price, and km must be numbers" }, { status: 400 })
    }

    const doc: CarDoc = {
      id: genId(),
      title: body.title!,
      make: body.make!,
      model: body.model!,
      year: body.year!,
      price: body.price!,
      km: body.km!,
      fuel: body.fuel as CarDoc["fuel"],
      body: body.body as CarDoc["body"],
      transmission: body.transmission as CarDoc["transmission"],
      location: body.location!,
      condition: (body.condition as CarDoc["condition"]) ?? "Used",
      images:
        Array.isArray(body.images) && body.images.length > 0
          ? body.images.filter((s): s is string => typeof s === "string")
          : undefined,
      approved: body.approved ?? true, // allow admin-created cars to be instantly approved; default true
    }

    const col = await ensureCollection()
    await col.insertOne(doc)

    return NextResponse.json(toPublic(doc), { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Invalid request" }, { status: 400 })
  }
}

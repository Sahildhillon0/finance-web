import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

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
  approved?: boolean // include approved flag
}

function toPublic(car: CarDoc) {
  const { _id, ...rest } = car
  return rest
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getDb()
    const col = db.collection<CarDoc>("cars")
    let car = await col.findOne({ id: params.id })
    if (!car && ObjectId.isValid(params.id)) {
      console.log("[v0] car by id not found; trying _id fallback")
      car = await col.findOne({ _id: new ObjectId(params.id) })
    }
    if (!car) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    return NextResponse.json(toPublic(car))
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 })
  }
}

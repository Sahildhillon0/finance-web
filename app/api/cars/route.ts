import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { authenticateRequest } from "@/lib/auth"
import type { Car, CreateCarData } from "@/lib/models/Car"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("carfinance")
    const cars = await db.collection<Car>("cars").find({}).toArray()

    return NextResponse.json(cars)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cars" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = authenticateRequest(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const carData: CreateCarData = await request.json()
    const client = await clientPromise
    const db = client.db("carfinance")

    const newCar: Omit<Car, "_id"> = {
      ...carData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("cars").insertOne(newCar)

    return NextResponse.json({ _id: result.insertedId, ...newCar })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create car" }, { status: 500 })
  }
}

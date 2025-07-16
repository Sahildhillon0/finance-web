import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { authenticateRequest } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("carfinance");
    const car = await db.collection("cars").findOne({ _id: new ObjectId(params.id) });
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }
    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch car" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const user = authenticateRequest(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const carData = await request.json()
    const client = await clientPromise
    const db = client.db("carfinance")

    const result = await db.collection("cars").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...carData,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Car updated successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update car" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const user = authenticateRequest(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const client = await clientPromise
    const db = client.db("carfinance")

    const result = await db.collection("cars").deleteOne({
      _id: new ObjectId(params.id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Car deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete car" }, { status: 500 })
  }
}

// app/api/cars/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { Car } from "@/types/car"

function normalize(doc: any): Car {
  return {
    _id: String(doc._id),
    name: doc.name,
    description: doc.description,
    price: Number(doc.price) || 0,
    status: (doc.status || (doc.availability === "in-stock" ? "available" : "sold")) as Car["status"],
    type: (doc.type || "new") as Car["type"],
    imageUrl: doc.imageUrl || (Array.isArray(doc.images) && doc.images.length > 0 ? doc.images[0] : "") || "",
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }
}

export async function GET(req: NextRequest) {
  const db = await getDb()
  const qp = req.nextUrl.searchParams
  const q = qp.get("q") || ""
  const status = qp.get("status") || ""
  const type = qp.get("type") || ""
  const minPrice = qp.get("minPrice")
  const maxPrice = qp.get("maxPrice")
  const sort = qp.get("sort") === "oldest" ? { createdAt: 1 } : { createdAt: -1 }
  const limit = Number(qp.get("limit") || 24)
  const page = Number(qp.get("page") || 1)
  const skip = (page - 1) * limit

  const filter: any = {}
  if (q) filter.$or = [{ name: { $regex: q, $options: "i" } }, { description: { $regex: q, $options: "i" } }]
  if (status) {
    filter.$or = [...(filter.$or || []), { status }, { availability: status === "available" ? "in-stock" : status }]
  }
  if (type) filter.type = type
  if (minPrice || maxPrice) {
    filter.price = {}
    if (minPrice) filter.price.$gte = Number(minPrice)
    if (maxPrice) filter.price.$lte = Number(maxPrice)
  }

  const col = db.collection("cars")
  const [raw, total] = await Promise.all([
    col.find(filter).sort(sort).skip(skip).limit(limit).toArray(),
    col.countDocuments(filter),
  ])

  const items = raw.map(normalize)

  return NextResponse.json({ items, total, page, limit })
}

export async function POST(req: NextRequest) {
  const db = await getDb()
  let body: Partial<Car> = {}
  try {
    body = (await req.json()) as Partial<Car>
  } catch (e) {
    return NextResponse.json("Invalid JSON body", { status: 400 })
  }

  const name = String(body.name || "").trim()
  const description = String(body.description || "").trim()
  const priceNum = Number(body.price)

  if (!name) return NextResponse.json("Missing required field: name", { status: 400 })
  if (!description) return NextResponse.json("Missing required field: description", { status: 400 })
  if (!Number.isFinite(priceNum)) return NextResponse.json("Invalid price", { status: 400 })

  // Process images - handle both array and single URL cases
  const images = Array.isArray(body.images) 
    ? body.images.filter((img: any) => img && (typeof img === 'string' ? img : img.url))
    : [];
    
  // Extract image URLs if they're objects with a url property
  const imageUrls = images.map((img: any) => typeof img === 'string' ? img : img.url);
  
  // Set the first image as the main image if available
  const imageUrl = imageUrls[0] || body.imageUrl || '';

  const doc: any = {
    name,
    description,
    price: priceNum,
    status: (body.status || "available") as Car["status"],
    type: (body.type || "new") as Car["type"],
    imageUrl,
    availability: (body.status || "available") === "available" ? "in-stock" : "sold",
    images: imageUrls, // Save the array of image URLs
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  
  console.log('Saving car with images:', {
    receivedImages: body.images,
    processedImages: imageUrls,
    finalDoc: doc
  });
  const res = await db.collection("cars").insertOne(doc)
  return NextResponse.json({ _id: res.insertedId, ...doc })
}

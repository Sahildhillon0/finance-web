// app/api/cars/[id]/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

function normalize(doc: any) {
  // Handle both old format (string array) and new format (array of objects with url and isPrimary)
  const images = Array.isArray(doc.images) 
    ? doc.images.map((img: any) => ({
        url: typeof img === 'string' ? img : img.url,
        isPrimary: typeof img === 'object' ? img.isPrimary : false
      }))
    : [];

  return {
    _id: String(doc._id),
    name: doc.name,
    description: doc.description,
    price: Number(doc.price) || 0,
    status: doc.status || (doc.availability === "in-stock" ? "available" : "sold"),
    type: doc.type || "new",
    images: images,
    // For backward compatibility
    imageUrl: doc.imageUrl || (images.length > 0 ? images[0].url : ""),
    availability: doc.availability || (doc.status === 'available' ? 'in-stock' : 'sold'),
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date().toISOString(),
  };
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const db = await getDb()
  try {
    const car = await db.collection("cars").findOne({ _id: new ObjectId(params.id) })
    return car ? NextResponse.json(normalize(car)) : NextResponse.json({ error: "Not found" }, { status: 404 })
  } catch {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const db = await getDb()
  const patch = await req.json()
  try {
    const set: any = { updatedAt: new Date() }
    if ("name" in patch) set.name = patch.name
    if ("description" in patch) set.description = patch.description
    if ("price" in patch) set.price = Number(patch.price)
    if ("status" in patch) {
      set.status = patch.status
      set.availability = patch.status === "available" ? "in-stock" : "sold"
    }
    if ("type" in patch) set.type = patch.type
    
    // Handle images array
    if ("images" in patch) {
      // Process images - handle both array and single URL cases
      const images = Array.isArray(patch.images) 
        ? patch.images.filter((img: any) => img && (typeof img === 'string' ? img : img.url))
        : [];
      
      // Extract image URLs if they're objects with a url property
      const imageUrls = images.map((img: any) => typeof img === 'string' ? img : img.url);
      
      set.images = imageUrls;
      set.imageUrl = imageUrls[0] || '';
      
      console.log('Updating car with images:', {
        receivedImages: patch.images,
        processedImages: imageUrls,
        finalImageUrl: set.imageUrl
      });
    } else if ("imageUrl" in patch) {
      // Handle legacy case where only imageUrl is provided
      set.imageUrl = patch.imageUrl || '';
      set.images = patch.imageUrl ? [patch.imageUrl] : [];
    }

    const res = await db
      .collection("cars")
      .findOneAndUpdate({ _id: new ObjectId(params.id) }, { $set: set }, { returnDocument: "after" })
    return res ? NextResponse.json(normalize(res)) : NextResponse.json({ error: "Not found" }, { status: 404 })
  } catch {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const db = await getDb()
  try {
    const res = await db.collection("cars").deleteOne({ _id: new ObjectId(params.id) })
    return res.deletedCount
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ error: "Not found" }, { status: 404 })
  } catch {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  }
}

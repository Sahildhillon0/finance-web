// app/api/cars/[id]/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Define the Car interface for type safety
interface Car {
  _id: ObjectId;
  name?: string;
  description?: string;
  price?: number;
  status?: "available" | "sold";
  type?: "new" | "used";
  images?: Array<{ url: string; isPrimary: boolean } | string>;
  imageUrl?: string;
  availability?: "in-stock" | "sold";
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the normalized car response type
interface NormalizedCar {
  _id: string;
  name: string;
  description: string;
  price: number;
  status: "available" | "sold";
  type: "new" | "used";
  images: Array<{ url: string; isPrimary: boolean }>;
  imageUrl: string;
  availability: "in-stock" | "sold";
  createdAt: string;
  updatedAt: string;
}

// Normalize function to transform MongoDB document to API response
function normalize(doc: Car): NormalizedCar {
  // Handle both old format (string array) and new format (array of objects with url and isPrimary)
  const images = Array.isArray(doc.images)
    ? doc.images.map((img) => ({
        url: typeof img === "string" ? img : img.url,
        isPrimary: typeof img === "object" ? img.isPrimary : false,
      }))
    : [];

  return {
    _id: String(doc._id),
    name: doc.name || "",
    description: doc.description || "",
    price: Number(doc.price) || 0,
    status: doc.status || (doc.availability === "in-stock" ? "available" : "sold"),
    type: doc.type || "new",
    images,
    // For backward compatibility
    imageUrl: doc.imageUrl || (images.length > 0 ? images[0].url : ""),
    availability: doc.availability || (doc.status === "available" ? "in-stock" : "sold"),
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date().toISOString(),
  };
}

// Define props type with Promise for params
interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET handler: Fetch a car by ID
export async function GET(_: NextRequest, { params }: RouteParams) {
  const db = await getDb();
  try {
    const { id } = await params; // Await params to get the id
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    const car = await db.collection<Car>("cars").findOne({ _id: new ObjectId(id) });
    return car
      ? NextResponse.json(normalize(car))
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    console.error("Error in GET /cars/[id]:", error);
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
}

// PUT handler: Update a car by ID
export async function PUT(req: NextRequest, { params }: RouteParams) {
  const db = await getDb();
  const patch = await req.json();
  try {
    const { id } = await params; // Await params to get the id
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const set: Partial<Car> & { updatedAt: Date } = { updatedAt: new Date() };
    if ("name" in patch) set.name = patch.name;
    if ("description" in patch) set.description = patch.description;
    if ("price" in patch) set.price = Number(patch.price);
    if ("status" in patch) {
      set.status = patch.status;
      set.availability = patch.status === "available" ? "in-stock" : "sold";
    }
    if ("type" in patch) set.type = patch.type;

    // Handle images array
    if ("images" in patch) {
      const images = Array.isArray(patch.images)
        ? patch.images.filter((img: any) => img && (typeof img === "string" ? img : img.url))
        : [];
      const imageUrls = images.map((img: any) => (typeof img === "string" ? img : img.url));
      set.images = imageUrls;
      set.imageUrl = imageUrls[0] || "";
      console.log("Updating car with images:", {
        receivedImages: patch.images,
        processedImages: imageUrls,
        finalImageUrl: set.imageUrl,
      });
    } else if ("imageUrl" in patch) {
      set.imageUrl = patch.imageUrl || "";
      set.images = patch.imageUrl ? [patch.imageUrl] : [];
    }

    const res = await db
      .collection<Car>("cars")
      .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: set }, { returnDocument: "after" });
    return res
      ? NextResponse.json(normalize(res))
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    console.error("Error in PUT /cars/[id]:", error);
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
}

// DELETE handler: Remove a car by ID
export async function DELETE(_: NextRequest, { params }: RouteParams) {
  const db = await getDb();
  try {
    const { id } = await params; // Await params to get the id
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    const res = await db.collection<Car>("cars").deleteOne({ _id: new ObjectId(id) });
    return res.deletedCount
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    console.error("Error in DELETE /cars/[id]:", error);
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
}
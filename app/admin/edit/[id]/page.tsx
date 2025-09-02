// app/admin/edit/[id]/page.tsx
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";
import { CarForm } from "@/components/car-form";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import type { Car as CarType } from "@/types/car";

// Extend the Car type with MongoDB's ObjectId
interface Car extends Omit<CarType, '_id'> {
  _id: ObjectId;
}

// Function to fetch a car by ID
async function getCar(id: string): Promise<Car | null> {
  try {
    const db = await getDb();
    if (!ObjectId.isValid(id)) {
      return null;
    }
    return await db.collection<Car>("cars").findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error("Error fetching car:", error);
    return null;
  }
}

// Define the props type with Promise for params
interface EditCarPageProps {
  params: Promise<{ id: string }>;
}

// Page component
export default async function EditCarPage({ params }: EditCarPageProps) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { id } = await params; // Await params to get the id
  const car = await getCar(id);

  if (!car) {
    notFound(); // Handle case where car is not found
  }

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-200">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-4 text-3xl font-bold text-white">Edit Car</h1>
        <CarForm 
          existing={{
            ...car,
            _id: String(car._id),
            name: car.name || '',
            description: car.description || '',
            price: car.price || 0,
            status: car.status || 'available',
            type: car.type || 'new',
            availability: car.availability || 'in-stock',
            images: car.images || []
          }} 
        />
      </main>
      <SiteFooter />
    </div>
  );
}
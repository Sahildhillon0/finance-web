// app/cars/[id]/page.tsx
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/footer"
import { StatusBadge } from "@/components/status-badge"
import { CarImages } from "@/components/car/CarImages"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// Helper function to get all image URLs from image data
function getAllImageUrls(images: any[]): string[] {
  if (!images) return [];
  
  // If images is a string (legacy format), wrap it in an array
  if (typeof images === 'string') {
    return [images];
  }
  
  // If it's an array, process each item
  if (Array.isArray(images)) {
    return images
      .map(img => {
        if (!img) return '';
        // Handle both string and object formats
        if (typeof img === 'string') return img;
        return img.url || '';
      })
      .filter(Boolean);
  }
  
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const db = await getDb()
  let car: any = null
  try {
    car = await db.collection("cars").findOne({ _id: new ObjectId(id) })
  } catch {}
  return {
    title: car ? `${car.name} | Foji Vehicle Loan` : "Car Details | Foji Vehicle Loan",
    description: car?.description || "Explore car details, availability, and pricing.",
    openGraph: {
      title: car?.name,
      description: car?.description,
      images: car?.imageUrl ? [car.imageUrl] : [],
    },
  }
}

async function getCar(id: string) {
  const db = await getDb()
  return db.collection("cars").findOne({ _id: new ObjectId(id) })
}

export default async function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const car: any = await getCar(id)
  if (!car) {
    return (
      <div className="min-h-dvh bg-slate-950 text-slate-200">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 py-16">
          <p>Car not found.</p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  // Log the car data for debugging
  console.log('Car data:', JSON.stringify({
    _id: car._id,
    name: car.name,
    imageUrl: car.imageUrl,
    images: car.images,
  }, null, 2));

  // Get all image URLs
  let imageUrls = getAllImageUrls(car.images || []);
  
  // Add car.imageUrl if it exists and isn't already in the array
  if (car.imageUrl && !imageUrls.includes(car.imageUrl)) {
    imageUrls.unshift(car.imageUrl);
  }
  
  // Ensure all URLs are absolute (add https: if missing) and clean them up
  imageUrls = imageUrls.map(url => {
    if (!url) return '';
    
    // If it's already a full URL, return as is
    if (url.startsWith('http')) return url;
    
    // If it's a protocol-relative URL, add https:
    if (url.startsWith('//')) return `https:${url}`;
    
    // If it's a path starting with /, prepend Cloudinary domain
    if (url.startsWith('/')) return `https://res.cloudinary.com${url}`;
    
    // If it's a Cloudinary public ID, format it properly
    if (url.includes('cloudinary')) {
      // Extract the public ID from the URL if it's malformed
      const publicIdMatch = url.match(/upload\/([^\/]+)/);
      if (publicIdMatch) {
        return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dftylctbi'}/image/upload/${publicIdMatch[1]}`;
      }
      return url;
    }
    
    return url;
  }).filter(Boolean);
  
  // Remove any duplicate URLs
  imageUrls = [...new Set(imageUrls)];
  
  // If no images, use a placeholder
  if (imageUrls.length === 0) {
    imageUrls = ['/placeholder.svg?height=480&width=800&query=car+photo'];
  }
  
  console.log('Processed image URLs:', {
    original: car.images,
    processed: imageUrls,
    hasImageUrl: !!car.imageUrl,
    finalCount: imageUrls.length
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: car.name,
    image: imageUrls[0] || "/placeholder.svg?height=480&width=800&query=car+photo",
    description: car.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: car.price,
      availability: car.status === "available" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
    },
    datePosted: car.createdAt ? new Date(car.createdAt).toISOString() : undefined,
  }

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-200">
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-5">
        <div className="md:col-span-3">
          <CarImages 
            images={imageUrls}
            name={car.name}
            type={car.type}
          />
        </div>
        <div className="space-y-4 md:col-span-2">
          <h1 className="text-4xl font-extrabold text-white">{car.name}</h1>
          <StatusBadge status={car.status} />
          <div>
            <h3 className="mt-3 text-lg font-semibold text-white">Description</h3>
            <p className="text-slate-300">{car.description}</p>
            <p className="mt-2 text-sm text-slate-400">
              Added on {car.createdAt ? new Date(car.createdAt).toLocaleDateString() : ""}
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
            <p className="text-sm text-slate-400">Starting Price</p>
            <div className="text-3xl font-bold text-blue-300">₹{car.price.toLocaleString("en-IN")}</div>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              <a className="rounded-md bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-500" href="/loan-quote">
                Get Loan Quote
              </a>
              <a
                className="rounded-md border border-blue-500/40 px-4 py-2 text-center text-blue-200 hover:bg-blue-600/10"
                href="#test-drive"
              >
                Schedule Test Drive
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
            <h3 className="mb-2 text-lg font-semibold text-white">Contact Our Team</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>Call: +91 98177 65315</li>
              <li>Email: info@autoloanpro.com</li>
            </ul>
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </main>
      <SiteFooter />
    </div>
  )
}

import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle } from "lucide-react"

type Car = {
  id: string
  title: string
  make: string
  model: string
  year: number
  price: number
  km: number
  fuel: string
  transmission: string
  location: string
  images?: string[]
  condition?: string
}

function getBaseUrl() {
  if (typeof window !== 'undefined') return '' // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

async function getCar(id: string): Promise<Car | undefined> {
  try {
    const baseUrl = getBaseUrl()
    
    // First try the specific car endpoint
    const apiUrl = `${baseUrl}/api/cars/${id}`
    console.log('Fetching car from:', apiUrl)
    
    const res = await fetch(apiUrl, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    console.log('Response status:', res.status)
    
    if (res.ok) {
      const car = await res.json()
      console.log('Found car:', car)
      return car
    }
    
    // If not found, try to get all cars and filter
    console.log('Car not found by ID, trying to fetch all cars...')
    const allCarsRes = await fetch(`${baseUrl}/api/cars`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!allCarsRes.ok) {
      console.error('Failed to fetch all cars:', allCarsRes.status, allCarsRes.statusText)
      return undefined
    }
    
    const data = await allCarsRes.json()
    const car = data.cars?.find((c: Car) => c.id === id)
    
    if (!car) {
      console.log('Car not found in the list of all cars')
      return undefined
    }
    
    console.log('Found car in all cars list:', car)
    return car
  } catch (error) {
    console.error('Error fetching car:', error)
    return undefined
  }
}

export default async function CarDetailsPage({ params }: { params: { id: string } }) {
  const car = await getCar(params.id)
  if (!car) return notFound()

  const images = car.images && car.images.length > 0 ? car.images : ["/classic-red-convertible.png"]

  return (
    <main className="container mx-auto px-4 py-8 grid gap-6 lg:grid-cols-3">
      <section className="lg:col-span-2">
        <div className="rounded-xl overflow-hidden border bg-card">
          <img 
            src={images[0] || "/placeholder.svg"} 
            alt={`${car.make} ${car.model}`} 
            className="w-full h-auto" 
          />
        </div>
        
        {images.length > 1 && (
          <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
            {images.slice(1, 7).map((src: string, i: number) => (
              <img
                key={i}
                src={src || "/placeholder.svg"}
                alt={`${car.make} ${car.model} thumbnail ${i + 2}`}
                className="h-24 w-full object-cover rounded border"
              />
            ))}
          </div>
        )}

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-2xl">{car.title}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Price</span>
              <div className="font-semibold">₹{car.price?.toLocaleString("en-IN") || 'N/A'}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Year</span>
              <div className="font-semibold">{car.year || 'N/A'}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Fuel</span>
              <div className="font-semibold">{car.fuel || 'N/A'}</div>
            </div>
            <div>
              <span className="text-muted-foreground">KMs</span>
              <div className="font-semibold">{car.km?.toLocaleString() || 'N/A'}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Transmission</span>
              <div className="font-semibold">{car.transmission || 'N/A'}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Location</span>
              <div className="font-semibold">{car.location || 'N/A'}</div>
            </div>
            {car.condition && (
              <div>
                <span className="text-muted-foreground">Condition</span>
                <div className="font-semibold">{car.condition}</div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <aside className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle>Loan Specialist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Jiternder Singh</h3>
                <p className="text-muted-foreground">Senior Loan Specialist</p>
              </div>
              
              <p className="text-sm">
                With over 10 years of experience in vehicle financing, I specialize in helping clients find the perfect loan solutions tailored to their needs. My goal is to make your car buying experience smooth and stress-free.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href="tel:+919817765315" className="font-medium hover:text-primary">
                    +91 98177 65315
                  </a>
                </div>
                
                <a 
                  href="https://wa.me/919817765315" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                
                <p className="text-xs text-muted-foreground text-center">
                  Fast approvals and flexible EMIs available
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>
    </main>
  )
}

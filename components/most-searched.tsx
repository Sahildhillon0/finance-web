"use client"

import useSWR from "swr"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CarCard } from "@/components/car-card"
import { Button } from "@/components/ui/button"

type Car = {
  id: string
  title: string
  price: number
  year: number
  km: number
  fuel: string
  images?: string[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function BodyCarousel({ body }: { body: string }) {
  const { data, isLoading } = useSWR<{ cars: Car[] }>(`/api/cars?body=${encodeURIComponent(body)}`, fetcher)
  if (isLoading) return <p className="text-muted-foreground">Loading…</p>
  if (!data?.cars?.length) return <p className="text-muted-foreground">No cars found.</p>

  return (
    <Carousel opts={{ align: "start" }} className="w-full">
      <CarouselContent>
        {data.cars.slice(0, 12).map((c) => (
          <CarouselItem key={c.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
            <CarCard
              id={c.id}
              title={c.title}
              price={c.price}
              year={c.year}
              km={c.km}
              fuel={c.fuel}
              image={c.images?.[0]}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export function MostSearched() {
  const bodies = ["SUV", "Hatchback", "Sedan", "MPV"]
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="rounded-2xl border bg-card p-4 md:p-6">
        <h2 className="mb-3 text-xl md:text-2xl font-semibold">The most searched cars</h2>
        <Tabs defaultValue="SUV" className="w-full">
          <TabsList className="mb-4 grid grid-cols-4 max-w-[480px]">
            {bodies.map((b) => (
              <TabsTrigger key={b} value={b}>
                {b}
              </TabsTrigger>
            ))}
          </TabsList>
          {bodies.map((b) => (
            <TabsContent key={b} value={b} className="mt-0">
              <BodyCarousel body={b} />
              <div className="mt-4">
                <Button asChild variant="link">
                  <Link href={`/listings?body=${encodeURIComponent(b)}`}>View All {b} Cars →</Link>
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

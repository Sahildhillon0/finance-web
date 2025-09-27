import Link from "next/link"
import { HomeHero } from "@/components/home-hero"
import { MostSearched } from "@/components/most-searched"
import { PopularBrands } from "@/components/popular-brands"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="min-h-svh">
      <HomeHero />
      
      {/* Buy and Sell Buttons */}
      <div className="bg-muted/40 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <Link href="/listings" className="w-full">
              <Button size="lg" className="w-full h-16 text-lg font-semibold bg-primary hover:bg-primary/90">
                Buy Cars
              </Button>
            </Link>
            <Link href="/sell" className="w-full">
              <Button size="lg" variant="outline" className="w-full h-16 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary/10">
                Sell Cars
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <MostSearched />
      <PopularBrands />
    </main>
  )
}

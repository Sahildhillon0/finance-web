// app/old-cars/page.tsx
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/footer"
import { CarFiltersGrid } from "@/components/car-filters"

export const metadata = {
  title: "Classic Cars | Foji Vehicle Loan",
  description: "Browse our curated inventory of classic cars with flexible financing options.",
}

export default function OldCarsPage() {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-200">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6">
        <h1 className="text-center text-4xl font-extrabold text-white md:text-5xl">
          Browse{" "}
          <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">
            Classic Cars
          </span>
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-300">
          Discover vintage icons and collector vehicles. Search, filter, and view details.
        </p>
        <div className="mt-8">
          <CarFiltersGrid lockType="old" />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

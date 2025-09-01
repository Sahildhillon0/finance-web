// app/new-cars/page.tsx
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/footer"
import { CarFiltersGrid } from "@/components/car-filters"

export const metadata = {
  title: "New Cars | Foji Vehicle Loan",
  description: "Browse the latest models with modern features and great financing.",
}

export default function NewCarsPage() {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-200">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6">
        <h1 className="text-center text-4xl font-extrabold text-white md:text-5xl">
          Browse{" "}
          <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">New Cars</span>
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-300">
          Explore the latest models and cutting-edge technology. Search, filter, and view details.
        </p>
        <div className="mt-8">
          <CarFiltersGrid lockType="new" />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

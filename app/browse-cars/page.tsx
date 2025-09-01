// app/browse-cars/page.tsx
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/footer"
import { CarFiltersGrid } from "@/components/car-filters"

export const metadata = {
  title: "Browse Our Collection | Foji Vehicle Loan",
  description: "Filter and search new and classic cars. Find your perfect fit with flexible loan options.",
}

export default function BrowseCarsPage() {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-200">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        <div className="mb-6 grid grid-cols-1 overflow-hidden rounded-2xl border border-white/5 bg-slate-900/50 md:grid-cols-2">
          <a
            href="/browse-cars?type=old"
            className="flex items-center justify-between gap-3 border-b border-white/5 p-5 transition hover:bg-white/5 md:border-b-0 md:border-r"
          >
            <div>
              <div className="text-lg font-semibold text-white">Classic Cars</div>
              <div className="text-sm text-slate-400">Vintage & Collector Vehicles</div>
            </div>
            <span aria-hidden className="text-slate-400">
              ›
            </span>
          </a>
          <a
            href="/browse-cars?type=new"
            className="flex items-center justify-between gap-3 p-5 transition hover:bg-white/5"
          >
            <div>
              <div className="text-lg font-semibold text-white">New Cars</div>
              <div className="text-sm text-slate-400">Latest Models & Technology</div>
            </div>
            <span aria-hidden className="text-slate-400">
              ›
            </span>
          </a>
        </div>

        <h1 className="text-center text-4xl font-extrabold text-white md:text-5xl">
          Browse Our{" "}
          <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">Collection</span>
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-300">
          Find your perfect vehicle from our extensive inventory of new and classic cars.
        </p>
        <div className="mt-8">
          <CarFiltersGrid />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

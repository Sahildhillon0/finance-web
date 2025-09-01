// app/page.tsx
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/footer"
import { getDb } from "@/lib/mongodb"
import { CarCard } from "@/components/car-card"
import { Brands } from "@/components/home/brands"
import { Services } from "@/components/home/services"
import { Testimonials } from "@/components/home/testimonials"
import { SocialConnect } from "@/components/home/social-connect"
import { ContactBand } from "@/components/contact-band"

export const metadata = {
  title: "Foji Vehicle Loan — Find Your Dream Car",
  description:
    "Get the best vehicle loans with competitive rates. Browse our premium collection of new and classic cars.",
  openGraph: {
    title: "Foji Vehicle Loan",
    description: "Browse our premium collection of new and classic cars.",
    type: "website",
  },
}

async function getFeatured() {
  const db = await getDb()
  const col = db.collection("cars")
  const [oldCars, newCars] = await Promise.all([
    col.find({ type: "old" }).sort({ createdAt: -1 }).limit(4).toArray(),
    col.find({ type: "new" }).sort({ createdAt: -1 }).limit(4).toArray(),
  ])
  
  // Convert MongoDB documents to plain JavaScript objects
  const toPlainObject = (doc: any) => ({
    ...doc,
    _id: doc._id.toString(), // Convert ObjectId to string
  });
  
  return { 
    oldCars: oldCars.map(toPlainObject), 
    newCars: newCars.map(toPlainObject) 
  };
}

export default async function HomePage() {
  const { oldCars, newCars } = await getFeatured()

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-200">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        <section className="mb-10 rounded-3xl border border-white/5 bg-[radial-gradient(ellipse_at_top_left,rgba(30,58,138,0.35),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.2),transparent_60%)] p-10 text-center shadow-2xl">
          <h1 className="text-balance text-4xl font-extrabold text-white md:text-6xl">
            Find Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">Dream Car</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Get the best vehicle loans with competitive rates and browse our premium collection of new and classic cars.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href="/browse-cars"
              className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500"
            >
              Browse Cars
            </a>
            <a
              href="/loan-quote"
              className="rounded-md border border-blue-500/40 px-5 py-2.5 text-sm text-blue-200 hover:bg-blue-600/10"
            >
              Get Loan Quote
            </a>
          </div>
        </section>

        {/* Brands */}
        <div className="mb-10">
          <Brands />
        </div>

        {/* Old vs New Split */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-10">
          <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5 shadow-xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xl">★</span>
              <h3 className="text-xl font-semibold text-white">Old Cars</h3>
            </div>
            <div className="grid grid-cols-1 gap-5">
              {oldCars.map((c: any, i: number) => (
                <CarCard key={String(c._id)} car={c} index={i} />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5 shadow-xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xl">🚙</span>
              <h3 className="text-xl font-semibold text-white">New Cars</h3>
            </div>
            <div className="grid grid-cols-1 gap-5">
              {newCars.map((c: any, i: number) => (
                <CarCard key={String(c._id)} car={c} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Social + Contact Band */}
        <SocialConnect />
        <ContactBand />
      </main>

      <SiteFooter />
    </div>
  )
}

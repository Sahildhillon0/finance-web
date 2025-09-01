import { Quote, Star } from "lucide-react"
import { SectionHeading } from "../section-heading"

const TESTIMONIALS = [
  {
    quote: "CarFinance Pro made getting my dream car so easy! Approval was quick and the rates beat my bank.",
    name: "Sarah Johnson",
    location: "Austin, TX",
    vehicle: "2023 Honda Accord",
  },
  {
    quote: "Excellent service from start to finish. The team was professional and helped me understand all my options.",
    name: "Mike Chen",
    location: "Seattle, WA",
    vehicle: "2022 Toyota Camry",
  },
  {
    quote: "I refinanced my existing loan and saved ₹200 per month. Highly recommend their services!",
    name: "Emily Rodriguez",
    location: "Miami, FL",
    vehicle: "2021 Ford F‑150",
  },
]

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl py-8">
      <SectionHeading
        title="What Our Customers Say"
        subtitle="Don’t just take our word for it. Here’s what our customers say about their experience."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="rounded-2xl border border-white/5 bg-slate-900/60 p-6 shadow-xl">
            <Quote className="h-5 w-5 text-blue-300" aria-hidden />
            <blockquote className="mt-3 text-slate-200">“{t.quote}”</blockquote>
            <div className="mt-3 flex items-center gap-1 text-amber-300" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-300 text-amber-300" />
              ))}
            </div>
            <figcaption className="mt-2">
              <div className="font-semibold text-white">{t.name}</div>
              <div className="text-xs text-slate-400">{t.location}</div>
              <div className="text-xs text-blue-200">{t.vehicle}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

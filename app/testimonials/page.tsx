// app/testimonials/page.tsx
export const metadata = { title: "Testimonials | Foji Vehicle Loan" }
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/footer"
import { GlassCard } from "@/components/glass-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { Button } from "@/components/ui/button"

export default function TestimonialsPage() {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-200">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-center text-4xl md:text-5xl font-extrabold text-white">
          Customer{" "}
          <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">
            Testimonials
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-center text-slate-300">
          Don’t just take our word for it. See what our satisfied customers have to say about their experience with Foji
          Vehicle Loan.
        </p>

        <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              title: "Sarah's BMW X5 Experience",
              img: "/car-video-thumbnail-mountain-road.png",
              duration: "2:15",
            },
            {
              title: "Robert's Classic Mustang Story",
              img: "/classic-mustang-video-thumbnail.png",
              duration: "3:22",
            },
          ].map((m) => (
            <GlassCard key={m.title} className="p-3">
              <div className="relative overflow-hidden rounded-xl">
                <img src={m.img || "/placeholder.svg"} alt={m.title} className="h-56 w-full object-cover" />
                {/* play overlay */}
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <div className="h-14 w-14 rounded-full bg-blue-600/90 ring-2 ring-white/20 shadow-lg" />
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="absolute h-6 w-6 fill-white"
                    style={{ marginLeft: 2 }}
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                {/* duration badge */}
                <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-xs text-white">
                  {m.duration}
                </span>
              </div>
              <div className="mt-3 text-blue-300 hover:text-blue-200">{m.title}</div>
            </GlassCard>
          ))}
        </section>

        <section className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: "98%", label: "Customer Satisfaction" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "10,000+", label: "Happy Customers" },
            { value: "24hrs", label: "Average Approval Time" },
          ].map((m) => (
            <GlassCard key={m.label} className="p-6 text-center">
              <div className="text-3xl md:text-4xl font-semibold text-white">{m.value}</div>
              <div className="mt-1 text-slate-400">{m.label}</div>
            </GlassCard>
          ))}
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <TestimonialCard
            avatar="/diverse-woman-avatar.png"
            name="Jennifer Martinez"
            role="Small Business Owner"
            rating={5}
            quote="Foji Vehicle Loan made buying my first car incredibly easy. Great rate, quick approval, and a helpful team."
            purchased="2023 Honda Accord"
          />
          <TestimonialCard
            avatar="/man-avatar.png"
            name="Robert Chen"
            role="Software Engineer"
            rating={5}
            quote="Looking for a classic car and Foji had the perfect 1969 Mustang. Options were clear and the process was smooth."
            purchased="1969 Ford Mustang"
          />
          <TestimonialCard
            avatar="/diverse-woman-avatar.png"
            name="Sarah Williams"
            role="Marketing Director"
            rating={5}
            quote="Pre‑approval was quick and I knew exactly what I could afford before shopping. Perfect SUV for my family!"
            purchased="2024 BMW X5"
          />
        </section>

        <section className="mt-12">
          <div className="rounded-2xl border border-white/5 bg-gradient-to-r from-blue-500/15 via-blue-400/10 to-amber-300/15 px-6 py-10 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white text-balance">
              Join Our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">
                Satisfied
              </span>{" "}
              Customers
            </h2>
            <p className="mt-2 text-slate-300">
              Experience the Foji Vehicle Loan difference. Start your journey to car ownership today.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button asChild>
                <a href="/#pre-approval">Get Started Today</a>
              </Button>
              <Button asChild variant="secondary">
                <a href="/browse-cars">Browse Our Cars</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

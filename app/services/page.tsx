// app/services/page.tsx
export const metadata = { title: "Services | Foji Vehicle Loan" }
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/footer"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { WhyChoose } from "@/components/home/why-choose"

export default function ServicesPage() {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-200">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <header className="text-center">
          <h1 className="text-balance text-4xl md:text-5xl font-extrabold text-white">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="mt-3 text-slate-300">
            From financing to warranties, we provide comprehensive automotive services to make your car buying journey
            smooth and hassle‑free.
          </p>
        </header>

        <section className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-4">
          {[
            { title: "New Car Loans", apr: "2.9% APR", terms: "Terms: 12–84 months" },
            { title: "Used Car Loans", apr: "3.9% APR", terms: "Terms: 12–72 months" },
            { title: "Classic Car Loans", apr: "4.9% APR", terms: "Terms: 12–180 months" },
            { title: "Refinancing", apr: "2.5% APR", terms: "Terms: 12–84 months" },
          ].map((c) => (
            <GlassCard key={c.title} className="p-6 text-center">
              <h3 className="font-semibold text-white">{c.title}</h3>
              <div className="mt-3 text-2xl font-bold text-blue-300">{c.apr}</div>
              <div className="mt-1 text-sm text-slate-400">{c.terms}</div>
            </GlassCard>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-white">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">
              Our Services
            </span>
            ?
          </h2>
          <WhyChoose />
        </section>

        <section className="mt-4">
          <h3 className="text-center text-2xl md:text-3xl font-semibold text-white">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">Solutions</span>
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                title: "Loan Calculator",
                points: ["Instant calculations", "Multiple loan terms", "Rate comparisons", "Payment schedules"],
                href: "/#calculator",
              },
              {
                title: "Pre‑Approval",
                points: ["Quick 5‑minute application", "Soft credit check", "Valid for 60 days", "Multiple lenders"],
                href: "/#pre-approval",
              },
            ].map((card) => (
              <GlassCard key={card.title} className="p-6 md:p-8">
                <h4 className="text-xl font-semibold text-white">{card.title}</h4>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {card.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-400" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button asChild className="w-full md:w-auto">
                    <Link href={card.href}>Learn More</Link>
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h3 className="text-center text-2xl md:text-3xl font-semibold text-white">
            Financing{" "}
            <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">Options</span>
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-4">
            {[
              { title: "New Car Loans", apr: "2.9% APR" },
              { title: "Used Car Loans", apr: "3.9% APR" },
              { title: "Classic Car Loans", apr: "4.9% APR" },
              { title: "Refinancing", apr: "2.5% APR" },
            ].map((opt) => (
              <GlassCard key={opt.title} className="p-6 text-center">
                <h4 className="font-semibold text-white">{opt.title}</h4>
                <div className="mt-3 text-xl font-bold text-blue-300">{opt.apr}</div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="rounded-2xl border border-white/5 bg-gradient-to-r from-blue-500/15 via-blue-400/10 to-amber-300/15 px-6 py-10 text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-white">
              Ready to Get{" "}
              <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">Started</span>
              ?
            </h3>
            <p className="mt-2 text-slate-300">
              Apply for pre‑approval today and get one step closer to driving your dream car.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button asChild>
                <Link href="/#pre-approval">Apply for Pre‑Approval</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/#calculator">Calculate Payments</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

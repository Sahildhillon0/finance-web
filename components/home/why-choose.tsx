import { Shield, Clock, BadgeDollarSign, Users } from "lucide-react"
import { SectionHeading } from "../section-heading"

const FEATURES = [
  {
    icon: Shield,
    title: "Trusted & Secure",
    desc: "Bank‑level security protects your financial information.",
  },
  {
    icon: Clock,
    title: "Quick Approval",
    desc: "Get approved in minutes, not days.",
  },
  {
    icon: BadgeDollarSign,
    title: "Competitive Rates",
    desc: "Access some of the most competitive financing rates.",
  },
  {
    icon: Users,
    title: "Expert Support",
    desc: "Our financing experts help you every step of the way.",
  },
]

export function WhyChoose() {
  return (
    <section className="mx-auto max-w-6xl py-8">
      <SectionHeading
        title="Why Choose Foji Vehicle Loan?"
        subtitle="We’ve been helping customers secure the best car financing deals for over a decade."
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl border border-white/5 bg-slate-900/60 p-6 shadow-xl">
            <Icon className="h-6 w-6 text-blue-300" aria-hidden />
            <h4 className="mt-3 font-semibold text-white">{title}</h4>
            <p className="mt-1 text-sm text-slate-300">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

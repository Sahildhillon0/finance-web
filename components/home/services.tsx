import { CarFront, Calculator, FileText } from "lucide-react"
import { SectionHeading } from "../section-heading"

const CARDS = [
  {
    icon: CarFront,
    title: "New Car Financing",
    desc: "Get great rates for brand‑new vehicles with flexible terms.",
  },
  {
    icon: Calculator,
    title: "Used Car Loans",
    desc: "Competitive rates for pre‑owned vehicles with quick approvals.",
  },
  {
    icon: FileText,
    title: "Refinancing",
    desc: "Lower your monthly payment by refinancing your current loan.",
  },
]

export function Services() {
  return (
    <section className="mx-auto max-w-6xl py-8">
      <SectionHeading
        title="Our Financing Services"
        subtitle="Whether buying new, used, or looking to refinance, we have the perfect solution."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {CARDS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl border border-white/5 bg-slate-900/60 p-6 shadow-xl">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 ring-1 ring-blue-500/30">
              <Icon className="h-5 w-5 text-blue-300" aria-hidden />
            </div>
            <h4 className="text-lg font-semibold text-white">{title}</h4>
            <p className="mt-1 text-sm text-slate-300">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

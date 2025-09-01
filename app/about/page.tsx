// app/about/page.tsx
export const metadata = { title: "About | Foji Vehicle Loan" }
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/footer"
import { GlassCard } from "@/components/glass-card"

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-200">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <header className="text-center">
          <h1 className="text-balance text-4xl md:text-5xl font-extrabold text-white">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">
              Foji Vehicle Loan
            </span>
          </h1>
          <p className="mt-4 text-pretty text-slate-300">
            For over 15 years, we’ve helped customers find their dream cars and secure the best financing options. Our
            commitment to excellence and customer satisfaction sets us apart in the automotive industry.
          </p>
        </header>

        <section className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: "15+", label: "Years in Business" },
            { value: "10,000+", label: "Happy Customers" },
            { value: "25,000+", label: "Cars Sold" },
            { value: "98%", label: "Loan Approvals" },
          ].map((m) => (
            <GlassCard key={m.label} className="p-6 text-center">
              <div className="text-3xl md:text-4xl font-semibold text-white">{m.value}</div>
              <div className="mt-1 text-slate-400">{m.label}</div>
            </GlassCard>
          ))}
        </section>

        <section className="mt-12 grid items-start gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Our Story</h2>
            <p className="mt-3 leading-relaxed text-slate-300">
              Foji Vehicle Loan was founded in 2009 with a simple mission: to make car buying and financing accessible,
              transparent, and stress‑free for everyone. What started as a small family business has grown into a
              trusted name in the automotive industry.
            </p>
            <p className="mt-3 leading-relaxed text-slate-300">
              We partner with multiple lenders to find the best rates and terms for each individual customer and curate
              an inventory that includes both the latest models and rare classics.
            </p>
          </div>
          <GlassCard className="overflow-hidden">
            <img
              src="/analytics-dashboard-on-laptop.png"
              alt="Analytics showing our growth over the years"
              className="h-full w-full object-cover"
            />
          </GlassCard>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">Values</span>
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                title: "Transparency",
                desc: "No hidden fees. We believe in honest, upfront pricing and clear communication throughout the process.",
              },
              {
                title: "Quality",
                desc: "Every vehicle in our inventory meets our strict quality standards. We stand behind every car we sell.",
              },
              {
                title: "Customer First",
                desc: "Your satisfaction is our priority. We go above and beyond to ensure you have the best car buying experience.",
              },
            ].map((f) => (
              <GlassCard key={f.title} className="p-6">
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">Team</span>
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { name: "John Smith", role: "CEO & Founder", img: "/diverse-person-portrait.png" },
              { name: "Sarah Johnson", role: "Finance Director", img: "/diverse-person-portrait.png" },
              { name: "Mike Davis", role: "Sales Manager", img: "/diverse-person-portrait.png" },
            ].map((p) => (
              <GlassCard key={p.name} className="p-6 text-center">
                <img
                  src={p.img || "/placeholder.svg"}
                  alt={`${p.name} headshot`}
                  className="mx-auto h-24 w-24 rounded-full object-cover"
                />
                <div className="mt-4 font-semibold text-white">{p.name}</div>
                <div className="text-sm text-slate-400">{p.role}</div>
              </GlassCard>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

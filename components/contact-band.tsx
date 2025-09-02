import { MapPin, Phone, Mail } from "lucide-react"

export function ContactBand() {
  return (
    <section
      aria-labelledby="contact-band"
      className="mx-auto mt-14 max-w-6xl rounded-3xl border border-white/5 bg-gradient-to-b from-slate-900/60 to-slate-900/30 p-6 shadow-xl"
    >
      <h3 id="contact-band" className="sr-only">
        Contact information
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
          <div className="mb-2 flex items-center gap-2 text-amber-300">
            <MapPin className="h-5 w-5" aria-hidden />
            <span className="font-semibold">Location</span>
          </div>
          <p className="text-sm text-slate-300">
            Mahendergarh Chowk, Charkhi Dadri, Near Patrol Pump, Mahendergarh Road, Ch. Dadri - 127306
          </p>
          <a href="https://maps.google.com" className="mt-2 inline-block text-sm text-blue-300 hover:underline">
            Get Directions
          </a>
        </div>
        <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
          <div className="mb-2 flex items-center gap-2 text-amber-300">
            <Phone className="h-5 w-5" aria-hidden />
            <span className="font-semibold">Phone</span>
          </div>
          <p className="text-sm text-slate-300">+91 98177 65315</p>
          <p className="text-xs text-slate-400">24/7 Support Available</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
          <div className="mb-2 flex items-center gap-2 text-amber-300">
            <Mail className="h-5 w-5" aria-hidden />
            <span className="font-semibold">Email</span>
          </div>
          <p className="text-sm text-slate-300">info@carfinancepro.com</p>
          <p className="text-xs text-slate-400">Quick Response Guaranteed</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <span className="rounded-full bg-blue-600/15 px-3 py-1 text-xs text-blue-200 ring-1 ring-blue-500/30">
          1000+ Happy Customers
        </span>
        <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs text-amber-200 ring-1 ring-amber-300/30">
          Certified Partners
        </span>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200 ring-1 ring-white/10">
          Fast Approvals
        </span>
      </div>
    </section>
  )
}

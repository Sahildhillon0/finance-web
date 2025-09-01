const BRANDS = [
  "Maruti Suzuki",
  "Tata Motors",
  "Mahindra & Mahindra",
  "Hyundai India",
  "Honda Cars India",
  "Toyota Kirloskar",
  "Renault India",
  "Kia India",
  "MG Motor India",
  "Nissan India",
  "Force Motors",
  "Isuzu India",
  "Skoda India",
  "Volkswagen India",
  "Fiat India",
  "Jeep India",
  "Citroen India",
  "Datsun India",
  "Ashok Leyland",
  "Eicher Motors",
]

export function Brands() {
  return (
    <section aria-labelledby="brands" className="mx-auto max-w-6xl">
      <h3 id="brands" className="sr-only">
        Brands We Deal In
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {BRANDS.map((b) => (
          <span
            key={b}
            className="rounded-full border border-white/10 bg-slate-800/70 px-3 py-1 text-sm text-slate-200"
          >
            {b}
          </span>
        ))}
      </div>
    </section>
  )
}

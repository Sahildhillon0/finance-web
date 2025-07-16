// CarBrands.tsx
import React from "react"

const BRANDS = [
  // Major Indian national and local brands
  { name: "Maruti Suzuki", color: "from-gray-700 to-gray-900" },
  { name: "Tata Motors", color: "from-gray-600 to-gray-800" },
  { name: "Mahindra & Mahindra", color: "from-gray-800 to-gray-900" },
  { name: "Hyundai India", color: "from-gray-500 to-gray-700" },
  { name: "Honda Cars India", color: "from-gray-700 to-gray-800" },
  { name: "Toyota Kirloskar", color: "from-gray-600 to-gray-900" },
  { name: "Renault India", color: "from-gray-800 to-gray-700" },
  { name: "Kia India", color: "from-gray-900 to-gray-700" },
  { name: "MG Motor India", color: "from-gray-700 to-gray-600" },
  { name: "Nissan India", color: "from-gray-900 to-gray-800" },
  // Local/other notable brands
  { name: "Force Motors", color: "from-gray-700 to-gray-900" },
  { name: "Isuzu India", color: "from-gray-600 to-gray-800" },
  { name: "Skoda India", color: "from-gray-800 to-gray-900" },
  { name: "Volkswagen India", color: "from-gray-700 to-gray-800" },
  { name: "Fiat India", color: "from-gray-900 to-gray-700" },
  { name: "Jeep India", color: "from-gray-600 to-gray-900" },
  { name: "Citroen India", color: "from-gray-700 to-gray-900" },
  { name: "Datsun India", color: "from-gray-800 to-gray-700" },
  { name: "Ashok Leyland", color: "from-gray-900 to-gray-800" },
  { name: "Eicher Motors", color: "from-gray-700 to-gray-600" },
]

export default function CarBrands() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Brands We Deal In</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We offer financing and services for all major Indian car brands, both national and local.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {BRANDS.map((brand, idx) => (
            <span
              key={brand.name}
              className={`px-5 py-2 rounded-full text-base font-semibold bg-gradient-to-r ${brand.color} text-white shadow-md transition-transform hover:scale-105`}
              style={{ letterSpacing: "0.03em" }}
            >
              {brand.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

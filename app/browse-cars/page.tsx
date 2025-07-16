"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Car {
  _id: string
  name: string
  description: string
  price: number
  images: string[]
  availability: "in-stock" | "out-of-stock"
  createdAt: string
  updatedAt: string
}

export default function BrowseCarsPage() {
  // State for cars
  const [cars, setCars] = useState<Car[]>([]);
  useEffect(() => {
    const fetchCars = async () => {
      const res = await fetch('/api/cars');
      const data = await res.json();
      setCars(data);
    };
    fetchCars();
  }, []);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState("");

// --- FETCH CARS FROM DATABASE ---

  useEffect(() => {
    const fetchCars = async () => {
      const res = await fetch('/api/cars');
      const data = await res.json();
      setCars(data);
    };
    fetchCars();
  }, []);
// --- END FETCH ---

  const filtered = cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase()) ||
      car.description.toLowerCase().includes(search.toLowerCase())
    const matchesMin = minPrice ? car.price >= Number(minPrice) : true
    const matchesMax = maxPrice ? car.price <= Number(maxPrice) : true
    const matchesAvailability = availability ? car.availability === availability : true
    return matchesSearch && matchesMin && matchesMax && matchesAvailability
  });

  return (
    <div className="relative min-h-screen px-4 py-10 md:px-12 lg:px-32 text-gray-900 overflow-x-hidden flex flex-col items-center justify-start" style={{zIndex: 0}}>
      {/* Modern layered background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-gray-300 opacity-100" />
        {/* Abstract blurred shapes (white/gray only) */}
        <div className="absolute top-[-8rem] left-[-8rem] w-[32rem] h-[32rem] bg-white opacity-30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-10rem] w-[36rem] h-[36rem] bg-gray-200 opacity-40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-[28rem] h-[16rem] bg-gray-100 opacity-20 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-1/4 w-[18rem] h-[10rem] bg-white opacity-20 rounded-full blur-2xl" />
      </div>
      <div className="w-full flex justify-start mb-6">
        <a href="/" className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white/70 backdrop-blur border border-gray-300 shadow hover:bg-gray-100 transition text-gray-800 font-semibold text-base">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v6m0 0h4m-4 0a2 2 0 002 2h4a2 2 0 002-2v-6m-6 6V10" />
          </svg>
          Go to Home
        </a>
      </div>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 tracking-tight">Browse Cars</h1>
      <div className="flex flex-wrap gap-4 mb-8 justify-center items-end bg-white/90 rounded-xl shadow p-6 border border-gray-200">
        <input
          type="text"
          placeholder="Search by name or description"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 min-w-[220px] bg-gray-50 text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 w-28 bg-gray-50 text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 w-28 bg-gray-50 text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
        />
        <select
          value={availability}
          onChange={e => setAvailability(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 bg-gray-50 text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
        >
          <option value="">All</option>
          <option value="in-stock">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>

      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-lg text-muted-foreground">No cars found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(car => (
            <a key={car._id} href={`/browse-cars/${car._id}`} className="block focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-2xl">
              <div className="relative bg-gradient-to-br from-white/70 to-gray-100/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col gap-5 border border-white/40 text-gray-900 transition-all duration-300 hover:shadow-[0_8px_40px_0_rgba(80,80,120,0.18)] hover:-translate-y-2 overflow-hidden group cursor-pointer" style={{willChange: 'transform, box-shadow'}}>
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-secondary">
                  {/* Glossy highlight overlay on hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-60 transition duration-300" style={{background: 'linear-gradient(120deg, rgba(255,255,255,0.7) 10%, rgba(255,255,255,0.15) 70%)'}} />
                  {car.images && car.images[0] ? (
                    <Image src={car.images[0]} alt={car.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2 text-primary">{car.name}</h2>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{car.description}</p>
                  <div className="flex flex-wrap gap-2 items-center mb-2">
                    <span className="bg-white/70 text-blue-900 font-semibold px-3 py-1 rounded-full text-xs border border-gray-300/60 backdrop-blur">{car.availability}</span>
                    <span className="bg-white/80 text-gray-900 font-bold px-3 py-1 rounded-full text-xs border border-gray-300/60 backdrop-blur">${car.price.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Added: {new Date(car.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

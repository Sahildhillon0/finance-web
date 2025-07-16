"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/cars');
        const data = await res.json();
        setCars(data);
      } finally {
        setLoading(false);
      }
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
    <div className="relative min-h-screen flex flex-col bg-background transition-colors duration-300" style={{zIndex: 0}}>
      <Header />
      <main className="flex-1 w-full flex flex-col items-center justify-start px-4 py-10 md:px-12 lg:px-32 text-gray-900 dark:text-gray-100 overflow-x-hidden">
        {/* Modern layered background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-gray-300 opacity-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300" />
        {/* Abstract blurred shapes (light/dark) */}
        <div className="absolute top-[-8rem] left-[-8rem] w-[32rem] h-[32rem] bg-white opacity-30 rounded-full blur-3xl dark:bg-gray-800 dark:opacity-40" />
        <div className="absolute bottom-[-10rem] right-[-10rem] w-[36rem] h-[36rem] bg-gray-200 opacity-40 rounded-full blur-3xl dark:bg-gray-900 dark:opacity-50" />
        <div className="absolute top-1/3 left-1/2 w-[28rem] h-[16rem] bg-gray-100 opacity-20 rounded-full blur-2xl dark:bg-gray-700 dark:opacity-30" />
        <div className="absolute bottom-0 left-1/4 w-[18rem] h-[10rem] bg-white opacity-20 rounded-full blur-2xl dark:bg-gray-800 dark:opacity-30" />
      </div>
      <div className="w-full flex justify-start mb-6">
        <a href="/" className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white/70 backdrop-blur border border-gray-300 shadow hover:bg-gray-100 transition text-gray-800 font-semibold text-base">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v6m0 0h4m-4 0a2 2 0 002 2h4a2 2 0 002-2v-6m-6 6V10" />
          </svg>
          Go to Home
        </a>
      </div>
      <h1 className="text-5xl font-extrabold mb-10 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-400 to-pink-400 dark:from-blue-300 dark:via-purple-200 dark:to-pink-300 drop-shadow-lg select-none">
        Browse Cars
      </h1>
      <div className="flex flex-wrap gap-4 mb-12 justify-center items-end bg-white/60 dark:bg-gray-900/60 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-800 backdrop-blur-md ring-1 ring-black/5 dark:ring-white/10">
        <input
          type="text"
          placeholder="Search by name or description"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 min-w-[220px] bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 shadow-sm transition"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 w-28 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 shadow-sm transition"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 w-28 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 shadow-sm transition"
        />
        <div className="flex items-center gap-2">
          <select
            value={availability}
            onChange={e => setAvailability(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 shadow-sm transition"
          >
            <option value="">All</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <button
            type="button"
            aria-label="Refresh cars"
            onClick={() => {
              setLoading(true);
              fetch('/api/cars')
                .then(res => res.json())
                .then(data => setCars(data))
                .finally(() => setLoading(false));
            }}
            className="ml-1 flex items-center justify-center p-2 rounded-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581M19.418 15A7.974 7.974 0 0112 19a8 8 0 01-7.418-5M4.582 9A7.974 7.974 0 0112 5c2.042 0 3.899.765 5.418 2" />
            </svg>
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid dark:border-blue-400 dark:border-t-white border-t-white/80 border-b-transparent"></div>
          <div className="mt-6 text-lg text-gray-700 dark:text-gray-200 font-semibold">Loading cars...</div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-lg text-muted-foreground">No cars found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map(car => (
            <a key={car._id} href={`/browse-cars/${car._id}`} className="block focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-3xl">
              <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col gap-5 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300 hover:shadow-[0_8px_40px_0_rgba(80,80,120,0.18)] hover:-translate-y-2 overflow-hidden group cursor-pointer">
                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-secondary dark:bg-gray-800">
                  {/* Glossy highlight overlay on hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-60 transition duration-300" style={{background: 'linear-gradient(120deg, rgba(255,255,255,0.7) 10%, rgba(255,255,255,0.15) 70%)'}} />
                  {car.images && car.images[0] ? (
                    <Image src={car.images[0]} alt={car.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground dark:text-gray-400 bg-gray-100 dark:bg-gray-900">No Image</div>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2 text-primary dark:text-blue-300">{car.name}</h2>
                  <p className="text-base text-muted-foreground dark:text-gray-300 mb-2 line-clamp-2">{car.description}</p>
                  <div className="flex flex-wrap gap-2 items-center mb-2">
                    <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200 font-semibold px-3 py-1 rounded-full text-xs border border-blue-200 dark:border-blue-700/60">{car.availability}</span>
                    <span className="bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 font-bold px-3 py-1 rounded-full text-xs border border-gray-300/60 dark:border-gray-700/60">${car.price.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-muted-foreground dark:text-gray-400">Added: {new Date(car.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
      </main>
      <Footer />
    </div>
  )
}

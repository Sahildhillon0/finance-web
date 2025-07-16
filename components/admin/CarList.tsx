"use client"

import { useState, useEffect } from "react"
import type { Car } from "@/lib/models/Car"
import { Edit, Trash2, Plus, Search } from "lucide-react"

interface CarListProps {
  onEdit: (car: Car) => void
  onAdd: () => void
}

export default function CarList({ onEdit, onAdd }: CarListProps) {
  const [cars, setCars] = useState<Car[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [availability, setAvailability] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")

  useEffect(() => {
    fetchCars()
  }, [])

  useEffect(() => {
    let filtered = Array.isArray(cars)
      ? cars.filter((car) => {
          const matchesSearch =
            car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.description.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesMin = minPrice ? car.price >= Number(minPrice) : true;
          const matchesMax = maxPrice ? car.price <= Number(maxPrice) : true;
          const matchesAvailability = availability ? car.availability === availability : true;
          return matchesSearch && matchesMin && matchesMax && matchesAvailability;
        })
      : [];
    if (sortOrder === "newest") {
      filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOrder === "oldest") {
      filtered = filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortOrder === "price-asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredCars(filtered);
  }, [cars, searchTerm, minPrice, maxPrice, availability, sortOrder]);

  const fetchCars = async () => {
    try {
      const response = await fetch("/api/cars")
      const data = await response.json()
      setCars(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to fetch cars:", error)
      setCars([])
    } finally {
      setIsLoading(false)
    }
  }

  const deleteCar = async (id: string) => {
    if (!confirm("Are you sure you want to delete this car?")) return

    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        setCars(cars.filter((car) => car._id !== id))
      }
    } catch (error) {
      console.error("Failed to delete car:", error)
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading cars...</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Car Inventory</h2>
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Car
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-4 items-end">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={availability}
          onChange={e => setAvailability(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="in-stock">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Availability</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.map((car) => (
              <tr key={car._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  {car.images.length > 0 ? (
                    <img
                      src={car.images[0] || "/placeholder.svg"}
                      alt={car.name}
                      className="w-16 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">No Image</div>
                  )}
                </td>
                <td className="px-4 py-2">
                  <div>
                    <div className="font-semibold">{car.name}</div>
                    <div className="text-sm text-gray-600 truncate max-w-xs">{car.description}</div>
                  </div>
                </td>
                <td className="px-4 py-2">${car.price.toLocaleString()}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      car.availability === "in-stock" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {car.availability === "in-stock" ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button onClick={() => onEdit(car)} className="text-blue-600 hover:text-blue-800">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => deleteCar(car._id!)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCars.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? "No cars found matching your search." : "No cars in inventory."}
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import type { Car } from "@/lib/models/Car"
import LoginForm from "@/components/admin/LoginForm"
import CarList from "@/components/admin/CarList"
import CarForm from "@/components/admin/CarForm"
import { LogOut } from "lucide-react"
import dynamic from "next/dynamic"
const QueriesList = dynamic(() => import("@/components/admin/QueriesList"), { ssr: false })

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentView, setCurrentView] = useState<"list" | "add" | "edit" | "queries">("list")
  const [editingCar, setEditingCar] = useState<Car | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (token: string) => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
  }

  const handleAddCar = () => {
    setEditingCar(null)
    setCurrentView("add")
  }

  const handleEditCar = (car: Car) => {
    setEditingCar(car)
    setCurrentView("edit")
  }

  const handleCarSubmit = async (carData: any) => {
    try {
      const url = editingCar ? `/api/cars/${editingCar._id}` : "/api/cars"
      const method = editingCar ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(carData),
      })

      if (response.ok) {
        setCurrentView("list")
        setEditingCar(null)
      }
    } catch (error) {
      console.error("Failed to save car:", error)
    }
  }

  const handleCancel = () => {
    setCurrentView("list")
    setEditingCar(null)
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 overflow-x-hidden">
      {/* Abstract blurred shapes for depth */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-6rem] left-[-6rem] w-[24rem] h-[24rem] bg-white opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-8rem] w-[28rem] h-[28rem] bg-gray-200 opacity-30 rounded-full blur-3xl" />
      </div>
      {/* Header */}
      <div className="backdrop-blur bg-white/70 border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center gap-4">
              <a href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 backdrop-blur border border-gray-300 shadow hover:bg-gray-100 transition text-gray-800 font-semibold text-base">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v6m0 0h4m-4 0a2 2 0 002 2h4a2 2 0 002-2v-6m-6 6V10" />
                </svg>
                Back to Home
              </a>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentView(currentView === 'queries' ? 'list' : 'queries')}
                className={`px-4 py-2 rounded-lg font-semibold border transition-colors duration-200 shadow-sm ${currentView === 'queries' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white/80 text-gray-900 border-gray-400 hover:bg-gray-100'}`}
              >
                {currentView === 'queries' ? 'Back to Cars' : 'View User Queries'}
              </button>
              <button onClick={handleLogout} className="flex items-center px-4 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 shadow-sm transition-colors duration-200 ml-2">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-gray-200 p-8">
          {currentView === 'list' && <CarList onEdit={handleEditCar} onAdd={handleAddCar} />}
          {(currentView === 'add' || currentView === 'edit') && (
            <CarForm car={editingCar ?? undefined} onSubmit={handleCarSubmit} onCancel={handleCancel} />
          )}
          {currentView === 'queries' && (
            <div className="mt-8">
              <QueriesList />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

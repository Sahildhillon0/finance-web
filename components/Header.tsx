"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Car } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 
      bg-gradient-to-r from-[#232f3e]/70 via-[#1e293b]/60 to-[#232f3e]/70
      backdrop-blur-xl border-b border-white/10 shadow-xl
      ${scrolled ? 'bg-opacity-70' : 'bg-opacity-90'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5 px-2 md:px-8">
          <div className="flex items-center">
            <Car className="h-8 w-8 text-white mr-3" />
            <span className="text-2xl font-bold text-white tracking-wide">Foji Finance</span>
          </div>

          <nav className="hidden md:flex space-x-10 items-center">
            <Link href="#home" className="text-white hover:text-blue-300 transition-colors px-2 py-1 rounded-md">
              Home
            </Link>
            <Link href="#about" className="text-white hover:text-blue-300 transition-colors px-2 py-1 rounded-md">
              About
            </Link>
            <Link href="#services" className="text-white hover:text-blue-300 transition-colors px-2 py-1 rounded-md">
              Services
            </Link>
            <Link href="#testimonials" className="text-white hover:text-blue-300 transition-colors px-2 py-1 rounded-md">
              Testimonials
            </Link>
            <Link
              href="/admin"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              Admin
            </Link>
            <ThemeToggle />
          </nav>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              <Link href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                About
              </Link>
              <Link href="#services" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Services
              </Link>
              <Link href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Testimonials
              </Link>
              <Link href="/admin" className="block px-3 py-2 bg-blue-600 text-white rounded-lg">
                Admin
              </Link>
              <div className="mt-2 flex justify-end">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

'use client'

import Link from "next/link"
import { useEffect, useRef } from "react"

const brands = [
  { name: "Maruti Suzuki" },
  { name: "Tata Motors" },
  { name: "Hyundai" },
  { name: "Mahindra" },
  { name: "Kia" },
  { name: "Toyota" },
  { name: "Honda" },
  { name: "Volkswagen" },
  { name: "Skoda" },
  { name: "MG" },
  { name: "Renault" },
  { name: "Nissan" },
  { name: "Force Motors" },
  { name: "Isuzu" },
  { name: "Jeep" },
  { name: "Fiat" },
  { name: "Mercedes-Benz" },
  { name: "BMW" },
  { name: "Audi" },
  { name: "Jaguar" },
  { name: "Land Rover" },
  { name: "Volvo" },
  { name: "Porsche" },
  { name: "Lexus" },
]

export function PopularBrands() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  
  // Create a duplicate of brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands]
  
  // Handle auto-scrolling
  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    const scroller = scrollerRef.current
    
    if (!container || !content || !scroller) return
    
    const contentWidth = content.offsetWidth / 2 // Since we duplicated the content
    let scrollPosition = 0
    const speed = 0.5 // Slower scrolling speed
    
    const scroll = () => {
      scrollPosition += speed
      
      // Reset position when scrolled half way (the duplicate content)
      if (scrollPosition >= contentWidth) {
        scrollPosition = 0
      }
      
      scroller.style.transform = `translateX(-${scrollPosition}px)`
      requestAnimationFrame(scroll)
    }
    
    const animationId = requestAnimationFrame(scroll)
    
    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId)
    }
    
    const handleMouseLeave = () => {
      requestAnimationFrame(scroll)
    }
    
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      cancelAnimationFrame(animationId)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  
  return (
    <section className="container mx-auto px-4 pb-12">
      <div className="rounded-2xl border bg-card p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold">Popular Brands in India</h2>
          <Link href="/listings" className="text-primary hover:underline underline-offset-4 text-sm">
            View All Brands →
          </Link>
        </div>
        
        <div 
          ref={containerRef}
          className="relative overflow-hidden py-2"
        >
          <div 
            ref={scrollerRef}
            className="flex items-center gap-4 w-max"
          >
            <div 
              ref={contentRef}
              className="flex items-center gap-4 pr-4"
            >
              {duplicatedBrands.map((brand, index) => (
                <Link 
                  key={`${brand.name}-${index}`} 
                  href={`/listings?make=${encodeURIComponent(brand.name.split(' ')[0].toLowerCase())}`}
                  className="flex items-center justify-center min-w-[150px] h-16 rounded-xl border bg-background px-6 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  <span className="text-sm md:text-base font-medium text-center">{brand.name}</span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Gradient fade effect on the sides */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}

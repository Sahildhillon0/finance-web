'use client'

import { Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LoanSpecialistCard() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-12 md:grid-cols-2 items-start rounded-2xl border bg-card p-8 md:p-10">
        <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-8">
          {/* Profile Image */}
          <div className="h-48 w-48 flex-shrink-0 overflow-hidden rounded-full border-4 border-primary/30 shadow-md">
            <img 
              src="/images/file.enc" 
              alt="Jitender Singh - Senior Loan Specialist"
              className="h-full w-full object-cover"
              onError={(e) => {
                // Fallback to a placeholder if image fails to load
                const target = e.target as HTMLImageElement
                target.src = 'https://ui-avatars.com/api/?name=Jitender+Singh&background=0D8ABC&color=fff&size=256'
              }}
            />
          </div>
          
          <div className="flex-1">
            <div className="mb-4">
              <h2 className="text-3xl font-bold leading-tight">Jitender Singh</h2>
              <p className="text-lg text-primary font-semibold mt-1">Senior Loan Specialist</p>
            </div>
            
            <p className="mb-6 text-muted-foreground text-base leading-relaxed">
              With over 10 years of experience in vehicle financing, I specialize in helping clients find the perfect loan solutions tailored to their needs. My goal is to make your car buying experience smooth and stress-free.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="tel:+919817765315" 
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Phone className="h-5 w-5" />
                +91 98177 65315
              </a>
              
              <a 
                href="https://wa.me/919817765315" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border-2 border-green-600 bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-700 transition-colors shadow-sm"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        {/* Right side - Keep empty to maintain grid structure */}
        <div className="hidden md:block"></div>
      </div>
    </div>
  )
}

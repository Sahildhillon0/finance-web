import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/footer"
import Image from "next/image"

export const metadata = {
  title: "Get a Loan Quote | Foji Vehicle Loan",
  description: "Contact us for the best vehicle loan rates and personalized service.",
}

export default function LoanQuotePage() {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-200">
      <SiteHeader />
      
      <main className="mx-auto max-w-5xl px-4 py-12">

      <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get Your <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">Loan</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Contact me directly for the best vehicle loan options and personalized service.
          </p>
        </div>

        {/* Profile Section */}
        <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800/50 mb-12">
          <div className="flex flex-col items-center md:flex-row gap-8">
            {/* Profile Image */}
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
              <Image
                src="/team-member.png"
                alt="Your Name"
                width={256}
                height={256}
                className="w-full h-full object-cover rounded-xl border-2 border-blue-500/50 shadow-lg"
                priority
              />
            </div>
            
            {/* Profile Details */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Your Name
              </h1>
              <p className="text-xl text-blue-400 mb-4">Senior Loan Specialist</p>
              
              <div className="max-w-2xl mx-auto md:mx-0">
                <p className="text-slate-300 mb-4">
                  With over 10 years of experience in vehicle financing, I specialize in helping clients find the perfect loan solutions tailored to their needs. My goal is to make your car buying experience smooth and stress-free.
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                  <a 
                    href="tel:+919817765315" 
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +91 98177 65315
                  </a>
                  
                  <a 
                    href="https://wa.me/919817765315" 
                    className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.5 2.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5zm0 7.5c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zM12 0C5.4 0 0 5.4 0 12c0 2.6.9 5 2.4 6.9L0 24l5.5-1.9c1.8 1.2 4 1.9 6.5 1.9 6.6 0 12-5.4 12-12S18.6 0 12 0zm0 22c-2.1 0-4-.6-5.7-1.6l-.3-.2-3.2.9.9-3.1-.2-.3C2.6 16 2 14.1 2 12c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800/50">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-slate-400">Our Location</h3>
                    <p className="mt-1 text-white">Mahendergarh Chowk, Charkhi Dadri, Near Patrol Pump, Mahendergarh Road, Ch. Dadri - 127306</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-slate-400">Phone Number</h3>
                    <p className="mt-1 text-white">+91 98177 65315</p>
                    <p className="mt-1 text-white">+91 98177 65315</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-slate-400">Email Address</h3>
                    <p className="mt-1 text-white">info@fojivehicleloan.com</p>
                    <p className="mt-1 text-white">support@fojivehicleloan.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-slate-400">Working Hours</h3>
                    <p className="mt-1 text-white">Monday - Friday: 9:00 AM - 7:00 PM</p>
                    <p className="mt-1 text-white">Saturday: 10:00 AM - 5:00 PM</p>
                    <p className="mt-1 text-white">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

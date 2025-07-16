import { ArrowRight, Star } from "lucide-react"
import Marquee from "react-fast-marquee"

import { useRouter } from "next/navigation"

export default function Hero() {
  const router = useRouter()
  return (
    <section id="home" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20 bg-gradient-to-br from-[#181d22] via-[#232f3e] to-[#1e293b]">
  {/* Blurred/gradient background shapes */}
  <div className="absolute inset-0 pointer-events-none z-0">
    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-700 opacity-30 rounded-full filter blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-700 opacity-20 rounded-full filter blur-2xl"></div>
  </div>
  <div className="relative z-10 w-full">
    <div className="max-w-3xl mx-auto px-4 flex flex-col items-center">
  <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center text-white drop-shadow-lg">
    Get Your Dream Car with
    <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-purple-500 bg-clip-text text-transparent ml-2">Easy Financing</span>
  </h1>
  <p className="text-lg md:text-xl text-blue-100/90 mb-8 max-w-2xl text-center drop-shadow">
    We offer competitive rates, flexible terms, and quick approvals to help you drive away in your perfect vehicle today.
  </p>
  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 w-full">
    <button
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:scale-105 transition-all flex items-center focus:outline-none focus:ring-2 focus:ring-blue-400"
      onClick={() => router.push('/apply-for-financing')}
    >
      Apply for Financing
      <ArrowRight className="ml-2 h-5 w-5" />
    </button>
    <a href="/browse-cars" className="border-2 border-blue-500 text-blue-100 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600/90 hover:text-white transition-all shadow-md">
      Browse Cars
    </a>
  </div>
  <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-blue-100 mb-8">
    <div className="flex items-center">
      <Star className="h-5 w-5 text-yellow-400 dark:text-yellow-200 mr-1" />
      <span>4.9/5 Rating</span>
    </div>
    <span className="bg-blue-900/40 px-3 py-1 rounded-full">Fast Approval</span>
    <span className="bg-blue-900/40 px-3 py-1 rounded-full">Low Interest Rates</span>
  </div>
  {/* Bank Tie-ups Section */}
  <div className="w-full">
    <h3 className="text-lg md:text-xl font-semibold text-center mb-2 text-blue-200">Our Bank Tie-ups</h3>
    <div className="space-y-2">
      {/* @ts-ignore-next-line */}
      <Marquee gradient={false} speed={40} className="opacity-60 blur-[0.5px] text-base md:text-lg text-blue-100">
        State Bank of India • Punjab National Bank • Bank of Baroda • Canara Bank • Union Bank of India • Bank of India • Central Bank of India • Indian Bank • Indian Overseas Bank • UCO Bank
      </Marquee>
      {/* @ts-ignore-next-line */}
      <Marquee gradient={false} speed={30} direction="right" className="opacity-40 blur-[1px] text-base md:text-lg text-blue-100">
        HDFC Bank • ICICI Bank • Axis Bank • Kotak Mahindra Bank • IndusInd Bank • Yes Bank • IDFC FIRST Bank • Federal Bank • Bandhan Bank • South Indian Bank
      </Marquee>
    </div>
  </div>
</div>
  </div>
</section>
  )
}

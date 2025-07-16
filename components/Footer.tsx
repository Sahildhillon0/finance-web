import { Car, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#181d22] via-[#232f3e] to-[#1e293b] text-gray-100 pt-12 pb-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Logo and Title */}
        <div className="flex items-center mb-4">
          <Car className="h-8 w-8 text-orange-400 mr-2" />
          <span className="text-2xl font-bold tracking-wide text-orange-200">Foji Finance</span>
        </div>
        {/* Info Cards */}
        <div className="w-full flex flex-col md:flex-row justify-center gap-6 mb-8">
          <div className="flex-1 bg-[#232f3e] rounded-xl shadow-md p-6 flex flex-col items-center min-w-[260px]">
            <MapPin className="h-10 w-10 text-orange-400 mb-2" />
            <div className="text-lg font-semibold mb-1">Location</div>
            <div className="text-gray-300 text-center text-sm mb-1">
              Mahendergarh Chowk, Charkhi Dadri, Near Patrol Pump, Mahendergarh Road, Ch. Dadri - 127306
            </div>
            <a href="https://www.google.com/maps/place/28%C2%B034'32.6%22N+76%C2%B015'38.3%22E/@28.5757217,76.2580757,17z/data=!3m1!4b1!4m4!3m3!8m2!3d28.5757217!4d76.2606506?hl=en&entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-orange-200 text-xs underline hover:text-orange-300">Get Directions</a>
          </div>
          <div className="flex-1 bg-[#232f3e] rounded-xl shadow-md p-6 flex flex-col items-center min-w-[260px]">
            <Phone className="h-10 w-10 text-green-400 mb-2" />
            <div className="text-lg font-semibold mb-1">Phone</div>
            <div className="text-gray-300 text-center text-sm mb-1">
              +91 7404165315
            </div>
            <div className="text-gray-400 text-xs">24/7 Support Available</div>
          </div>
          <div className="flex-1 bg-[#232f3e] rounded-xl shadow-md p-6 flex flex-col items-center min-w-[260px]">
            <Mail className="h-10 w-10 text-purple-400 mb-2" />
            <div className="text-lg font-semibold mb-1">Email</div>
            <div className="text-gray-300 text-center text-sm mb-1">
              info@carfinancepro.com
            </div>
            <div className="text-gray-400 text-xs">Quick Response Guaranteed</div>
          </div>
        </div>
        {/* Divider */}
        <div className="w-full border-t border-gray-700 my-6"></div>
        {/* Footer Bottom */}
        <div className="w-full flex flex-col items-center gap-2">
          <div className="flex flex-wrap justify-center gap-3 mb-2">
            <span className="bg-orange-500/10 text-orange-300 px-4 py-1 rounded-full text-xs font-semibold">1000+ Happy Customers</span>
            <span className="bg-green-500/10 text-green-300 px-4 py-1 rounded-full text-xs font-semibold">Certified Partners</span>
            <span className="bg-blue-500/10 text-blue-300 px-4 py-1 rounded-full text-xs font-semibold">Fast Approvals</span>
          </div>
          <p className="text-xs text-gray-400">&copy; 2024 Codethics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


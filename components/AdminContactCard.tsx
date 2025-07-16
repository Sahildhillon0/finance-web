// AdminContactCard.tsx
import { Mail, Phone } from "lucide-react"

export default function AdminContactCard() {
  return (
    <div className="flex flex-col items-center gap-2 bg-[#232f3e]/80 rounded-lg p-6 shadow-md">
      <div className="text-xl font-semibold text-white">Admin Details</div>
      <div className="flex items-center gap-2 text-lg">
        <Mail className="h-5 w-5 text-blue-300" />
        <span className="text-white">admin@carfinancepro.in</span>
      </div>
      <div className="flex items-center gap-2 text-lg">
        <Phone className="h-5 w-5 text-blue-300" />
        <span className="text-white">+91 98765 43210</span>
      </div>
      <div className="text-sm text-blue-200 mt-1">Feel free to reach out via email or phone for any assistance.</div>
    </div>
  )
}

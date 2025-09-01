import Link from "next/link"
import { SectionHeading } from "../section-heading"

const socialLinks = [
  {
    title: "Instagram",
    desc: "See our latest posts and stories.",
    href: "https://instagram.com",
    icon: "📸",
    color: "from-pink-500 to-purple-600",
    bgColor: "bg-gradient-to-br from-pink-500/20 to-purple-600/20"
  },
  {
    title: "YouTube",
    desc: "Watch our videos and reviews.",
    href: "https://youtube.com",
    icon: "▶️",
    color: "from-red-500 to-red-600",
    bgColor: "bg-gradient-to-br from-red-500/20 to-red-600/20"
  },
  {
    title: "Facebook",
    desc: "Join our community and stay updated.",
    href: "https://facebook.com",
    icon: "👍",
    color: "from-blue-500 to-blue-700",
    bgColor: "bg-gradient-to-br from-blue-500/20 to-blue-700/20"
  }
]

function SocialCard({
  title,
  desc,
  href,
  icon,
  color,
  bgColor
}: {
  title: string
  desc: string
  href: string
  icon: string
  color: string
  bgColor: string
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden rounded-2xl border border-white/5 p-6 text-center shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${bgColor} hover:shadow-blue-500/10`}
    >
      <div className={`absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-10 ${bgColor} transition-all duration-500 group-hover:scale-150`}></div>
      <div className={`relative z-10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${bgColor} shadow-lg ring-1 ring-white/10 backdrop-blur-sm`}>
        {icon}
      </div>
      <h3 className="relative z-10 mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="relative z-10 text-sm text-slate-300 transition-colors group-hover:text-white/90">
        {desc}
      </p>
      <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${color} opacity-0 transition-all duration-300 group-hover:opacity-100`}></div>
    </Link>
  )
}

export function SocialConnect() {
  return (
    <section className="mx-auto max-w-6xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          Connect With Us
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-400">
          Follow us on social media for the latest updates, exclusive offers, and more!
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {socialLinks.map((link) => (
          <SocialCard key={link.title} {...link} />
        ))}
      </div>
    </section>
  )
}

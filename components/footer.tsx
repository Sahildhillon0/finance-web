import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-white/5 bg-slate-950">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="mb-2 text-lg font-semibold text-white">Contact</h3>
          <ul className="space-y-1 text-sm text-slate-300">
            <li>Location: 123 Auto Street, Mumbai</li>
            <li>Phone: +91 98765 43210</li>
            <li>Email: info@autoloanpro.com</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold text-white">Social</h3>
          <ul className="space-y-1 text-sm text-slate-300">
            <li>
              <Link href="https://twitter.com" className="hover:underline">
                Twitter
              </Link>
            </li>
            <li>
              <Link href="https://facebook.com" className="hover:underline">
                Facebook
              </Link>
            </li>
            <li>
              <Link href="https://instagram.com" className="hover:underline">
                Instagram
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm text-slate-400 md:text-right">© {new Date().getFullYear()} Foji Vehicle Loan</div>
      </div>
    </footer>
  )
}

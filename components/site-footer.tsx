"use client"

import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t bg-foreground/95 text-background">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm opacity-90">
            Mahendergarh Chowk, Charkhi Dadri, Near Patrol Pump, Mahendergarh Road, Ch. Dadri - 127306
          </p>
          <p className="text-sm mt-3 opacity-90">Phone: +91 98177 65315</p>
          <p className="text-sm mt-1 opacity-90">Email: info@autoloanpro.com</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Social</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:underline">
                Twitter
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Facebook
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Instagram
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/20">
        <div className="container mx-auto px-4 py-4 text-right text-xs opacity-80">© 2025 the Foji Vehicle Loan</div>
      </div>
    </footer>
  )
}

"use client"

import Header from "@/components/Header"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Services from "@/components/Services"
import Testimonials from "@/components/Testimonials"
import Footer from "@/components/Footer"
import SocialMediaLinks from "@/components/SocialMediaLinks"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <SocialMediaLinks />
      <Footer />
    </main>
  )
}

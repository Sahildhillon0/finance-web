import { Car, Calculator, FileText, CheckCircle } from "lucide-react"
import CarBrands from "./CarBrands"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function Services() {
  const services = [
    {
      icon: Car,
      title: "New Car Financing",
      description: "Get the best rates for brand new vehicles with flexible payment terms.",
      features: ["0% APR available", "Up to 84 months", "No prepayment penalty"],
    },
    {
      icon: Calculator,
      title: "Used Car Loans",
      description: "Competitive rates for pre-owned vehicles with quick approval process.",
      features: ["Low interest rates", "Extended warranties", "Trade-in options"],
    },
    {
      icon: FileText,
      title: "Refinancing",
      description: "Lower your monthly payments by refinancing your existing car loan.",
      features: ["Reduce payments", "Better terms", "Cash out options"],
    },
    {
      icon: CheckCircle,
      title: "Lease Buyouts",
      description: "Finance the purchase of your leased vehicle at the end of your lease term.",
      features: ["Competitive rates", "Simple process", "Keep your car"],
    },
  ]

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <>
      <CarBrands />
      <motion.section
        id="services"
        ref={ref}
        initial={{ opacity: 0, y: 80 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="py-20 bg-background"
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Financing Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're buying new, used, or looking to refinance, we have the perfect financing solution for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {services.slice(0, 3).map((service, index) => {
    // Card background colors to match your screenshot
    const bgColors = [
      'bg-[#c72634]', // Red
      'bg-[#0c2340]', // Dark Blue
      'bg-[#181d22]'  // Nearly Black/Gray
    ];
    const textColor = index === 0 ? 'text-white' : 'text-gray-100';
    const iconColor = index === 0 ? 'text-white' : 'text-blue-200';
    return (
      <div
        key={index}
        className={`text-center p-8 rounded-none md:rounded-lg shadow-none md:shadow-lg flex flex-col items-center justify-center ${bgColors[index]} ${textColor}`}
      >
        <div className={`w-12 h-12 flex items-center justify-center mx-auto mb-4`}>
          <service.icon className={`h-8 w-8 ${iconColor}`} />
        </div>
        <h3 className="text-xl font-semibold mb-2 font-['Oswald'] tracking-wide">{service.title}</h3>
        <p className="mb-4 font-sans text-base md:text-sm opacity-90">{service.description}</p>
      </div>
    );
  })}
</div>
      </div>
    </motion.section>
    </>
  )
}

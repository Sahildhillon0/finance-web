import { Shield, Clock, DollarSign, Users } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function About() {
  const features = [
    {
      icon: Shield,
      title: "Trusted & Secure",
      description: "Your financial information is protected with bank-level security.",
    },
    {
      icon: Clock,
      title: "Quick Approval",
      description: "Get approved in minutes, not days. Fast and efficient process.",
    },
    {
      icon: DollarSign,
      title: "Competitive Rates",
      description: "We offer some of the most competitive financing rates in the market.",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Our team of financing experts is here to help you every step of the way.",
    },
  ]

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      id="about"
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="py-20 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Foji Vehicle Loan ?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We've been helping customers secure the best car financing deals for over a decade. Here's what makes us
            different.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {features.map((feature, index) => {
    // Professional, harmonious colors for each card
    const bgColors = [
      'bg-[#2563eb]', // Blue
      'bg-[#059669]', // Green
      'bg-[#7c3aed]', // Purple
      'bg-[#334155]'  // Slate Gray
    ];
    const textColor = 'text-white';
    const iconColor = 'text-white';
    return (
      <div
        key={index}
        className={`text-center p-6 rounded-lg shadow-lg flex flex-col items-center justify-center ${bgColors[index]} ${textColor}`}
      >
        <div className={`w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
          <feature.icon className={`h-8 w-8 ${iconColor}`} />
        </div>
        <h3 className="text-xl font-semibold mb-2 font-['Oswald'] tracking-wide">{feature.title}</h3>
        <p className="opacity-90 font-sans text-base md:text-sm">{feature.description}</p>
      </div>
    );
  })}
</div>
      </div>
    </motion.section>
  )
}

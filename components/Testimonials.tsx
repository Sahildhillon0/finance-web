import { Star, Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Austin, TX",
      rating: 5,
      text: "CarFinance Pro made getting my dream car so easy! The approval was quick and the rates were better than my bank offered.",
      car: "2023 Honda Accord",
    },
    {
      name: "Mike Chen",
      location: "Seattle, WA",
      rating: 5,
      text: "Excellent service from start to finish. The team was professional and helped me understand all my options.",
      car: "2022 Toyota Camry",
    },
    {
      name: "Emily Rodriguez",
      location: "Miami, FL",
      rating: 5,
      text: "I was able to refinance my existing loan and save $200 per month. Highly recommend their services!",
      car: "2021 Ford F-150",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {testimonials.map((testimonial, index) => {
    // Monochromatic blue-gray shades for each card
    const bgColors = [
      'bg-[#1e293b]', // Slate 800
      'bg-[#334155]', // Slate 700
      'bg-[#475569]'  // Slate 600
    ];
    const textColor = 'text-gray-100';
    const iconColor = 'text-blue-300';
    return (
      <div
        key={index}
        className={`p-8 rounded-lg shadow-lg relative flex flex-col items-center ${bgColors[index]} ${textColor}`}
      >
        <Quote className={`h-8 w-8 mb-4 ${iconColor}`} />
        <p className="mb-6 italic opacity-90 text-center">"{testimonial.text}"</p>
        <div className="flex items-center mb-2">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
          ))}
        </div>
        <div className="text-center">
          <p className="font-semibold text-gray-100">{testimonial.name}</p>
          <p className="text-blue-200 text-sm">{testimonial.location}</p>
          <p className="text-blue-400 text-sm font-medium">{testimonial.car}</p>
        </div>
      </div>
    );
  })}
</div>
      </div>
    </section>
  )
}

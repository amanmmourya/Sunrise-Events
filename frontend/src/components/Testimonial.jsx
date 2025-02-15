import { Star, Heart, Quote } from "lucide-react"
import { motion } from "framer-motion"


const testimonials = [
  {
    name: "Sarah & James Thompson",
    event: "Wedding",
    date: "June 2023",
    image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=600",
    quote:
      "Our wedding day was absolutely perfect! The attention to detail and personal touches made it truly magical. We couldn't have asked for better planners.",
    rating: 5,
  },
  {
    name: "Maria Rodriguez",
    event: "25th Anniversary",
    date: "September 2023",
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&q=80&w=600",
    quote:
      "They transformed our 25th anniversary celebration into an unforgettable evening. The decorations were stunning and the coordination was flawless.",
    rating: 5,
  },
  {
    name: "The Patel Family",
    event: "Sweet 16 Birthday",
    date: "December 2023",
    image: "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?auto=format&fit=crop&q=80&w=600",
    quote:
      "The team went above and beyond for my daughter's Sweet 16. The theme was perfectly executed and everyone had an amazing time!",
    rating: 5,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}


function Testimonials() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#fdf2f4] to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <Heart className="text-[#a0001b] w-8 h-8" />
            <h1 className="text-5xl font-serif text-gray-800">Love Stories</h1>
            <Heart className="text-[#a0001b] w-8 h-8" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover the heartwarming experiences of our cherished clients. Each story represents a unique celebration
            we had the privilege to bring to life.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              variants={itemVariants}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-full h-full object-cover transition duration-300 transform hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-xl">{testimonial.name}</p>
                  <p className="text-[#ffc0cb] text-sm">
                    {testimonial.event} - {testimonial.date}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#a0001b] text-[#a0001b]" />
                  ))}
                </div>
                <Quote className="text-[#a0001b] w-10 h-10 mb-3 opacity-20" />
                <p className="text-gray-600 italic mb-4 text-lg leading-relaxed">{testimonial.quote}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials


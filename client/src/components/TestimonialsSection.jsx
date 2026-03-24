"use client"

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Wheat Farmer, Punjab",
    initial: "R",
    quote:
      "FarmLink has transformed how I do business. The contracts are simple to understand, and I always receive my payments on time. The multilingual support in Punjabi makes everything so easy!",
  },
  {
    name: "Priya Sharma",
    role: "Rice Farmer, Andhra Pradesh",
    initial: "P",
    quote:
      "Before FarmLink, I was always worried about price fluctuations. Now I have assured buyers and fair prices. The expert advisory service helped me improve my yield by 30%.",
  },
  {
    name: "Mohammed Ali",
    role: "Vegetable Farmer, Maharashtra",
    initial: "M",
    quote:
      "The real-time tracking feature is amazing. I can see exactly where my contract stands and when to expect payments. This transparency has built real trust with my buyers.",
  },
]

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top label */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-800 shadow-sm">
            Testimonials
          </span>
        </div>

        {/* Main heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-900 leading-tight">
            Trusted by Farmers
            <br />
            <span className="text-green-700">Across India</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            Hear from farmers who have transformed their agricultural business
            with FarmLink.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <article
              key={index}
              className="relative rounded-2xl bg-white/90 backdrop-blur shadow-lg border border-green-50 p-6 flex flex-col justify-between"
            >
              {/* Quote icon (right side) */}
              <div className="absolute top-6 right-6 text-4xl text-green-100">
                ❝
              </div>

              {/* Rating stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote text */}
              <p className="text-gray-700 leading-relaxed mb-6">
                "{item.quote}"
              </p>

              {/* Farmer info */}
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-semibold text-lg">
                  {item.initial}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useState } from "react"

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    {
      number: "50K+",
      label: "Active Farmers",
      image: "/farmers-community-agriculture.jpg",
    },
    {
      number: "2M+",
      label: "Acres Monitored",
      image: "/agricultural-land-farming-acres.jpg",
    },
    {
      number: "40%",
      label: "Yield Increase",
      image: "/crop-yield-harvest-productivity.jpg",
    },
    {
      number: "99.9%",
      label: "Uptime",
      image: "/server-reliability-technology-uptime.jpg",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Impact</h2>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Transforming agriculture with technology and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group cursor-pointer transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
              }}
            >
              <div className="relative h-40 rounded-lg overflow-hidden mb-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={stat.image || "/placeholder.svg"}
                  alt={stat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {stat.number}
                </div>
                <p className="text-green-100 text-lg font-semibold">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

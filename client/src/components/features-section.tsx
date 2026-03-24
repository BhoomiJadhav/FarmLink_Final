import { useEffect, useState } from "react";

export default function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: "💧",
      title: "Simple Contracts",
      description:
        "Professionally designed yet easy-to-understand contracts with minimal jargon to ensure accessibility for all farmers.",
      image: "/contract.avif",
    },
    {
      icon: "🌡️",
      title: "Transparent Negotiation",
      description:
        "A standalone platform for seamless negotiation with blockchain integration for secure, tamper-proof contracts.",
      image: "/negotiate.webp",
    },
    {
      icon: "🌾",
      title: "Automated Reminders",
      description:
        "Never miss a deadline with notifications for dues, transactions, and contract milestones.",
      image: "/remainder.jpg",
    },
    {
      icon: "📊",
      title: "Real-Time Tracking",
      description:
        "Track contract progress from initiation to completion with data-driven insights on performance.",
      image: "/realTime.webp",
    },
    {
      icon: "📱",
      title: "Expert Advisory",
      description:
        "Premium consulting services offering advice on sustainable farming, markets, and contract management.",
      image: "/expert.jpg",
    },
    {
      icon: "🔔",
      title: "Dispute Resolution",
      description:
        "Efficient handling of loss clauses and disputes with dedicated support and professional guidance.",
      image: "/dispute.jpg",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white relative">
      {/* TOP HEADING SECTION */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-20">
        {/* Small tag */}
        <span
          className="inline-block px-6 py-2 bg-green-100 text-green-700 
          font-semibold rounded-full text-sm mb-4"
        >
          Platform Features
        </span>

        {/* Main Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Everything You Need for <br />
          <span className="text-green-700">Successful Contract Farming</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          FarmLink provides a comprehensive suite of tools designed to make
          contract farming simple, transparent, and profitable for everyone
          involved.
        </p>
      </div>

      {/* FEATURE GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md hover:shadow-2xl 
              transition-all duration-500 overflow-hidden group hover:scale-105
              ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 120}ms` : "0ms",
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 
                  transition-transform duration-500"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/40 
                to-transparent opacity-0 group-hover:opacity-100 transition duration-300"
                ></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div
                  className="text-4xl mb-3 group-hover:scale-110 
                transition-transform duration-300 inline-block"
                >
                  {feature.icon}
                </div>

                <h3
                  className="text-xl font-bold text-gray-900 mb-3 
                group-hover:text-green-600 transition-colors duration-300"
                >
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

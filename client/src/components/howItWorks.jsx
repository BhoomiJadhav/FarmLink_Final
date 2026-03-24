
export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Register & Profile",
      description:
        "Create your account and set up your farmer or buyer profile with all the important farming details.",
      icon: "👤",
    },
    {
      number: "02",
      title: "Browse Contracts",
      description:
        "Explore available contracts or post your requirements. FarmLink matches you with the best opportunities.",
      icon: "📄",
    },
    {
      number: "03",
      title: "Negotiate & Sign",
      description:
        "Use our transparent tools to finalize terms. Sign secure, blockchain-verified contracts with confidence.",
      icon: "🖊️",
    },
    {
      number: "04",
      title: "Track & Grow",
      description:
        "Monitor your contract progress in real time, receive payments on schedule, and grow your farming business.",
      icon: "📈",
    },
  ]

  return (
    <section
      id="how-it-works"
      className="py-20 relative"
    >
      {/* We do NOT add any solid background color here so your
          leaf animation / global background stays visible. */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top label */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700 shadow-sm">
            How It Works
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-green-900 leading-tight">
            Your Journey to{" "}
            <span className="block text-green-700">
              Assured Farming Success
            </span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with FarmLink is simple. Follow these four easy
            steps to transform your farming business.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-3xl bg-white/80 backdrop-blur shadow-md hover:shadow-xl transition-shadow duration-300 border border-green-50 flex flex-col h-full"
            >
              {/* Number badge */}
              <div className="absolute -top-6 left-6">
                <div className="h-12 w-12 rounded-full bg-yellow-400 text-white flex items-center justify-center text-lg font-bold shadow-md">
                  {step.number}
                </div>
              </div>

              {/* Card content */}
              <div className="pt-10 pb-6 px-6 flex flex-col h-full">
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold text-green-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

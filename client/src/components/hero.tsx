import { Link } from "react-router-dom";
const stats = [
  { label: "Active Farmers", value: "10K+" },
  { label: "Contracts", value: "500+" },
  { label: "Languages", value: "15+" },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-100"
    >
      {/* soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 py-20 lg:flex-row lg:items-center lg:py-28">
        {/* LEFT – text */}
        <div className="max-w-xl space-y-8">
          {/* badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700 shadow-sm">
            <span className="text-lg">🌾</span>
            <span>Assured Contract Farming Platform</span>
          </div>

          {/* heading from FIRST image */}
          <h1 className="text-4xl font-extrabold tracking-tight text-emerald-900 sm:text-5xl lg:text-6xl">
            Empowering Farmers
            <br />
            <span className="text-emerald-600">with Transparent Contracts</span>
          </h1>

          <p className="text-lg leading-relaxed text-emerald-900/80">
            FarmLink bridges traditional farming with modern technology. Get
            simple, farmer-friendly contracts, real-time tracking, and expert
            advisory services – all in one assured contract farming platform.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link to="/register">
              <button className="rounded-full bg-emerald-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-700">
                Start Your Journey
              </button>
            </Link>

            <a href="#how-it-works">
              <button className="rounded-full border border-emerald-300 bg-white/70 px-7 py-3 text-sm font-semibold text-emerald-800 shadow-sm backdrop-blur-sm hover:border-emerald-400">
                Learn More
              </button>
            </a>
          </div>

          {/* stats bar */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-white/80 px-4 py-3 text-center shadow-sm backdrop-blur"
              >
                <div className="text-xl font-bold text-emerald-700">
                  {item.value}
                </div>
                <div className="text-xs font-medium text-emerald-900/70">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT – mockup card like second image */}
        <div className="relative flex-1">
          {/* big gradient card */}
          <div className="relative mx-auto max-w-md rounded-[32px] bg-emerald-900/90 p-4 shadow-2xl shadow-emerald-900/60 ring-1 ring-emerald-500/40">
            <div className="relative overflow-hidden rounded-3xl bg-black/40">
              <img
                src="/hero.webp"
                alt="FarmLink dashboard"
                width={900}
                height={650}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* floating card 1 */}
          <div className="absolute -left-6 top-8 hidden w-56 rounded-2xl bg-white/90 p-4 text-sm shadow-lg backdrop-blur md:block">
            <p className="text-xs font-semibold text-emerald-700">
              Simple Contracts
            </p>
            <p className="mt-1 text-xs text-emerald-900/80">
              Easy-to-understand, farmer-friendly contracts with minimal jargon.
            </p>
          </div>

          {/* floating card 2 */}
          <div className="absolute -right-4 bottom-8 hidden w-56 rounded-2xl bg-white/90 p-4 text-sm shadow-lg backdrop-blur md:block">
            <p className="text-xs font-semibold text-emerald-700">
              Fair Negotiation
            </p>
            <p className="mt-1 text-xs text-emerald-900/80">
              Transparent platform for secure, transparent contract deals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

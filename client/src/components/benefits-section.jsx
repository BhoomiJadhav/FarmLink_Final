// // components/benefits-section.tsx
// import { Link } from "react-router-dom";
// export default function BenefitsSection() {
//   return (
//     <section
//       id="benefits"
//       className="relative py-24 bg-transparent" // bg-transparent so leaf animation stays visible
//     >
//       <div className="max-w-6xl mx-auto px-4 md:px-8">
//         {/* Top label */}
//         <div className="text-center mb-6">
//           <span className="inline-flex items-center px-4 py-1 rounded-full bg-green-50 text-green-700 text-sm font-semibold shadow-sm">
//             Benefits
//           </span>
//         </div>

//         {/* Heading */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-900 leading-tight">
//             Win-Win for <br className="md:hidden" />
//             <span className="block md:inline">Farmers &amp; Buyers</span>
//           </h2>
//           <p className="mt-4 text-base md:text-lg text-emerald-900/80 max-w-3xl mx-auto">
//             FarmLink creates value for all stakeholders in the agricultural
//             value chain through transparency, fairness, and technology.
//           </p>
//         </div>

//         {/* Two main cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
//           {/* For Farmers */}
//           <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-emerald-100 p-8 md:p-10">
//             {/* Icon + Title */}
//             <div className="flex items-center gap-4 mb-6">
//               <div className="h-14 w-14 rounded-2xl bg-green-700 flex items-center justify-center shadow-lg">
//                 <span className="text-2xl text-white">🍃</span>
//               </div>
//               <div>
//                 <h3 className="text-2xl font-semibold text-emerald-900">
//                   For Farmers
//                 </h3>
//                 <p className="text-sm text-emerald-800/80">
//                   Secure your future with assured contracts
//                 </p>
//               </div>
//             </div>

//             {/* Bullet list */}
//             <ul className="space-y-3 text-emerald-900/90">
//               {[
//                 "Guaranteed market access and fair prices",
//                 "Protection against market price volatility",
//                 "Access to quality inputs and technical guidance",
//                 "Timely payments with transparent tracking",
//                 "Reduced risk through assured contracts",
//                 "Expert advisory on sustainable practices",
//               ].map((item, idx) => (
//                 <li key={idx} className="flex items-start gap-3">
//                   <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-sm">
//                     ✓
//                   </span>
//                   <span>{item}</span>
//                 </li>
//               ))}
//             </ul>

//             {/* CTA */}
//             <Link
//               to="/register"
//               className="inline-block mt-8 w-full md:w-auto px-8 py-3 rounded-full bg-green-800 text-white font-semibold shadow-md hover:bg-green-900 transition text-center"
//             >
//               Register as Farmer
//             </Link>
//           </div>

//           {/* For Buyers */}
//           <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-amber-100 p-8 md:p-10">
//             {/* Icon + Title */}
//             <div className="flex items-center gap-4 mb-6">
//               <div className="h-14 w-14 rounded-2xl bg-amber-700 flex items-center justify-center shadow-lg">
//                 <span className="text-2xl text-white">👥</span>
//               </div>
//               <div>
//                 <h3 className="text-2xl font-semibold text-emerald-900">
//                   For Buyers
//                 </h3>
//                 <p className="text-sm text-emerald-800/80">
//                   Source quality produce with confidence
//                 </p>
//               </div>
//             </div>

//             {/* Bullet list */}
//             <ul className="space-y-3 text-emerald-900/90">
//               {[
//                 "Consistent supply of quality produce",
//                 "Traceability from farm to fork",
//                 "Reduced procurement uncertainties",
//                 "Direct farmer relationships",
//                 "Compliance with quality standards",
//                 "Sustainable sourcing documentation",
//               ].map((item, idx) => (
//                 <li key={idx} className="flex items-start gap-3">
//                   <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-sm">
//                     ✓
//                   </span>
//                   <span>{item}</span>
//                 </li>
//               ))}
//             </ul>

//             {/* CTA */}
//             <Link
//               to="/register"
//               className="inline-block mt-8 w-full md:w-auto px-8 py-3 rounded-full border border-green-800 text-green-900 font-semibold bg-white hover:bg-green-50 transition text-center"
//             >
//               Register as Buyer
//             </Link>
//           </div>
//         </div>

//         {/* Stats bar */}
//         <div className="rounded-3xl bg-gradient-to-r from-green-800 via-green-700 to-emerald-500 text-white px-6 md:px-12 py-10 shadow-2xl">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//             <div>
//               <div className="text-3xl md:text-4xl font-extrabold">₹50Cr+</div>
//               <div className="mt-1 text-sm md:text-base opacity-90">
//                 Contract Value
//               </div>
//             </div>
//             <div>
//               <div className="text-3xl md:text-4xl font-extrabold">98%</div>
//               <div className="mt-1 text-sm md:text-base opacity-90">
//                 Dispute Resolution
//               </div>
//             </div>
//             <div>
//               <div className="text-3xl md:text-4xl font-extrabold">24hrs</div>
//               <div className="mt-1 text-sm md:text-base opacity-90">
//                 Avg. Payment Time
//               </div>
//             </div>
//             <div>
//               <div className="text-3xl md:text-4xl font-extrabold">
//                 4.8<span className="align-top text-xl">★</span>
//               </div>
//               <div className="mt-1 text-sm md:text-base opacity-90">
//                 User Rating
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BenefitsSection() {
  const { t } = useTranslation();

  const farmerList = [
    t("benefits.farmers.list.1"),
    t("benefits.farmers.list.2"),
    t("benefits.farmers.list.3"),
    t("benefits.farmers.list.4"),
    t("benefits.farmers.list.5"),
    t("benefits.farmers.list.6"),
  ];

  const buyerList = [
    t("benefits.buyers.list.1"),
    t("benefits.buyers.list.2"),
    t("benefits.buyers.list.3"),
    t("benefits.buyers.list.4"),
    t("benefits.buyers.list.5"),
    t("benefits.buyers.list.6"),
  ];

  return (
    <section id="benefits" className="relative py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Label */}
        <div className="text-center mb-6">
          <span className="px-4 py-1 rounded-full bg-green-50 text-green-700 text-sm font-semibold">
            {t("benefits.label")}
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-green-900">
            {t("benefits.title1")}
            <span className="block">{t("benefits.title2")}</span>
          </h2>

          <p className="mt-4 text-lg text-emerald-900/80 max-w-3xl mx-auto">
            {t("benefits.description")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Farmers */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-semibold text-emerald-900">
              {t("benefits.farmers.title")}
            </h3>
            <p className="text-sm text-emerald-800/80 mb-4">
              {t("benefits.farmers.subtitle")}
            </p>

            <ul className="space-y-3">
              {farmerList.map((item, i) => (
                <li key={i} className="flex gap-2">
                  ✓ {item}
                </li>
              ))}
            </ul>

            <Link
              to="/register"
              className="block mt-6 text-center bg-green-800 text-white py-2 rounded-full"
            >
              {t("benefits.farmers.cta")}
            </Link>
          </div>

          {/* Buyers */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-semibold text-emerald-900">
              {t("benefits.buyers.title")}
            </h3>
            <p className="text-sm text-emerald-800/80 mb-4">
              {t("benefits.buyers.subtitle")}
            </p>

            <ul className="space-y-3">
              {buyerList.map((item, i) => (
                <li key={i} className="flex gap-2">
                  ✓ {item}
                </li>
              ))}
            </ul>

            <Link
              to="/register"
              className="block mt-6 text-center border py-2 rounded-full"
            >
              {t("benefits.buyers.cta")}
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-green-800 text-white p-10 rounded-3xl text-center grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold">₹50Cr+</div>
            <div>{t("benefits.stats.contract")}</div>
          </div>
          <div>
            <div className="text-3xl font-bold">98%</div>
            <div>{t("benefits.stats.dispute")}</div>
          </div>
          <div>
            <div className="text-3xl font-bold">24hrs</div>
            <div>{t("benefits.stats.payment")}</div>
          </div>
          <div>
            <div className="text-3xl font-bold">4.8★</div>
            <div>{t("benefits.stats.rating")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

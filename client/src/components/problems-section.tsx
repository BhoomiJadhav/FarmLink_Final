// import { useEffect, useState } from "react";
// import { AlertCircle, Cloud, Zap } from "lucide-react";

// export default function ProblemsSection() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const problems = [
//     {
//       icon: <Zap className="w-6 h-6" />,
//       title: "Price Instability & Unfair Markets",
//       description:
//         "Farmers have no control over market prices and often receive very low payments due to middlemen, fluctuating demand, and lack of transparency, making their income highly unpredictable.",
//     },
//     {
//       icon: <Cloud className="w-6 h-6" />,
//       title: "Climate Uncertainty & Crop Loss",
//       description:
//         "Changing weather patterns, unexpected rainfall, droughts, and plant diseases make farming extremely risky, often leading to heavy crop damage and financial stress.",
//     },
//     {
//       icon: <AlertCircle className="w-6 h-6" />,
//       title: "Lack of Assured Buyers & Delayed Payments",
//       description:
//         "Most farmers do not have guaranteed buyers or written contracts, leading to difficulty selling produce and long payment delays, which affects their daily livelihood and cash flow.",
//     },
//   ];

//   return (
//     <section
//       id="problems"
//       className="py-20 bg-gradient-to-b from-white to-gray-50"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <div
//             className={`transition-all duration-1000 ${
//               isVisible
//                 ? "opacity-100 translate-x-0"
//                 : "opacity-0 -translate-x-8"
//             }`}
//           >
//             <div className="mb-8 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
//               <img
//                 src="/rice-paddy-field-with-farmers-working.jpg"
//                 alt="Farmers in paddy field"
//                 className="w-full h-auto hover:scale-105 transition-transform duration-300"
//               />
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
//               <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
//                 What Kind of Problems
//               </span>
//               <br />
//               Do Farmers Face?
//             </h2>
//             <p className="text-lg text-gray-600 leading-relaxed">
//               Under traditional farming systems, farmers rely on uncertain
//               markets and manual decision-making, which leads to price
//               instability, resource mismanagement, and unpredictable outcomes.
//               Without transparent contracts, real-time insights, or reliable
//               buyer connections, farmers face inefficiency, high operational
//               costs, and increased financial risk throughout the farming cycle.
//             </p>
//           </div>

//           {/* Right Content */}
//           <div
//             className={`space-y-6 transition-all duration-1000 delay-200 ${
//               isVisible
//                 ? "opacity-100 translate-x-0"
//                 : "opacity-0 translate-x-8"
//             }`}
//           >
//             {problems.map((problem, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100 hover:border-green-200 group"
//               >
//                 <div className="flex gap-4">
//                   <div className="flex-shrink-0">
//                     <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white group-hover:scale-110 transition-transform duration-300">
//                       {problem.icon}
//                     </div>
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
//                       {problem.title}
//                     </p>
//                     <p className="text-sm text-gray-600 leading-relaxed">
//                       {problem.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div className="mt-8 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
//               <img
//                 src="/farmer-using-smartphone-with-iot-sensors-in-green-.jpg"
//                 alt="Farmer with IoT sensors"
//                 className="w-full h-auto hover:scale-105 transition-transform duration-300"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import { useEffect, useState } from "react";
import { AlertCircle, Cloud, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ProblemsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const problems = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: t("problems.list.price.title"),
      description: t("problems.list.price.desc"),
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: t("problems.list.climate.title"),
      description: t("problems.list.climate.desc"),
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: t("problems.list.buyers.title"),
      description: t("problems.list.buyers.desc"),
    },
  ];

  return (
    <section
      id="problems"
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
              <img
                src="/rice-paddy-field-with-farmers-working.jpg"
                alt="Farmers in paddy field"
                className="w-full h-auto"
              />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                {t("problems.title1")}
              </span>
              <br />
              {t("problems.title2")}
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              {t("problems.description")}
            </p>
          </div>

          {/* RIGHT */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border"
              >
                <div className="flex gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-600 text-white">
                    {problem.icon}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-2">
                      {problem.title}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 overflow-hidden rounded-xl shadow-lg">
              <img
                src="/farmer-using-smartphone-with-iot-sensors-in-green-.jpg"
                alt="Farmer with IoT sensors"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

export default function PurposeSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="purpose" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="/beautiful-rice-terraces-mountains-landscape.jpg"
                alt="Rice terraces"
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Right Content */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                Our Purpose & Promise
              </span>
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                    Empower Farmers with Technology
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We believe that technology should be accessible and
                    affordable for all farmers, regardless of their size or
                    location.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                    Assured Buyers & Secure Payments
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    FarmLink guarantees reliable market access and timely
                    payments through verified buyers and transparent tracking
                    systems.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                    Transparent and Fair Contracts
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We ensure clarity in every agreement with
                    easy-to-understand, tamper-proof digital contracts that
                    protect both farmers and buyers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

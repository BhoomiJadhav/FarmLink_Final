// src/layouts/ContractLayout.jsx
import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { ContractProvider } from "../context/ContractContext";

const steps = [
  { slug: "contract-info", label: "Contract Info" },
  { slug: "parties", label: "Parties" },
  { slug: "crop-details", label: "Crop Details" },
  { slug: "responsibilities", label: "Responsibilities" },
  { slug: "seed-delivery", label: "Seed & Delivery" },
  { slug: "pricing-payment", label: "Pricing" },
  { slug: "financial-assistance", label: "Financial" },
  { slug: "conditions", label: "Conditions" },
  { slug: "disputes", label: "Disputes" },
  { slug: "signatures", label: "Signatures" },
  { slug: "submit", label: "Submit" },
];

export default function ContractLayout({ children }) {
  const { pathname } = useLocation();
  // Determine base prefix to support both /contract and /buyer/contract
  const base = pathname.startsWith("/buyer/contract")
    ? "/buyer/contract"
    : "/contract";
  const activeIndex =
    Math.max(
      0,
      steps.findIndex((s) => pathname.includes(`${base}/${s.slug}`))
    ) || 0;

  return (
    <ContractProvider>
      <div className="min-h-screen bg-[#faf8f2]">
        {/* Hero header */}
        <div className="bg-gradient-to-r from-green-800 to-green-700 text-white">
          <div className="max-w-4xl mx-auto pt-6 pb-16 px-4">
            <h1 className="text-3xl font-bold text-center">
              Contract Farming Agreement
            </h1>
            <p className="text-sm opacity-90 text-center">
              Secure and streamlined digital contract creation for agricultural
              partnerships
            </p>
          </div>
        </div>

        {/* Card container */}
        <div className="max-w-6xl mx-auto -mt-10 px-6 pb-16">
          <div className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden">
            {/* Stepper */}
            <div className="px-8 pt-6 pb-5 border-b relative">
              <div className="flex items-center justify-between relative">
                {steps.map((step, i) => (
                  <div
                    key={step.slug}
                    className="flex-1 flex items-center relative"
                  >
                    {/* Line */}
                    {i < steps.length - 1 && (
                      <div
                        className={`absolute top-1/2 left-1/2 w-full h-1 -translate-x-1/2 -translate-y-1/2 z-0
                        transition-colors duration-700 ease-in-out
                        ${i < activeIndex ? "bg-green-700" : "bg-gray-300"}`}
                      />
                    )}

                    {/* Circle */}
                    <NavLink
                      to={`${base}/${step.slug}`}
                      className={({ isActive }) =>
                        `w-9 h-9 flex items-center justify-center rounded-full border text-xs font-semibold z-10
                        transition-colors duration-700 ease-in-out
                        ${
                          isActive || i <= activeIndex
                            ? "bg-green-700 text-white border-green-700"
                            : "bg-white text-gray-600 border-gray-300"
                        }`
                      }
                      title={step.label}
                    >
                      {i + 1}
                    </NavLink>
                  </div>
                ))}
              </div>

              {/* Labels */}
              <div className="mt-3 hidden md:grid grid-cols-10 text-[11px] text-center text-gray-600">
                {steps.map((s, i) => (
                  <div
                    key={s.slug}
                    className={`${
                      i === activeIndex ? "text-green-700 font-medium" : ""
                    }`}
                  >
                    {s.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Page content */}
            <div className="px-8 py-8 max-w-3xl mx-auto">
              {children ?? <Outlet />}
            </div>
          </div>
        </div>
      </div>
    </ContractProvider>
  );
}

// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function CtaSection() {
//   const [openDemo, setOpenDemo] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setError("");

//     const form = e.target;

//     try {
//       const res = await fetch("https://formspree.io/f/xojabnzn", {
//         method: "POST",
//         body: new FormData(form),
//         headers: {
//           Accept: "application/json",
//         },
//       });

//       if (res.ok) {
//         setSuccess(true);
//         form.reset();
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     } catch (err) {
//       setError("Network error. Please try again later.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       {/* ================= CTA SECTION ================= */}
//       <section id="cta" className="py-20">
//         <div className="max-w-6xl mx-auto px-4">
//           <div
//             className="
//               relative overflow-hidden
//               rounded-[32px]
//               bg-gradient-to-r from-green-800 via-green-700 to-green-600
//               px-6 py-16 md:px-16 md:py-20
//               text-center text-white shadow-2xl
//             "
//           >
//             {/* Soft highlights */}
//             <div className="pointer-events-none absolute inset-0 opacity-40">
//               <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-green-500 blur-3xl" />
//               <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-emerald-500 blur-3xl" />
//             </div>

//             {/* Icon */}
//             <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
//               <span className="text-3xl">🍃</span>
//             </div>

//             {/* Heading */}
//             <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
//               <span className="block">Ready to Transform Your</span>
//               <span className="block">Farming Business?</span>
//             </h2>

//             {/* Subtext */}
//             <p className="relative max-w-3xl mx-auto text-base md:text-lg text-green-50/90 mb-10">
//               Join thousands of farmers and buyers benefiting from transparent,
//               assured contract farming with{" "}
//               <span className="font-semibold">FarmLink</span>.
//             </p>

//             {/* Buttons */}
//             <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
//               <Link
//                 to="/register"
//                 className="
//                   w-full sm:w-auto
//                   rounded-full
//                   bg-yellow-400 px-8 py-3
//                   text-base md:text-lg font-semibold
//                   text-green-900
//                   shadow-lg shadow-yellow-500/40
//                   transition
//                   hover:brightness-110 hover:shadow-xl
//                   text-center
//                 "
//               >
//                 Get Started Free →
//               </Link>

//               <button
//                 onClick={() => {
//                   setOpenDemo(true);
//                   setSuccess(false);
//                   setError("");
//                 }}
//                 className="
//                   w-full sm:w-auto
//                   rounded-full
//                   border border-white/70
//                   bg-white/5
//                   px-8 py-3
//                   text-base md:text-lg font-semibold
//                   text-white
//                   backdrop-blur
//                   transition
//                   hover:bg-white/15 hover:border-white
//                 "
//               >
//                 Schedule a Demo
//               </button>
//             </div>

//             <p className="relative mt-6 text-sm text-green-50/80">
//               No credit card required • Free trial for 30 days • Cancel anytime
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ================= DEMO MODAL ================= */}
//       {openDemo && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-semibold text-green-900">
//                 Schedule a Demo
//               </h3>
//               <button
//                 onClick={() => setOpenDemo(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* SUCCESS STATE */}
//             {success ? (
//               <div className="text-center py-8">
//                 <div className="text-4xl mb-3">✅</div>
//                 <h4 className="text-lg font-semibold text-green-900 mb-2">
//                   Request Submitted
//                 </h4>
//                 <p className="text-sm text-gray-600 mb-6">
//                   Our team will contact you shortly.
//                 </p>
//                 <button
//                   onClick={() => setOpenDemo(false)}
//                   className="rounded-full bg-green-800 px-6 py-2 text-white font-semibold hover:bg-green-900 transition"
//                 >
//                   Close
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <p className="text-sm text-gray-600 mb-6">
//                   Leave your details and our team will connect with you.
//                 </p>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <input
//                     type="hidden"
//                     name="source"
//                     value="CTA Schedule Demo"
//                   />
//                   <input type="hidden" name="product" value="FarmLink" />

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       required
//                       placeholder="you@example.com"
//                       className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-600 focus:outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Contact Number
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       required
//                       placeholder="+91 XXXXX XXXXX"
//                       className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-600 focus:outline-none"
//                     />
//                   </div>

//                   {error && <p className="text-sm text-red-600">{error}</p>}

//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     className="w-full rounded-full bg-green-800 px-6 py-3 text-white font-semibold hover:bg-green-900 transition disabled:opacity-60"
//                   >
//                     {submitting ? "Submitting..." : "Request Demo"}
//                   </button>
//                 </form>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CtaSection() {
  const { t } = useTranslation();

  const [openDemo, setOpenDemo] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.target;

    try {
      const res = await fetch("https://formspree.io/f/xojabnzn", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSuccess(true);
        form.reset();
      } else {
        setError(t("cta.error"));
      }
    } catch {
      setError(t("cta.networkError"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* CTA */}
      <section id="cta" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-[32px] bg-green-800 text-center text-white px-6 py-16">
            <div className="text-3xl mb-4">🍃</div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("cta.title1")}
              <span className="block">{t("cta.title2")}</span>
            </h2>

            <p className="max-w-3xl mx-auto mb-8">{t("cta.description")}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-yellow-400 text-green-900 px-6 py-3 rounded-full"
              >
                {t("cta.start")}
              </Link>

              <button
                onClick={() => {
                  setOpenDemo(true);
                  setSuccess(false);
                  setError("");
                }}
                className="border px-6 py-3 rounded-full"
              >
                {t("cta.demo")}
              </button>
            </div>

            <p className="mt-4 text-sm">{t("cta.note")}</p>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {openDemo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <div className="flex justify-between mb-4">
              <h3>{t("cta.modal.title")}</h3>
              <button onClick={() => setOpenDemo(false)}>✕</button>
            </div>

            {success ? (
              <div className="text-center">
                <h4>{t("cta.modal.successTitle")}</h4>
                <p>{t("cta.modal.successDesc")}</p>
                <button onClick={() => setOpenDemo(false)}>
                  {t("cta.modal.close")}
                </button>
              </div>
            ) : (
              <>
                <p>{t("cta.modal.desc")}</p>

                {/* <form onSubmit={handleSubmit}>
                  <input type="hidden" name="product" value="FarmLink" />

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={t("cta.modal.email")}
                  />

                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder={t("cta.modal.phone")}
                  />

                  {error && <p>{error}</p>}

                  <button type="submit" disabled={submitting}>
                    {submitting
                      ? t("cta.modal.submitting")
                      : t("cta.modal.submit")}
                  </button>
                </form> */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* EMAIL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("cta.modal.email")}
                    </label>

                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className="
        w-full px-4 py-2.5 rounded-lg
        border border-gray-300
        focus:ring-2 focus:ring-green-600 focus:border-green-600
        outline-none transition
      "
                    />
                  </div>

                  {/* PHONE */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("cta.modal.phone")}
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="
        w-full px-4 py-2.5 rounded-lg
        border border-gray-300
        focus:ring-2 focus:ring-green-600 focus:border-green-600
        outline-none transition
      "
                    />
                  </div>

                  {/* ERROR */}
                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
                      {error}
                    </div>
                  )}

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="
      w-full rounded-full
      bg-green-800 text-white font-semibold
      py-3 px-6
      shadow-md
      transition
      hover:bg-green-900 hover:shadow-lg
      disabled:opacity-60 disabled:cursor-not-allowed
      flex items-center justify-center gap-2
    "
                  >
                    {submitting ? (
                      <>
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        {t("cta.modal.submitting")}
                      </>
                    ) : (
                      t("cta.modal.submit")
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

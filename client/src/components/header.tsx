// import { useState, useEffect } from "react";

// import { Menu, X } from "lucide-react";
// import { useTranslation } from "react-i18next";
// const navLinks = [
//   { label: "Home", href: "#home" },
//   { label: "Problems", href: "#problems" },
//   { label: "Purpose", href: "#purpose" },
//   { label: "Features", href: "#features" },
//   { label: "How It Works", href: "#how-it-works" },
//   { label: "Contact", href: "#contact" },
// ];

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
//         isScrolled
//           ? "bg-white/95 backdrop-blur-md shadow-lg"
//           : "bg-white/80 backdrop-blur-sm"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* LOGO */}
//           <a href="#home" className="flex items-center gap-3">
//             <div className="relative w-10 h-10">
//               <img
//                 src="/logo3.png"
//                 alt="FarmLink Logo"
//                 className="w-12 h-12 object-contain"
//                 loading="eager"
//               />
//             </div>
//             <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
//               FarmLink
//             </span>
//           </a>

//           {/* DESKTOP NAV + SIGN UP BUTTON */}
//           <div className="hidden md:flex items-center gap-8">
//             <nav className="flex gap-8">
//               {navLinks.map((item) => (
//                 <a
//                   key={item.href}
//                   href={item.href}
//                   className="text-gray-700 hover:text-green-600 transition-smooth font-medium relative group"
//                 >
//                   {item.label}
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
//                 </a>
//               ))}
//             </nav>

//             {/* SIGN UP BUTTON */}
//             <a
//               href="/login"
//               className="
//                 px-5 py-2 rounded-full
//                 bg-green-600 text-white font-semibold shadow-md
//                 hover:bg-white hover:text-green-600 hover:border-green-600
//                 border border-transparent transition-all duration-300
//               "
//             >
//               Log In
//             </a>
//             <a
//               href="/register"
//               className="
//                 px-5 py-2 rounded-full
//                 bg-green-600 text-white font-semibold shadow-md
//                 hover:bg-white hover:text-green-600 hover:border-green-600
//                 border border-transparent transition-all duration-300
//               "
//             >
//               Register
//             </a>
//           </div>

//           {/* MOBILE MENU BUTTON */}
//           <button
//             className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-smooth"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* MOBILE NAV */}
//         {isOpen && (
//           <nav className="md:hidden pb-4 flex flex-col gap-3 animate-fade-in-up">
//             {navLinks.map((item) => (
//               <a
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setIsOpen(false)}
//                 className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition-smooth"
//               >
//                 {item.label}
//               </a>
//             ))}

//             {/* Mobile SIGN UP BUTTON */}
//             <a
//               href="/login"
//               className="
//                 mt-2 text-center px-4 py-2 rounded-full
//                 bg-green-600 text-white font-semibold shadow-md
//                 hover:bg-white hover:text-green-600 hover:border-green-600
//                 border border-transparent transition-all duration-300
//               "
//             >
//               Sign Up
//             </a>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// }
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const navLinks = [
  { label: "nav.home", href: "#home" },
  { label: "nav.problems", href: "#problems" },
  { label: "nav.purpose", href: "#purpose" },
  { label: "nav.features", href: "#features" },
  { label: "nav.howItWorks", href: "#how-it-works" },
  { label: "nav.contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <a href="#home" className="flex items-center gap-3">
            <img src="/logo3.png" alt="FarmLink Logo" className="w-12 h-12" />
            <span className="text-2xl font-bold text-green-700">FarmLink</span>
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">
            {/* NAV LINKS */}
            <nav className="flex gap-6">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 font-medium"
                >
                  {t(item.label)}
                </a>
              ))}
            </nav>

            {/* 🌐 LANGUAGE SWITCH */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => i18n.changeLanguage("en")}
                className={`px-2 py-1 text-xs font-bold rounded ${
                  i18n.language === "en"
                    ? "bg-white text-green-700"
                    : "text-gray-500"
                }`}
              >
                EN
              </button>

              <button
                onClick={() => i18n.changeLanguage("hi")}
                className={`px-2 py-1 text-xs font-bold rounded ${
                  i18n.language === "hi"
                    ? "bg-white text-green-700"
                    : "text-gray-500"
                }`}
              >
                हिंदी
              </button>

              <button
                onClick={() => i18n.changeLanguage("mr")}
                className={`px-2 py-1 text-xs font-bold rounded ${
                  i18n.language === "mr"
                    ? "bg-white text-green-700"
                    : "text-gray-500"
                }`}
              >
                मराठी
              </button>
            </div>

            {/* BUTTONS */}
            <a
              href="/login"
              className="px-4 py-2 bg-green-600 text-white rounded-full"
            >
              {t("auth.login")}
            </a>

            <a
              href="/register"
              className="px-4 py-2 bg-green-600 text-white rounded-full"
            >
              {t("auth.register")}
            </a>
          </div>

          {/* MOBILE MENU */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE NAV */}
        {isOpen && (
          <nav className="md:hidden flex flex-col gap-2 pb-4">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href}>
                {t(item.label)}
              </a>
            ))}

            <a href="/login">{t("auth.login")}</a>
          </nav>
        )}
      </div>
    </header>
  );
}

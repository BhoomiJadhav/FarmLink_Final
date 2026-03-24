// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        farm: {
          dark: "#1f5131", // sidebar dark green
          accentHover: "#392613",
          darkHover: "#145437",
          accent: "#FBBF24", // yellow active item
          bg: "#F5F7F2", // main background
          card: "#F7FAF5", // light card background
          success: "#D9F2DF",
          warn: "#FFEFD5",
          light: "#9cb3a4",
          portal: "#9cb3a4",
          nonaccent: "#f0f5f0",
          normaltext: "#d4dfd6",
        },
      },
      boxShadow: {
        soft: "0 12px 30px rgba(15, 66, 44, 0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

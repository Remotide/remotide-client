/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorBrand500: "#6366f1",
        colorBrand600: " #4f46e5",
        colorBrand700: " #4338ca",
        colorBrand50: "#eef2ff",
        greyLogo: "#AFABAA",
        defaultFontColor: "#374151",
        greyBackground: "#F9FAFB",
      },
      textColor: {
        default: "#374151",
      },
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('daisyui')],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        purple: "#633CFF",
        purpleHover: "#BEADFF",
        lightPurple: "#EFEBFF",
        darkGrey: "#333333",
        grey: "#737373",
        borders: "#D9D9D9",
        lightGrey: "#FAFAFA",
        white: "#FFF",
        red: "#FF3939"
      },
      fontFamily: {
        sans: ["Instrument Sans", "Arial", "Helvetica", "sans-serif"]
      }
    }
  },
  plugins: []
};

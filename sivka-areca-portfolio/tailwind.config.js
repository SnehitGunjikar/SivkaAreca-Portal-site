/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#dceeff",
          200: "#badaff",
          300: "#8ec4ff",
          400: "#59a8ff",
          500: "#2b8aff",
          600: "#156fe0",
          700: "#0e54ad",
          800: "#0b407f",
          900: "#0a3566",
        },
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#0b0f19",
          card: "rgba(17, 24, 39, 0.7)",
          border: "rgba(55, 65, 81, 0.4)",
          primary: "#6366f1",
          secondary: "#10b981",
          accent: "#f43f5e"
        }
      }
    },
  },
  plugins: [],
}
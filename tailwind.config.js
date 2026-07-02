/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F7F1E8",
        ink: "#111827",
        muted: "#667085",
        line: "#E7DCCB",
        gold: "#B9854D"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(17, 24, 39, 0.08)"
      }
    }
  },
  plugins: []
};

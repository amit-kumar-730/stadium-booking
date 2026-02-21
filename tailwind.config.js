/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // Blue-600
          hover: '#1d4ed8',   // Blue-700
        },
        dark: '#0f172a',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-dark': '#1A1B1E',
        'app-sidebar': '#25262B',
        'app-card': '#2C2E33'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
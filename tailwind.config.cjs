/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        hyde: {
          sage: '#8EB796',
          forest: '#1F3324',
          gold: '#C4A574',
          mist: '#F4F1E8',
        },
      },
    },
  },
  plugins: [],
}

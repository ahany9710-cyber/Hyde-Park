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
        lavista: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        hyde: {
          sage: '#8EB796',
          forest: '#1F3324',
          gold: '#C4A574',
          mist: '#F4F1E8',
        },
        lavista: {
          ink: '#161616',
          sand: '#BDA588',
          'sand-deep': '#7A5C3A',
          bronze: '#BC986B',
          navy: '#00163A',
          cream: '#F5F1EA',
        },
      },
    },
  },
  plugins: [],
}

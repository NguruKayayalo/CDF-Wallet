/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Times New Roman', 'serif'],
        sans: ['Merriweather', 'serif'],
      },
      colors: {
        slate: {
          950: '#020617',
        }
      },
      backgroundSize: {
        '300%': '300%',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flexBasis: {
        '1/13': '5%',
        '12/13': '95%',
      }
    },
  },
  plugins: [],
}

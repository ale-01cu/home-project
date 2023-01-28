/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'views/partials/silderbar.ejs',
    'public/js/nav.js',
    'views/index.ejs',
    'public/js/funcionesCatalogo/FuncionesHome.js',
    'helpers/catalogo.js'
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 4 column grid
        '1': 'repeat(1, minmax(0, 16rem))',
        '2': 'repeat(2, minmax(0, 16rem))',
        '3': 'repeat(3, minmax(0, 16rem))',
        '4': 'repeat(4, minmax(0, 16rem))',
        '5': 'repeat(5, minmax(0, 16rem))',
        '6': 'repeat(6, minmax(0, 16rem))',
      }
    },
    screens: {
      'tablet': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2x': '1536px'
    },
  },
  plugins: [
  ],
}

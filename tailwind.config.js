/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Nav Lateral
      //'views/partials/silderbar.ejs',
      //'public/js/nav.js',

    // Vista Catalogo
      'views/catalogoPeliculas.ejs',
      'views/catalogoSeries.ejs',
      'public/js/funcionesCatalogo/Catalogo.js',

    // Vista Form
      //'views/formPelicula.ejs',
      //'views/formSerie.ejs',
      //'views/partials/formCategorias/**.ejs',
      //'public/js/adminFormPelicula/**.js',
      //'public/js/adminFormSerie/**.js',
      

  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 4 column grid
        '1': 'repeat(1, minmax(14rem, 16rem))',
        '2': 'repeat(2, minmax(14rem, 16rem))',
        '3': 'repeat(3, minmax(14rem, 16rem))',
        '4': 'repeat(4, minmax(14rem, 16rem))',
        '5': 'repeat(5, minmax(14rem, 16rem))',
        '6': 'repeat(6, minmax(14rem, 16rem))',
      }
    },
    screens: {
      'tablet': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },

    fontFamily: {
      'Roboto': ['Roboto Slab', 'serif'],
      'PT Serif': ['PT Serif', 'serif'],
      'Merriweather Sans': ['Merriweather Sans', 'sans-serif'],
    }
  },
  plugins: [
    //require('@tailwindcss/forms'),
  ],
}

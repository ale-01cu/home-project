/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Nav Lateral
    // 'views/partials/silderbar.ejs',
    // 'public/js/nav.js'

    // Vista Catalogo
    'views/catalogo.ejs',
    'views/catalogoResultadosBusqueda.ejs',
    'public/js/funcionesCatalogo/Catalogo.js',
    'public/js/funcionesCatalogo/mainCatalogo.js'

    // Vista Form
    // 'views/formPelicula.ejs',
    // 'views/formSerie.ejs',
    // 'views/partials/formCategorias/**.ejs',
    // 'public/js/adminFormPelicula/**.js',
    // 'public/js/adminFormSerie/**.js',

    // Vista login
    // 'views/login.ejs'

  ],
  theme: {
    extend: {
      padding: {
        '3px': '3px',
        '5px': '5px'
      },
      height: {
        89: '22rem',
        90: '23rem',
        120: '28rem',
        '90%': '90%'
      },
      gridTemplateColumns: {
        // Simple 4 column grid
        1: 'repeat(1, minmax(0, 1fr))',
        2: 'repeat(2, minmax(12rem, 14rem))',
        3: 'repeat(3, minmax(12rem, 14rem))',
        4: 'repeat(4, minmax(12rem, 14rem))',
        5: 'repeat(5, minmax(12rem, 14rem))',
        6: 'repeat(6, minmax(12rem, 14rem))'
      }
    },
    screens: {
      mn: '380px',
      tablet: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px'
    },

    fontFamily: {
      Roboto: ['Roboto Slab', 'serif'],
      'PT Serif': ['PT Serif', 'serif'],
      'Merriweather Sans': ['Merriweather Sans', 'sans-serif']
    }
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ]
}

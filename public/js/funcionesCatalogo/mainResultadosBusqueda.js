import { Catalogo } from './Catalogo.js'
const SERVER_IP = 'http://10.31.103.6'
const SERVER_PORT = '3000'

const marcarNav = () => {
  let cat = ''
  const menus = document.querySelectorAll('nav a')
  menus.forEach(e => {
    if (e.id === window.location.pathname.split('/')[2]) {
      e.classList.add('active', 'bg-white')
      cat = e.id
    }
  })
  return cat
}

const main = async () => {
  const categoria = marcarNav()

  const urlAutocompletado = `${SERVER_IP}:${SERVER_PORT}/catalogo/${categoria}/autocompletado`
  const urlResultadosBusqueda = `${SERVER_IP}:${SERVER_PORT}/catalogo/${categoria}/resultadoBusqueda?busqueda=`
  const urlResultadosFiltradoGeneros = `${SERVER_IP}:${SERVER_PORT}/catalogo/${categoria}/filtrarPorGeneros`
  const urlpaginacion = `${SERVER_IP}:${SERVER_PORT}/catalogo/${categoria}/resultadoBusqueda/page/`

  const home = new Catalogo(categoria, urlAutocompletado, urlResultadosBusqueda, urlResultadosFiltradoGeneros, urlpaginacion)
  home.headerFuncionesMovil()
  home.headerFuncionesPantallasGrandes()
  home.funcionesBuscadores()
  home.esElFinal('busqueda')
  home.reseziveSearch()
}

main()

// Paginacion
// Autocompletado
// Busqueda
// PaginacionBusqueda
// Generos
// PaginacionGeneros

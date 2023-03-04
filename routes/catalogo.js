const { Router } = require('express')
const {
  home,
  autocompletadoBusqueda,
  infoCard,
  resultadoBusqueda,
  paginacion,
  paginacionResultadosBusqueda,
  filtrarPorGeneros,
  paginacionFiltrarPorGeneros
} = require('../controllers/catalogo')
const { validarGeneros } = require('../middlewares/validar-generos')

const router = Router()

router.get('/:categoria', home)
router.get('/:categoria/page/:page', paginacion)
router.get('/:categoria/filtrarPorGeneros', validarGeneros, filtrarPorGeneros)
router.get('/:categoria/resultadoBusqueda', resultadoBusqueda)
router.get('/:categoria/info/:id', infoCard)

router.post('/:categoria/resultadoBusqueda/page/:page', paginacionResultadosBusqueda)
router.post('/:categoria/filtrarPorGeneros/page/:page', paginacionFiltrarPorGeneros)
router.post('/:categoria/autocompletado', autocompletadoBusqueda)

module.exports = router

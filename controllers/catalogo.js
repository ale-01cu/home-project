const { response, request } = require('express')
const { selectedDB, getTodosLosGeneros, TodosdocsFiltrados, docsFiltradosYseparados } = require('../helpers/catalogo')
const { buscar } = require('../helpers/MotorBusqueda')

const peer = 20

const home = async (req, res = response) => {
  console.log(req)
  try {
    const { categoria } = req.params
    const generos = await getTodosLosGeneros(categoria)
    const { docs, fin } = await TodosdocsFiltrados(categoria, 1, peer)
    res.render('catalogo', { docs, generos, categoria, fin })
  } catch (error) {
    console.log(error)
  }
}

const paginacion = async (req = request, res) => {
  try {
    const { categoria, page } = req.params
    const { docs, fin } = await TodosdocsFiltrados(categoria, parseInt(page), peer)
    res.json({ docs, fin })
  } catch (error) {
    console.log(error)
  }
}

const autocompletadoBusqueda = async (req = request, res = response) => {
  try {
    const { categoria } = req.params
    const busqueda = req.body.toLowerCase() // Saca la busqueda, la pone en minuscula, la separa por espacios y la guarda en un array con todas las palabras.
    const docs = await selectedDB[categoria].find()

    let cont = 0
    const resultados = []
    for (const i of docs) {
      const { nombre } = i
      if (nombre.toLowerCase().indexOf(busqueda) !== -1 && busqueda.length > 0 && cont < 5) {
        cont++
        resultados.push(nombre)
      } else if (cont === 5) break
    }

    res.json(resultados)
  } catch (error) {
    console.log(error)
  }
}

const infoCard = async (req = request, res = response) => {
  const { id, categoria } = req.params
  const doc = await selectedDB[categoria].findById(id)
  res.render('infoCard', { doc })
}

const resultadoBusqueda = async (req, res) => {
  try {
    const { categoria } = req.params
    const { busqueda = '' } = req.query
    const { docs, resultadosEncontrados, fin } = await buscar(categoria, busqueda, 1, peer)
    res.render('catalogoResultadosBusqueda', { docs, categoria, busqueda, resultadosEncontrados, fin })
  } catch (error) {
    console.log(error)
  }
}

const paginacionResultadosBusqueda = async (req, res) => {
  try {
    const { categoria, page } = req.params
    const { busqueda = '' } = req.query
    const { docs, fin } = await buscar(categoria, busqueda, parseInt(page), peer)
    res.json({ docs, fin })
  } catch (error) {
    console.log(error)
  }
}

const filtrarPorGeneros = async (req, res) => {
  try {
    const { categoria } = req.params
    const { genero } = req.query
    const resultado = await selectedDB[categoria].find({
      generos: { $all: genero }
    })
    const { docs, fin } = docsFiltradosYseparados(resultado, 1, peer)
    const generos = await getTodosLosGeneros(categoria)

    res.render('catalogoResultadoFiltroGeneros', { docs, generos, categoria, genero, fin })
  } catch (error) {
    console.log(error)
  }
}

const paginacionFiltrarPorGeneros = async (req, res) => {
  try {
    const { categoria, page } = req.params
    const { genero } = req.body
    const resultado = await selectedDB[categoria].find({
      generos: { $all: genero }
    })
    const { docs, fin } = docsFiltradosYseparados(resultado, parseInt(page), peer)
    res.json({ docs, fin })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  home,
  autocompletadoBusqueda,
  infoCard,
  resultadoBusqueda,
  paginacion,
  paginacionResultadosBusqueda,
  filtrarPorGeneros,
  paginacionFiltrarPorGeneros
}

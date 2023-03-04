const { Pelicula } = require('../models/Pelicula')
const { Serie } = require('../models/Serie')

const selectedDB = {
  peliculas: Pelicula,
  series: Serie
}

const separarDocs = (docs, page, peer) => {
  let fin = false
  if (docs.length <= page * peer) fin = true
  const docsSep = docs.slice(page * peer - peer, page * peer)
  return { docs: docsSep, fin }
}

const filtrarDocs = (documents) => {
  const docsFiltrados = []
  documents.forEach(e => {
    const imagen = `<img class=" h-full w-full transition-transform duration-500 object-contain" src="${e.imagen.split('uploads')[1]}" alt="">`
    const { _id, precio, nombre, generos, fechaDeEstreno } = e
    const id = _id.toString()
    docsFiltrados.push({ id, precio, nombre, generos, fechaDeEstreno, imagen })
  })
  return docsFiltrados
}

const TodosdocsFiltrados = async (categoria, page, peer) => {
  const docsVanilla = await selectedDB[categoria]
    .find()
    .skip(page * peer - peer)
    .limit(peer)
  const peerTotal = await selectedDB[categoria].count()
  const fin = (page * peer >= peerTotal)
  const docs = filtrarDocs(docsVanilla)
  return { docs, fin }
}

const docsFiltradosYseparados = (documents, page, peer) => {
  const { docs, fin } = separarDocs(documents, page, peer)
  const docsFiltrados = filtrarDocs(docs)
  return { docs: docsFiltrados, fin }
}

const getTodosLosGeneros = async (categoria) => {
  // set para que no se repitan los generos
  const docs = await selectedDB[categoria].find()
  const generos = new Set()

  docs.map(e => e.generos.forEach(j => generos.add(j)))
  return generos
}

module.exports = {
  selectedDB,
  filtrarDocs,
  TodosdocsFiltrados,
  getTodosLosGeneros,
  docsFiltradosYseparados
}

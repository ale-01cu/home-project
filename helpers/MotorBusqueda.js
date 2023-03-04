const { selectedDB, docsFiltradosYseparados } = require('./catalogo')

const buscar = async (categoria, input, page, peer) => {
  const busqueda = input.toLowerCase().split(' ')
  const documentos = await selectedDB[categoria].find()

  const resultados = []
  let max = 0

  documentos.forEach(e => {
    let conincidencias = 0

    const {
      nombre,
      ubicacion,
      formato,
      size,
      generos,
      actores,
      fechaDeEstreno,
      audio,
      descripcion,
      plataforma,
      pais
    } = e
    const todo = `${nombre}${ubicacion}${formato}${size}${generos}${actores}${fechaDeEstreno}${audio}${descripcion}${plataforma}${pais}`

    busqueda.forEach(i => { if (todo.toLowerCase().indexOf(i) !== -1) conincidencias++ })
    if (max < conincidencias) max = conincidencias
    e.conincidencias = conincidencias
    if (conincidencias > 0) { resultados.push(e) }
  })
  const aux = []
  resultados.forEach(e => {
    if (e.conincidencias === max) aux.push(e)
  })
  const resultadosEncontrados = aux.length
  const { docs, fin } = await docsFiltradosYseparados(aux, page, peer)
  return { docs, resultadosEncontrados, fin }
}

module.exports = { buscar }

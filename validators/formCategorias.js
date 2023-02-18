const { check } = require('express-validator') // TODO <---
const { selectedDB } = require('../helpers/catalogo')
const { validateResult } = require('../helpers/validateResult')

const validateForm = (req, res, next) => {
  return [ // TODO: nombre
    check('nombre')
      .exists()
      .withMessage('No existe el campo nombre.')
      .not()
      .isEmpty()
      .withMessage('El campo nombre esta vacio')
      .custom(async (value, { req }) => {
        const { categoria } = req.params
        const db = selectedDB[categoria]
        const existeNombre = await db.findOne({ nombre: value })
        if (existeNombre) throw new Error(`El nombre ${value} ya esta registrado`)
      }),
    check('ubicacion', 'La ubicacion esta vacia')
      .not()
      .isEmpty(),
    check('formato', 'El formato  esta vacio')
      .not()
      .isEmpty(),
    check('size', 'El tamaño esta vacio')
      .not()
      .isEmpty(),
    check('fechaDeEstreno', 'Fecha no valida')
      .custom((value, { req }) => {
        if (value[2] === 'none') throw new Error('Rellene el año de estreno.')
        else if (value[1] === 'none') {
          if (value[0] !== 'none') throw new Error('Fecha de estreno invalida.')
          else return true
        } else {
          return true
        }
      }),
    check('generos', 'Los generos estan vacios')
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        const a = value.split(' ')
        const generos = a.filter(e => e.length > 0)
        return generos
      }),
    check('actores', 'Los actores estan vacios')
      .not()
      .isEmpty(),
    check('audio', 'No hay ningun audio seleccionado')
      .not()
      .isEmpty(),
    check('descripcion', 'La descripcion esta vacia')
      .not()
      .isEmpty(),
    check('pais', 'No hay ningun pais seleccionado')
      .not()
      .isEmpty(),
    check('imagen')
      .custom((value, { req }) => {
        if (!req.file) throw new Error('No se ha mandado ninguna imagen.')
        return true
      }),
    check('precio')
      .not()
      .isEmpty(),
    check('temporadas')
      .custom((value, { req }) => {
        const { categoria } = req.params
        if (categoria !== 'peliculas') {
          if (value) {
            if (value.length === 0) throw new Error('Las temporadas estan vacias')
          } else {
            throw new Error('Las temporadas son obligatorias')
          }
        }
        return true
      }),
    check('capsPorTemporadas')
      .custom((value, { req }) => {
        const { categoria } = req.params
        if (categoria !== 'peliculas') {
          if (value) {
            if (value.length === 0) throw new Error('Los capitulos por temporadas estan vacios')
          } else {
            throw new Error('los capitulos por tenporadas son obligatorios')
          }
        }
        return true
      }),
    check('totalDeCapitulos')
      .custom((value, { req }) => {
        const { categoria } = req.params
        if (categoria !== 'peliculas') {
          if (value) {
            if (value.length === 0) throw new Error('El total de capitulos esta vacio')
          } else {
            throw new Error('El total de capitulos es obligatorio')
          }
        }
        return true
      }),
    (req, res, next) => {
      validateResult(req, res, next)
    }
  ]
}

module.exports = { validateForm }

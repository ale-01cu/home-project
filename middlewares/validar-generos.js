const { request, response } = require('express')

const validarGeneros = (req = request, res = response, next) => {
  const { genero } = req.query

  if (!genero) {
    return res.status(400).end()
  }

  next()
}

module.exports = {
  validarGeneros
}

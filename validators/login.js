const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateResult')

const loginValidator = () => {
  return [
    check('name', 'El nombre es obligatorio')
      .not()
      .isEmpty(),
    check('password', 'La contraseña es obligatoria')
      .not()
      .isEmpty(),
    (req, res, next) => {
      validateResult(req, res, next)
    }
  ]
}

module.exports = loginValidator

const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateResult')
const { Role } = require('../models/Role')

const rolsValidators = () => {
  return [
    check('role', 'El rol es obligatorio')
      .not()
      .isEmpty()
      .custom(async rol => {
        const existeRol = await Role.findOne({ role: rol })
        if (existeRol) throw new Error('Ya existe ese rol')
      }),
    (req, res, next) => {
      validateResult(req, res, next)
    }
  ]
}

module.exports = { rolsValidators }

const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateResult')
const { User } = require('../models/User')

const registroUserValidators = (req, res) => {
  return [
    check('name', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .custom(async (value, { req }) => {
        const existe = await User.findOne({ name: value })
        if (existe) throw new Error('Ya existe un usuario con ese nombre')
      }),
    check('password', 'La contraseña es obligatoria')
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener mas de 6 caracteres'),
    (req, res, next) => {
      validateResult(req, res, next)
    }
  ]
}

module.exports = {
  registroUserValidators
}

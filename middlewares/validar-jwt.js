const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const { User } = require('../models/User')

const validarJWT = async (req = request, res = response, next) => {
  const claveDelTokenDelCliente = 'the_p_token'
  const token = req.header(claveDelTokenDelCliente)

  if (!token) {
    return res.status(400).json({
      msg: 'No se ha mandado el token'
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

    // Leer el usuario que se autentico
    const usuario = await User.findById(uid)

    if (!usuario) {
      return res.status(400).json({
        msg: 'El usuario no existe'
      })
    }

    if (!usuario.state) {
      return res.status(401).json({
        msg: 'Esa Cuenta esta desactivada'
      })
    }

    req.usuario = usuario
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: 'Token invalido'
    })
  }
}

module.exports = validarJWT

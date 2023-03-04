const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const { User } = require('../models/User')
const generarJWT = require('../helpers/generar-JWT')

const viewLogin = (req, res) => {
  res.render('login')
}

const login = async (req = request, res = response) => {
  const { name, password } = req.body

  try {
    // Verificar Usuario
    const existeUsuario = await User.findOne({ name })
    if (!existeUsuario) {
      return res.status(400).json({
        msg: 'Usuario o Contraseña Incorrecto'
      })
    }

    // Verificar Estado
    if (!existeUsuario.state) {
      return res.status(400).json({
        msg: 'Esta cuenta esta desactivada'
      })
    }

    // Verificar contraseña
    const validPassword = bcryptjs.compareSync(password, existeUsuario.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario o Contraseña incorrecto'
      })
    }

    // Generar JWT
    const token = await generarJWT(existeUsuario.id)

    res.json({ existeUsuario, token })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  login,
  viewLogin
}

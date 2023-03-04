const { request, response } = require('express')
const bcrypt = require('bcryptjs')
const { User } = require('../models/User')
const { Role } = require('../models/Role')
require('colors')

const getUsuarios = async (req = request, res = response) => {
  try {
    const usuarios = await User.find()
    res.json({ usuarios, usuarioAutenticado: req.usuario })
  } catch (error) {

  }
}

const setUsuario = async (req = request, res = response) => {
  try {
    console.log('Registrando usuario...')
    const { name, password, confPassword } = req.body

    // Validar que las contraseñas sean iguales
    if (password !== confPassword) {
      return res.status(400).json({
        msg: 'Las contraseñas no coinciden'
      })
    }

    const { role } = await Role.findOne({ role: 'USER_ROLE' })
    const newUsuario = new User({ name, password, role })

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    newUsuario.password = await bcrypt.hash(password, salt)

    await newUsuario.save()
    console.log('\nNuevo Usuario Registrado con exito.'.green)
    console.log(newUsuario)

    res.status(201).json({ msg: 'Usuario guardado correctamente' })
  } catch (error) {

  }
}

module.exports = {
  getUsuarios,
  setUsuario
}

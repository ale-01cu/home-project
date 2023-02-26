const { request, response } = require('express')
const bcrypt = require('bcryptjs')
const { User } = require('../models/User')
const { Role } = require('../models/Role')

const getUsuarios = async (req = request, res = response) => {
  const usuarios = await User.find()
  res.json({ usuarios, usuarioAutenticado: req.usuario })
}

const setUsuario = async (req = request, res = response) => {
  const { name, password } = req.body
  const { role } = await Role.findOne({ role: 'USER_ROLE' })
  const newUsuario = new User({ name, password, role })

  // Encriptar contraseña
  const salt = bcrypt.genSaltSync()
  newUsuario.password = await bcrypt.hash(password, salt)

  await newUsuario.save()
  res.status(201).json({ msg: 'Usuario guardado correctamente' })
}

module.exports = {
  getUsuarios,
  setUsuario
}

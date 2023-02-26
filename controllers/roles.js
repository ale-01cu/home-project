const { request, response } = require('express')
const { Role } = require('../models/Role')

const setRol = async (req = request, res = response) => {
  const { role } = req.body
  const newRol = new Role({ role })
  await newRol.save()
  res.status(201).json({ msg: 'El rol se guardo correctamente' })
}

module.exports = {
  setRol
}

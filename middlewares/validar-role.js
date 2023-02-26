const { Role } = require('../models/Role')

const esAdmin = async (req, res, next) => {
  const usuario = req.usuario

  if (!usuario) {
    return res.status(500).json({
      msg: 'No se ha validado el token'
    })
  }

  const { role } = await Role.findById(usuario.role)
  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: 'No eres ADMIN PAPU'
    })
  }
  next()
}

const rolesValidos = (...resto) => {
  return (req, res, next) => {
    const usuario = req.usuario

    if (!usuario) {
      return res.status(500).json({
        msg: 'No se ha validado el token'
      })
    }

    if (!resto.includes(usuario.role)) {
      return res.status(401).json({
        msg: 'No puede acceder a este servicio'
      })
    }
  }
}

module.exports = {
  esAdmin,
  rolesValidos
}

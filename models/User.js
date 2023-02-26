const { Schema, model } = require('mongoose')

const userSchema = Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'El correo es obligatoro']
  },
  password: {
    type: String,
    unique: true,
    required: [true, 'La contraseña es obligatoro']
  },
  role: {
    type: String,
    ref: 'Role',
    required: true
  },
  // Pa saber si el usuario esta activado o desactivado en la db
  state: {
    type: Boolean,
    default: true
  }

})

userSchema.methods.toJSON = function () {
  const { __v, _id, password, ...resto } = this.toObject()
  resto.uid = _id
  return resto
}

module.exports = {
  User: model('Usuarios', userSchema)
}

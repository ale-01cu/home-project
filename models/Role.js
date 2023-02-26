const { Schema, model } = require('mongoose')

const roleSchema = Schema({
  role: {
    type: String,
    unique: true,
    required: [true, 'El rol es obligatorio']
  }
})

roleSchema.methods.toJSON = function () {
  const { __v, _id, ...resto } = this.toObject()
  resto.id = _id
  return resto
}

module.exports = {
  Role: model('Roles', roleSchema)
}

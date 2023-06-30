import { Schema, model } from 'mongoose'

const actorSchema = Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
    alias: 'Nombre'
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
    alias: 'Apellidos'
  }
}, {
  collection: 'Actores'
})

actorSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})

export const Actor = model('Actor', actorSchema)

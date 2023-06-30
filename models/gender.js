import { Schema, model } from 'mongoose'

const genderSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    alias: 'Nombre'
  }
}, {
  timestamps: true,
  collection: 'Generos'
})

export const Gender = model('Generos', genderSchema)

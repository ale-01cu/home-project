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
  collection: 'Generos'
})

export const Gender = model('Gender', genderSchema)

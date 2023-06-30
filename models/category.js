import { Schema, model } from 'mongoose'

const categorySchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    alias: 'Nombre'
  }
}, {
  collection: 'Categorias'
})

export const Category = model('Category', categorySchema)

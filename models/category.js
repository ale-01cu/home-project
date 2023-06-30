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
  timestamps: true,
  collection: 'Categorias'
})

export const Category = model('Categoria', categorySchema)

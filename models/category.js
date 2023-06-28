import { Schema, model } from 'mongoose'

const categorySchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true,
  collection: 'categories'
})

export const Category = model('Categoria', categorySchema)

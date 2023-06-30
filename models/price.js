import { Schema, model } from 'mongoose'

const PriceSchema = new Schema({
  price: {
    type: Number,
    required: true,
    alias: 'Precio'
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    alias: 'Categoria'
  }
}, {
  timestamps: true,
  collection: 'Precios'
})

export const Price = model('Price', PriceSchema)

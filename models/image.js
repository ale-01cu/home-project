import { Schema, model } from 'mongoose'

const imageSchema = Schema({
  image: {
    type: String,
    unique: true,
    alias: 'Url de la Imagen'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Content',
    alias: 'Producto'
  }
}, {
  collection: 'Imagenes'
})

export const Image = model('Image', imageSchema)

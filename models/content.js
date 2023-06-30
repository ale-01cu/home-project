import { Schema, model } from 'mongoose'
import countries from '../utils/countries.js'

const contentSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    alias: 'Nombre'
  },
  path: {
    type: String,
    required: true,
    maxlength: 255,
    alias: 'Ruta en disco duro'
  },
  format: {
    type: String,
    maxlength: 50,
    alias: 'Formato'
  },
  size: {
    type: String,
    maxlength: 10,
    alias: 'Tamaño'
  },
  releaseYear: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v >= 1900 && v <= 2100
      },
      message: 'El año de lanzamiento debe estar entre 1900 y 2100'
    },
    alias: 'Año de lanzamiento'
  },
  subtitles: {
    type: Boolean,
    default: false,
    alias: 'Esta Subtitulada'
  },
  spanish: {
    type: Boolean,
    default: false,
    alias: 'Esta en Español'
  },
  description: {
    type: String,
    alias: 'Descripcion'
  },
  platform: {
    type: String,
    maxlength: 100,
    alias: 'Plataforma'
  },
  countrie: {
    type: String,
    enum: countries,
    alias: 'Pais'
  },
  photo: {
    type: String,
    alias: 'Foto de Portada'
  },
  genres: [{
    type: Schema.Types.ObjectId,
    ref: 'Genre',
    alias: 'Generos'
  }],
  actors: [{
    type: Schema.Types.ObjectId,
    ref: 'Actor',
    alias: 'Actores'
  }],
  createDate: {
    type: Date,
    default: Date.now,
    alias: 'Fecha de Creado'
  },
  isDelete: {
    type: Boolean,
    default: false,
    alias: 'Eliminado'
  }
}, {
  collection: 'Contenido'
})

contentSchema.virtual('category').get(function () {
  return this.name
})

export const Content = model('Content', contentSchema)

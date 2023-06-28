import { Schema, model } from 'mongoose'

const genderSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true,
  collection: 'gender'
})
const gender = model('Generos', genderSchema)

module.exports = gender

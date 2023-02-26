const { Schema, model } = require('mongoose')

const categoria = Schema({
  Peliculas: [{
    type: Schema.Types.ObjectId,
    ref: 'Peliculas',
    required: true
  }],
  Series: [{
    type: Schema.Types.ObjectId,
    ref: 'Series',
    required: true
  }]
})

module.exports = {
  Categorias: model('Categoria', categoria)
}

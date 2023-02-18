const { Schema, model } = require('mongoose')

const categoria = Schema({
  Peliculas: [{
    type: Schema.Types.ObjectId,
    ref: 'Peliculas'
  }],
  Series: [{
    type: Schema.Types.ObjectId,
    ref: 'Series'
  }]
})

module.exports = {
  Categorias: model('Categoria', categoria)
}

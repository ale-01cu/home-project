const { Schema, model } = require("mongoose");

const seriesSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    ubicacion: {
        type: String,
        required: [true, 'La Ubicacion es obligatoria']
    },
    formato: {
        type: String,
        required: [true, 'El formato es obligatorio']
    },
    size: {
        type: String,
        required: [true, 'El tamaño es obligatorio']
    },
    generos: {
        type: String,
        required: [true, 'Los generos son obligatorios']
    },
    actores: {
        type: Array,
        required: [true, 'El actores son obligatorios']
    },
    fechaDeEstreno: {
        type: String,
        default: "Desconocido"
    },
    audio: {
        type: Array,
        required: [true, 'El audio es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    plataforma: {
        type: String,
        default: "Desconocida"
    },
    pais: {
        type: String,
        required: [true, 'El pais es obligatorio']
    },
    temporadas: {
        type: Number,
        required: [true, 'Las temporadas son obligatorias']
    },
    capsPorTemporadas: {
        type: Array,
        required: [true, 'Los capitulos de cada temporada son obligatorios']
    },
    totalDeCapitulos: {
        type: Number,
        required: [true, 'El total de capitulos es obligatorio']
    },
    imagen: {
        type: String,
        required: [true, 'La imagen es obligatoria']
    },
    precio: {
        type: Number,
        default: 2.50,
        required: [true, 'El precio es obligatoria']
    }


})

module.exports = {
    Serie: model( "Series", seriesSchema),
    seriesSchema
}
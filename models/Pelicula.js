const { Schema, model } = require("mongoose");

const peliculasSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
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
        type: String,
        required: [true, 'El actores son obligatorios']
    },
    fechaDeEstreno: {
        type: Array,
        required: [true, "La fecha de estreno es obligatoria"]
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
    imagen: {
        type: String,
        required: [true, 'La imagen es obligatoria']
    }


})

module.exports = {
    Pelicula: model( "Peliculas", peliculasSchema),
    peliculasSchema
}
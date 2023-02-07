const { Pelicula } = require("../models/Pelicula");
const { Serie } = require("../models/Serie");

const selectedDB = {
    'peliculas': async () => {
        return await Pelicula.find();
    },
    'series': async () => {
        return await Serie.find()
    }
}

const filtrarDocs = async ( categoria ) => {
    const docs = await selectedDB[ categoria ]();
    const docsFiltrados = [];
    docs.forEach( e => {
        const imagen = e.imagen.split("uploads")[1];
        const { precio, nombre, generos, fechaDeEstreno } = e;
        docsFiltrados.push({ precio, nombre, generos, fechaDeEstreno, imagen });
    });
    return docsFiltrados;
}


module.exports = {
    selectedDB,
    filtrarDocs
}
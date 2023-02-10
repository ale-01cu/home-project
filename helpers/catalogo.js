const { Pelicula } = require("../models/Pelicula");
const { Serie } = require("../models/Serie");

const selectedDB = {
    'peliculas': Pelicula,
    'series': Serie
}

const filtrarDocs = async ( docs ) => {
    const docsFiltrados = [];
    docs.forEach( e => {
        const imagen = e.imagen.split("uploads")[1];
        const { precio, nombre, generos, fechaDeEstreno } = e;
        docsFiltrados.push({ precio, nombre, generos, fechaDeEstreno, imagen });
    });
    return docsFiltrados;
}

const docsFiltrados = async ( categoria ) => {
    const docs = await selectedDB[ categoria ].find();
    return filtrarDocs( docs );

}

 
module.exports = {
    selectedDB,
    filtrarDocs,
    docsFiltrados
}
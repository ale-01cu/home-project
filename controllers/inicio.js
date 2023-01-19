const { response } = require("express");
const { Pelicula } = require("../models/Pelicula");
const { Serie } = require("../models/Serie");

const home = async (req, res = response) => {
    const documentos = await Pelicula.find();
    console.log(documentos);

    // set para que no se repitan los generos
    const generos = new Set();

    const documentosFiltrados = documentos.map( e => {
        return {
            nombre: e.nombre,
            fechaDeEstreno: e.fechaDeEstreno,
            generos: e.generos,
            imagen: e.imagen
        }
    });

    documentosFiltrados.filter( e => {
        e.imagen = `<img class="h-full" src="${ e.imagen.split("uploads")[1] }" alt="">`;
        e.generos.forEach( i => generos.add(i) );
    })

    res.render("index", {documentosFiltrados, generos});
    
};

module.exports = {
    home
}
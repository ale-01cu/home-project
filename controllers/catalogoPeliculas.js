const { response, request } = require("express");
const { set } = require("mongoose");
const { getDocumentosFiltrados, getTodosLosGeneros, getDocumentosSeparados } = require("../helpers/catalogo");
const { Pelicula } = require("../models/Pelicula");


const home = async (req, res = response) => {
    res.render("catalogoPeliculas");
};

const getDocumentos = async ( req = request, res = response ) => {
    const docs = await Pelicula.find();
    docs.map(e => e.imagen = e.imagen.split("uploads").pop())
    res.json(docs)
}

const autocompletadoBusqueda = async (req = request, res = response) => {
    const busqueda = req.body.toLowerCase(); //Saca la busqueda, la pone en minuscula, la separa por espacios y la guarda en un array con todas las palabras.
    const documentos = await Pelicula.find();

    let resultadoUnico = new Set();

    documentos.find( e => {
        const { nombre } = e;
        if ( nombre.toLowerCase().indexOf( busqueda ) !== -1 && busqueda.length > 0 ) resultadoUnico.add(nombre);
    })
    const resultados = Array.from(resultadoUnico).slice(0, 5);

    res.status(202).json({resultados})
}

module.exports = {
    home,
    autocompletadoBusqueda,
    getDocumentos

}
const { response, request } = require("express");
const { getDocumentosFiltrados, getTodosLosGeneros, getDocumentosSeparados } = require("../helpers/catalogo");
const { Serie } = require("../models/Serie");


const home = async (req, res = response) => {
    res.render("catalogoSeries");
};

const getDocumentos = async ( req = request, res = response ) => {
    const docs = await Serie.find();
    docs.map(e => e.imagen = e.imagen.split("uploads").pop())

    res.json(docs)
}

const autocompletadoBusqueda = async (req = request, res = response) => {
    const busqueda = req.body.toLowerCase(); //Saca la busqueda, la pone en minuscula, la separa por espacios y la guarda en un array con todas las palabras.
    const documentos = await Serie.find();

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
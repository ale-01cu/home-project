const { response, request } = require("express");
const { selectedDB, filtrarDocs } = require("../helpers/catalogo");

const home = async (req, res = response) => {
    res.render("catalogo");
};

const getDocumentos = async ( req = request, res = response ) => {
    const categoria = req.params.categoria;
    const docs = await filtrarDocs( categoria );
    res.json(docs)
}

const autocompletadoBusqueda = async (req = request, res = response) => {
    const categoria = req.params.categoria;
    const busqueda = req.body.toLowerCase(); //Saca la busqueda, la pone en minuscula, la separa por espacios y la guarda en un array con todas las palabras.
    const docs = await filtrarDocs( categoria );

    let resultadoUnico = new Set();

    docs.find( e => {
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
const { response, request } = require("express");
const { selectedDB, filtrarDocs, docsFiltrados } = require("../helpers/catalogo");

const home = async (req, res = response) => {
    res.render("catalogo");
};

const getDocumentos = async ( req = request, res = response ) => {
    const categoria = req.params.categoria;
    const docs = await docsFiltrados( categoria );
    res.json(docs)
}

const autocompletadoBusqueda = async (req = request, res = response) => {
    const categoria = req.params.categoria;
    const busqueda = req.body.toLowerCase(); //Saca la busqueda, la pone en minuscula, la separa por espacios y la guarda en un array con todas las palabras.
    const docs = await docsFiltrados( categoria );

    let resultadoUnico = new Set();

    docs.find( e => {
        const { nombre } = e;
        if ( nombre.toLowerCase().indexOf( busqueda ) !== -1 && busqueda.length > 0 ) resultadoUnico.add(nombre);
    })
    const resultados = Array.from(resultadoUnico).slice(0, 5);

    res.status(202).json({resultados})
}

const infoCard = async ( req = request, res = response ) => {
    const nombre = req.query.nombre;
    const categoria = req.params.categoria;
    const doc = await selectedDB[ categoria ].find( {nombre} );
    res.render( "infoCard", { doc } )

}

module.exports = {
    home,
    autocompletadoBusqueda,
    getDocumentos,
    infoCard

}
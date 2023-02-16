const { response, request } = require("express");
const { selectedDB, filtrarDocs, getTodosLosGeneros, buscar, TodosdocsFiltrados, docsFiltradosYseparados } = require("../helpers/catalogo");
const totalDeTargetasParaMandar = 20;


const home = async (req, res = response) => {
    const { categoria } = req.params;
    const { docs, fin } = await TodosdocsFiltrados( categoria, 0, totalDeTargetasParaMandar )
    const generos = await getTodosLosGeneros( categoria );
    res.render( 'catalogo', { docs, generos, categoria, fin } )
};


const paginacion = async (req, res) => {
    const { categoria, page } = req.params;
    const {docs, fin} = await TodosdocsFiltrados(categoria, parseInt(page), parseInt(page)+totalDeTargetasParaMandar );
    res.json({docs, fin})
}


const autocompletadoBusqueda = async (req = request, res = response) => {
    const categoria = req.params.categoria;
    const busqueda = req.body.toLowerCase(); //Saca la busqueda, la pone en minuscula, la separa por espacios y la guarda en un array con todas las palabras.
    const {docs} = await TodosdocsFiltrados( categoria );

    let resultadoUnico = new Set();

    docs.find( e => {
        const { nombre } = e;
        if ( nombre.toLowerCase().indexOf( busqueda ) !== -1 && busqueda.length > 0 ) resultadoUnico.add(nombre);
    })
    const resultados = Array.from(resultadoUnico).slice(0, 5);

    res.status(202).json({resultados})
}


const infoCard = async ( req = request, res = response ) => {
    const { id } = req.params;
    const categoria = req.params.categoria;
    const doc = await selectedDB[ categoria ].find( {_id: id} );
    res.render( "infoCard", { doc } )

}


const resultadoBusqueda = async (req, res) => {
    const { categoria } = req.params;
    const { busqueda } = req.query;
    const mostrarEnElBuscador = `value="${busqueda}"`
    const { docs, resultadosEncontrados, fin } = await buscar( categoria, busqueda, 0, totalDeTargetasParaMandar );
    res.render("catalogoResultadosBusqueda", {docs, categoria, mostrarEnElBuscador, resultadosEncontrados, fin});
}


const paginacionResultadosBusqueda = async (req, res) => {
    const { categoria, page } = req.params;
    const { busqueda } = req.query;
    const { docs, fin } = await buscar( categoria, busqueda, parseInt(page), parseInt(page)+totalDeTargetasParaMandar );
    res.json({docs, fin})
}


const filtrarPorGeneros = async (req, res) => {
    const { categoria } = req.params;
    const { genero } = req.body;
    const resultado = await selectedDB[ categoria ].find({
        generos: { $all: genero }
    })
    const { docs, fin } = docsFiltradosYseparados(resultado, 0, totalDeTargetasParaMandar);
    const generos = await getTodosLosGeneros(categoria);

    res.render('catalogoResultadoFiltroGeneros', {docs, generos, categoria, genero, fin})
}


const paginacionFiltrarPorGeneros = async (req, res) => {
    const { categoria, page } = req.params;
    console.log(page);
    const genero = req.body;
    console.log(genero);
    const desde = parseInt(page);
    const hasta = desde + totalDeTargetasParaMandar;

    const resultado = await selectedDB[ categoria ].find({
        generos: { $all: genero }
    })
    const {docs, fin} = docsFiltradosYseparados(resultado, desde, hasta);
    res.json({docs, fin});

}

module.exports = {
    home,
    autocompletadoBusqueda,
    infoCard,
    resultadoBusqueda,
    paginacion,
    paginacionResultadosBusqueda,
    filtrarPorGeneros,
    paginacionFiltrarPorGeneros
}
const { response, request } = require("express");
const { set } = require("mongoose");
const { getDocumentosFiltrados, getTodosLosGeneros } = require("../helpers/catalogo");
const { Pelicula } = require("../models/Pelicula");
const { Serie } = require("../models/Serie");

const home = async (req, res = response) => {
    const documentos = await Pelicula.find();
    const documentosFiltrados = getDocumentosFiltrados(documentos);
    const generos = getTodosLosGeneros(documentos);
    
    res.render("index", {documentosFiltrados, generos, busqueda: "", genero: ""});
};

const autocompletadoBusqueda = async (req, res = response) => {
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

const resultadoBusqueda = async ( req = request, res = response ) => {
    const busqueda = req.query.busqueda.toLowerCase().split(" ");
    const documentos = await Pelicula.find();
    const generos = getTodosLosGeneros(documentos);
 
    let resultados = [];
    let max = 0;
    documentos.find( e => {
        let conincidencias = 0;

        const { 
            nombre, 
            ubicacion, 
            formato, 
            size, 
            generos, 
            actores, 
            fechaDeEstreno, 
            audio, 
            descripcion, 
            plataforma, 
            pais, 
            imagen 
        } = e;
        const todo = `${nombre}${ubicacion}${formato}${size}${generos}${actores}${fechaDeEstreno}${audio}${descripcion}${plataforma}${pais}${imagen}`;

        busqueda.forEach(i => {if ( todo.toLowerCase().indexOf(i) !== -1 ) conincidencias++;});
        if ( max < conincidencias ) max = conincidencias; 
        if ( conincidencias > 0 ) { resultados.push({ nombre, fechaDeEstreno, generos, imagen, conincidencias}) }
 
    })
    let aux = []
    resultados.forEach( e => {
        const { nombre, fechaDeEstreno, generos, imagen, conincidencias } = e;
        if ( e.conincidencias === max ) aux.push({nombre, fechaDeEstreno, generos, imagen, conincidencias})
    })

    const documentosFiltrados = getDocumentosFiltrados(aux);

    res.render('index', {documentosFiltrados, generos, busqueda: `value="${req.query.busqueda}"`, genero: ""})
} 

const filtrarPorGenero = async ( req = request, res = response ) => {
    const genero = req.query.genero;
    const todos = await Pelicula.find();
    const documentos = await Pelicula.find({generos: genero});

    const documentosFiltrados = getDocumentosFiltrados(documentos);
    const generos = getTodosLosGeneros(todos);

    res.render('index', {documentosFiltrados, generos, busqueda: "", genero})

}

module.exports = {
    home,
    autocompletadoBusqueda,
    resultadoBusqueda,
    filtrarPorGenero
}
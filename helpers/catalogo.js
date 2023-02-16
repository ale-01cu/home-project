const { Pelicula } = require("../models/Pelicula");
const { Serie } = require("../models/Serie");

const selectedDB = {
    'peliculas': Pelicula,
    'series': Serie
}

const separarDocs = ( docs, desde, hasta ) => {
    let fin = false;
    if ( docs.length <= hasta ) fin = true;
    return {docs: docs.slice(desde, hasta), fin};
} 


const filtrarDocs = ( documents, desde, hasta ) => {
    const docsFiltrados = [];
    documents.forEach( e => {
        const imagen = `<img class=" h-full w-full transition-transform duration-500 object-contain" src="${ e.imagen.split("uploads")[1] }" alt="">`;
        const { _id, precio, nombre, generos, fechaDeEstreno } = e;
        const id = _id.toString();
        docsFiltrados.push({ id, precio, nombre, generos, fechaDeEstreno, imagen });
    });
    return docsFiltrados;
}


const TodosdocsFiltrados = async ( categoria, desde, hasta ) => {
    const documents = await selectedDB[ categoria ].find()
    const { docs, fin } = docsFiltradosYseparados(documents, desde, hasta);

    return {docs, fin};
}


const docsFiltradosYseparados = ( documents, desde, hasta ) => {
    const docsFiltrados = filtrarDocs(documents);
    const {docs, fin} = separarDocs(docsFiltrados, desde, hasta);
    return {docs, fin};
    
}


const getTodosLosGeneros = async ( categoria ) => {
    // set para que no se repitan los generos
    const docs = await selectedDB[ categoria ].find()
    let generos = new Set();

    docs.map( e => e.generos.forEach( j => generos.add(j) ));
    return generos;

}


const buscar = async ( categoria, input, desde, hasta ) => {
    const busqueda = input.toLowerCase().split(" ");
    const documentos = await selectedDB[ categoria ].find();
 
    let resultados = [];
    let max = 0;
    documentos.find( e => {
        let conincidencias = 0;

        const { 
            _id,
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
        const todo = `${nombre}${ubicacion}${formato}${size}${generos}${actores}${fechaDeEstreno}${audio}${descripcion}${plataforma}${pais}`;

        busqueda.forEach(i => {if ( todo.toLowerCase().indexOf(i) !== -1 ) conincidencias++;});
        if ( max < conincidencias ) max = conincidencias; 
        e.conincidencias = conincidencias;
        if ( conincidencias > 0 ) { resultados.push(e) }
 
    })
    let aux = []
    resultados.forEach( e => {
        if ( e.conincidencias === max ) aux.push(e)
    })
    const resultadosEncontrados = aux.length;
    const { docs, fin } = await docsFiltradosYseparados( aux, desde, hasta )
    return {docs, resultadosEncontrados, fin};
}
 
module.exports = {
    selectedDB,
    filtrarDocs,
    TodosdocsFiltrados,
    getTodosLosGeneros,
    buscar,
    docsFiltradosYseparados,
}
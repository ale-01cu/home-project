const { Pelicula } = require("../models/Pelicula");
const { Serie } = require("../models/Serie");

const selectedDB = {
    'peliculas': Pelicula,
    'series': Serie
}


const filtrarDocs = ( docs ) => {
    const docsFiltrados = [];
    docs.forEach( e => {
        const imagen = `<img class=" h-full w-full transition-transform duration-500" src="${ e.imagen.split("uploads")[1] }" alt="">`;
        const { _id, precio, nombre, generos, fechaDeEstreno } = e;
        const id = _id.toString();
        docsFiltrados.push({ id, precio, nombre, generos, fechaDeEstreno, imagen });
    });
    return docsFiltrados;
}


const TodosdocsFiltrados = async ( categoria, desde, hasta ) => {
    const docs = await selectedDB[ categoria ].find()
    const docsSep = docs.slice(desde, hasta);
    return filtrarDocs( docsSep );
}

const docsSeparados = async ( docs, desde, hasta ) => {
    const docsFiltrados = await filtrarDocs(docs);
    const docsSep = docsFiltrados.slice(desde, hasta);
    return docsSep;
    
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
    const docs = await docsSeparados( aux, desde, hasta )
    return {docs, resultadosEncontrados};
}
 
module.exports = {
    selectedDB,
    filtrarDocs,
    TodosdocsFiltrados,
    getTodosLosGeneros,
    buscar,
}


const getDocumentosFiltrados = (documentos) => {
    
    const documentosFiltrados = documentos.map( e => {
        return {
            nombre: e.nombre,
            fechaDeEstreno: e.fechaDeEstreno,
            generos: e.generos,
            imagen: e.imagen
        }
    });

    documentosFiltrados.filter( e => {
        e.imagen = `<img class=" h-full w-full rounded-2xl transition-transform duration-500" src="${ e.imagen.split("uploads")[1] }" alt="">`;
    })

    return documentosFiltrados
}

const getTodosLosGeneros = documentos => {
    // set para que no se repitan los generos
    let generos = new Set();

    const aux = documentos.map( e => e.generos.forEach( j => generos.add(j) ));
    return generos;

}

module.exports = {
    getDocumentosFiltrados,
    getTodosLosGeneros
}
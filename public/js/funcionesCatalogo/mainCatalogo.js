import { Catalogo } from "./Catalogo.js";

const cargarDocumentos = async () => {
    const categoria = location.pathname.split("/").pop();
    const res = await fetch( "docs/" + categoria );
    const documentos = await res.json();
    return documentos;
}

const marcarNav = () => {
    let cat = "";
    const menus = document.querySelectorAll("nav a");
    menus.forEach( e => { 
        if ( e.id == location.pathname.split("/")[2] ) {
            e.classList.add( "active", "bg-white" )
            cat = e.id; 
        }
    })
    return cat;
}

const main = async () => {
    const categoria = marcarNav();
    
    //const documentos = await cargarDocumentos();

    const home = new Catalogo( categoria );
    home.headerFuncionesMovil();
    home.headerFuncionesPantallasGrandes();
    home.funcionesBuscadores();
    home.esElFinal();
    home.funcionesGeneros();

    //home.cargarTargetas();
    //home.esconderHeader();
}

main();


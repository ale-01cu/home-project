import { Catalogo } from "./resultadosBusqueda.js";

const cargarDocumentos = async () => {
    const categoria = location.pathname.split("/").pop();
    const res = await fetch( "docs/" + categoria );
    const documentos = await res.json();
    return documentos;
}

const marcarNav = () => {
    const menus = document.querySelectorAll("nav a");
    menus.forEach( e => { if ( e.id == location.pathname.split("/")[2] ) e.classList.add( "active", "bg-white" ) })
    
}

const main = async () => {
    marcarNav();
    
    //const documentos = await cargarDocumentos();

    const home = new Catalogo();
    home.headerFuncionesMovil();
    home.headerFuncionesPantallasGrandes();
    home.funcionesBuscadores();
    home.esElFinal();

    //home.cargarTargetas();
    //home.esconderHeader();
}

main();


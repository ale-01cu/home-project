import { Catalogo } from "./Catalogo.js";

const cargarDocumentos = async () => {
    const categoria = location.pathname.split("/").pop();
    const res = await fetch( "docs/" + categoria );
    const documentos = await res.json();
    return documentos;
}

const marcarNav = () => {
    const menus = document.querySelectorAll("nav a");
    menus.forEach( e => { if ( e.id == location.pathname.split("/").pop() ) e.classList.add( "active", "bg-white" ) })
    
}

const main = async () => {
    marcarNav();
    
    const documentos = await cargarDocumentos();

    const catalogo = new Catalogo( documentos );
    // Funciones
    catalogo.headerFuncionesMovil();
    catalogo.headerFuncionesPantallasGrandes();
    catalogo.funcionesCarrucel();
    catalogo.funcionesBuscadores();
    catalogo.filtrarPorGeneros();

    //home.cargarTargetas();
    //home.esconderHeader();
}

addEventListener("load", e => {
    main();
})

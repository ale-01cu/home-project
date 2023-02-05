import { Catalogo } from "./Catalogo.js";

const cargarDocumentos = async () => {
    const res = await fetch('docs');
    const documentos = await res.json();
    return documentos;
}

const marcarNav = () => {
    const navSeleccionado = document.getElementById("catalogoPeliculas");
    navSeleccionado.classList.add("active", "bg-white");
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

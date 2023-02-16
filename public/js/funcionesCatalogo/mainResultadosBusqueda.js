import { Catalogo } from "./Catalogo.js";

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

    const urlAutocompletado = `${location.origin}/catalogo/${categoria}/autocompletado`;
    const urlResultadosBusqueda = `${location.origin}/catalogo/${categoria}/resultadoBusqueda?busqueda=`;
    const urlResultadosFiltradoGeneros = `${location.origin}/catalogo/${categoria}/filtrarPorGeneros`;
    const urlpaginacion = `${location.origin}/catalogo/${categoria}/resultadoBusqueda/page/`;

    const home = new Catalogo( categoria, urlAutocompletado, urlResultadosBusqueda, urlResultadosFiltradoGeneros, urlpaginacion );
    home.headerFuncionesMovil();
    home.headerFuncionesPantallasGrandes();
    home.funcionesBuscadores();
    home.esElFinal("busqueda");

}

main();

// Paginacion
// Autocompletado
// Busqueda
// PaginacionBusqueda
// Generos
// PaginacionGeneros

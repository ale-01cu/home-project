import { Catalogo } from "./Catalogo.js";


const main = () => {
    const navSeleccionado = document.getElementById("home");
    navSeleccionado.classList.add("active", "bg-white");


    const home = new Catalogo();
    home.headerFuncionesMovil();
    home.headerFuncionesPantallasGrandes();
    home.funcionesCarrucel();
    home.funcionesBuscadores();
    //home.esconderHeader();
}

main();
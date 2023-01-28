import { Home } from "./FuncionesHome.js";


const main = () => {
    const navSeleccionado = document.getElementById("home");
    navSeleccionado.classList.add("active", "bg-white");


    const home = new Home();
    home.headerFuncionesMovil();
    home.headerFuncionesPantallasGrandes();
    home.funcionesCarrucel();
    home.funcionesBuscadores();
    home.esconderHeader();
}

main();
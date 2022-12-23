import { Serie } from "./Series.js";

const form = () => {
    const navSeleccionado = document.getElementById("admin");
    navSeleccionado.classList.add("active");

    const formSerie = new Serie();
    formSerie.efectosDeLaInterfaz();
    formSerie.obtenerDatos();
    formSerie.resetear();
    formSerie.formularioCapXtemporadas();
    formSerie.enviarDatos( "http://10.31.103.6:3000/api/admin/serie/guardar" );

}

form();
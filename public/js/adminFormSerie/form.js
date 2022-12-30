import { Serie } from "./Series.js";

const form = () => {
    const navSeleccionado = document.getElementById("admin");
    navSeleccionado.classList.add("active", "bg-white");

    const formSerie = new Serie();
    formSerie.configInputDate();
    formSerie.efectosDeLaInterfaz();
    formSerie.obtenerDatosSerie();
    formSerie.btnResetSerie();
    formSerie.formularioCapXtemporadas();
    formSerie.enviarDatos( "http://10.31.103.6:3000/api/admin/serie/guardar" );

}

form();
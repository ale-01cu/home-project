import { Pelicula } from "./Pelicula.js";

const form = () => {
    const navSeleccionado = document.getElementById("admin");
    navSeleccionado.classList.add("active");
    
    const formPelicula = new Pelicula();
    formPelicula.efectosDeLaInterfaz();
    formPelicula.obtenerDatos();
    formPelicula.resetear();
    formPelicula.enviarDatos( "http://10.31.103.6:3000/api/admin/pelicula/guardar" );
}

form();
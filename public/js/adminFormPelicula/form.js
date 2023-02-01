import { Pelicula } from "./Pelicula.js";

const form = () => {
    const navSeleccionado = document.getElementById("admin");
    navSeleccionado.classList.add("active", "bg-white");
    
    const formPelicula = new Pelicula();
    formPelicula.configInputDate();
    //formPelicula.efectosDeLaInterfaz();
    formPelicula.obtenerDatos();
    formPelicula.btnReset();
    formPelicula.enviarDatos( "http://10.31.103.6:3000/api/admin/pelicula/guardar" );
    formPelicula.btnMostrarCategorias();
    formPelicula.btnSubir();
    formPelicula.precio();
}

form();
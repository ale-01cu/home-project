// Importando paquetes
const { Router } = require("express");
const router = Router();

const { pelicula, serie, guardarPelicula } = require("../controllers/formsAdmin");
const upload = require("../middlewares/almacenarLaImagenEnCarpetas");


// Devuelve la vista
router.get("/pelicula", pelicula);
router.get("/serie", serie);

// Recibe la informacion y la almacena en la base de datos
router.post( "/pelicula/guardar", upload("Peliculas"), guardarPelicula );


module.exports = router;
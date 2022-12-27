// Importando paquetes
const { Router } = require("express");
const router = Router();
const { pelicula, serie, guardarPelicula, guardarSerie } = require("../controllers/formsAdmin");
// Multer
const upload = require("../middlewares/almacenarLaImagenEnCarpetas");
// Validaciones
const { validateCreate } = require("../validators/formCategorias")
//Variables Globales
const { PELICULA, SERIE } = require("../helpers/variablesGlobales")

// Devuelve la vista
router.get("/pelicula", pelicula);
router.get("/serie", serie);

// Recibe la informacion y la almacena en la base de datos
router.post( "/pelicula/guardar", [upload(PELICULA), validateCreate(PELICULA)], guardarPelicula );
router.post( "/serie/guardar", [upload(SERIE), validateCreate(SERIE)], guardarSerie );


module.exports = router;
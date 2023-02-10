// Importando paquetes
const { Router } = require("express");
const router = Router();
const { vista, guardarCategoria } = require("../controllers/formsAdmin");
// Multer
const upload = require("../middlewares/almacenarLaImagenEnCarpetas");
// Validaciones
const { validateForm, validaciones } = require("../validators/formCategorias")
//Variables Globales
const { PELICULA, SERIE } = require("../utils/variablesGlobales");

const { check,param } = require('express-validator')
router.get("/", vista);
router.post( "/:categoria/guardar", [ upload, validateForm() ] , guardarCategoria);


module.exports = router;
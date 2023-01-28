const { Router } = require("express");
const { home, autocompletadoBusqueda, resultadoBusqueda, filtrarPorGenero } = require("../controllers/inicio");
const router = Router();

router.get("/", home);
router.post("/autocompletado", autocompletadoBusqueda);
router.get("/busqueda", resultadoBusqueda);
router.get("/genero", filtrarPorGenero);


module.exports = router;
const { Router } = require("express");
const { home, autocompletadoBusqueda, getDocumentos } = require("../controllers/catalogoSeries");
const router = Router();

router.get("/", home);
router.get('/docs', getDocumentos);
router.post("/autocompletado", autocompletadoBusqueda);

module.exports = router;
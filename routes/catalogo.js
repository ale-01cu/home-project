const { Router } = require("express");
const { home, autocompletadoBusqueda, getDocumentos, infoCard } = require("../controllers/catalogo");
const router = Router();

router.get("/:categoria", home);
router.get("/:categoria/info", infoCard);
router.get("/docs/:categoria", getDocumentos);
router.post("/autocompletado/:categoria", autocompletadoBusqueda);

module.exports = router;
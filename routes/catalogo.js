const { Router } = require("express");
const { home, autocompletadoBusqueda, infoCard, resultadoBusqueda, paginacion, paginacionResultadosBusqueda, filtrarPorGeneros } = require("../controllers/catalogo");
const Pelicula = require("../models/Pelicula");
const router = Router();


router.get( "/prueba", async (req, res) => {
    //const { desde, hasta } = req.query;
    const { genero } = req.query;
    console.log(genero);

    //const docs = await (await Pelicula.Pelicula.find()).splice(desde, hasta);
    const docs = await Pelicula.Pelicula.find().all("generos", [genero, "drama"]);
    console.log(docs);
    res.end();
} )
router.get("/:categoria", home);
router.get("/:categoria/page/:page", paginacion)
router.get("/:categoria/info/:id", infoCard);
router.get("/:categoria/resultadoBusqueda", resultadoBusqueda );
router.get("/:categoria/resultadoBusqueda/page/:page", paginacionResultadosBusqueda );
router.post("/:categoria/filtrarPorGeneros", filtrarPorGeneros);
router.post("/:categoria/autocompletado", autocompletadoBusqueda);

module.exports = router
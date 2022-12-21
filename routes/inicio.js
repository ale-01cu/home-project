const { Router } = require("express");
const { home } = require("../controllers/inicio");
const router = Router();

router.get("/", home);


module.exports = router;
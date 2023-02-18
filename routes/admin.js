// Importando paquetes
const { Router } = require('express')
const router = Router()
const { vista, guardarCategoria } = require('../controllers/formsAdmin')
const upload = require('../middlewares/almacenarLaImagenEnCarpetas')// Multer
const { validateForm } = require('../validators/formCategorias')// Validaciones

router.get('/', vista)
router.post('/:categoria/guardar', [upload, validateForm()], guardarCategoria)

module.exports = router

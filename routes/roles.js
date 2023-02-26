const { Router } = require('express')
const router = Router()
const { setRol } = require('../controllers/roles')
const { rolsValidators } = require('../validators/roles')

router.post('/guardar', rolsValidators(), setRol)

module.exports = router

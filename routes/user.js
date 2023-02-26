const { Router } = require('express')
const router = Router()
const { getUsuarios, setUsuario } = require('../controllers/user')
const { esAdmin } = require('../middlewares/validar-role')
const validarJWT = require('../middlewares/validar-jwt')
const { registroUserValidators } = require('../validators/resgistroUsers')

router.get('/obtener', [validarJWT, esAdmin], getUsuarios)
router.post('/registrar', registroUserValidators(), setUsuario)

module.exports = router

const { Router } = require('express')
const router = Router()
const { login, viewLogin } = require('../controllers/login')
const loginValidator = require('../validators/login')

router.get('/', viewLogin)
router.post('/', loginValidator(), login)

module.exports = router

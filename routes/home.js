const { Router } = require('express')
const router = Router()
const { home } = require('../controllers/home')

router.get('/', home)

module.exports = router

const { validationResult } = require('express-validator'); //TODO:

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        next()
    } catch (err) {
        res.status(403).json(err)
    }
}

module.exports = { validateResult }
const jwt = require('jsonwebtoken')

const generarJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '1h'
    }, (err, token) => {
      if (err) {
        console.log('No se pudo generar el Token')
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = generarJWT

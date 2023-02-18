const mongoose = require('mongoose')
require('colors')
const { spawn } = require('child_process')

// Conectarse con la base de datos
const dbConnection = async () => {
  const URL_DATABASE = process.env.MONGODB_CNN
  mongoose.set('strictQuery', true)

  try {
    await mongoose.connect(URL_DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Conexion establecida con la base de datos.')
  } catch (error) {
    console.log(error)
    console.log('No se Pudo conectar con la Base de Datos'.red)
  }
}

// Abrir la base de datos
const dbOpen = async () => {
  const data = await spawn('cmd', ['/c', 'start mongod'])

  data.stdout.on('data', data => {
    console.log(data.toString())
  })

  data.stderr.on('data', err => {
    console.err('Ha ocurrido un error al levantar la base de datos.'.red)
    console.err(err)
  })

  data.on('exit', e => {
    console.log('Se ha levantado la base de datos'.yellow)
  })
}

module.exports = {
  dbConnection,
  dbOpen
}

// const mongoose = require('mongoose')
// require('colors')
// const { spawn } = require('child_process')

import mongoose from 'mongoose'
import 'colors'
import { spawn } from 'child_process'

// Conectarse con la base de datos
const dbConnection = async () => {
  const URL_DATABASE = process.env.MONGODB_CNN
  mongoose.set('strictQuery', true)

  try {
    await mongoose.connect(URL_DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to the Database.'.green)
  } catch (error) {
    console.log(error)
    console.log('Failed to connect to database'.red)
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

export { dbConnection, dbOpen }

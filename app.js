
// // Importando paquetes de Node
// const path = require('path')

// // Importtando paquetes de terceros
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const colors = require('colors')
// require('dotenv').config()
// require('ejs')

// const AdminJS = require('adminjs')

// const adminJsOptions = {
//   resources: [], // Aquí es donde definirás tus recursos
//   rootPath: '/admin'
// }

// const adminJs = new AdminJS(adminJsOptions)

// // Importando mis paquetes
// const port = process.env.PORT || 3000

// // Config de express
// app.set('views', path.join(__dirname, '/views'))
// app.set('view engine', 'ejs')

// // Middleware
// app.use(express.text())
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// // Cors
// app.use(cors())

// // Rutas
// app.use(express.static(path.join(__dirname, '/public')))
// app.use(express.static(path.join(__dirname, '/uploads')))
// app.use(express.static(path.join(__dirname, '/node_modules/swiper')))

// app.use('/', require('./routes/home'))
// app.use('/catalogo', require('./routes/catalogo'))
// app.use('/formularios', require('./Routes/admin'))
// app.use('/api/user', require('./Routes/user'))
// app.use('/api/rol', require('./Routes/roles'))
// app.use('/api/login', require('./routes/login'))

// app.use(adminJs.options.rootPath, adminJs.router)

// // Base de Datos
// const { dbConnection } = require('./db/config')
// dbConnection()

// app.listen(port, () => {
//   console.log(`Server escuchando en el puerto: ${colors.green(port)}`)
// })

import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import * as AdminJSMongoose from '@adminjs/mongoose'
import { dark, light, noSidebar } from '@adminjs/themes'
import { dbConnection } from './db/config.js'
import { Category } from './models/category.js'
import dotenv from 'dotenv'
dotenv.config()

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database
})

const PORT = 3000

const DEFAULT_ADMIN = {
  email: 'ale@gmail.com',
  password: '123'
}

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}

const start = async () => {
  dbConnection()

  const adminOptions = {
    // We pass Category to `resources`
    resources: [Category],
    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar]
  }
  const app = express()

  const admin = new AdminJS(adminOptions)

  // const ConnectSession = Connect(session)
  // const sessionStore = new ConnectSession({
  //   conObject: {
  //     connectionString: 'postgres://adminjs:@localhost:5432/adminjs',
  //     ssl: process.env.NODE_ENV === 'production'
  //   },
  //   tableName: 'session',
  //   createTableIfMissing: true
  // })

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret'
    },
    null,
    {
      //store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: 'sessionsecret',
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production'
      },
      name: 'adminjs'
    }
  )
  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
    console.log('Server Started on port ' + PORT)
  })
}

start()

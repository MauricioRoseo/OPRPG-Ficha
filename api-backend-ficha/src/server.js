//const express = require('express')
import express from 'express'
import characterRouter from './routers/characterRouter.js'
import cors from 'cors'
import { logger } from './middlewares/logger.js'
import { errorsHandler } from './middlewares/errorsHandler.js'
import { notFoundController } from './controllers/notFoundController.js'
import { welcomeController } from './controllers/welcomeController.js'

const app = express()
const port = 3003

app.use(logger)
app.use(cors())
app.use(express.json())

app.get('/', welcomeController)

app.use(notFoundController)
app.use(errorsHandler)

app.use('/character', characterRouter)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
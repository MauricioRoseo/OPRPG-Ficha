//const express = require('express')
import express from 'express'
import characterRouter from './routers/characterRouter.js'
import cors from 'cors'
import { logger } from './middlewares/logger.js'

const app = express()
const port = 3003

// Middleware
app.use(logger)
app.use(cors()) 
app.use(express.json()) // faz o parse do json e transforma em objeto no req.body

app.get('/', (req, res) => {
  res.send('Olá Mundo!')
})

app.use('/character', characterRouter)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
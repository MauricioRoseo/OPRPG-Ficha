//const express = require('express')
import express from 'express'
import characterRouter from './routers/characterRouter.js'

const app = express()
const port = 3003

// Middleware
app.use(express.json()) // faz o parse do json e transforma em objeto no req.body

app.use('/character', characterRouter)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
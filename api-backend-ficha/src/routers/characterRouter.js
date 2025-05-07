import express from 'express'
import getCharacterController from '../controllers/character/getCharacterController.js'
import createCharacterController from '../controllers/character/createCharacterController.js'
import deleteCharacterController from '../controllers/character/deleteCharacterController.js'
import updateCharacterController from '../controllers/character/updateCharacterController.js'

const router = express.Router()

router.get('/list', getCharacterController)
router.get('/:id', ()=>{}) // get de uma unica propriedade por id
router.post('/', createCharacterController)
router.delete('/:id', deleteCharacterController)
router.put('/:id', updateCharacterController)

export default router
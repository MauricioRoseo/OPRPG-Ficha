import express from 'express'
import getCharacterController from '../controllers/character/getCharacterController.js'
import createCharacterController from '../controllers/character/createCharacterController.js'
import deleteCharacterController from '../controllers/character/deleteCharacterController.js'
import updateCharacterController from '../controllers/character/updateCharacterController.js'
import itemRouter from '../routers/itemRouter.js'
import exportCharacterCSVController from '../controllers/character/exportCharacterCSVController.js'
import exportCharacterXLSXController from '../controllers/character/exportCharacterXLSXController.js'
import getCharacterByIdController from '../controllers/character/getCharacterByIdController.js'

const router = express.Router()

router.get('/list', getCharacterController)
router.get('/:id', getCharacterByIdController) // get de uma unica propriedade por id
router.use('/item', itemRouter)
router.post('/create', createCharacterController)
router.delete('/:id', deleteCharacterController)
router.put('/:id', updateCharacterController)
router.get('/export/csv', exportCharacterCSVController)
router.get('/export/xlsx', exportCharacterXLSXController) //tá com um paywall

export default router
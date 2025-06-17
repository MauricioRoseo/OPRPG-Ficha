import express from 'express'
import getItemController from '../controllers/item/getItemController.js'
import createItemController from '../controllers/item/createItemController.js'
import deleteItemController from '../controllers/item/deleteItemControler.js'
import updateItemController from '../controllers/item/updateItemController.js'

const router = express.Router()

router.get('/list', getItemController)
router.post('/create', createItemController)
router.delete('/:id', deleteItemController)
router.put('/:id', updateItemController)

export default router
import {getList} from '../../models/characterModel.js'
 
 export default async function getCharacterController(req, res) {
     
     const result = await getList()
     
     return res.json(result)
 }
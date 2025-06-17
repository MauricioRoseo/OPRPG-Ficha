import {getList} from '../../models/itemModel.js'
 
 export default async function getItemController(req, res) {
     
     const result = await getList()
     
     return res.json(result)
 }
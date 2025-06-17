import { update } from "../../models/itemModel.js"
 
 export default async function updateItemController(req, res) {
     const {id} = req.params
     const item = req.body
 
     const result = await update(+id, item)
 
     return res.json({
         message: "Item atualizado com sucesso!",
         item: result
     })
 }
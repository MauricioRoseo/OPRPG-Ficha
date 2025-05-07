import { remove } from "../../models/characterModel.js"
 
 export default async function deleteCharacterController(req, res) {
     const {id} = req.params
 
     const result = await remove(+id)
 
     return res.json({
         message: `Personagem ID ${id} excluido com sucesso!`,
         character: result
     })
 }
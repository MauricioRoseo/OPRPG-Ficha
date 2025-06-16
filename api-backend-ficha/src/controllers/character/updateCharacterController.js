import { update } from "../../models/characterModel.js"
 
 export default async function updateCharacterController(req, res) {
     const {id} = req.params
     const character = req.body
 
     const result = await update(+id, character)
 
     return res.json({
         message: "Personagem atualizado com sucesso!",
         character: result
     })
 }
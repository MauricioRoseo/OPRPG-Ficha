import { create } from "../../models/characterModel.js"
 
 export default async function createCharacterController(req, res) {
     const character = req.body
 
     //TODO validar
     const result = await create(character)
 
     return res.json({
         message: "Personagem criado com sucesso!",
         character: result
     })
 }
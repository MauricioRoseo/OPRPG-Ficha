import { create, characterValidator } from "../../models/characterModel.js"
 
 export default async function createCharacterController(req, res) {
     const character = req.body
 
     //TODO validar
     const {success, error, data: characterValidated} = characterValidator(character, {id: true})

    if(!success){
        return res.status(400).json({
            message: 'Erro ao cadastrar personagem, verifique os dados!',
            errors: error.flatten().fieldErrors
        })
    }

    const result = await create(characterValidated)
 
     return res.json({
         message: "Personagem criado com sucesso!",
         character: result
     })
 }
import { create, characterValidator } from "../../models/characterModel.js"
 
export default async function createCharacterController(req, res, next) {
    try{
        const character = req.body
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
            property: result
        })
    }catch(error){
        next(error)
    }
 }
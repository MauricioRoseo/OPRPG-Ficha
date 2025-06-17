import { create, itemValidator } from "../../models/itemModel.js"
 
export default async function createItemController(req, res, next) {
    try{
        const item = req.body
        const {success, error, data: itemValidated} = itemValidator(item, {id: true})
        if(!success){
            return res.status(400).json({
                message: 'Erro ao cadastrar item, verifique os dados!',
                errors: error.flatten().fieldErrors
            })
        }
        const result = await create(itemValidated)
        return res.json({
            message: "Personagem criado com sucesso!",
            item: result
        })
    }catch(error){
        next(error)
    }
 }
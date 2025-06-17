import { remove, itemValidator } from "../../models/itemModel.js"

export default async function deleteItemController(req, res, next) {
    try{
        const {id} = req.params
        const item = {
            id: +id
        }
        const {success, error, data} = itemValidator(item, {
            id: true,
            owner: true,
            name: true,
            weight: true,
            description: true,
          })
        if(!success){
            return res.status(400).json({
                message: 'Erro ao deletar item, verifique os dados!',
                errors: error.flatten().fieldErrors
            })
        }
        const result = await remove(data.id)
        return res.json({
            message: `Item ID ${id} excluido com sucesso!`,
            item: result
        })
    } catch(error){
        if(error?.code === 'P2025' && error?.meta?.cause.includes('Record to delete does not exist')){
            return res.status(404).json({
                message: 'Item não encontrado!',
            })
        }
        next(error)
    }}
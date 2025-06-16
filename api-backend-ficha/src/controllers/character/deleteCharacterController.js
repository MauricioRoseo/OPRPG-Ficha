import { remove, characterValidator } from "../../models/characterModel.js"

export default async function deleteCharacterController(req, res, next) {
    try{
        const {id} = req.params
        const character = {
            id: +id
        }
        const {success, error, data} = characterValidator(character, {
            id: true,
            name: true,
            age: true,
            player: true,
            class: true,
            trail: true,
            afinity: true,
            origin: true,
            patent: true,
            NEX: true,
            FOR: true,
            AGI: true,
            INT: true,
            VIG: true,
            PRE: true
          })
        if(!success){
            return res.status(400).json({
                message: 'Erro ao deletar personagem, verifique os dados!',
                errors: error.flatten().fieldErrors
            })
        }
        const result = await remove(data.id)
        return res.json({
            message: `Personagem ID ${id} excluido com sucesso!`,
            character: result
        })
    } catch(error){
        if(error?.code === 'P2025' && error?.meta?.cause.includes('Record to delete does not exist')){
            return res.status(404).json({
                message: 'Personagem não encontrada!',
            })
        }
        next(error)
    }}
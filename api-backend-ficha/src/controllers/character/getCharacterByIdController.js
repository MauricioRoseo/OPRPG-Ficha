import { getById } from '../../models/characterModel.js'

export default async function getCharacterByIdController(req, res, next) {
    try {
      const id = Number(req.params.id)
  
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: 'ID inválido.' })
      }
  
      const character = await getById(id)
  
      if (!character) {
        return res.status(404).json({ message: 'Personagem não encontrado.' })
      }
  
      return res.json(character)
    } catch (error) {
      next(error)
    }
  }
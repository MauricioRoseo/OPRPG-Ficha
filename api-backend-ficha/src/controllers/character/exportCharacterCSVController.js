import { stringify } from 'csv-stringify'
import { getList } from '../../models/characterModel.js'  
export default async function exportCharacterCSVController(req, res, next) {
  try {
    const characters = await getList() // busca todos os personagens do banco

    const columns = {
      id: 'ID',
      name: 'Nome',
      age: 'Idade',
      player: 'Jogador',
      class: 'Classe',
      trail: 'Trilha',
      afinity: 'Afinidade',
      origin: 'Origem',
      patent: 'Patente',
      NEX: 'NEX',
      FOR: 'FOR',
      AGI: 'AGI',
      INT: 'INT',
      VIG: 'VIG',
      PRE: 'PRE'
    }

    stringify(characters, { header: true, columns }, (err, output) => {
      if (err) return next(err)

      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', 'attachment; filename=personagens.csv')
      res.send(output)
    })
  } catch (error) {
    next(error)
  }
}
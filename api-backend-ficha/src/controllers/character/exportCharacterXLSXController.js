import XLSX from 'xlsx'
import { getList } from '../../models/characterModel.js'

export default async function exportCharacterXLSXController(req, res, next) {
  try {
    const characters = await getList()

    const worksheet = XLSX.utils.json_to_sheet(characters)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Personagens')

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', 'attachment; filename=personagens.xlsx')
    res.send(buffer)
  } catch (error) {
    next(error)
  }
}
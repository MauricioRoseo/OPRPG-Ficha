import { Personagem  } from "../../models/characterModel.js"
import { stringify } from "csv-stringify"
import XLSX from "xlsx"

class CharacterController {
  constructor() {
    // Nenhuma instância é criada aqui.
    // A classe será usada diretamente nos métodos.
  }

  // Criar personagem
  async create(req, res, next) {
    try {
      const personagem = new Personagem(req.body)
      const result = await personagem.salvar()

      return res.json({
        message: "Personagem criado com sucesso!",
        character: result
      })
    } catch (error) {
      next(error)
    }
  }

  // Deletar personagem
  async delete(req, res, next) {
    try {
      const { id } = req.params
      const personagem = new Personagem({ id: +id })
      const result = await personagem.deletar()

      return res.json({
        message: `Personagem ID ${id} excluído com sucesso!`,
        character: result
      })
    } catch (error) {
      next(error)
    }
  }

  // Exportar CSV
  async exportCSV(req, res, next) {
    try {
      const characters = await this.model.getList()

      const columns = {
        id: "ID",
        name: "Nome",
        age: "Idade",
        player: "Jogador",
        class: "Classe",
        trail: "Trilha",
        afinity: "Afinidade",
        origin: "Origem",
        patent: "Patente",
        NEX: "NEX",
        FOR: "FOR",
        AGI: "AGI",
        INT: "INT",
        VIG: "VIG",
        PRE: "PRE",
      }

      stringify(characters, { header: true, columns }, (err, output) => {
        if (err) return next(err)

        res.setHeader("Content-Type", "text/csv")
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=personagens.csv"
        )
        res.send(output)
      })
    } catch (error) {
      next(error)
    }
  }

  // Exportar XLSX
  async exportXLSX(req, res, next) {
    try {
      const characters = await this.model.getList()

      const worksheet = XLSX.utils.json_to_sheet(characters)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Personagens")

      const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=personagens.xlsx"
      )
      res.send(buffer)
    } catch (error) {
      next(error)
    }
  }

  // Buscar por ID
  async getById(req, res, next) {
    try {
      const id = Number(req.params.id)
      const personagem = await Personagem.buscarPorId(id)
      if (!personagem)
        return res.status(404).json({ message: "Personagem não encontrado." })
      res.json(personagem)
    } catch (error) {
      next(error)
    }
  }

  // Listar todos
  async getAll(req, res) {
    const result = await Personagem.listarTodos()
    return res.json(result)
  }

  // Atualizar
  async update(req, res) {
    try {
      const { id } = req.params;
      const personagem = new Personagem({ id: Number(id), ...req.body });
      const atualizado = await personagem.atualizar();
      res.json({
        message: "Personagem atualizado com sucesso!",
        item: atualizado
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CharacterController()

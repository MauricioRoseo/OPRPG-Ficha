import { Item } from "../../models/itemModel.js";

class ItemController {
  // Criar item
  async create(req, res, next) {
    try {
      const item = new Item(req.body);
      const novoItem = await item.salvar();
      res.status(201).json({
        message: "Item criado com sucesso!",
        item: novoItem
      });
    } catch (error) {
      next(error);
    }
  }

  // Listar todos
  async getAll(req, res, next) {
    try {
      const itens = await Item.listarTodos();
      res.json(itens);
    } catch (error) {
      next(error);
    }
  }

  // Buscar por ID
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const item = await Item.buscarPorId(id);
      if (!item) {
        return res.status(404).json({ message: "Item não encontrado." });
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  // Atualizar
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const item = new Item({ id: Number(id), ...req.body });
      const atualizado = await item.atualizar();
      res.json({ message: "Item atualizado com sucesso!", item: atualizado });
    } catch (error) {
      next(error);
    }
  }

  // Deletar
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "ID do item é obrigatório." });
      }

      const item = await Item.deleteById(Number(id));

      if (!item) {
        return res.status(404).json({ message: "Item não encontrado." });
      }

      return res.json({
        message: "Item deletado com sucesso!",
        item
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Erro ao deletar item.",
        error: error.message
      });
    }
  }

  async getByOwner(req, res, next) {
    try {
      const { ownerId } = req.params;

      if (!ownerId) {
        return res.status(400).json({ message: "ID do personagem é obrigatório." });
      }

      const items = await Item.buscarPorOwner(Number(ownerId));

      if (!items || items.length === 0) {
        return res.status(404).json({ message: "Nenhum item encontrado para este personagem." });
      }

      return res.json({
        owner: Number(ownerId),
        total: items.length,
        items
      });
    } catch (error) {
      next(error);
    }
  }

}

// Exporta uma instância (sem instanciar Item)
export default new ItemController();

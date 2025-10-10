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
      res.json({
        message: "Item atualizado com sucesso!",
        item: atualizado
      });
    } catch (error) {
      next(error);
    }
  }

  // Deletar
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const item = new Item({ id: Number(id) });
      const deletado = await item.deletar();
      res.json({
        message: "Item deletado com sucesso!",
        item: deletado
      });
    } catch (error) {
      next(error);
    }
  }
}

// Exporta uma instância (sem instanciar Item)
export default new ItemController();

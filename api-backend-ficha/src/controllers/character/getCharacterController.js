import { Personagem } from "../../models/characterModel.js";

export default async function getCharacterController(req, res) {
  try {
    const lista = await Personagem.listarTodos();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

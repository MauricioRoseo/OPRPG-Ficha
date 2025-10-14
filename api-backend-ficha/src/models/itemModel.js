import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// 🔹 Esquema base sem o ID (para criação)
const itemBaseSchema = z.object({
  owner: z.number({
    required_error: "O id do portador é obrigatório.",
    invalid_type_error: "O id do portador deve ser um número."
  }).int().positive("O id do portador deve ser um número positivo."),

  name: z.string({
    required_error: "O nome é obrigatório.",
    invalid_type_error: "O nome deve ser uma string."
  }).min(1, "O nome não pode estar vazio.").max(255, "O nome deve ter no máximo 255 caracteres."),

  weight: z.number({
    required_error: "O peso é obrigatório.",
    invalid_type_error: "O peso deve ser um número."
  }).min(0, "O peso não pode ser negativo."),

  description: z.string({
    required_error: "A descrição é obrigatória.",
    invalid_type_error: "A descrição deve ser uma string."
  }).min(1, "A descrição não pode estar vazia.").max(1000, "A descrição deve ter no máximo 1000 caracteres.")
});

// 🔹 Esquema completo com ID opcional (para update/delete)
const itemSchema = itemBaseSchema.extend({
  id: z.number({
    invalid_type_error: "O id deve ser um número."
  }).int().positive("O id deve ser um número positivo.").optional()
});

export class Item {
  constructor(data) {
    const parsed = itemSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message);
    }
    Object.assign(this, parsed.data);
  }

  // Criar item
  async salvar() {
    return await prisma.item.create({
      data: {
        owner: this.owner,
        name: this.name,
        weight: this.weight,
        description: this.description
      }
    });
  }

  // Atualizar item
  async atualizar() {
    if (!this.id) throw new Error("O ID é obrigatório para atualizar um item.");
    return await prisma.item.update({
      where: { id: this.id },
      data: {
        owner: this.owner,
        name: this.name,
        weight: this.weight,
        description: this.description
      }
    });
  }

  // Deletar item
  async deletar() {
    if (!this.id) throw new Error("O ID é obrigatório para deletar um item.");
    return await prisma.item.delete({
      where: { id: this.id }
    });
  }

  // 🔹 Novo método: deletar por ID diretamente (usado pelo controller)
  static async deleteById(id) {
    const item = await prisma.item.findUnique({
      where: { id: Number(id) }
    });

    if (!item) return null;

    await prisma.item.delete({
      where: { id: Number(id) }
    });

    return item;
  }

  // Listar todos
  static async listarTodos() {
    return await prisma.item.findMany();
  }

  // Buscar por ID
  static async buscarPorId(id) {
    return await prisma.item.findUnique({ where: { id: Number(id) } });
  }
  
  static async buscarPorOwner(ownerId) {
    return await prisma.item.findMany({
      where: { owner: Number(ownerId) }
    });
  }
}

import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// 🔹 Esquema base sem ID (para criação)
const characterBaseSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório.").max(255),
  age: z.number().int().positive(),
  player: z.string().min(2).max(255),
  class: z.string().min(2).max(50),
  trail: z.string().min(1).max(255),
  afinity: z.string().min(1).max(255),
  origin: z.string().min(1).max(255),
  patent: z.string().min(1).max(255),
  NEX: z.number().int().min(0).max(99),
  FOR: z.number().int(),
  AGI: z.number().int(),
  INT: z.number().int(),
  VIG: z.number().int(),
  PRE: z.number().int(),
});

// 🔹 Esquema completo com ID opcional (para update/delete)
const characterSchema = characterBaseSchema.extend({
  id: z.number().int().positive().optional(),
});

export class Personagem {
  constructor(data) {
    const parsed = characterSchema.safeParse(data);
    if (!parsed.success) throw new Error(parsed.error.issues[0].message);
    Object.assign(this, parsed.data);
  }

  // Criar personagem
  async salvar() {
    return await prisma.character.create({
      data: {
        name: this.name,
        age: this.age,
        player: this.player,
        class: this.class,
        trail: this.trail,
        afinity: this.afinity,
        origin: this.origin,
        patent: this.patent,
        NEX: this.NEX,
        FOR: this.FOR,
        AGI: this.AGI,
        INT: this.INT,
        VIG: this.VIG,
        PRE: this.PRE,
      },
    });
  }

  // Atualizar personagem
  async atualizar() {
    if (!this.id) throw new Error("O ID é obrigatório para atualizar o personagem.");
    return await prisma.character.update({
      where: { id: this.id },
      data: {
        name: this.name,
        age: this.age,
        player: this.player,
        class: this.class,
        trail: this.trail,
        afinity: this.afinity,
        origin: this.origin,
        patent: this.patent,
        NEX: this.NEX,
        FOR: this.FOR,
        AGI: this.AGI,
        INT: this.INT,
        VIG: this.VIG,
        PRE: this.PRE,
      },
    });
  }

  // Deletar personagem
  async deletar() {
    if (!this.id) throw new Error("O ID é obrigatório para deletar o personagem.");
    return await prisma.character.delete({ where: { id: this.id } });
  }

  // Listar todos
  static async listarTodos() {
    return await prisma.character.findMany();
  }

  // Buscar por ID
  static async buscarPorId(id) {
    return await prisma.character.findUnique({ where: { id: Number(id) } });
  }

  static async deleteById(id) {
    const personagem = await prisma.character.findUnique({
      where: { id: Number(id) },
    });
  
    if (!personagem) return null;
  
    await prisma.character.delete({
      where: { id: Number(id) },
    });
  
    return personagem;
  }
}

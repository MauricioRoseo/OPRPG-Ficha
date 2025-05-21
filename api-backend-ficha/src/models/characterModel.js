import { PrismaClient } from "@prisma/client";
import { z } from 'zod'

const prisma = new PrismaClient()

const characterSchema = z.object({
    id: z.number().positive(),  
    name: z.string().max(255),
    age: z.number().int().positive(),
    player: z.string().min(2).max(255),
    class: z.string().min(9).max(12),
    trail: z.string().min(0).max(255),
    afinity: z.string().max(255),
    origin: z.string().min(1).max(255),
    patent: z.string().min(7).max(255),
    NEX: z.number().int(),
    FOR: z.number().int(),
    AGI: z.number().int(),
    INT: z.number().int(),
    VIG: z.number().int(),
    PRE: z.number().int(), 
  })
  
  export const characterValidator = (character, partial = null) => {
      if(partial){
          return characterSchema.partial(partial).safeParse(character)
      }
      return characterSchema.safeParse(character)
  }
  

export async function create(character){
    const result = await prisma.character.create({
        data: character
    })
    return result
}

export async function remove(id){
    const result = await prisma.character.delete({
        where: {
            id: id
        }
    })
    return result
}

export async function getList(){
    const result = await prisma.character.findMany()
    return result
}

export async function update(id, character){
    const result = await prisma.character.update({
        where: {
            id
        },
        data: character
    })
    return result
}
import { PrismaClient } from "@prisma/client";
import { z } from 'zod'

const prisma = new PrismaClient()

const itemSchema =  z.object({
    id: z.number({
      required_error: 'O id é obrigatório.',
      invalid_type_error: 'O id deve ser um número.'
    }).int().positive('O id deve ser um número positivo.'),

    owner: z.number({
        required_error: 'O id do portador é obrigatório.',
        invalid_type_error: 'O id do portador deve ser um número.'
      }).int().positive('O id do portador deve ser um número positivo.'),
  
    name: z.string({
      required_error: 'O nome é obrigatório.',
      invalid_type_error: 'O nome deve ser uma string.'
    }).min(1, 'O nome não pode estar vazio.').max(255, 'O nome deve ter no máximo 255 caracteres.'),
  
    weight: z.number({
      required_error: 'O peso é obrigatório.',
      invalid_type_error: 'O peso deve ser um número.'
    }).min(0, 'O peso não pode ser negativo.'),
  
    description: z.string({
      required_error: 'A descrição é obrigatória.',
      invalid_type_error: 'A descrição deve ser uma string.'
    }).min(1, 'A descrição não pode estar vazia.').max(1000, 'A descrição deve ter no máximo 1000 caracteres.')
  })
  
  export const itemValidator = (item, partial = null) => {
      if(partial){
          return itemSchema.partial(partial).safeParse(item)
      }
      return itemSchema.safeParse(item)
  }
  

export async function create(item){
    const result = await prisma.item.create({
        data: item
    })
    return result
}

export async function remove(id){
    const result = await prisma.item.delete({
        where: {
            id: id
        }
    })
    return result
}

export async function getList(){
    const result = await prisma.item.findMany()
    return result
}

export async function update(id, item){
    const result = await prisma.item.update({
        where: {
            id
        },
        data: item
    })
    return result
}
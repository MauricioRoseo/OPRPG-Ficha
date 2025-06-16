import { PrismaClient } from "@prisma/client";
import { z } from 'zod'

const prisma = new PrismaClient()

const characterSchema = z.object({
    id: z.number({
        required_error: 'O id é obrigatório.',
        invalid_type_error: 'O id deve ser um número.'
      }).positive(),
    
      name: z.string({
        required_error: 'O nome é obrigatório.',
        invalid_type_error: 'O nome deve ser uma string.'
      }).min(1, 'O nome não pode estar vazio.').max(255, 'O nome deve ter no máximo 255 caracteres.'),
    
      age: z.number({
        required_error: 'A idade é obrigatória.',
        invalid_type_error: 'A idade deve ser um número.'
      }).int('A idade deve ser um número inteiro.').positive('A idade deve ser positiva.'),
    
      player: z.string({
        required_error: 'O nome do jogador é obrigatório.',
        invalid_type_error: 'O nome do jogador deve ser uma string.'
      }).min(2, 'O nome do jogador deve ter no mínimo 2 caracteres.').max(255, 'O nome do jogador deve ter no máximo 255 caracteres.'),
    
      class: z.string({
        required_error: 'A classe é obrigatória.',
        invalid_type_error: 'A classe deve ser uma string.'
      }).min(4, 'A classe deve ter no mínimo 4 caracteres.').max(50, 'A classe deve ter no máximo 50 caracteres.'),
    
      trail: z.string({
        required_error: 'A trilha é obrigatória.',
        invalid_type_error: 'A trilha deve ser uma string.'
      }).min(1, 'A trilha não pode estar vazia.').max(255, 'A trilha deve ter no máximo 255 caracteres.'),
    
      afinity: z.string({
        required_error: 'A afinidade é obrigatória.',
        invalid_type_error: 'A afinidade deve ser uma string.'
      }).min(1, 'A afinidade não pode estar vazia.').max(255, 'A afinidade deve ter no máximo 255 caracteres.'),
    
      origin: z.string({
        required_error: 'A origem é obrigatória.',
        invalid_type_error: 'A origem deve ser uma string.'
      }).min(1, 'A origem não pode estar vazia.').max(255, 'A origem deve ter no máximo 255 caracteres.'),
    
      patent: z.string({
        required_error: 'A patente é obrigatória.',
        invalid_type_error: 'A patente deve ser uma string.'
      }).min(1, 'A patente não pode estar vazia.').max(255, 'A patente deve ter no máximo 255 caracteres.'),
    
      NEX: z.number({
        required_error: 'O NEX é obrigatório.',
        invalid_type_error: 'O NEX deve ser um número.'
      }).int('O NEX deve ser um número inteiro.').min(0, 'O NEX deve ser no mínimo 0.').max(99, 'O NEX deve ser no máximo 99.'),
    
      FOR: z.number({
        required_error: 'O atributo FOR é obrigatório.',
        invalid_type_error: 'FOR deve ser um número.'
      }).int('FOR deve ser um número inteiro.'),
    
      AGI: z.number({
        required_error: 'O atributo AGI é obrigatório.',
        invalid_type_error: 'AGI deve ser um número.'
      }).int('AGI deve ser um número inteiro.'),
    
      INT: z.number({
        required_error: 'O atributo INT é obrigatório.',
        invalid_type_error: 'INT deve ser um número.'
      }).int('INT deve ser um número inteiro.'),
    
      VIG: z.number({
        required_error: 'O atributo VIG é obrigatório.',
        invalid_type_error: 'VIG deve ser um número.'
      }).int('VIG deve ser um número inteiro.'),
    
      PRE: z.number({
        required_error: 'O atributo PRE é obrigatório.',
        invalid_type_error: 'PRE deve ser um número.'
      }).int('PRE deve ser um número inteiro.')
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
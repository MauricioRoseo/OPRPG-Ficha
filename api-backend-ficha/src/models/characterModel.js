import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

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
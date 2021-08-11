import { PrismaClient } from '@prisma/client'

export interface Context {
    db: PrismaClient
}

const prisma = new PrismaClient()

export const context: Context = {
    db: prisma,
}
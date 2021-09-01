import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface Context {
    db?: PrismaClient,
    user: any
}
export const context: Context = {
    db: prisma,
    user: null
}

export const Database = prisma
import { PrismaClient } from '@prisma/client'
import { Request , Response } from 'express';

const prisma = new PrismaClient()

export interface Context {
    db?: PrismaClient,
    user: any,
    req: Request
}


export const Database = prisma
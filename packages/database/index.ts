import { PrismaClient } from './client/index.js';

export const prisma = new PrismaClient();
export * from './client/index.js';

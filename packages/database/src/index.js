// @prisma/client is CommonJS; a default import works under both Node ESM and bundlers.
import prismaPkg from '@prisma/client';

const { PrismaClient } = prismaPkg;

// One client per process — Next.js dev reloads modules, so park it on globalThis.
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.__inovexiaPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.__inovexiaPrisma = prisma;

export const { EnquiryType, EnquiryStatus, Prisma } = prismaPkg;

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis as unknown as { _prisma: PrismaClient | undefined };

function makePrisma() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma._prisma ?? makePrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma._prisma = prisma;

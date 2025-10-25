import { PrismaClient } from "@prisma/client/edge";
import { Env } from "../lib/auth";

let prisma: PrismaClient;

export function getPrismaClient(env: Env) {
  if (!prisma) {
    // 使用 Supabase PostgreSQL
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: env.DATABASE_URL,
        },
      },
    });
  }
  return prisma;
}

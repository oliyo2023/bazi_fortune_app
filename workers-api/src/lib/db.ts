import { PrismaClient } from '@prisma/client/edge';
import { PrismaD1 } from '@prisma/adapter-d1';

let prisma: PrismaClient;

export function getPrismaClient(env: any) {
  if (!prisma) {
    // 在生产环境中使用Supabase，在开发环境中使用D1
    if (env.DATABASE_URL) {
      // 使用Supabase PostgreSQL
      prisma = new PrismaClient({
        datasources: {
          db: {
            url: env.DATABASE_URL,
          },
        },
      });
    } else if (env.DB) {
      // 使用D1数据库
      const adapter = new PrismaD1(env.DB);
      prisma = new PrismaClient({ adapter });
    } else {
      throw new Error('Database configuration missing');
    }
  }
  return prisma;
}
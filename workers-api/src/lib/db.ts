import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import { Env } from "../lib/auth";

let prisma: PrismaClient;

export function getPrismaClient(env: Env) {
  if (!prisma) {
    // 使用 D1 数据库
    const adapter = new PrismaD1(env.DB);
    prisma = new PrismaClient({
      adapter,
      // D1适配器不需要datasources配置
    });
  }
  return prisma;
}

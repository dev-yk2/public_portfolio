import { PrismaClient } from '@prisma/client'

/**
 * # PrsimaClientのインスタンスを１度だけ生成
 *
 * new PrismaClient() を複数回書いてると発生する、「There are already 10 instances of Prisma Client actively running.」というエラーがある。
 * PrismaClientのインスタンスは、1つずつDBへのコネクションを持ってるので、newするたびに、DBへのコネクションを貼ってしまい、DBへのコネクション数の制限にひっかかるよう。
 *
 * [参考サイト](https://qiita.com/kurab/items/8b3ea68b8a8b4468b5a3)
 */

// export const prisma = new PrismaClient()

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
if (globalForPrisma.prisma) globalForPrisma.prisma = prisma

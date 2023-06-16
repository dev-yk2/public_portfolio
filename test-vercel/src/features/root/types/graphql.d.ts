import { NextApiRequest, NextApiResponse } from 'next'
import type { PrismaClient } from '@prisma/client'

export type MyContext = {
  req: NextApiRequest
  res: NextApiResponse
  prismaClient: PrismaClient
  getLoggedInUser: () => void
}

import type { NextApiRequest, NextApiResponse } from 'next'
import * as Types from '@/features/myBooks/types'
import { prisma } from '@/lib/prisma'

type Data = Types.User | Types.FetchError

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    const email = req.query.email as string
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return res.status(400).json({
        errorCode: 2,
        errorMessage: 'ユーザーを取得できませんでした。',
      })
    }

    return res.json(user)
  }
}

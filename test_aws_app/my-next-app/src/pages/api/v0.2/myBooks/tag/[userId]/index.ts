import type { NextApiRequest, NextApiResponse } from 'next'
import * as Types from '@/features/myBooks/types'
import { prisma } from '@/lib/prisma'

type Data = Types.Tag[] | Types.Tag | Types.FetchError

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    const userId = Number(req.query.userId as string)
    const tags = await prisma.tag.findMany({
      where: {
        user_id: userId,
      },
    })
    return res.json(tags)
  }

  if (req.method === 'POST') {
    const userId = Number(req.query.userId as string)
    const tagName = req.body.tagName as string
    const tag = await prisma.tag.create({
      data: {
        name: tagName,
        user_id: userId,
      },
    })
    return res.json(tag)
  }

  return res.status(400).json({
    errorCode: 1,
    errorMessage: 'methodが指定されていません。',
  })
}

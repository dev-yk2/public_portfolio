import type { NextApiRequest, NextApiResponse } from 'next'
import * as Types from '@/features/myBooks/types'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Types.Tag | Types.FetchError>,
) {
  const tagId = Number(req.query.tagId as string)
  console.log('tagId', tagId)

  // tagデータ修正
  if (req.method === 'PUT') {
    const tagName = req.body.name as string
    try {
      const tag = await prisma.tag.update({
        where: {
          id: tagId,
        },
        data: {
          name: tagName,
        },
      })
      return res.status(200).json(tag)
    } catch (e) {
      return res.status(400).json({
        errorCode: 2,
        errorMessage: 'タグの登録に失敗しました。',
      })
    }
  }

  // タグ削除
  if (req.method === 'DELETE') {
    try {
      const tag = await prisma.tag.delete({
        where: {
          id: tagId,
        },
      })
      return res.status(200).json(tag)
    } catch (e) {
      return res.status(400).json({
        errorCode: 2,
        errorMessage: 'タグの削除に失敗しました。',
      })
    }
  }
}

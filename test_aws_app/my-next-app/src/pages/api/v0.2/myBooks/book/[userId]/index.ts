import type { NextApiRequest, NextApiResponse } from 'next'
import * as Types from '@/features/myBooks/types'
import { prisma } from '@/lib/prisma'

type Data = Types.MyBookData[] | Types.MyBookData | Types.FetchError

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    const userId = Number(req.query.userId as string)
    const books = await prisma.book.findMany({
      where: {
        user_id: userId,
      },
    })
    const tags = await prisma.tag.findMany({
      where: {
        user_id: userId,
      },
    })
    const bookTagRelationships = await prisma.book_tag_relationship.findMany()

    const taggedBooks = books.map((book) => {
      // このbookに紐づいているtagのidを配列で抽出
      const relatedTagsId = bookTagRelationships.map((bookTagRelationship) => {
        if (bookTagRelationship.book_id === book.id) {
          return bookTagRelationship.tag_id
        }
      })

      // 全てのtagの中から、先ほどのtagId配列をもとに、tagを抽出
      const filteredTags = tags.filter((tag) => {
        return relatedTagsId.includes(tag.id)
      })

      return {
        ...book,
        authors: book.authors.split(','), // 配列に変換
        tags: filteredTags, // 配列に変換
      }
    })
    return res.json(taggedBooks)
  }

  if (req.method === 'POST') {
    const myBookData = req.body.myBookData as Types.PreMyBookData
    const userId = Number(req.query.userId as string)
    try {
      // まず本をdbに登録し本のidを生成する
      const book = await prisma.book.create({
        data: {
          isbn: myBookData.isbn,
          title: myBookData.title,
          authors: myBookData.authors.join(','),
          publisher: myBookData.publisher,
          memo: myBookData.memo,
          user_id: userId,
        },
      })

      // 本とタグの関連を登録する。
      // 返り値（例）results = [ { book_id: 3, tag_id: 1 }, { book_id: 3, tag_id: 4 } ]
      await Promise.all(
        myBookData.tags.map(async (tag: { id: number; name: string }) => {
          const tagRelationship = await prisma.book_tag_relationship.create({
            data: {
              book_id: book.id,
              tag_id: tag.id,
            },
          })
          return tagRelationship
        }),
      )

      return res.status(200).json({
        ...book,
        authors: book.authors.split(','),
        tags: myBookData.tags,
      })
    } catch (e) {
      return res.status(400).json({
        errorCode: 2,
        errorMessage: '登録に失敗しました。',
      })
    }
  }

  return res.status(400).json({
    errorCode: 1,
    errorMessage: 'methodが指定されていません。',
  })
}

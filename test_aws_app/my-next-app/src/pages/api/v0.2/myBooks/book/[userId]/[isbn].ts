import type { NextApiRequest, NextApiResponse } from 'next'
import * as Types from '@/features/myBooks/types'
import { prisma } from '@/lib/prisma'

type Data =
  | Types.MyBookData
  | Types.FetchError
  | {
      title: string // deleteの際はタイトルだけ返す
    }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    const userId = Number(req.query.userId as string)
    const isbn = req.query.isbn as string
    const bookData = await getBookByIsbn(isbn, userId)
    return res.status(200).json(bookData)
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
      await Promise.all(
        myBookData.tags.map(async (tag: { id: number; name: string }) => {
          const bookTagRelationship = await prisma.book_tag_relationship.create(
            {
              data: {
                book_id: book.id,
                tag_id: tag.id,
              },
            },
          )
          return bookTagRelationship
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

  if (req.method === 'PUT') {
    const book = req.body.myBookData as Types.MyBookData

    try {
      const updateBook = await prisma.book.update({
        where: {
          id: book.id,
        },
        data: {
          title: book.title,
          authors: book.authors.join(','),
          publisher: book.publisher,
          memo: book.memo,
        },
      })
      console.log('[updateBook]', updateBook)

      // 指定のbook_idの既存の本タグ関係情報を削除
      const deleteTags = await prisma.book_tag_relationship.deleteMany({
        where: {
          book_id: book.id,
        },
      })
      console.log('[deleteTags]', deleteTags)

      // 再度、本タグ関係情報を登録する
      const updateTags = await Promise.all(
        book.tags.map(async (tag: { id: number; name: string }) => {
          const bookTagRelationship = await prisma.book_tag_relationship.create(
            {
              data: {
                book_id: book.id,
                tag_id: tag.id,
              },
            },
          )
          return bookTagRelationship
        }),
      )
      console.log('[updateTags]', updateTags)

      return res.status(200).json(book)
    } catch (e) {
      return res.status(400).json({
        errorCode: 2,
        errorMessage: '更新に失敗しました。',
      })
    }
  }

  if (req.method === 'DELETE') {
    const book = req.body.myBookData as Types.MyBookData

    try {
      const deleteBook = await prisma.book.delete({
        where: {
          id: book.id,
        },
      })
      console.log('[deleteBook]', deleteBook)

      return res.status(200).json({ title: deleteBook.title })
    } catch (e) {
      return res.status(400).json({
        errorCode: 2,
        errorMessage: '削除に失敗しました。',
      })
    }
  }

  return res.status(400).json({
    errorCode: 1,
    errorMessage: 'methodが指定されていません。',
  })
}

export async function getBookByIsbn(isbn: string, userId: number) {
  try {
    // 1. 本のIDを取得したら、その本に関連するタグ情報を取得
    const book = await prisma.book.findFirstOrThrow({
      where: {
        isbn: isbn,
        user_id: userId,
      },
    })
    // 上記で該当のデータがない場合、catchへ飛ぶ

    // 2. 本のIDを取得したら、その本に関連するタグ情報を取得
    const bookTagRelationship = await prisma.book_tag_relationship.findMany({
      where: {
        book_id: book.id,
      },
    })

    // 3. db操作用の配列を作り、タグを取得
    const tagFilter = bookTagRelationship.map((v) => v.tag_id)
    const tag = await prisma.tag.findMany({
      where: {
        id: {
          in: tagFilter,
        },
      },
    })

    // 4. 本データとタグデータを合体する
    const myBook = {
      ...book,
      authors: book.authors.split(','),
      tags: tag,
    }
    return myBook
  } catch (e) {
    return {
      errorCode: 3,
      errorMessage: 'マイ本棚に登録されていません。',
    }
  }
}

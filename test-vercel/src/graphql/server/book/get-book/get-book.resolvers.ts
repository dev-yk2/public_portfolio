import { Resolvers } from '@/__generated__/graphql'
import { MyContext } from '@/features/root/types/graphql'
import { GraphQLError } from 'graphql'

const resolvers: Resolvers<MyContext> = {
  Query: {
    // eslint-disable-next-line no-unused-vars
    getBook: async (_, { input }, { prismaClient }, info) => {
      // 本を取得
      const existingBook = await prismaClient.book.findFirst({
        where: {
          isbn: input.isbn,
          userId: input.userId,
        },
      })

      if (!existingBook) {
        throw new GraphQLError('Not found')
      }

      // 本のIDを取得したら、その本に関連するタグ情報を取得
      const existingBookTagRelationships =
        await prismaClient.bookTagRelationship.findMany({
          where: {
            bookId: existingBook.id,
          },
        })

      // db操作用の配列を作り、タグを取得
      const tagIds = existingBookTagRelationships.map(
        (existingBookTagRelationship) => existingBookTagRelationship.tagId
      )
      const tags = await prismaClient.tag.findMany({
        where: {
          id: {
            in: tagIds,
          },
        },
      })

      return {
        book: {
          ...existingBook,
          authors: JSON.parse(existingBook.authors),
          tags: [...tags],
        },
      }
    },
  },
}

export default resolvers

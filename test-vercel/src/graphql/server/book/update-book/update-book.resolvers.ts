import { Resolvers } from '@/__generated__/graphql'
import { MyContext } from '@/features/root/types/graphql'
import { GraphQLError } from 'graphql'

const resolvers: Resolvers<MyContext> = {
  Mutation: {
    // eslint-disable-next-line no-unused-vars
    updateBook: async (_, { input }, { prismaClient }, info) => {
      // 本の存在を確認
      const existingBook = await prismaClient.book.findUnique({
        where: {
          id: input.id,
        },
      })

      if (!existingBook) {
        throw new GraphQLError('Not found')
      }

      // この本の本タグ関連性を一旦全て削除
      await prismaClient.bookTagRelationship.deleteMany({
        where: {
          bookId: existingBook.id,
        },
      })

      // 本タグ関連性を新たに再登録
      await Promise.all(
        input.tags.map(async (tag) => {
          return await prismaClient.bookTagRelationship.create({
            data: {
              bookId: existingBook.id,
              tagId: tag?.id!,
            },
          })
        })
      )

      // 本を更新
      const updatedBook = await prismaClient.book.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          authors: JSON.stringify(input.authors),
          publisher: input.publisher,
          memo: input.memo,
        },
      })

      return {
        book: {
          ...updatedBook,
          authors: JSON.parse(updatedBook.authors),
          tags: input.tags,
        },
      }
    },
  },
}

export default resolvers

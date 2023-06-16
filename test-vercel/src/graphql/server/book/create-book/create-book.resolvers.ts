import { Resolvers } from '@/__generated__/graphql'
import { MyContext } from '@/features/root/types/graphql'

const resolvers: Resolvers<MyContext> = {
  Mutation: {
    // eslint-disable-next-line no-unused-vars
    createBook: async (_, { input }, { prismaClient }, info) => {
      // 本を最初に登録してidを取得
      const createBook = await prismaClient.book.create({
        data: {
          isbn: input.isbn,
          title: input.title,
          authors: JSON.stringify(input.authors),
          publisher: input.publisher,
          memo: input.memo,
          userId: input.userId,
        },
      })

      await Promise.all(
        input.tags.map(async (tag) => {
          const createBookTagRelationship = await prismaClient.bookTagRelationship.create({
            data: {
              bookId: createBook.id,
              tagId: tag?.id!,
            },
          })
          return createBookTagRelationship
        })
      )

      return {
        book: {
          ...createBook,
          authors: JSON.parse(createBook.authors),
          tags: input.tags,
        },
      }
    },
  },
}

export default resolvers

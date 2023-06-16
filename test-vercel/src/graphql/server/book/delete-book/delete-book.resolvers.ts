import { Resolvers } from '@/__generated__/graphql'
import { MyContext } from '@/features/root/types/graphql'
import { GraphQLError } from 'graphql'

const resolvers: Resolvers<MyContext> = {
  Mutation: {
    // eslint-disable-next-line no-unused-vars
    deleteBook: async (_, { input }, { prismaClient }, info) => {
      const existingBook = await prismaClient.book.findUnique({
        where: {
          id: input.id,
        },
      })

      if (!existingBook) {
        throw new GraphQLError('Not found')
      }

      const deletedBook = await prismaClient.book.delete({
        where: {
          id: existingBook.id,
        },
      })

      return {
        book: deletedBook,
      }
    },
  },
}

export default resolvers

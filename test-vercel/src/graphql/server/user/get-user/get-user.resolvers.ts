import { Resolvers } from '@/__generated__/graphql'
import { MyContext } from '@/features/root/types/graphql'
import { GraphQLError } from 'graphql'

const resolvers: Resolvers<MyContext> = {
  Query: {
    // eslint-disable-next-line no-unused-vars
    getUser: async (_, { input }, { prismaClient }, info) => {
      const existingUser = await prismaClient.user.findUnique({
        where: {
          firebaseAuthId: input.firebaseAuthId,
        },
      })

      if (!existingUser) {
        throw new GraphQLError('Not Found')
      }

      return {
        user: existingUser,
      }
    },
  },
}

export default resolvers

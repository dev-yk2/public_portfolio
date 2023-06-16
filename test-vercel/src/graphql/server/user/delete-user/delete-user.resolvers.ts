import { Resolvers } from '@/__generated__/graphql'
import { MyContext } from '@/features/root/types/graphql'
import { GraphQLError } from 'graphql'

const resolvers: Resolvers<MyContext> = {
  Mutation: {
    // eslint-disable-next-line no-unused-vars
    deleteUser: async (_, { input }, { prismaClient }, info) => {
      const existingUser = await prismaClient.user.findUnique({
        where: {
          firebaseAuthId: input.firebaseAuthId,
        },
      })

      if (!existingUser) {
        throw new GraphQLError('Not Found')
      }

      const deletedUser = await prismaClient.user.delete({
        where: {
          firebaseAuthId: existingUser.firebaseAuthId,
        },
      })

      return {
        user: deletedUser,
      }
    },
  },
}

export default resolvers

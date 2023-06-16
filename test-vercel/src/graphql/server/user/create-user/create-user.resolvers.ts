import { Resolvers } from '@/__generated__/graphql'
import { MyContext } from '@/features/root/types/graphql'
import { GraphQLError } from 'graphql'

const resolvers: Resolvers<MyContext> = {
  Mutation: {
    // eslint-disable-next-line no-unused-vars
    createUser: async (_, { input }, { prismaClient }, info) => {
      const user = await prismaClient.user.create({
        data: {
          firebaseAuthId: input.firebaseAuthId,
          email: input.email,
        },
      })

      if (!user) {
        throw new GraphQLError('Not Found')
      }

      return {
        user: {
          ...user,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      }
    },
  },
}

export default resolvers

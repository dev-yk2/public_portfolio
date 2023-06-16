import { Resolvers } from '@/__generated__/graphql'
import { MyContext } from '@/features/root/types/graphql'
import { GraphQLError } from 'graphql'

const resolvers: Resolvers<MyContext> = {
  Query: {
    // eslint-disable-next-line no-unused-vars
    getUsers: async (_, args, { prismaClient }, info) => {
      const existingUsers = await prismaClient.user.findMany()

      if (!existingUsers) {
        throw new GraphQLError('Not found')
      }

      return {
        users: existingUsers,
      }
    },
  },
}

export default resolvers

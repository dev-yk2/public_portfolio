import { Resolvers } from '@/__generated__/graphql'
import { MyContext } from '@/features/root/types/graphql'
import { GraphQLError } from 'graphql'

const resolvers: Resolvers<MyContext> = {
  Query: {
    // eslint-disable-next-line no-unused-vars
    getTags: async (_, { input }, { prismaClient }, info) => {
      const existingTags = await prismaClient.tag.findMany({
        where: {
          userId: input.userId,
        },
      })

      if (!existingTags) {
        throw new GraphQLError('Not found')
      }

      return {
        tags: existingTags,
        //
      }
    },
  },
}

export default resolvers

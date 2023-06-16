import { Resolvers } from '@/__generated__/graphql'
import { MyContext } from '@/features/root/types/graphql'
import { GraphQLError } from 'graphql'

const resolvers: Resolvers<MyContext> = {
  Query: {
    // eslint-disable-next-line no-unused-vars
    getTag: async (_, { input }, { prismaClient }, info) => {
      const existingTag = await prismaClient.tag.findUnique({
        where: {
          id: input.id,
        },
      })

      if (!existingTag) {
        throw new GraphQLError('Not found')
      }

      return {
        tag: existingTag,
      }
    },
  },
}

export default resolvers

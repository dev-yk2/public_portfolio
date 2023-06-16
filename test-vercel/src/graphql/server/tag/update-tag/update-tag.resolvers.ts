import { Resolvers } from '@/__generated__/graphql'
import { MyContext } from '@/features/root/types/graphql'
import { GraphQLError } from 'graphql'

const resolvers: Resolvers<MyContext> = {
  Mutation: {
    // eslint-disable-next-line no-unused-vars
    updateTag: async (_, { input }, { prismaClient }, info) => {
      const existingTag = await prismaClient.tag.findUnique({
        where: {
          id: input.id,
        },
      })

      if (!existingTag) {
        throw new GraphQLError('Not found')
      }

      const updatedTag = await prismaClient.tag.update({
        where: {
          id: existingTag.id,
        },
        data: {
          name: input.name,
        },
      })

      return {
        tag: updatedTag,
      }
    },
  },
}

export default resolvers

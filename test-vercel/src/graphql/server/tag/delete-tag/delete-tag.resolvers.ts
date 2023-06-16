import { Resolvers } from '@/__generated__/graphql'
import { MyContext } from '@/features/root/types/graphql'
import { GraphQLError } from 'graphql'

const resolvers: Resolvers<MyContext> = {
  Mutation: {
    // eslint-disable-next-line no-unused-vars
    deleteTag: async (_, { input }, { prismaClient }, info) => {
      const existingTag = await prismaClient.tag.findUnique({
        where: {
          id: input.id,
        },
      })

      if (!existingTag) {
        throw new GraphQLError('Not found')
      }

      const deletedTag = await prismaClient.tag.delete({
        where: {
          id: existingTag.id,
        },
      })

      return {
        tag: deletedTag,
      }
    },
  },
}

export default resolvers

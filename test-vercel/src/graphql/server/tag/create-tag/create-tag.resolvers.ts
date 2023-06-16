import { Resolvers } from '@/__generated__/graphql'
import { MyContext } from '@/features/root/types/graphql'

const resolvers: Resolvers<MyContext> = {
  Mutation: {
    // eslint-disable-next-line no-unused-vars
    createTag: async (_, { input }, { prismaClient }, info) => {
      const createdTag = await prismaClient.tag.create({
        data: {
          name: input.name,
          userId: input.userId,
        },
      })

      return {
        tag: createdTag,
      }
    },
  },
}

export default resolvers

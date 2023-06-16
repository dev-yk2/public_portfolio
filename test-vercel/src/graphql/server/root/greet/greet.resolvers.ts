import { Resolvers } from '@/__generated__/graphql'
import { MyContext } from '@/features/root/types/graphql'

const resolvers: Resolvers<MyContext> = {
  Query: {
    // eslint-disable-next-line no-unused-vars
    greet: async (_, args, context, info) => {
      // console.log(context.res)
      return 'hello'
    },
  },
}

export default resolvers

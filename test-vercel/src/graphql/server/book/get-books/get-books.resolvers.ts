import { Resolvers } from '@/__generated__/graphql'
import { MyContext } from '@/features/root/types/graphql'
import { GraphQLError } from 'graphql'

const resolvers: Resolvers<MyContext> = {
  Query: {
    // eslint-disable-next-line no-unused-vars
    getBooks: async (_, { input }, { prismaClient }, info) => {
      const existingBooks = await prismaClient.book.findMany({
        where: {
          userId: input.userId,
        },
      })

      if (!existingBooks) {
        throw new GraphQLError('Not found')
      }

      // 全ての本からidを取得
      const existingBookIds = existingBooks.map((existingBook) => existingBook.id)

      // 全ての本の本タグ関連性を取得
      const existingBookTagRelationships = await prismaClient.bookTagRelationship.findMany({
        where: {
          bookId: {
            in: existingBookIds,
          },
        },
      })

      // 本タグ関連性からタグのidを取得
      const existingTagIds = existingBookTagRelationships.map(
        (existingBookTagRelationship) => existingBookTagRelationship.tagId
      )

      // 全てのタグを取得
      const existingTags = await prismaClient.tag.findMany({
        where: {
          id: {
            in: existingTagIds,
          },
        },
      })

      const existingBooksWithTags = existingBooks.map((existingBook) => {
        // 本タグ関連性から、この本に関連するタグのidを取得
        const tagIdsInBookTagRelationships = existingBookTagRelationships.map((existingBookTagRelationship) => {
          if (existingBookTagRelationship.bookId === existingBook.id) {
            return existingBookTagRelationship.tagId
          }
        })

        // 全てのタグから、この本に関連するタグを取得
        const tags = existingTags.filter((existingTag) => {
          return tagIdsInBookTagRelationships.find(
            (tagIdInBookTagRelationships) => tagIdInBookTagRelationships === existingTag.id
          )
        })

        return {
          ...existingBook,
          // ついでに著者をjson文字列からオブジェクトに戻す
          authors: JSON.parse(existingBook.authors),
          tags,
        }
      })

      return {
        books: existingBooksWithTags,
      }
    },
  },
}

export default resolvers

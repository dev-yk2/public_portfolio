// import type { NextApiRequest, NextApiResponse } from 'next'
// import type { NextRequest, NextResponse } from 'next/server'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

import { prismaClient } from '@/features/root/lib/prismaClient'
// import { PrismaClient } from '@prisma/client'

import { MyContext } from '@/features/root/types/graphql'
import datetimeTypeDefs from '@/graphql/server/root/scalars/datetime/datetime.typeDefs'
import datetimeResolvers from '@/graphql/server/root/scalars/datetime/datetime.resolvers'

import greetTypeDefs from '@/graphql/server/root/greet/greet.typeDefs'
import greetResolvers from '@/graphql/server/root/greet/greet.resolvers'

import userTypeDefs from '@/graphql/server/user/models/user.typeDefs'
import createUserTypeDefs from '@/graphql/server/user/create-user/create-user.typeDefs'
import createUserResolvers from '@/graphql/server/user/create-user/create-user.resolvers'
import getUserTypeDefs from '@/graphql/server/user/get-user/get-user.typeDefs'
import getUserResolvers from '@/graphql/server/user/get-user/get-user.resolvers'
import getUsersTypeDefs from '@/graphql/server/user/get-users/get-users.typeDefs'
import getUsersResolvers from '@/graphql/server/user/get-users/get-users.resolvers'
import deleteUserTypeDefs from '@/graphql/server/user/delete-user/delete-user.typeDefs'
import deleteUserResolvers from '@/graphql/server/user/delete-user/delete-user.resolvers'

import tagTypeDefs from '@/graphql/server/tag/models/tag.typeDefs'
import createTagTypeDefs from '@/graphql/server/tag/create-tag/create-tag.typeDefs'
import createTagResolvers from '@/graphql/server/tag/create-tag/create-tag.resolvers'
import getTagsTypeDefs from '@/graphql/server/tag/get-tags/get-tags.typeDefs'
import getTagsResolvers from '@/graphql/server/tag/get-tags/get-tags.resolvers'
import getTagTypeDefs from '@/graphql/server/tag/get-tag/get-tag.typeDefs'
import getTagResolvers from '@/graphql/server/tag/get-tag/get-tag.resolvers'
import updateTagTypeDefs from '@/graphql/server/tag/update-tag/update-tag.typeDefs'
import updateTagResolvers from '@/graphql/server/tag/update-tag/update-tag.resolvers'
import deleteTagTypeDefs from '@/graphql/server/tag/delete-tag/delete-tag.typeDefs'
import deleteTagResolvers from '@/graphql/server/tag/delete-tag/delete-tag.resolvers'

import bookTypeDefs from '@/graphql/server/book/models/book.typeDefs'
import createBookTypeDefs from '@/graphql/server/book/create-book/create-book.typeDefs'
import createBookResolvers from '@/graphql/server/book/create-book/create-book.resolvers'
import getBooksTypeDefs from '@/graphql/server/book/get-books/get-books.typeDefs'
import getBooksResolvers from '@/graphql/server/book/get-books/get-books.resolvers'
import getBookTypeDefs from '@/graphql/server/book/get-book/get-book.typeDefs'
import getBookResolvers from '@/graphql/server/book/get-book/get-book.resolvers'
import updateBookTypeDefs from '@/graphql/server/book/update-book/update-book.typeDefs'
import updateBookResolvers from '@/graphql/server/book/update-book/update-book.resolvers'
import deleteBookTypeDefs from '@/graphql/server/book/delete-book/delete-book.typeDefs'
import deleteBookResolvers from '@/graphql/server/book/delete-book/delete-book.resolvers'

const server = new ApolloServer<MyContext>({
  typeDefs: mergeTypeDefs([
    datetimeTypeDefs,
    greetTypeDefs,

    userTypeDefs,
    createUserTypeDefs,
    getUserTypeDefs,
    getUsersTypeDefs,
    deleteUserTypeDefs,

    tagTypeDefs,
    createTagTypeDefs,
    getTagsTypeDefs,
    getTagTypeDefs,
    updateTagTypeDefs,
    deleteTagTypeDefs,

    bookTypeDefs,
    createBookTypeDefs,
    getBooksTypeDefs,
    getBookTypeDefs,
    updateBookTypeDefs,
    deleteBookTypeDefs,
  ]),
  resolvers: mergeResolvers([
    datetimeResolvers,
    greetResolvers,

    createUserResolvers,
    getUserResolvers,
    getUsersResolvers,
    deleteUserResolvers,

    createTagResolvers,
    getTagsResolvers,
    getTagResolvers,
    updateTagResolvers,
    deleteTagResolvers,

    createBookResolvers,
    getBookResolvers,
    getBooksResolvers,
    updateBookResolvers,
    deleteBookResolvers,
  ]),
})

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({
    req,
    res,
    prismaClient,
    getLoggedInUser: async () => {}, // middleware
  }),
})

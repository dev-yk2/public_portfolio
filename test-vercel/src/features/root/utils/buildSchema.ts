import fs from 'fs'
import path from 'path'
import { glob } from 'glob'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
// import { fileURLToPath } from 'url'

export const buildSchema = async () => {
  // const __dirname = paht.dirname(fileURLToPath(import.meta.url))
  const __dirname = path.dirname(new URL(import.meta.url).pathname)
  const pathToModules = path.join(__dirname, '..', 'modules')

  const pathToTypeDefs = path.join(pathToModules, '**', '*.graphql')
  const typeDefs = glob
    .sync(pathToTypeDefs)
    .map((typeDefsFile) => fs.readFileSync(typeDefsFile, { encoding: 'utf8' }))

  const pathToResolvers = path.join(pathToModules, '**', '*.resolvers.?s')
  const resolversPromises = glob
    .sync(pathToResolvers)
    .map((resolversFile) => import(resolversFile))
  const resolvers = (await Promise.all(resolversPromises)).map(
    (fileItem) => fileItem.resolvers
  )

  return makeExecutableSchema({
    typeDefs: mergeTypeDefs([...typeDefs]),
    resolvers: mergeResolvers([...resolvers]),
  })
}

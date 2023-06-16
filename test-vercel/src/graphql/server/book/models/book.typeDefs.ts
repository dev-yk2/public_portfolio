const typeDefs = `#graphql
  type Book {
    id: String!
    isbn: String!
    title: String!
    authors: [String!]!
    publisher: String!
    tags: [Tag]!
    memo: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    userId: String!
  }
`

export default typeDefs

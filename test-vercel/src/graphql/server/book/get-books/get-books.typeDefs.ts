const typeDefs = `#graphql

  input GetBooksInput {
    userId: String!
  }

  type GetBooksResponse {
    books: [Book]!
  }

  type Query {
    getBooks(input: GetBooksInput!): GetBooksResponse!
  }
`

export default typeDefs

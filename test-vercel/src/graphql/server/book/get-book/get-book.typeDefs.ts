const typeDefs = `#graphql

  input GetBookInput {
    isbn: String!
    userId: String!
  }

  type GetBookResponse {
    book: Book!
  }

  type Query {
    getBook(input: GetBookInput!): GetBookResponse!
  }
`

export default typeDefs

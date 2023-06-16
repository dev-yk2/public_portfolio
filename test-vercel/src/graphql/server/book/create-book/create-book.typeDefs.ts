const typeDefs = `#graphql

  input TagInput {
    id: String!
    name: String!
    userId: String!
  }

  input CreateBookInput {
    isbn: String!
    title: String!
    authors: [String!]!
    publisher: String!
    tags: [TagInput]!
    memo: String!
    userId: String!
  }

  type CreateBookResponse {
    book: Book!
  }

  type Mutation {
    createBook(input: CreateBookInput!): CreateBookResponse!
  }
`

export default typeDefs

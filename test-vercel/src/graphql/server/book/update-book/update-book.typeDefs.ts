const typeDefs = `#graphql
  input TagInput {
    id: String!
    name: String!
    userId: String!
  }

  input UpdateBookInput {
    id: String!
    isbn: String!
    title: String!
    authors: [String!]!
    publisher: String!
    tags: [TagInput]!
    memo: String!
    userId: String!
  }

  type UpdateBookResponse {
    book: Book!
  }

  type Mutation {
    updateBook(input: UpdateBookInput!): UpdateBookResponse!
  }
`

export default typeDefs

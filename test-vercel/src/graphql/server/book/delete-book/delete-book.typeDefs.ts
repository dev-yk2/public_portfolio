const typeDefs = `#graphql
  input DeleteBookInput {
    id: String!
  }

  type DeleteBook {
    id: String!
    isbn: String!
    title: String!
    authors: String!
    publisher: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type DeleteBookResponse {
    book: DeleteBook!
  }

  type Mutation {
    deleteBook(input: DeleteBookInput!): DeleteBookResponse!
  }
`

export default typeDefs

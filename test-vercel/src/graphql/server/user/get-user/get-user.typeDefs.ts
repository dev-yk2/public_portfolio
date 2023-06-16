const typeDefs = `#graphql

  input GetUserInput {
    firebaseAuthId: String!
  }

  type GetUserResponse {
    user: User!
  }

  type Query {
    getUser(input: GetUserInput!): GetUserResponse!
  }
`

export default typeDefs

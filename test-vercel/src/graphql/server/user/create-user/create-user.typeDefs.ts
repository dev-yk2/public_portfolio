const typeDefs = `#graphql

  input CreateUserInput {
    firebaseAuthId: String!
    email: String!
  }

  type CreateUserResponse {
    user: User!
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserResponse!
  }
`

export default typeDefs

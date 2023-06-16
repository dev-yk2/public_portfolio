const typeDefs = `#graphql

  input DeleteUserInput {
    firebaseAuthId: String!
  }

  type DeleteUserResponse {
    user: User!
  }

  type Mutation {
    deleteUser(input: DeleteUserInput!): DeleteUserResponse!
  }
`

export default typeDefs

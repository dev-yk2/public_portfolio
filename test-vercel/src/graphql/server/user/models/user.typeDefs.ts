const typeDefs = `#graphql
  type User {
    firebaseAuthId: String!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`

export default typeDefs

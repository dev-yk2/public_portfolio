const typeDefs = `#graphql

  type GetUsersResponse {
    users: [User]!
  }

  type Query {
    getUsers: GetUsersResponse!
  }
`

export default typeDefs

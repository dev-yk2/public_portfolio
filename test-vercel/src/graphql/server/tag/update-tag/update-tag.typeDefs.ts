const typeDefs = `#graphql
  input UpdateTagInput {
    id: String!
    name: String!
  }

  type UpdateTagResponse {
    tag: Tag!
  }

  type Mutation {
    updateTag(input: UpdateTagInput!): UpdateTagResponse!
  }
`

export default typeDefs

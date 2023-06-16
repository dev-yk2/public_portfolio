const typeDefs = `#graphql
  input CreateTagInput {
    name: String!
    userId: String!
  }

  type CreateTagResponse {
    tag: Tag!
  }

  type Mutation {
    createTag(input: CreateTagInput!): CreateTagResponse!
  }
`

export default typeDefs

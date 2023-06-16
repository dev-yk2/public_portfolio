const typeDefs = `#graphql
  input GetTagInput {
    id: String!
  }

  type GetTagResponse {
    tag: Tag!
  }

  type Query {
    getTag(input: GetTagInput!): GetTagResponse!
  }
`

export default typeDefs

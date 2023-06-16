const typeDefs = `#graphql
  input GetTagsInput {
    userId: String!
  }

  type GetTagsResponse {
    tags: [Tag]!
  }

  type Query {
    getTags(input: GetTagsInput!): GetTagsResponse!
  }
`

export default typeDefs

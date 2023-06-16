const typeDefs = `#graphql
  input DeleteTagInput {
    id: String!
  }

  type DeleteTagResponse {
    tag: Tag!
  }

  type Mutation {
    deleteTag(input: DeleteTagInput!): DeleteTagResponse!
  }
`

export default typeDefs

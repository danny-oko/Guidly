import { gql } from 'graphql-tag';

export const essayTypeDefs = gql`
  type Essay {
    id: Int!
    profileId: Int!
    label: String!
    content: String
  }

  input EssayInput {
    profileId: Int
    label: String!
    content: String
  }

  input EssayUpdateInput {
    profileId: Int
    label: String
    content: String
  }

  type Query {
    getEssays: [Essay!]!
    getEssayById(id: Int!): Essay
  }

  type Mutation {
    createEssay(input: EssayInput!): Essay!
    updateEssay(id: Int!, input: EssayUpdateInput!): Essay
    deleteEssay(id: Int!): Essay
  }
`;

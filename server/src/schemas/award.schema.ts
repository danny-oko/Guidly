import { gql } from 'graphql-tag';

export const awardTypeDefs = gql`
  type Award {
    id: Int!
    profileId: Int!
    name: String!
    description: String
    reward: String
  }

  input AwardInput {
    profileId: Int
    name: String!
    description: String
    reward: String
  }

  input AwardUpdateInput {
    profileId: Int
    name: String
    description: String
    reward: String
  }

  type Query {
    getAwards: [Award!]!
    getAwardById(id: Int!): Award
  }

  type Mutation {
    createAward(input: AwardInput!): Award!
    updateAward(id: Int!, input: AwardUpdateInput!): Award
    deleteAward(id: Int!): Award
  }
`;

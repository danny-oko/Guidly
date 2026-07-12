import { gql } from 'graphql-tag';

export const majorTypeDefs = gql`

  type Major {
    id: Int!
    name: String!
    description: String
    universities: [University!]!
    majorRequirements: [Eysh!]!
  }

  input MajorInput {
    logo: String
    name: String!
    description: String
  }

  input MajorUpdateInput {
    logo: String
    name: String
    description: String
  }

  type Query {
    getMajors: [Major!]!
    getMajorById(id: Int!): Major
  }

  type Mutation {
    createMajor(input: MajorInput!): Major!
    updateMajor(id: Int!, input: MajorUpdateInput!): Major
    deleteMajor(id: Int!): Major
  }
`;

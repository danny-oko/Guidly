import { gql } from 'graphql-tag';

export const eyshTypeDefs = gql`
  type Eysh {
    id: Int!
    name: String!
    score: Float
    majors: [Major!]!
  }

  input eyshInput {
    logo: String
    name: String!
    score: Float
  }

  input eyshUpdateInput {
    logo: String
    name: String
    score: Float
  }

  type Query {
    geteyshs: [Eysh!]!
    geteyshById(id: Int!): Eysh
  }

  type Mutation {
    createeysh(input: eyshInput!): Eysh!
    updateeysh(id: Int!, input: eyshUpdateInput!): Eysh
    deleteeysh(id: Int!): Eysh
  }
`;

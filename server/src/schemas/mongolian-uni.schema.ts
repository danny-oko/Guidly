import { gql } from 'graphql-tag';

export const mongolianUniTypeDefs = gql`
 enum UniversityControl {
    PUBLIC
    PRIVATE
    OTHER
  }

  type mongolianUniversity {
    id: Int!
    logo: String
    name: String!
    description: String
    major: [Major!]!
    control: UniversityControl!
  }

  input mongolianUniversityInput {
    logo: String
    name: String!
    description: String
    control: UniversityControl!
  }

  input mongolianUniversityUpdateInput {
    logo: String
    name: String
    description: String
    control: UniversityControl
  }

  type Query {
    getMongolianUniversities: [mongolianUniversity!]!
    getMongolianUniversityById(id: Int!): mongolianUniversity
  }

  type Mutation {
    createMongolianUniversity(input: mongolianUniversityInput!): mongolianUniversity!
    updateMongolianUniversity(id: Int!, input: mongolianUniversityUpdateInput!): mongolianUniversity
    deleteMongolianUniversity(id: Int!): mongolianUniversity
  }
`;

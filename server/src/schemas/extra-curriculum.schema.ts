import { gql } from 'graphql-tag';

export const extraCurriculumTypeDefs = gql`
  type ExtraCurriculum {
    id: Int!
    profileId: Int!
    title: String!
    description: String
    participation: String
  }

  input ExtraCurriculumInput {
    profileId: Int
    title: String!
    description: String
    participation: String
  }

  input ExtraCurriculumUpdateInput {
    profileId: Int
    title: String
    description: String
    participation: String
  }

  type Query {
    getExtraCurriculums: [ExtraCurriculum!]!
    getExtraCurriculumById(id: Int!): ExtraCurriculum
  }

  type Mutation {
    createExtraCurriculum(input: ExtraCurriculumInput!): ExtraCurriculum!
    updateExtraCurriculum(
      id: Int!
      input: ExtraCurriculumUpdateInput!
    ): ExtraCurriculum
    deleteExtraCurriculum(id: Int!): ExtraCurriculum
  }
`;

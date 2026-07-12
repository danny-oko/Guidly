import { gql } from 'graphql-tag';

export const mongolianUniMajorTypeDefs = gql`
  type mongolianUniversityMajor {
    mongolianUniversityId: Int!
    majorId: Int!
  }

  input mongolianUniversityMajorInput {
    mongolianUniversityId: Int!
    majorId: Int!
  }

  type Mutation {
    createMongolianUniversityMajor(input: mongolianUniversityMajorInput!): mongolianUniversityMajor!
    deleteMongolianUniversityMajor(
      mongolianUniversityId: Int!
      majorId: Int!
    ): mongolianUniversityMajor
  }
`;

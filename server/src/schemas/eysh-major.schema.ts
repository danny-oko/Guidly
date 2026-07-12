import { gql } from 'graphql-tag';

export const eyshMajorTypeDefs = gql`
  type EyshMajor {
    eyshId: Int!
    majorId: Int!
  }

  input EyshMajorInput {
    eyshId: Int!
    majorId: Int!
  }

  type Mutation {
    createEyshMajor(input: EyshMajorInput!): EyshMajor!
    deleteEyshMajor(
      eyshId: Int!
      majorId: Int!
    ): EyshMajor
  }
`;

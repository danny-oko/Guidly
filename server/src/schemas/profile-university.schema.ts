import { gql } from 'graphql-tag';

export const profileUniversityTypeDefs = gql`
  type ProfileUniversity {
    profileId: Int!
    universityId: Int!
  }

  input ProfileUniversityInput {
    profileId: Int
    universityId: Int!
  }

  type Mutation {
    createProfileUniversity(input: ProfileUniversityInput!): ProfileUniversity!
    deleteProfileUniversity(
      profileId: Int
      universityId: Int!
    ): ProfileUniversity
  }
`;

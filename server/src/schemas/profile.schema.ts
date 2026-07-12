import { gql } from 'graphql-tag';

export const profileTypeDefs = gql`
  type Profile {
    id: Int!
    firstName: String!
    lastName: String!
    dateOfBirth: String
    citizenship: String
    awards: [Award!]!
    essays: [Essay!]!
    chosenUniversities: [University!]!
    scores: [Exam!]!
    documents: [Document!]!
    extraCurriculum: [ExtraCurriculum!]!
  }

  input ProfileInput {
    firstName: String!
    lastName: String!
    dateOfBirth: String
    citizenship: String
  }

  input ProfileUpdateInput {
    firstName: String
    lastName: String
    dateOfBirth: String
    citizenship: String
  }

  type Query {
    getProfiles: [Profile!]!
    getProfileById(id: Int!): Profile
    getMyProfile: Profile
  }

  type Mutation {
    createProfile(input: ProfileInput!): Profile!
    updateProfile(id: Int!, input: ProfileUpdateInput!): Profile
    deleteProfile(id: Int!): Profile
  }
`;

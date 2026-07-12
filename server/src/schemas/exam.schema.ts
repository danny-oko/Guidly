import { gql } from 'graphql-tag';

export const examTypeDefs = gql`
  type Exam {
    id: Int!
    profileId: Int!
    name: String!
    description: String
    date: String
    location: String
    time: String
    url: String
    score: String
  }

  input ExamInput {
    profileId: Int
    name: String!
    description: String
    date: String
    location: String
    time: String
    url: String
    score: String
  }

  input ExamUpdateInput {
    profileId: Int
    name: String
    description: String
    date: String
    location: String
    time: String
    url: String
    score: String
  }

  type Query {
    getExams: [Exam!]!
    getExamById(id: Int!): Exam
  }

  type Mutation {
    createExam(input: ExamInput!): Exam!
    updateExam(id: Int!, input: ExamUpdateInput!): Exam
    deleteExam(id: Int!): Exam
  }
`;

import { gql } from 'graphql-tag';

export const documentTypeDefs = gql`
  type Document {
    id: Int!
    profileId: Int
    title: String!
    description: String
    file: String
  }

  input DocumentInput {
    profileId: Int
    title: String!
    description: String
    file: String
  }

  input DocumentUpdateInput {
    profileId: Int
    title: String
    description: String
    file: String
  }

  type Query {
    getDocuments: [Document!]!
    getDocumentById(id: Int!): Document
  }

  type Mutation {
    createDocument(input: DocumentInput!): Document!
    updateDocument(id: Int!, input: DocumentUpdateInput!): Document
    deleteDocument(id: Int!): Document
  }
`;

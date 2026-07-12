import { gql } from 'graphql-tag';

export const universityTypdefs = gql`
  enum UniversityControl {
    PUBLIC
    PRIVATE
    OTHER
  }

  enum UniversitySex {
    COED
    MEN
    WOMEN
    OTHER
  }

  enum InternationalAidAvailability {
    YES
    NO
    LIMITED
    UNKNOWN
  }

  type University {
    id: Int!
    name: String!
    description: String
    logo: String
    city: String
    state: String
    website: String
    qsrank: Int
    bestField: String
    control: UniversityControl
    size: Int
    sex: UniversitySex
    primaryFocus: String
    religion: Boolean
    totalCost: Float
    coa: String
    aidInternational: InternationalAidAvailability
    numberAidInt: Int
    percentAidInt: Float
    averageAmountAid: Float
    costAfterAid: Float
    maxAid: Float
    maxAidName: String
    howToApply: String
    note: String
    acceptanceRate: Float
    rdAcceptance: Float
    rdDeadline: String
    edAcceptance: Float
    edDeadline: String
    eaAcceptance: Float
    eaDeadline: String
    percentSat: Float
    averageSatScore: Float
    percentAct: Float
    fourYearGraduationRate: Float
    fiveYearGraduationRate: Float
    sixYearGraduationRate: Float
    eaEdFinancialAidDeadline: String
    ed2ApplicationDeadline: String
    ed2FinancialAidDeadline: String
    rdDocumentDeadline: String
    rdOnlyFinancialAidDeadline: String
  }

  input UniversityInput {
    name: String!
    description: String
    logo: String
    city: String
    state: String
    website: String
    qsrank: Int
    bestField: String
    control: UniversityControl
    size: Int
    sex: UniversitySex
    primaryFocus: String
    religion: Boolean
    totalCost: Float
    coa: String
    aidInternational: InternationalAidAvailability
    numberAidInt: Int
    percentAidInt: Float
    averageAmountAid: Float
    costAfterAid: Float
    maxAid: Float
    maxAidName: String
    howToApply: String
    note: String
    acceptanceRate: Float
    rdAcceptance: Float
    rdDeadline: String
    edAcceptance: Float
    edDeadline: String
    eaAcceptance: Float
    eaDeadline: String
    percentSat: Float
    averageSatScore: Float
    percentAct: Float
    fourYearGraduationRate: Float
    fiveYearGraduationRate: Float
    sixYearGraduationRate: Float
    eaEdFinancialAidDeadline: String
    ed2ApplicationDeadline: String
    ed2FinancialAidDeadline: String
    rdDocumentDeadline: String
    rdOnlyFinancialAidDeadline: String
  }

  input UniversityUpdateInput {
    name: String
    description: String
    logo: String
    city: String
    state: String
    website: String
    qsrank: Int
    bestField: String
    control: UniversityControl
    size: Int
    sex: UniversitySex
    primaryFocus: String
    religion: Boolean
    totalCost: Float
    coa: String
    aidInternational: InternationalAidAvailability
    numberAidInt: Int
    percentAidInt: Float
    averageAmountAid: Float
    costAfterAid: Float
    maxAid: Float
    maxAidName: String
    howToApply: String
    note: String
    acceptanceRate: Float
    rdAcceptance: Float
    rdDeadline: String
    edAcceptance: Float
    edDeadline: String
    eaAcceptance: Float
    eaDeadline: String
    percentSat: Float
    averageSatScore: Float
    percentAct: Float
    fourYearGraduationRate: Float
    fiveYearGraduationRate: Float
    sixYearGraduationRate: Float
    eaEdFinancialAidDeadline: String
    ed2ApplicationDeadline: String
    ed2FinancialAidDeadline: String
    rdDocumentDeadline: String
    rdOnlyFinancialAidDeadline: String
  }

  type Query {
    getUniversities: [University!]!
    getUniversityById(id: Int!): University
  }

  type Mutation {
    createUniversity(input: UniversityInput!): University!
    updateUniversity(id: Int!, input: UniversityUpdateInput!): University
    deleteUniversity(id: Int!): University
  }
`;

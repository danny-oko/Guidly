import { GraphQLResolveInfo } from 'graphql';
import { GraphQLContext } from '../resolvers/context';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Award = {
  __typename?: 'Award';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  profileId: Scalars['Int']['output'];
  reward?: Maybe<Scalars['String']['output']>;
};

export type AwardInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  profileId?: InputMaybe<Scalars['Int']['input']>;
  reward?: InputMaybe<Scalars['String']['input']>;
};

export type AwardUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  profileId?: InputMaybe<Scalars['Int']['input']>;
  reward?: InputMaybe<Scalars['String']['input']>;
};

export type Document = {
  __typename?: 'Document';
  description?: Maybe<Scalars['String']['output']>;
  file?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  profileId?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
};

export type DocumentInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  file?: InputMaybe<Scalars['String']['input']>;
  profileId?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type DocumentUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  file?: InputMaybe<Scalars['String']['input']>;
  profileId?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Essay = {
  __typename?: 'Essay';
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
  profileId: Scalars['Int']['output'];
};

export type EssayInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  label: Scalars['String']['input'];
  profileId?: InputMaybe<Scalars['Int']['input']>;
};

export type EssayUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  profileId?: InputMaybe<Scalars['Int']['input']>;
};

export type Exam = {
  __typename?: 'Exam';
  date?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  profileId: Scalars['Int']['output'];
  score?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type ExamInput = {
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  profileId?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type ExamUpdateInput = {
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  profileId?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type ExtraCurriculum = {
  __typename?: 'ExtraCurriculum';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  participation?: Maybe<Scalars['String']['output']>;
  profileId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type ExtraCurriculumInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  participation?: InputMaybe<Scalars['String']['input']>;
  profileId?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type ExtraCurriculumUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  participation?: InputMaybe<Scalars['String']['input']>;
  profileId?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Eysh = {
  __typename?: 'Eysh';
  id: Scalars['Int']['output'];
  majors: Array<Major>;
  name: Scalars['String']['output'];
  score?: Maybe<Scalars['Float']['output']>;
};

export type EyshMajor = {
  __typename?: 'EyshMajor';
  eyshId: Scalars['Int']['output'];
  majorId: Scalars['Int']['output'];
};

export type EyshMajorInput = {
  eyshId: Scalars['Int']['input'];
  majorId: Scalars['Int']['input'];
};

export enum InternationalAidAvailability {
  Limited = 'LIMITED',
  No = 'NO',
  Unknown = 'UNKNOWN',
  Yes = 'YES',
}

export type Major = {
  __typename?: 'Major';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  majorRequirements: Array<Eysh>;
  name: Scalars['String']['output'];
  universities: Array<University>;
};

export type MajorInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type MajorUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAward: Award;
  createDocument: Document;
  createEssay: Essay;
  createExam: Exam;
  createExtraCurriculum: ExtraCurriculum;
  createEyshMajor: EyshMajor;
  createMajor: Major;
  createMongolianUniversity: MongolianUniversity;
  createMongolianUniversityMajor: MongolianUniversityMajor;
  createProfile: Profile;
  createProfileUniversity: ProfileUniversity;
  createUniversity: University;
  createeysh: Eysh;
  deleteAward?: Maybe<Award>;
  deleteDocument?: Maybe<Document>;
  deleteEssay?: Maybe<Essay>;
  deleteExam?: Maybe<Exam>;
  deleteExtraCurriculum?: Maybe<ExtraCurriculum>;
  deleteEyshMajor?: Maybe<EyshMajor>;
  deleteMajor?: Maybe<Major>;
  deleteMongolianUniversity?: Maybe<MongolianUniversity>;
  deleteMongolianUniversityMajor?: Maybe<MongolianUniversityMajor>;
  deleteProfile?: Maybe<Profile>;
  deleteProfileUniversity?: Maybe<ProfileUniversity>;
  deleteUniversity?: Maybe<University>;
  deleteeysh?: Maybe<Eysh>;
  updateAward?: Maybe<Award>;
  updateDocument?: Maybe<Document>;
  updateEssay?: Maybe<Essay>;
  updateExam?: Maybe<Exam>;
  updateExtraCurriculum?: Maybe<ExtraCurriculum>;
  updateMajor?: Maybe<Major>;
  updateMongolianUniversity?: Maybe<MongolianUniversity>;
  updateProfile?: Maybe<Profile>;
  updateUniversity?: Maybe<University>;
  updateeysh?: Maybe<Eysh>;
};

export type MutationCreateAwardArgs = {
  input: AwardInput;
};

export type MutationCreateDocumentArgs = {
  input: DocumentInput;
};

export type MutationCreateEssayArgs = {
  input: EssayInput;
};

export type MutationCreateExamArgs = {
  input: ExamInput;
};

export type MutationCreateExtraCurriculumArgs = {
  input: ExtraCurriculumInput;
};

export type MutationCreateEyshMajorArgs = {
  input: EyshMajorInput;
};

export type MutationCreateMajorArgs = {
  input: MajorInput;
};

export type MutationCreateMongolianUniversityArgs = {
  input: MongolianUniversityInput;
};

export type MutationCreateMongolianUniversityMajorArgs = {
  input: MongolianUniversityMajorInput;
};

export type MutationCreateProfileArgs = {
  input: ProfileInput;
};

export type MutationCreateProfileUniversityArgs = {
  input: ProfileUniversityInput;
};

export type MutationCreateUniversityArgs = {
  input: UniversityInput;
};

export type MutationCreateeyshArgs = {
  input: EyshInput;
};

export type MutationDeleteAwardArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteDocumentArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteEssayArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteExamArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteExtraCurriculumArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteEyshMajorArgs = {
  eyshId: Scalars['Int']['input'];
  majorId: Scalars['Int']['input'];
};

export type MutationDeleteMajorArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteMongolianUniversityArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteMongolianUniversityMajorArgs = {
  majorId: Scalars['Int']['input'];
  mongolianUniversityId: Scalars['Int']['input'];
};

export type MutationDeleteProfileArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteProfileUniversityArgs = {
  profileId?: InputMaybe<Scalars['Int']['input']>;
  universityId: Scalars['Int']['input'];
};

export type MutationDeleteUniversityArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteeyshArgs = {
  id: Scalars['Int']['input'];
};

export type MutationUpdateAwardArgs = {
  id: Scalars['Int']['input'];
  input: AwardUpdateInput;
};

export type MutationUpdateDocumentArgs = {
  id: Scalars['Int']['input'];
  input: DocumentUpdateInput;
};

export type MutationUpdateEssayArgs = {
  id: Scalars['Int']['input'];
  input: EssayUpdateInput;
};

export type MutationUpdateExamArgs = {
  id: Scalars['Int']['input'];
  input: ExamUpdateInput;
};

export type MutationUpdateExtraCurriculumArgs = {
  id: Scalars['Int']['input'];
  input: ExtraCurriculumUpdateInput;
};

export type MutationUpdateMajorArgs = {
  id: Scalars['Int']['input'];
  input: MajorUpdateInput;
};

export type MutationUpdateMongolianUniversityArgs = {
  id: Scalars['Int']['input'];
  input: MongolianUniversityUpdateInput;
};

export type MutationUpdateProfileArgs = {
  id: Scalars['Int']['input'];
  input: ProfileUpdateInput;
};

export type MutationUpdateUniversityArgs = {
  id: Scalars['Int']['input'];
  input: UniversityUpdateInput;
};

export type MutationUpdateeyshArgs = {
  id: Scalars['Int']['input'];
  input: EyshUpdateInput;
};

export type Profile = {
  __typename?: 'Profile';
  awards: Array<Award>;
  chosenUniversities: Array<University>;
  citizenship?: Maybe<Scalars['String']['output']>;
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  documents: Array<Document>;
  essays: Array<Essay>;
  extraCurriculum: Array<ExtraCurriculum>;
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  scores: Array<Exam>;
};

export type ProfileInput = {
  citizenship?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type ProfileUniversity = {
  __typename?: 'ProfileUniversity';
  profileId: Scalars['Int']['output'];
  universityId: Scalars['Int']['output'];
};

export type ProfileUniversityInput = {
  profileId?: InputMaybe<Scalars['Int']['input']>;
  universityId: Scalars['Int']['input'];
};

export type ProfileUpdateInput = {
  citizenship?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getAwardById?: Maybe<Award>;
  getAwards: Array<Award>;
  getDocumentById?: Maybe<Document>;
  getDocuments: Array<Document>;
  getEssayById?: Maybe<Essay>;
  getEssays: Array<Essay>;
  getExamById?: Maybe<Exam>;
  getExams: Array<Exam>;
  getExtraCurriculumById?: Maybe<ExtraCurriculum>;
  getExtraCurriculums: Array<ExtraCurriculum>;
  getMajorById?: Maybe<Major>;
  getMajors: Array<Major>;
  getMongolianUniversities: Array<MongolianUniversity>;
  getMongolianUniversityById?: Maybe<MongolianUniversity>;
  getMyProfile?: Maybe<Profile>;
  getProfileById?: Maybe<Profile>;
  getProfiles: Array<Profile>;
  getUniversities: Array<University>;
  getUniversityById?: Maybe<University>;
  geteyshById?: Maybe<Eysh>;
  geteyshs: Array<Eysh>;
};

export type QueryGetAwardByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetDocumentByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetEssayByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetExamByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetExtraCurriculumByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetMajorByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetMongolianUniversityByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetProfileByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetUniversityByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGeteyshByIdArgs = {
  id: Scalars['Int']['input'];
};

export type University = {
  __typename?: 'University';
  acceptanceRate?: Maybe<Scalars['Float']['output']>;
  aidInternational?: Maybe<InternationalAidAvailability>;
  averageAmountAid?: Maybe<Scalars['Float']['output']>;
  averageSatScore?: Maybe<Scalars['Float']['output']>;
  bestField?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  coa?: Maybe<Scalars['String']['output']>;
  control?: Maybe<UniversityControl>;
  costAfterAid?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  eaAcceptance?: Maybe<Scalars['Float']['output']>;
  eaDeadline?: Maybe<Scalars['String']['output']>;
  eaEdFinancialAidDeadline?: Maybe<Scalars['String']['output']>;
  ed2ApplicationDeadline?: Maybe<Scalars['String']['output']>;
  ed2FinancialAidDeadline?: Maybe<Scalars['String']['output']>;
  edAcceptance?: Maybe<Scalars['Float']['output']>;
  edDeadline?: Maybe<Scalars['String']['output']>;
  fiveYearGraduationRate?: Maybe<Scalars['Float']['output']>;
  fourYearGraduationRate?: Maybe<Scalars['Float']['output']>;
  howToApply?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  maxAid?: Maybe<Scalars['Float']['output']>;
  maxAidName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  numberAidInt?: Maybe<Scalars['Int']['output']>;
  percentAct?: Maybe<Scalars['Float']['output']>;
  percentAidInt?: Maybe<Scalars['Float']['output']>;
  percentSat?: Maybe<Scalars['Float']['output']>;
  primaryFocus?: Maybe<Scalars['String']['output']>;
  qsrank?: Maybe<Scalars['Int']['output']>;
  rdAcceptance?: Maybe<Scalars['Float']['output']>;
  rdDeadline?: Maybe<Scalars['String']['output']>;
  rdDocumentDeadline?: Maybe<Scalars['String']['output']>;
  rdOnlyFinancialAidDeadline?: Maybe<Scalars['String']['output']>;
  religion?: Maybe<Scalars['Boolean']['output']>;
  sex?: Maybe<UniversitySex>;
  sixYearGraduationRate?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  totalCost?: Maybe<Scalars['Float']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export enum UniversityControl {
  Other = 'OTHER',
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type UniversityInput = {
  acceptanceRate?: InputMaybe<Scalars['Float']['input']>;
  aidInternational?: InputMaybe<InternationalAidAvailability>;
  averageAmountAid?: InputMaybe<Scalars['Float']['input']>;
  averageSatScore?: InputMaybe<Scalars['Float']['input']>;
  bestField?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  coa?: InputMaybe<Scalars['String']['input']>;
  control?: InputMaybe<UniversityControl>;
  costAfterAid?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  eaAcceptance?: InputMaybe<Scalars['Float']['input']>;
  eaDeadline?: InputMaybe<Scalars['String']['input']>;
  eaEdFinancialAidDeadline?: InputMaybe<Scalars['String']['input']>;
  ed2ApplicationDeadline?: InputMaybe<Scalars['String']['input']>;
  ed2FinancialAidDeadline?: InputMaybe<Scalars['String']['input']>;
  edAcceptance?: InputMaybe<Scalars['Float']['input']>;
  edDeadline?: InputMaybe<Scalars['String']['input']>;
  fiveYearGraduationRate?: InputMaybe<Scalars['Float']['input']>;
  fourYearGraduationRate?: InputMaybe<Scalars['Float']['input']>;
  howToApply?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  maxAid?: InputMaybe<Scalars['Float']['input']>;
  maxAidName?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  numberAidInt?: InputMaybe<Scalars['Int']['input']>;
  percentAct?: InputMaybe<Scalars['Float']['input']>;
  percentAidInt?: InputMaybe<Scalars['Float']['input']>;
  percentSat?: InputMaybe<Scalars['Float']['input']>;
  primaryFocus?: InputMaybe<Scalars['String']['input']>;
  qsrank?: InputMaybe<Scalars['Int']['input']>;
  rdAcceptance?: InputMaybe<Scalars['Float']['input']>;
  rdDeadline?: InputMaybe<Scalars['String']['input']>;
  rdDocumentDeadline?: InputMaybe<Scalars['String']['input']>;
  rdOnlyFinancialAidDeadline?: InputMaybe<Scalars['String']['input']>;
  religion?: InputMaybe<Scalars['Boolean']['input']>;
  sex?: InputMaybe<UniversitySex>;
  sixYearGraduationRate?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  totalCost?: InputMaybe<Scalars['Float']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export enum UniversitySex {
  Coed = 'COED',
  Men = 'MEN',
  Other = 'OTHER',
  Women = 'WOMEN',
}

export type UniversityUpdateInput = {
  acceptanceRate?: InputMaybe<Scalars['Float']['input']>;
  aidInternational?: InputMaybe<InternationalAidAvailability>;
  averageAmountAid?: InputMaybe<Scalars['Float']['input']>;
  averageSatScore?: InputMaybe<Scalars['Float']['input']>;
  bestField?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  coa?: InputMaybe<Scalars['String']['input']>;
  control?: InputMaybe<UniversityControl>;
  costAfterAid?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  eaAcceptance?: InputMaybe<Scalars['Float']['input']>;
  eaDeadline?: InputMaybe<Scalars['String']['input']>;
  eaEdFinancialAidDeadline?: InputMaybe<Scalars['String']['input']>;
  ed2ApplicationDeadline?: InputMaybe<Scalars['String']['input']>;
  ed2FinancialAidDeadline?: InputMaybe<Scalars['String']['input']>;
  edAcceptance?: InputMaybe<Scalars['Float']['input']>;
  edDeadline?: InputMaybe<Scalars['String']['input']>;
  fiveYearGraduationRate?: InputMaybe<Scalars['Float']['input']>;
  fourYearGraduationRate?: InputMaybe<Scalars['Float']['input']>;
  howToApply?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  maxAid?: InputMaybe<Scalars['Float']['input']>;
  maxAidName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  numberAidInt?: InputMaybe<Scalars['Int']['input']>;
  percentAct?: InputMaybe<Scalars['Float']['input']>;
  percentAidInt?: InputMaybe<Scalars['Float']['input']>;
  percentSat?: InputMaybe<Scalars['Float']['input']>;
  primaryFocus?: InputMaybe<Scalars['String']['input']>;
  qsrank?: InputMaybe<Scalars['Int']['input']>;
  rdAcceptance?: InputMaybe<Scalars['Float']['input']>;
  rdDeadline?: InputMaybe<Scalars['String']['input']>;
  rdDocumentDeadline?: InputMaybe<Scalars['String']['input']>;
  rdOnlyFinancialAidDeadline?: InputMaybe<Scalars['String']['input']>;
  religion?: InputMaybe<Scalars['Boolean']['input']>;
  sex?: InputMaybe<UniversitySex>;
  sixYearGraduationRate?: InputMaybe<Scalars['Float']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  totalCost?: InputMaybe<Scalars['Float']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type EyshInput = {
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  score?: InputMaybe<Scalars['Float']['input']>;
};

export type EyshUpdateInput = {
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  score?: InputMaybe<Scalars['Float']['input']>;
};

export type MongolianUniversity = {
  __typename?: 'mongolianUniversity';
  control: UniversityControl;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  major: Array<Major>;
  name: Scalars['String']['output'];
};

export type MongolianUniversityInput = {
  control: UniversityControl;
  description?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type MongolianUniversityMajor = {
  __typename?: 'mongolianUniversityMajor';
  majorId: Scalars['Int']['output'];
  mongolianUniversityId: Scalars['Int']['output'];
};

export type MongolianUniversityMajorInput = {
  majorId: Scalars['Int']['input'];
  mongolianUniversityId: Scalars['Int']['input'];
};

export type MongolianUniversityUpdateInput = {
  control?: InputMaybe<UniversityControl>;
  description?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {},
> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Award: ResolverTypeWrapper<Award>;
  AwardInput: AwardInput;
  AwardUpdateInput: AwardUpdateInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Document: ResolverTypeWrapper<Document>;
  DocumentInput: DocumentInput;
  DocumentUpdateInput: DocumentUpdateInput;
  Essay: ResolverTypeWrapper<Essay>;
  EssayInput: EssayInput;
  EssayUpdateInput: EssayUpdateInput;
  Exam: ResolverTypeWrapper<Exam>;
  ExamInput: ExamInput;
  ExamUpdateInput: ExamUpdateInput;
  ExtraCurriculum: ResolverTypeWrapper<ExtraCurriculum>;
  ExtraCurriculumInput: ExtraCurriculumInput;
  ExtraCurriculumUpdateInput: ExtraCurriculumUpdateInput;
  Eysh: ResolverTypeWrapper<Eysh>;
  EyshMajor: ResolverTypeWrapper<EyshMajor>;
  EyshMajorInput: EyshMajorInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  InternationalAidAvailability: InternationalAidAvailability;
  Major: ResolverTypeWrapper<Major>;
  MajorInput: MajorInput;
  MajorUpdateInput: MajorUpdateInput;
  Mutation: ResolverTypeWrapper<{}>;
  Profile: ResolverTypeWrapper<Profile>;
  ProfileInput: ProfileInput;
  ProfileUniversity: ResolverTypeWrapper<ProfileUniversity>;
  ProfileUniversityInput: ProfileUniversityInput;
  ProfileUpdateInput: ProfileUpdateInput;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  University: ResolverTypeWrapper<University>;
  UniversityControl: UniversityControl;
  UniversityInput: UniversityInput;
  UniversitySex: UniversitySex;
  UniversityUpdateInput: UniversityUpdateInput;
  eyshInput: EyshInput;
  eyshUpdateInput: EyshUpdateInput;
  mongolianUniversity: ResolverTypeWrapper<MongolianUniversity>;
  mongolianUniversityInput: MongolianUniversityInput;
  mongolianUniversityMajor: ResolverTypeWrapper<MongolianUniversityMajor>;
  mongolianUniversityMajorInput: MongolianUniversityMajorInput;
  mongolianUniversityUpdateInput: MongolianUniversityUpdateInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Award: Award;
  AwardInput: AwardInput;
  AwardUpdateInput: AwardUpdateInput;
  Boolean: Scalars['Boolean']['output'];
  Document: Document;
  DocumentInput: DocumentInput;
  DocumentUpdateInput: DocumentUpdateInput;
  Essay: Essay;
  EssayInput: EssayInput;
  EssayUpdateInput: EssayUpdateInput;
  Exam: Exam;
  ExamInput: ExamInput;
  ExamUpdateInput: ExamUpdateInput;
  ExtraCurriculum: ExtraCurriculum;
  ExtraCurriculumInput: ExtraCurriculumInput;
  ExtraCurriculumUpdateInput: ExtraCurriculumUpdateInput;
  Eysh: Eysh;
  EyshMajor: EyshMajor;
  EyshMajorInput: EyshMajorInput;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Major: Major;
  MajorInput: MajorInput;
  MajorUpdateInput: MajorUpdateInput;
  Mutation: {};
  Profile: Profile;
  ProfileInput: ProfileInput;
  ProfileUniversity: ProfileUniversity;
  ProfileUniversityInput: ProfileUniversityInput;
  ProfileUpdateInput: ProfileUpdateInput;
  Query: {};
  String: Scalars['String']['output'];
  University: University;
  UniversityInput: UniversityInput;
  UniversityUpdateInput: UniversityUpdateInput;
  eyshInput: EyshInput;
  eyshUpdateInput: EyshUpdateInput;
  mongolianUniversity: MongolianUniversity;
  mongolianUniversityInput: MongolianUniversityInput;
  mongolianUniversityMajor: MongolianUniversityMajor;
  mongolianUniversityMajorInput: MongolianUniversityMajorInput;
  mongolianUniversityUpdateInput: MongolianUniversityUpdateInput;
};

export type AwardResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Award'] = ResolversParentTypes['Award'],
> = {
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reward?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DocumentResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Document'] = ResolversParentTypes['Document'],
> = {
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  file?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  profileId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EssayResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Essay'] = ResolversParentTypes['Essay'],
> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExamResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Exam'] = ResolversParentTypes['Exam'],
> = {
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExtraCurriculumResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['ExtraCurriculum'] = ResolversParentTypes['ExtraCurriculum'],
> = {
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  participation?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  profileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EyshResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Eysh'] = ResolversParentTypes['Eysh'],
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  majors?: Resolver<Array<ResolversTypes['Major']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EyshMajorResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['EyshMajor'] = ResolversParentTypes['EyshMajor'],
> = {
  eyshId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  majorId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MajorResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Major'] = ResolversParentTypes['Major'],
> = {
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  majorRequirements?: Resolver<
    Array<ResolversTypes['Eysh']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  universities?: Resolver<
    Array<ResolversTypes['University']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  createAward?: Resolver<
    ResolversTypes['Award'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateAwardArgs, 'input'>
  >;
  createDocument?: Resolver<
    ResolversTypes['Document'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateDocumentArgs, 'input'>
  >;
  createEssay?: Resolver<
    ResolversTypes['Essay'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateEssayArgs, 'input'>
  >;
  createExam?: Resolver<
    ResolversTypes['Exam'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateExamArgs, 'input'>
  >;
  createExtraCurriculum?: Resolver<
    ResolversTypes['ExtraCurriculum'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateExtraCurriculumArgs, 'input'>
  >;
  createEyshMajor?: Resolver<
    ResolversTypes['EyshMajor'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateEyshMajorArgs, 'input'>
  >;
  createMajor?: Resolver<
    ResolversTypes['Major'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateMajorArgs, 'input'>
  >;
  createMongolianUniversity?: Resolver<
    ResolversTypes['mongolianUniversity'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateMongolianUniversityArgs, 'input'>
  >;
  createMongolianUniversityMajor?: Resolver<
    ResolversTypes['mongolianUniversityMajor'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateMongolianUniversityMajorArgs, 'input'>
  >;
  createProfile?: Resolver<
    ResolversTypes['Profile'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateProfileArgs, 'input'>
  >;
  createProfileUniversity?: Resolver<
    ResolversTypes['ProfileUniversity'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateProfileUniversityArgs, 'input'>
  >;
  createUniversity?: Resolver<
    ResolversTypes['University'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUniversityArgs, 'input'>
  >;
  createeysh?: Resolver<
    ResolversTypes['Eysh'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateeyshArgs, 'input'>
  >;
  deleteAward?: Resolver<
    Maybe<ResolversTypes['Award']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteAwardArgs, 'id'>
  >;
  deleteDocument?: Resolver<
    Maybe<ResolversTypes['Document']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteDocumentArgs, 'id'>
  >;
  deleteEssay?: Resolver<
    Maybe<ResolversTypes['Essay']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteEssayArgs, 'id'>
  >;
  deleteExam?: Resolver<
    Maybe<ResolversTypes['Exam']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteExamArgs, 'id'>
  >;
  deleteExtraCurriculum?: Resolver<
    Maybe<ResolversTypes['ExtraCurriculum']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteExtraCurriculumArgs, 'id'>
  >;
  deleteEyshMajor?: Resolver<
    Maybe<ResolversTypes['EyshMajor']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteEyshMajorArgs, 'eyshId' | 'majorId'>
  >;
  deleteMajor?: Resolver<
    Maybe<ResolversTypes['Major']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteMajorArgs, 'id'>
  >;
  deleteMongolianUniversity?: Resolver<
    Maybe<ResolversTypes['mongolianUniversity']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteMongolianUniversityArgs, 'id'>
  >;
  deleteMongolianUniversityMajor?: Resolver<
    Maybe<ResolversTypes['mongolianUniversityMajor']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationDeleteMongolianUniversityMajorArgs,
      'majorId' | 'mongolianUniversityId'
    >
  >;
  deleteProfile?: Resolver<
    Maybe<ResolversTypes['Profile']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteProfileArgs, 'id'>
  >;
  deleteProfileUniversity?: Resolver<
    Maybe<ResolversTypes['ProfileUniversity']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteProfileUniversityArgs, 'universityId'>
  >;
  deleteUniversity?: Resolver<
    Maybe<ResolversTypes['University']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUniversityArgs, 'id'>
  >;
  deleteeysh?: Resolver<
    Maybe<ResolversTypes['Eysh']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteeyshArgs, 'id'>
  >;
  updateAward?: Resolver<
    Maybe<ResolversTypes['Award']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateAwardArgs, 'id' | 'input'>
  >;
  updateDocument?: Resolver<
    Maybe<ResolversTypes['Document']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateDocumentArgs, 'id' | 'input'>
  >;
  updateEssay?: Resolver<
    Maybe<ResolversTypes['Essay']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateEssayArgs, 'id' | 'input'>
  >;
  updateExam?: Resolver<
    Maybe<ResolversTypes['Exam']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateExamArgs, 'id' | 'input'>
  >;
  updateExtraCurriculum?: Resolver<
    Maybe<ResolversTypes['ExtraCurriculum']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateExtraCurriculumArgs, 'id' | 'input'>
  >;
  updateMajor?: Resolver<
    Maybe<ResolversTypes['Major']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateMajorArgs, 'id' | 'input'>
  >;
  updateMongolianUniversity?: Resolver<
    Maybe<ResolversTypes['mongolianUniversity']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateMongolianUniversityArgs, 'id' | 'input'>
  >;
  updateProfile?: Resolver<
    Maybe<ResolversTypes['Profile']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProfileArgs, 'id' | 'input'>
  >;
  updateUniversity?: Resolver<
    Maybe<ResolversTypes['University']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUniversityArgs, 'id' | 'input'>
  >;
  updateeysh?: Resolver<
    Maybe<ResolversTypes['Eysh']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateeyshArgs, 'id' | 'input'>
  >;
};

export type ProfileResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Profile'] = ResolversParentTypes['Profile'],
> = {
  awards?: Resolver<Array<ResolversTypes['Award']>, ParentType, ContextType>;
  chosenUniversities?: Resolver<
    Array<ResolversTypes['University']>,
    ParentType,
    ContextType
  >;
  citizenship?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  dateOfBirth?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  documents?: Resolver<
    Array<ResolversTypes['Document']>,
    ParentType,
    ContextType
  >;
  essays?: Resolver<Array<ResolversTypes['Essay']>, ParentType, ContextType>;
  extraCurriculum?: Resolver<
    Array<ResolversTypes['ExtraCurriculum']>,
    ParentType,
    ContextType
  >;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scores?: Resolver<Array<ResolversTypes['Exam']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileUniversityResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['ProfileUniversity'] = ResolversParentTypes['ProfileUniversity'],
> = {
  profileId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  universityId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  getAwardById?: Resolver<
    Maybe<ResolversTypes['Award']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetAwardByIdArgs, 'id'>
  >;
  getAwards?: Resolver<Array<ResolversTypes['Award']>, ParentType, ContextType>;
  getDocumentById?: Resolver<
    Maybe<ResolversTypes['Document']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetDocumentByIdArgs, 'id'>
  >;
  getDocuments?: Resolver<
    Array<ResolversTypes['Document']>,
    ParentType,
    ContextType
  >;
  getEssayById?: Resolver<
    Maybe<ResolversTypes['Essay']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetEssayByIdArgs, 'id'>
  >;
  getEssays?: Resolver<Array<ResolversTypes['Essay']>, ParentType, ContextType>;
  getExamById?: Resolver<
    Maybe<ResolversTypes['Exam']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetExamByIdArgs, 'id'>
  >;
  getExams?: Resolver<Array<ResolversTypes['Exam']>, ParentType, ContextType>;
  getExtraCurriculumById?: Resolver<
    Maybe<ResolversTypes['ExtraCurriculum']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetExtraCurriculumByIdArgs, 'id'>
  >;
  getExtraCurriculums?: Resolver<
    Array<ResolversTypes['ExtraCurriculum']>,
    ParentType,
    ContextType
  >;
  getMajorById?: Resolver<
    Maybe<ResolversTypes['Major']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetMajorByIdArgs, 'id'>
  >;
  getMajors?: Resolver<Array<ResolversTypes['Major']>, ParentType, ContextType>;
  getMongolianUniversities?: Resolver<
    Array<ResolversTypes['mongolianUniversity']>,
    ParentType,
    ContextType
  >;
  getMongolianUniversityById?: Resolver<
    Maybe<ResolversTypes['mongolianUniversity']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetMongolianUniversityByIdArgs, 'id'>
  >;
  getMyProfile?: Resolver<
    Maybe<ResolversTypes['Profile']>,
    ParentType,
    ContextType
  >;
  getProfileById?: Resolver<
    Maybe<ResolversTypes['Profile']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetProfileByIdArgs, 'id'>
  >;
  getProfiles?: Resolver<
    Array<ResolversTypes['Profile']>,
    ParentType,
    ContextType
  >;
  getUniversities?: Resolver<
    Array<ResolversTypes['University']>,
    ParentType,
    ContextType
  >;
  getUniversityById?: Resolver<
    Maybe<ResolversTypes['University']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetUniversityByIdArgs, 'id'>
  >;
  geteyshById?: Resolver<
    Maybe<ResolversTypes['Eysh']>,
    ParentType,
    ContextType,
    RequireFields<QueryGeteyshByIdArgs, 'id'>
  >;
  geteyshs?: Resolver<Array<ResolversTypes['Eysh']>, ParentType, ContextType>;
};

export type UniversityResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['University'] = ResolversParentTypes['University'],
> = {
  acceptanceRate?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  aidInternational?: Resolver<
    Maybe<ResolversTypes['InternationalAidAvailability']>,
    ParentType,
    ContextType
  >;
  averageAmountAid?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  averageSatScore?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  bestField?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coa?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  control?: Resolver<
    Maybe<ResolversTypes['UniversityControl']>,
    ParentType,
    ContextType
  >;
  costAfterAid?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  eaAcceptance?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  eaDeadline?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  eaEdFinancialAidDeadline?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  ed2ApplicationDeadline?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  ed2FinancialAidDeadline?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  edAcceptance?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  edDeadline?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  fiveYearGraduationRate?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  fourYearGraduationRate?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  howToApply?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxAid?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxAidName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numberAidInt?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  percentAct?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  percentAidInt?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  percentSat?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  primaryFocus?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  qsrank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rdAcceptance?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  rdDeadline?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  rdDocumentDeadline?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  rdOnlyFinancialAidDeadline?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  religion?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  sex?: Resolver<
    Maybe<ResolversTypes['UniversitySex']>,
    ParentType,
    ContextType
  >;
  sixYearGraduationRate?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalCost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MongolianUniversityResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['mongolianUniversity'] = ResolversParentTypes['mongolianUniversity'],
> = {
  control?: Resolver<
    ResolversTypes['UniversityControl'],
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  major?: Resolver<Array<ResolversTypes['Major']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MongolianUniversityMajorResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['mongolianUniversityMajor'] = ResolversParentTypes['mongolianUniversityMajor'],
> = {
  majorId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mongolianUniversityId?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Award?: AwardResolvers<ContextType>;
  Document?: DocumentResolvers<ContextType>;
  Essay?: EssayResolvers<ContextType>;
  Exam?: ExamResolvers<ContextType>;
  ExtraCurriculum?: ExtraCurriculumResolvers<ContextType>;
  Eysh?: EyshResolvers<ContextType>;
  EyshMajor?: EyshMajorResolvers<ContextType>;
  Major?: MajorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  ProfileUniversity?: ProfileUniversityResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  University?: UniversityResolvers<ContextType>;
  mongolianUniversity?: MongolianUniversityResolvers<ContextType>;
  mongolianUniversityMajor?: MongolianUniversityMajorResolvers<ContextType>;
};

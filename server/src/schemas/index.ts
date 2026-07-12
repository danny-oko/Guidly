import { mergeTypeDefs } from '@graphql-tools/merge';
import { awardTypeDefs } from './award.schema';
import { documentTypeDefs } from './document.schema';
import { essayTypeDefs } from './essay.schema';
import { examTypeDefs } from './exam.schema';
import { extraCurriculumTypeDefs } from './extra-curriculum.schema';
import { profileTypeDefs } from './profile.schema';
import { profileUniversityTypeDefs } from './profile-university.schema';
import { universityTypdefs } from './university.schema';
import { eyshMajorTypeDefs } from './eysh-major.schema';
import { eyshTypeDefs } from './eysh.schema';
import { majorTypeDefs } from './major.schema';
import { mongolianUniMajorTypeDefs } from './mongolian-uni-major.schema';
import { mongolianUniTypeDefs } from './mongolian-uni.schema';

export const typeDefs = mergeTypeDefs([
  universityTypdefs,
  profileTypeDefs,
  awardTypeDefs,
  documentTypeDefs,
  essayTypeDefs,
  examTypeDefs,
  extraCurriculumTypeDefs,
  profileUniversityTypeDefs,
  majorTypeDefs,
  mongolianUniTypeDefs,
  mongolianUniMajorTypeDefs,
  eyshMajorTypeDefs,
  eyshTypeDefs,
  mongolianUniMajorTypeDefs,
]);

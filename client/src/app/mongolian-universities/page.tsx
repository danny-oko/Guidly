'use client';

import {
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
  GraduationCap,
  Heart,
  Layers,
  ListChecks,
  ListPlus,
  Search,
  Sparkles,
} from 'lucide-react';
import { useMemo, useState, type ReactNode } from 'react';

type UniversityType = 'Public' | 'Private';
type EligibilityStatus =
  | 'empty'
  | 'eligible'
  | 'almost'
  | 'not-eligible'
  | 'missing';
type ActiveTab = 'universities' | 'majors' | 'recommended' | 'compare';
type MajorCategory =
  | 'Technology'
  | 'Engineering'
  | 'Medicine'
  | 'Business'
  | 'Law'
  | 'Education'
  | 'Arts'
  | 'Agriculture'
  | 'Science'
  | 'Social Science'
  | 'Humanities';
type SortOption =
  | 'rank'
  | 'score-asc'
  | 'score-desc'
  | 'demand'
  | 'tuition'
  | 'popularity'
  | 'az';

interface EyshSubject {
  key: string;
  label: string;
}

interface RequiredSubject {
  key: string;
  subject: string;
  score: number;
}

interface University {
  id: string;
  name: string;
  shortName: string;
  city: string;
  type: UniversityType;
  description: string;
  website: string;
  contact: string;
}

interface Major {
  id: string;
  name: string;
  universityId: string;
  universityName: string;
  category: MajorCategory;
  requiredSubjects: RequiredSubject[];
  duration: string;
  degree: string;
  description: string;
  rank: number;
  demandScore: number;
  salaryPotential: string;
  difficulty: string;
  popularityScore: number;
  city: string;
  tuitionEstimate: number;
  universityType: UniversityType;
}

type MajorSeed = Omit<Major, 'universityName' | 'city' | 'universityType'>;

interface SubjectComparison extends RequiredSubject {
  userScore: number | null;
  missing: boolean;
  diff: number | null;
  needed: number;
}

interface EligibilityResult {
  status: EligibilityStatus;
  label: string;
  detail: string;
  comparisons: SubjectComparison[];
}

interface MajorFilters {
  majorSearch: string;
  universitySearch: string;
  category: string;
  university: string;
  city: string;
  type: string;
  eligibility: string;
  sort: SortOption;
  savedOnly: boolean;
}

const eyshSubjects: EyshSubject[] = [
  { key: 'mongolian', label: 'Монгол хэл' },
  { key: 'math', label: 'Математик' },
  { key: 'english', label: 'Англи хэл' },
  { key: 'russian', label: 'Орос хэл' },
  { key: 'physics', label: 'Физик' },
  { key: 'chemistry', label: 'Хими' },
  { key: 'biology', label: 'Биологи' },
  { key: 'geography', label: 'Газар зүй' },
  { key: 'history', label: 'Монгол Улсын түүх' },
  { key: 'social', label: 'Нийгмийн тухай мэдлэг / Нийгэм судлал' },
];

const subjectByKey = Object.fromEntries(
  eyshSubjects.map((subject) => [subject.key, subject]),
) as Record<string, EyshSubject>;

const req = (key: string, score: number): RequiredSubject => ({
  key,
  score,
  subject: subjectByKey[key].label,
});

const universities: University[] = [
  {
    id: 'num',
    name: 'National University of Mongolia',
    shortName: 'NUM',
    city: 'Ulaanbaatar',
    type: 'Public',
    website: 'num.edu.mn',
    contact: 'admission@num.example',
    description:
      'A broad research university for science, law, business, social studies, and humanities.',
  },
  {
    id: 'must',
    name: 'Mongolian University of Science and Technology',
    shortName: 'MUST',
    city: 'Ulaanbaatar',
    type: 'Public',
    website: 'must.edu.mn',
    contact: 'admission@must.example',
    description:
      'A technology-focused university known for engineering, architecture, mining, ICT, and applied sciences.',
  },
  {
    id: 'mnums',
    name: 'Mongolian National University of Medical Sciences',
    shortName: 'MNUMS',
    city: 'Ulaanbaatar',
    type: 'Public',
    website: 'mnums.edu.mn',
    contact: 'admission@mnums.example',
    description:
      'The leading medical sciences university for medicine, dentistry, pharmacy, nursing, and public health.',
  },
  {
    id: 'ufe',
    name: 'University of Finance and Economics',
    shortName: 'UFE',
    city: 'Ulaanbaatar',
    type: 'Private',
    website: 'ufe.edu.mn',
    contact: 'admission@ufe.example',
    description:
      'A business-focused university with programs in finance, accounting, management, analytics, and law.',
  },
  {
    id: 'msue',
    name: 'Mongolian State University of Education',
    shortName: 'MSUE',
    city: 'Ulaanbaatar',
    type: 'Public',
    website: 'msue.edu.mn',
    contact: 'admission@msue.example',
    description:
      'A teacher education university preparing educators, psychologists, language specialists, and arts teachers.',
  },
  {
    id: 'muls',
    name: 'Mongolian University of Life Sciences',
    shortName: 'MULS',
    city: 'Ulaanbaatar',
    type: 'Public',
    website: 'muls.edu.mn',
    contact: 'admission@muls.example',
    description:
      'A life sciences university for agriculture, veterinary medicine, environmental studies, and food technology.',
  },
  {
    id: 'hum',
    name: 'University of the Humanities',
    shortName: 'UH',
    city: 'Ulaanbaatar',
    type: 'Private',
    website: 'humanities.mn',
    contact: 'admission@humanities.example',
    description:
      'A humanities and communication university focused on languages, international studies, media, and tourism.',
  },
  {
    id: 'mnua',
    name: 'Mongolian National University of Arts and Culture',
    shortName: 'MNUAC',
    city: 'Ulaanbaatar',
    type: 'Public',
    website: 'mnuac.edu.mn',
    contact: 'admission@mnuac.example',
    description:
      'A creative university for performing arts, design, film, cultural heritage, and arts management.',
  },
];

const universityById = Object.fromEntries(
  universities.map((university) => [university.id, university]),
) as Record<string, University>;

function createMajor(seed: MajorSeed): Major {
  const university = universityById[seed.universityId];

  return {
    ...seed,
    universityName: university.name,
    city: university.city,
    universityType: university.type,
  };
}

const majors: Major[] = [
  createMajor({
    id: 'num-software',
    name: 'Software Engineering',
    universityId: 'num',
    category: 'Technology',
    requiredSubjects: [
      req('math', 650),
      req('physics', 600),
      req('english', 500),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Build web, mobile, and data-driven products with strong programming foundations.',
    rank: 2,
    demandScore: 96,
    salaryPotential: 'High',
    difficulty: 'High',
    popularityScore: 95,
    tuitionEstimate: 4200000,
  }),
  createMajor({
    id: 'num-law',
    name: 'Law',
    universityId: 'num',
    category: 'Law',
    requiredSubjects: [
      req('social', 650),
      req('mongolian', 600),
      req('english', 500),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Study civil, criminal, constitutional, and business law with practical case analysis.',
    rank: 8,
    demandScore: 79,
    salaryPotential: 'Medium-high',
    difficulty: 'High',
    popularityScore: 86,
    tuitionEstimate: 3900000,
  }),
  createMajor({
    id: 'num-data-science',
    name: 'Mathematics and Data Science',
    universityId: 'num',
    category: 'Science',
    requiredSubjects: [
      req('math', 660),
      req('english', 520),
      req('physics', 540),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Use mathematics, statistics, and programming to model real-world decisions.',
    rank: 5,
    demandScore: 91,
    salaryPotential: 'High',
    difficulty: 'High',
    popularityScore: 82,
    tuitionEstimate: 4100000,
  }),
  createMajor({
    id: 'num-international',
    name: 'International Relations',
    universityId: 'num',
    category: 'Social Science',
    requiredSubjects: [
      req('english', 620),
      req('social', 590),
      req('mongolian', 540),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Explore diplomacy, public policy, regional studies, and global communication.',
    rank: 10,
    demandScore: 72,
    salaryPotential: 'Medium',
    difficulty: 'Medium-high',
    popularityScore: 81,
    tuitionEstimate: 3800000,
  }),
  createMajor({
    id: 'must-civil',
    name: 'Civil Engineering',
    universityId: 'must',
    category: 'Engineering',
    requiredSubjects: [
      req('math', 610),
      req('physics', 590),
      req('mongolian', 500),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Design buildings, roads, and infrastructure with structural and materials knowledge.',
    rank: 13,
    demandScore: 84,
    salaryPotential: 'Medium-high',
    difficulty: 'High',
    popularityScore: 77,
    tuitionEstimate: 4000000,
  }),
  createMajor({
    id: 'must-mining',
    name: 'Mining Engineering',
    universityId: 'must',
    category: 'Engineering',
    requiredSubjects: [
      req('math', 640),
      req('physics', 620),
      req('chemistry', 520),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Plan resource extraction, safety systems, mineral processing, and mine operations.',
    rank: 7,
    demandScore: 88,
    salaryPotential: 'High',
    difficulty: 'High',
    popularityScore: 74,
    tuitionEstimate: 4300000,
  }),
  createMajor({
    id: 'must-systems',
    name: 'Information Systems',
    universityId: 'must',
    category: 'Technology',
    requiredSubjects: [
      req('math', 620),
      req('english', 540),
      req('physics', 520),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Connect business workflows with databases, software systems, and analytics.',
    rank: 9,
    demandScore: 90,
    salaryPotential: 'High',
    difficulty: 'Medium-high',
    popularityScore: 88,
    tuitionEstimate: 4100000,
  }),
  createMajor({
    id: 'must-electrical',
    name: 'Electrical Engineering',
    universityId: 'must',
    category: 'Engineering',
    requiredSubjects: [
      req('math', 620),
      req('physics', 630),
      req('english', 500),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Study circuits, power systems, automation, and electronics for infrastructure.',
    rank: 11,
    demandScore: 86,
    salaryPotential: 'High',
    difficulty: 'High',
    popularityScore: 73,
    tuitionEstimate: 4200000,
  }),
  createMajor({
    id: 'mnums-medicine',
    name: 'General Medicine',
    universityId: 'mnums',
    category: 'Medicine',
    requiredSubjects: [
      req('biology', 700),
      req('chemistry', 680),
      req('mongolian', 500),
    ],
    duration: '6 years',
    degree: 'Doctor',
    description:
      'Prepare for diagnosis, treatment planning, patient care, and hospital practice.',
    rank: 1,
    demandScore: 94,
    salaryPotential: 'High',
    difficulty: 'Very high',
    popularityScore: 96,
    tuitionEstimate: 5200000,
  }),
  createMajor({
    id: 'mnums-dentistry',
    name: 'Dentistry',
    universityId: 'mnums',
    category: 'Medicine',
    requiredSubjects: [
      req('biology', 680),
      req('chemistry', 660),
      req('mongolian', 500),
    ],
    duration: '5 years',
    degree: 'Doctor',
    description:
      'Learn oral health, restorative dentistry, dental surgery, and patient communication.',
    rank: 4,
    demandScore: 87,
    salaryPotential: 'High',
    difficulty: 'Very high',
    popularityScore: 89,
    tuitionEstimate: 5500000,
  }),
  createMajor({
    id: 'mnums-pharmacy',
    name: 'Pharmacy',
    universityId: 'mnums',
    category: 'Medicine',
    requiredSubjects: [
      req('chemistry', 650),
      req('biology', 620),
      req('math', 500),
    ],
    duration: '5 years',
    degree: 'Bachelor',
    description:
      'Study pharmacology, drug safety, medicinal chemistry, and pharmacy practice.',
    rank: 15,
    demandScore: 82,
    salaryPotential: 'Medium-high',
    difficulty: 'High',
    popularityScore: 75,
    tuitionEstimate: 4800000,
  }),
  createMajor({
    id: 'mnums-public-health',
    name: 'Public Health',
    universityId: 'mnums',
    category: 'Social Science',
    requiredSubjects: [
      req('biology', 580),
      req('social', 540),
      req('mongolian', 500),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Focus on epidemiology, prevention programs, health policy, and community research.',
    rank: 21,
    demandScore: 83,
    salaryPotential: 'Medium',
    difficulty: 'Medium',
    popularityScore: 69,
    tuitionEstimate: 3500000,
  }),
  createMajor({
    id: 'ufe-finance',
    name: 'Finance',
    universityId: 'ufe',
    category: 'Business',
    requiredSubjects: [
      req('math', 650),
      req('english', 560),
      req('social', 520),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Study banking, investment, corporate finance, risk, and financial decisions.',
    rank: 3,
    demandScore: 92,
    salaryPotential: 'High',
    difficulty: 'High',
    popularityScore: 92,
    tuitionEstimate: 6200000,
  }),
  createMajor({
    id: 'ufe-accounting',
    name: 'Accounting',
    universityId: 'ufe',
    category: 'Business',
    requiredSubjects: [
      req('math', 600),
      req('social', 520),
      req('mongolian', 500),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Practice financial reporting, auditing, taxation, and accounting systems.',
    rank: 17,
    demandScore: 81,
    salaryPotential: 'Medium-high',
    difficulty: 'Medium-high',
    popularityScore: 77,
    tuitionEstimate: 5600000,
  }),
  createMajor({
    id: 'ufe-marketing',
    name: 'Marketing',
    universityId: 'ufe',
    category: 'Business',
    requiredSubjects: [
      req('english', 560),
      req('social', 540),
      req('mongolian', 500),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Learn brand strategy, consumer insight, campaign planning, and research.',
    rank: 20,
    demandScore: 78,
    salaryPotential: 'Medium',
    difficulty: 'Medium',
    popularityScore: 85,
    tuitionEstimate: 5500000,
  }),
  createMajor({
    id: 'ufe-analytics',
    name: 'Business Analytics',
    universityId: 'ufe',
    category: 'Technology',
    requiredSubjects: [
      req('math', 630),
      req('english', 560),
      req('social', 500),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Turn data into business decisions using statistics, dashboards, and analytics tools.',
    rank: 6,
    demandScore: 93,
    salaryPotential: 'High',
    difficulty: 'High',
    popularityScore: 84,
    tuitionEstimate: 6000000,
  }),
  createMajor({
    id: 'msue-primary',
    name: 'Primary Education',
    universityId: 'msue',
    category: 'Education',
    requiredSubjects: [
      req('mongolian', 520),
      req('social', 500),
      req('math', 470),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Prepare for classroom teaching, child development, curriculum planning, and assessment.',
    rank: 28,
    demandScore: 80,
    salaryPotential: 'Medium',
    difficulty: 'Medium',
    popularityScore: 68,
    tuitionEstimate: 3000000,
  }),
  createMajor({
    id: 'msue-english',
    name: 'English Language Teaching',
    universityId: 'msue',
    category: 'Education',
    requiredSubjects: [
      req('english', 590),
      req('mongolian', 520),
      req('social', 480),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Combine linguistics, lesson design, practicum teaching, and language pedagogy.',
    rank: 24,
    demandScore: 77,
    salaryPotential: 'Medium',
    difficulty: 'Medium',
    popularityScore: 79,
    tuitionEstimate: 3200000,
  }),
  createMajor({
    id: 'msue-psychology',
    name: 'Educational Psychology',
    universityId: 'msue',
    category: 'Social Science',
    requiredSubjects: [
      req('social', 580),
      req('biology', 520),
      req('mongolian', 520),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Study learning behavior, student wellbeing, counseling basics, and research.',
    rank: 23,
    demandScore: 75,
    salaryPotential: 'Medium',
    difficulty: 'Medium-high',
    popularityScore: 76,
    tuitionEstimate: 3300000,
  }),
  createMajor({
    id: 'msue-history',
    name: 'History Education',
    universityId: 'msue',
    category: 'Humanities',
    requiredSubjects: [
      req('history', 560),
      req('mongolian', 520),
      req('social', 500),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Teach Mongolian and world history with research and classroom practice.',
    rank: 31,
    demandScore: 62,
    salaryPotential: 'Medium',
    difficulty: 'Medium',
    popularityScore: 60,
    tuitionEstimate: 3000000,
  }),
  createMajor({
    id: 'muls-vet',
    name: 'Veterinary Medicine',
    universityId: 'muls',
    category: 'Medicine',
    requiredSubjects: [
      req('biology', 610),
      req('chemistry', 570),
      req('mongolian', 480),
    ],
    duration: '5 years',
    degree: 'Doctor',
    description:
      'Study animal health, diagnostics, surgery basics, food safety, and field practice.',
    rank: 19,
    demandScore: 82,
    salaryPotential: 'Medium-high',
    difficulty: 'High',
    popularityScore: 67,
    tuitionEstimate: 3600000,
  }),
  createMajor({
    id: 'muls-agronomy',
    name: 'Agronomy',
    universityId: 'muls',
    category: 'Agriculture',
    requiredSubjects: [
      req('biology', 520),
      req('chemistry', 500),
      req('geography', 480),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Learn crop production, soil science, plant protection, and sustainable farming.',
    rank: 35,
    demandScore: 70,
    salaryPotential: 'Medium',
    difficulty: 'Medium',
    popularityScore: 55,
    tuitionEstimate: 2900000,
  }),
  createMajor({
    id: 'muls-food-tech',
    name: 'Food Technology',
    universityId: 'muls',
    category: 'Engineering',
    requiredSubjects: [
      req('chemistry', 560),
      req('biology', 520),
      req('math', 500),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Develop food processing, quality control, product design, and safety skills.',
    rank: 27,
    demandScore: 73,
    salaryPotential: 'Medium',
    difficulty: 'Medium-high',
    popularityScore: 61,
    tuitionEstimate: 3200000,
  }),
  createMajor({
    id: 'muls-environment',
    name: 'Environmental Management',
    universityId: 'muls',
    category: 'Science',
    requiredSubjects: [
      req('geography', 560),
      req('biology', 520),
      req('math', 480),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Use ecology, land use planning, monitoring, and conservation to manage resources.',
    rank: 25,
    demandScore: 76,
    salaryPotential: 'Medium',
    difficulty: 'Medium',
    popularityScore: 66,
    tuitionEstimate: 3100000,
  }),
  createMajor({
    id: 'hum-translation',
    name: 'Translation Studies',
    universityId: 'hum',
    category: 'Humanities',
    requiredSubjects: [
      req('english', 610),
      req('mongolian', 540),
      req('russian', 480),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Practice translation, interpretation, linguistics, and cross-cultural communication.',
    rank: 16,
    demandScore: 71,
    salaryPotential: 'Medium',
    difficulty: 'Medium-high',
    popularityScore: 74,
    tuitionEstimate: 4800000,
  }),
  createMajor({
    id: 'hum-business',
    name: 'International Business',
    universityId: 'hum',
    category: 'Business',
    requiredSubjects: [
      req('english', 590),
      req('math', 540),
      req('social', 510),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Learn global trade, business communication, management, and market strategy.',
    rank: 29,
    demandScore: 75,
    salaryPotential: 'Medium-high',
    difficulty: 'Medium',
    popularityScore: 73,
    tuitionEstimate: 5000000,
  }),
  createMajor({
    id: 'hum-journalism',
    name: 'Journalism and Media',
    universityId: 'hum',
    category: 'Humanities',
    requiredSubjects: [
      req('mongolian', 560),
      req('social', 520),
      req('english', 500),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Create news, digital stories, interviews, media research, and ethical communication.',
    rank: 30,
    demandScore: 66,
    salaryPotential: 'Medium',
    difficulty: 'Medium',
    popularityScore: 72,
    tuitionEstimate: 4600000,
  }),
  createMajor({
    id: 'hum-tourism',
    name: 'Tourism Management',
    universityId: 'hum',
    category: 'Social Science',
    requiredSubjects: [
      req('english', 540),
      req('geography', 520),
      req('mongolian', 480),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Plan tourism products, hospitality services, destination marketing, and experiences.',
    rank: 36,
    demandScore: 63,
    salaryPotential: 'Medium',
    difficulty: 'Medium',
    popularityScore: 62,
    tuitionEstimate: 4500000,
  }),
  createMajor({
    id: 'mnua-design',
    name: 'Graphic Design',
    universityId: 'mnua',
    category: 'Arts',
    requiredSubjects: [
      req('mongolian', 500),
      req('math', 460),
      req('english', 460),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Create visual identities, layouts, digital graphics, typography, and portfolio projects.',
    rank: 12,
    demandScore: 85,
    salaryPotential: 'Medium-high',
    difficulty: 'Medium-high',
    popularityScore: 87,
    tuitionEstimate: 3600000,
  }),
  createMajor({
    id: 'mnua-film',
    name: 'Film and Media Arts',
    universityId: 'mnua',
    category: 'Arts',
    requiredSubjects: [
      req('mongolian', 540),
      req('english', 500),
      req('history', 480),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Learn directing, cinematography, editing, screenwriting, and media production.',
    rank: 38,
    demandScore: 61,
    salaryPotential: 'Medium',
    difficulty: 'Medium-high',
    popularityScore: 70,
    tuitionEstimate: 3700000,
  }),
  createMajor({
    id: 'mnua-heritage',
    name: 'Cultural Heritage Management',
    universityId: 'mnua',
    category: 'Humanities',
    requiredSubjects: [
      req('history', 570),
      req('mongolian', 530),
      req('social', 480),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Protect museums, heritage sites, archives, and cultural programs with research methods.',
    rank: 39,
    demandScore: 57,
    salaryPotential: 'Medium',
    difficulty: 'Medium',
    popularityScore: 52,
    tuitionEstimate: 3300000,
  }),
  createMajor({
    id: 'mnua-music',
    name: 'Music Performance',
    universityId: 'mnua',
    category: 'Arts',
    requiredSubjects: [
      req('mongolian', 500),
      req('history', 480),
      req('english', 430),
    ],
    duration: '4 years',
    degree: 'Bachelor',
    description:
      'Train in performance, theory, ensemble practice, music history, and stage discipline.',
    rank: 37,
    demandScore: 54,
    salaryPotential: 'Medium',
    difficulty: 'High',
    popularityScore: 58,
    tuitionEstimate: 3500000,
  }),
];

const categoryBySubject: Record<string, MajorCategory[]> = {
  math: ['Technology', 'Engineering', 'Science', 'Business'],
  physics: ['Technology', 'Engineering', 'Science'],
  chemistry: ['Medicine', 'Science', 'Agriculture', 'Engineering'],
  biology: ['Medicine', 'Science', 'Agriculture'],
  social: ['Law', 'Social Science', 'Education'],
  mongolian: ['Law', 'Social Science', 'Education', 'Humanities'],
  english: ['Humanities', 'Education', 'Business', 'Social Science'],
  russian: ['Humanities', 'Social Science'],
  geography: ['Agriculture', 'Science', 'Social Science'],
  history: ['Humanities', 'Arts', 'Education'],
};

const categories = unique(majors.map((major) => major.category));
const cities = unique(universities.map((university) => university.city));
const emptyScores = Object.fromEntries(
  eyshSubjects.map((subject) => [subject.key, '']),
) as Record<string, string>;
const emptyMajorFilters: MajorFilters = {
  majorSearch: '',
  universitySearch: '',
  category: 'all',
  university: 'all',
  city: 'all',
  type: 'all',
  eligibility: 'all',
  sort: 'rank',
  savedOnly: false,
};

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items)).sort();
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function formatMoney(amount: number) {
  return `${(amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1)}M MNT`;
}

function hasAnyScore(scores: Record<string, string>) {
  return Object.values(scores).some((score) => Number(score) > 0);
}

function getSubjectScore(scores: Record<string, string>, key: string) {
  const value = Number(scores[key]);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function averageRequired(major: Major) {
  const total = major.requiredSubjects.reduce(
    (sum, subject) => sum + subject.score,
    0,
  );
  return Math.round(total / major.requiredSubjects.length);
}

function averageUniversityScore(universityId: string) {
  const universityMajors = majors.filter(
    (major) => major.universityId === universityId,
  );
  return Math.round(
    universityMajors.reduce((sum, major) => sum + averageRequired(major), 0) /
      universityMajors.length,
  );
}

function getEligibility(
  major: Major,
  scores: Record<string, string>,
): EligibilityResult {
  const comparisons = major.requiredSubjects.map((subject) => {
    const userScore = getSubjectScore(scores, subject.key);
    const diff = userScore === null ? null : userScore - subject.score;
    const needed = diff === null || diff >= 0 ? 0 : Math.abs(diff);

    return {
      ...subject,
      userScore,
      diff,
      needed,
      missing: userScore === null,
    };
  });

  if (!hasAnyScore(scores)) {
    return {
      status: 'empty',
      label: 'Enter ЭЕШ scores',
      detail: 'Enter scores to check eligibility',
      comparisons,
    };
  }

  const missing = comparisons.filter((item) => item.missing);
  if (missing.length) {
    return {
      status: 'missing',
      label: 'Missing score',
      detail: `Missing ${missing.map((item) => item.subject).join(', ')}`,
      comparisons,
    };
  }

  const weak = comparisons.filter((item) => item.needed > 0);
  if (!weak.length) {
    return {
      status: 'eligible',
      label: 'Eligible',
      detail: 'All required subjects meet the cutoff',
      comparisons,
    };
  }

  const totalNeeded = weak.reduce((sum, item) => sum + item.needed, 0);
  const almost =
    totalNeeded <= 30 || (weak.length === 1 && weak[0].needed <= 50);

  return {
    status: almost ? 'almost' : 'not-eligible',
    label: almost ? 'Almost eligible' : 'Not eligible',
    detail:
      weak.length === 1
        ? `Need ${weak[0].needed} more points in ${weak[0].subject}`
        : `Need ${totalNeeded} total points across ${weak.length} subjects`,
    comparisons,
  };
}

function getEligibilityCounts(list: Major[], scores: Record<string, string>) {
  return list.reduce(
    (counts, major) => {
      counts[getEligibility(major, scores).status] += 1;
      return counts;
    },
    {
      empty: 0,
      eligible: 0,
      almost: 0,
      'not-eligible': 0,
      missing: 0,
    } as Record<EligibilityStatus, number>,
  );
}

function scoreStrengths(scores: Record<string, string>) {
  return eyshSubjects
    .map((subject) => ({
      ...subject,
      score: getSubjectScore(scores, subject.key) ?? 0,
    }))
    .filter((subject) => subject.score > 0)
    .sort((a, b) => b.score - a.score);
}

function recommendedCategories(scores: Record<string, string>) {
  const weights: Partial<Record<MajorCategory, number>> = {};

  scoreStrengths(scores).forEach((subject, index) => {
    const multiplier = subject.score >= 650 ? 3 : subject.score >= 580 ? 2 : 1;
    (categoryBySubject[subject.key] ?? []).forEach((category) => {
      weights[category] =
        (weights[category] ?? 0) + multiplier + Math.max(0, 3 - index);
    });
  });

  return Object.entries(weights)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([category, weight]) => ({
      category: category as MajorCategory,
      weight,
    }));
}

function recommendationScore(major: Major, scores: Record<string, string>) {
  const statusWeight: Record<EligibilityStatus, number> = {
    eligible: 80,
    almost: 58,
    'not-eligible': 20,
    missing: 12,
    empty: 0,
  };
  const eligibility = getEligibility(major, scores);
  const categoryWeight =
    recommendedCategories(scores).find(
      (item) => item.category === major.category,
    )?.weight ?? 0;
  const subjectFit = major.requiredSubjects.reduce((sum, subject) => {
    const score = getSubjectScore(scores, subject.key);
    if (!score) return sum;
    return sum + Math.min(30, Math.max(0, score - subject.score + 30));
  }, 0);

  return (
    statusWeight[eligibility.status] +
    categoryWeight * 9 +
    subjectFit +
    major.demandScore * 0.25 +
    major.popularityScore * 0.15 -
    major.rank * 0.4
  );
}

function accentClass(index: number) {
  const accents = [
    'universities-card--blue',
    'universities-card--pink',
    'universities-card--green',
    'universities-card--yellow',
  ];
  return accents[index % accents.length];
}

function listAccentClass(index: number) {
  const accents = [
    'uni-list-item--blue',
    'uni-list-item--pink',
    'uni-list-item--green',
    'uni-list-item--yellow',
  ];
  return accents[index % accents.length];
}

function statusClass(status: EligibilityStatus) {
  if (status === 'eligible') return 'universities-card__status--submitted';
  if (status === 'almost') return 'universities-card__status--pending';
  return 'universities-card__status--unfinished';
}

function statusIcon(status: EligibilityStatus) {
  if (status === 'eligible') return <CheckCircle2 size={14} aria-hidden />;
  if (status === 'almost') return <Clock3 size={14} aria-hidden />;
  if (status === 'empty') return <Sparkles size={14} aria-hidden />;
  return <AlertCircle size={14} aria-hidden />;
}

function majorsForUniversity(universityId: string) {
  return majors.filter((major) => major.universityId === universityId);
}

function topCategories(universityId: string) {
  return unique(
    majorsForUniversity(universityId).map((major) => major.category),
  );
}

function PageHeader({
  counts,
  savedCount,
}: {
  counts: Record<EligibilityStatus, number>;
  savedCount: number;
}) {
  const stats = [
    {
      label: 'Universities',
      value: universities.length,
      icon: Layers,
      className: 'universities-stat--blue',
    },
    {
      label: 'Majors',
      value: majors.length,
      icon: GraduationCap,
      className: 'universities-stat--green',
    },
    {
      label: 'Eligible',
      value: counts.eligible,
      icon: CheckCircle2,
      className: 'universities-stat--yellow',
    },
    {
      label: 'Almost',
      value: counts.almost,
      icon: Clock3,
      className: 'universities-stat--pink',
    },
    {
      label: 'Saved',
      value: savedCount,
      icon: Heart,
      className: 'universities-stat--blue',
    },
  ];

  return (
    <header className="universities-hero">
      <div className="universities-hero__main">
        <div className="universities-header__eyebrow">
          <GraduationCap size={15} strokeWidth={2.2} aria-hidden />
          <span>ЭЕШ major finder</span>
        </div>
        <h1 className="universities-header__title">
          Mongolian Universities & Majors
        </h1>
        <p className="universities-header__subtitle">
          Find universities and majors based on your ЭЕШ subject scores. Save
          interesting majors, compare options, and discover realistic next
          steps.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            'ЭЕШ score checker',
            'University explorer',
            'Major recommendations',
            'Compare majors',
          ].map((label) => (
            <span className="uni-details__tag" key={label}>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div
        className="universities-stats universities-stats--summary"
        aria-label="Mongolian university summary"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              className={`universities-stat ${stat.className}`}
              key={stat.label}
            >
              <span className="universities-stat__icon" aria-hidden>
                <Icon size={16} strokeWidth={2.2} />
              </span>
              <span className="universities-stat__value">{stat.value}</span>
              <span className="universities-stat__label">{stat.label}</span>
            </div>
          );
        })}
      </div>
    </header>
  );
}

function Tabs({
  activeTab,
  onChange,
}: {
  activeTab: ActiveTab;
  onChange: (tab: ActiveTab) => void;
}) {
  const tabs: Array<[ActiveTab, string]> = [
    ['universities', 'Universities'],
    ['majors', 'All Majors'],
    ['recommended', 'Recommended'],
    ['compare', 'Compare'],
  ];

  return (
    <div className="dashboard-search__filters">
      {tabs.map(([tab, label]) => (
        <button
          type="button"
          className={cn(
            'dashboard-search__chip',
            activeTab === tab && 'dashboard-search__chip--active',
          )}
          onClick={() => onChange(tab)}
          key={tab}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function ResultsFrame({
  title,
  count,
  meta,
  children,
}: {
  title: string;
  count: number | string;
  meta: string;
  children: ReactNode;
}) {
  return (
    <section className="universities-results">
      <div className="universities-results__head">
        <div className="universities-results__title-group">
          <h2 className="universities-results__title">{title}</h2>
          <span className="universities-results__count">{count}</span>
        </div>
        <p className="universities-results__meta">{meta}</p>
      </div>
      <div className="w-full">{children}</div>
    </section>
  );
}

function UniversitiesTab({
  scores,
  selectedUniversityId,
  onSelectUniversity,
  onBack,
  savedIds,
  comparedIds,
  onToggleSaved,
  onToggleCompare,
}: {
  scores: Record<string, string>;
  selectedUniversityId: string | null;
  onSelectUniversity: (id: string) => void;
  onBack: () => void;
  savedIds: string[];
  comparedIds: string[];
  onToggleSaved: (id: string) => void;
  onToggleCompare: (id: string) => void;
}) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [type, setType] = useState('all');

  const filteredUniversities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return universities.filter((university) => {
      const universityMajors = majorsForUniversity(university.id);
      const matchesSearch =
        !query ||
        university.name.toLowerCase().includes(query) ||
        university.shortName.toLowerCase().includes(query);
      const matchesCategory =
        category === 'all' ||
        universityMajors.some((major) => major.category === category);
      const matchesType = type === 'all' || university.type === type;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [category, search, type]);

  if (selectedUniversityId) {
    const university = universityById[selectedUniversityId];
    const universityMajors = majorsForUniversity(selectedUniversityId);

    return (
      <ResultsFrame
        title={university.shortName}
        count={universityMajors.length}
        meta="University detail view"
      >
        <div className="space-y-4">
          <button
            type="button"
            className="universities-card__link"
            onClick={onBack}
          >
            <ArrowLeft size={14} strokeWidth={2.2} aria-hidden />
            Back to universities
          </button>

          <UniversityDetailCard university={university} scores={scores} />

          <div className="universities-list">
            <UniversityDetailRow university={university} />

            {universityMajors.map((major, index) => (
              <MajorListItem
                key={major.id}
                major={major}
                index={index}
                scores={scores}
                savedIds={savedIds}
                comparedIds={comparedIds}
                onToggleSaved={onToggleSaved}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>
        </div>
      </ResultsFrame>
    );
  }

  return (
    <ResultsFrame
      title="Mongolian university explorer"
      count={filteredUniversities.length}
      meta="Browse schools and open their majors"
    >
      <div className="space-y-4">
        <div className="universities-toolbar universities-filter-panel">
          <p className="universities-toolbar__label">Search & filter</p>
          <div className="grid gap-3 lg:grid-cols-3">
            <SearchField
              label="University"
              value={search}
              onChange={setSearch}
              placeholder="Search by name or short name"
            />
            <SelectField
              label="Category"
              value={category}
              onChange={setCategory}
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </SelectField>
            <SelectField label="Type" value={type} onChange={setType}>
              <option value="all">Public and private</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </SelectField>
          </div>
        </div>

        <div className="universities-list">
          {filteredUniversities.length ? (
            filteredUniversities.map((university, index) => (
              <UniversityCard
                key={university.id}
                university={university}
                index={index}
                scores={scores}
                onSelect={onSelectUniversity}
              />
            ))
          ) : (
            <EmptyState
              title="No universities found"
              message="Try changing your search, type, or category filters."
            />
          )}
        </div>
      </div>
    </ResultsFrame>
  );
}

function UniversityDetailCard({
  university,
  scores,
}: {
  university: University;
  scores: Record<string, string>;
}) {
  const universityMajors = majorsForUniversity(university.id);
  const counts = getEligibilityCounts(universityMajors, scores);
  const fields = topCategories(university.id);
  const hasScores = hasAnyScore(scores);
  const websiteUrl = university.website.startsWith('http')
    ? university.website
    : `https://${university.website}`;
  const tuitionAverage = Math.round(
    universityMajors.reduce((sum, major) => sum + major.tuitionEstimate, 0) /
      universityMajors.length,
  );

  return (
    <article className="uni-details uni-details--blue university-detail-card">
      <div className="uni-details__header">
        <div className="uni-details__header-copy">
          <h3 className="uni-details__title">{university.name}</h3>
          <p className="uni-details__location">
            {university.city} / {university.type} university
          </p>
        </div>
        <span className="uni-details__rank">
          Avg {averageUniversityScore(university.id)}
        </span>
      </div>

      <div className="uni-details__tags" aria-label="Top fields">
        {fields.map((field) => (
          <span className="uni-details__tag" key={field}>
            {field}
          </span>
        ))}
      </div>

      <dl className="uni-details__rows">
        <div className="uni-details__row">
          <dt>Majors</dt>
          <dd>{universityMajors.length} available programs</dd>
        </div>
        <div className="uni-details__row">
          <dt>Score fit</dt>
          <dd>
            {hasScores
              ? `${counts.eligible} eligible / ${counts.almost} almost`
              : `Average required score ${averageUniversityScore(
                  university.id,
                )}`}
          </dd>
        </div>
        <div className="uni-details__row">
          <dt>Tuition</dt>
          <dd>About {formatMoney(tuitionAverage)} per year</dd>
        </div>
        <div className="uni-details__row">
          <dt>Contact</dt>
          <dd>{university.contact}</dd>
        </div>
      </dl>

      <div className="uni-details__section">
        <h4>Overview</h4>
        <p>{university.description}</p>
      </div>

      <div className="university-detail-card__actions">
        <a
          className="universities-card__link"
          href={websiteUrl}
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink size={14} strokeWidth={2.2} aria-hidden />
          Website
        </a>
      </div>
    </article>
  );
}

function UniversityDetailRow({ university }: { university: University }) {
  const universityMajors = majorsForUniversity(university.id);
  const fields = topCategories(university.id).slice(0, 3).join(' / ');

  const openWebsite = () => {
    const url = university.website.startsWith('http')
      ? university.website
      : `https://${university.website}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="uni-list-item uni-list-item--blue">
      <div className="uni-list-item__main">
        <span className="uni-list-item__avatar">{university.shortName}</span>
        <span className="uni-list-item__body">
          <span className="uni-list-item__name">{university.name}</span>
          <span className="uni-list-item__field">
            {fields} / {university.city} / {university.type}
          </span>
        </span>
        <span className="uni-list-item__badges">
          <span className="uni-list-item__badge">
            {universityMajors.length} majors
          </span>
          <span className="uni-list-item__badge uni-list-item__badge--acceptance">
            Avg {averageUniversityScore(university.id)}
          </span>
        </span>
      </div>

      <div className="uni-list-item__actions">
        <button
          type="button"
          className="uni-list-item__action"
          aria-label={`Open ${university.shortName} website`}
          onClick={openWebsite}
        >
          <ExternalLink size={15} strokeWidth={2.2} aria-hidden />
        </button>
      </div>
    </article>
  );
}

function UniversityCard({
  university,
  index,
  scores,
  onSelect,
}: {
  university: University;
  index: number;
  scores: Record<string, string>;
  onSelect: (id: string) => void;
}) {
  const universityMajors = majorsForUniversity(university.id);
  const counts = getEligibilityCounts(universityMajors, scores);
  const topFields = topCategories(university.id).slice(0, 2).join(' / ');
  const hasScores = hasAnyScore(scores);
  const primaryCount = hasScores ? counts.eligible : universityMajors.length;
  const secondaryCount = hasScores
    ? counts.almost
    : averageUniversityScore(university.id);

  const openWebsite = () => {
    const url = university.website.startsWith('http')
      ? university.website
      : `https://${university.website}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className={cn('uni-list-item', listAccentClass(index))}>
      <button
        type="button"
        className="uni-list-item__main uni-list-item__main--interactive"
        onClick={() => onSelect(university.id)}
      >
        <span className="uni-list-item__avatar">{university.shortName}</span>
        <span className="uni-list-item__body">
          <span className="uni-list-item__name">{university.name}</span>
          <span className="uni-list-item__field">
            {topFields || university.type} / {university.city}
          </span>
        </span>
        <span className="uni-list-item__badges">
          <span className="uni-list-item__badge">
            {hasScores ? `Eligible ${primaryCount}` : `${primaryCount} majors`}
          </span>
          <span className="uni-list-item__badge uni-list-item__badge--acceptance">
            {hasScores ? `Almost ${secondaryCount}` : `Avg ${secondaryCount}`}
          </span>
        </span>
      </button>

      <div className="uni-list-item__actions">
        <button
          type="button"
          className="uni-list-item__action"
          aria-label={`View ${university.shortName} majors`}
          onClick={() => onSelect(university.id)}
        >
          <ListPlus size={15} strokeWidth={2.2} aria-hidden />
        </button>
        <button
          type="button"
          className="uni-list-item__action"
          aria-label={`Open ${university.shortName} website`}
          onClick={openWebsite}
        >
          <ExternalLink size={15} strokeWidth={2.2} aria-hidden />
        </button>
        <button
          type="button"
          className="uni-list-item__action uni-list-item__action--chevron"
          aria-label={`Open ${university.shortName}`}
          onClick={() => onSelect(university.id)}
        >
          <ChevronRight size={15} strokeWidth={2.4} aria-hidden />
        </button>
      </div>
    </article>
  );
}

function MajorListItem({
  major,
  index,
  scores,
  savedIds,
  comparedIds,
  onToggleSaved,
  onToggleCompare,
}: {
  major: Major;
  index: number;
  scores: Record<string, string>;
  savedIds: string[];
  comparedIds: string[];
  onToggleSaved: (id: string) => void;
  onToggleCompare: (id: string) => void;
}) {
  const eligibility = getEligibility(major, scores);
  const saved = savedIds.includes(major.id);
  const compared = comparedIds.includes(major.id);
  const compareDisabled = !compared && comparedIds.length >= 3;

  return (
    <article className={cn('uni-list-item', listAccentClass(index))}>
      <div className="uni-list-item__main">
        <span className="uni-list-item__avatar">
          {major.category.slice(0, 2)}
        </span>
        <span className="uni-list-item__body">
          <span className="uni-list-item__name">{major.name}</span>
          <span className="uni-list-item__field">
            {major.category} / {major.duration} /{' '}
            {formatMoney(major.tuitionEstimate)}
          </span>
        </span>
        <span className="uni-list-item__badges">
          <span className="uni-list-item__badge">Rank #{major.rank}</span>
          <span className="uni-list-item__badge">
            Demand {major.demandScore}/100
          </span>
          <span
            className="uni-list-item__badge uni-list-item__badge--acceptance"
            title={eligibility.detail}
          >
            Avg {averageRequired(major)}
          </span>
        </span>
      </div>

      <div className="uni-list-item__actions">
        <button
          type="button"
          className={cn(
            'uni-list-item__action',
            saved && 'uni-list-item__action--active',
          )}
          aria-label={saved ? `Unsave ${major.name}` : `Save ${major.name}`}
          aria-pressed={saved}
          onClick={() => onToggleSaved(major.id)}
        >
          <Heart size={15} strokeWidth={2.2} aria-hidden />
        </button>
        <button
          type="button"
          className={cn(
            'uni-list-item__action',
            compared && 'uni-list-item__action--active',
            compareDisabled && 'pointer-events-none opacity-45',
          )}
          aria-label={
            compared
              ? `Remove ${major.name} from compare`
              : `Compare ${major.name}`
          }
          aria-pressed={compared}
          disabled={compareDisabled}
          onClick={() => onToggleCompare(major.id)}
        >
          <ListChecks size={15} strokeWidth={2.2} aria-hidden />
        </button>
      </div>
    </article>
  );
}

function AllMajorsTab({
  scores,
  savedIds,
  comparedIds,
  onToggleSaved,
  onToggleCompare,
}: {
  scores: Record<string, string>;
  savedIds: string[];
  comparedIds: string[];
  onToggleSaved: (id: string) => void;
  onToggleCompare: (id: string) => void;
}) {
  const [filters, setFilters] = useState<MajorFilters>(emptyMajorFilters);

  const filteredMajors = useMemo(() => {
    const query = filters.majorSearch.trim().toLowerCase();
    const universityQuery = filters.universitySearch.trim().toLowerCase();

    return majors
      .filter((major) => {
        const status = getEligibility(major, scores).status;

        return (
          (!query || major.name.toLowerCase().includes(query)) &&
          (!universityQuery ||
            major.universityName.toLowerCase().includes(universityQuery)) &&
          (filters.category === 'all' || major.category === filters.category) &&
          (filters.university === 'all' ||
            major.universityId === filters.university) &&
          (filters.city === 'all' || major.city === filters.city) &&
          (filters.type === 'all' || major.universityType === filters.type) &&
          (filters.eligibility === 'all' || status === filters.eligibility) &&
          (!filters.savedOnly || savedIds.includes(major.id))
        );
      })
      .sort((a, b) => {
        if (filters.sort === 'score-asc')
          return averageRequired(a) - averageRequired(b);
        if (filters.sort === 'score-desc')
          return averageRequired(b) - averageRequired(a);
        if (filters.sort === 'demand') return b.demandScore - a.demandScore;
        if (filters.sort === 'tuition')
          return a.tuitionEstimate - b.tuitionEstimate;
        if (filters.sort === 'popularity')
          return b.popularityScore - a.popularityScore;
        if (filters.sort === 'az') return a.name.localeCompare(b.name);
        return a.rank - b.rank;
      });
  }, [filters, savedIds, scores]);

  const setFilter = <K extends keyof MajorFilters>(
    key: K,
    value: MajorFilters[K],
  ) => setFilters((current) => ({ ...current, [key]: value }));

  return (
    <ResultsFrame
      title="All majors"
      count={filteredMajors.length}
      meta="Prototype data only. Rankings, tuition, and score requirements are not official."
    >
      <div className="space-y-4">
        <div className="universities-toolbar universities-filter-panel">
          <p className="universities-toolbar__label">Search & filter</p>
          <div className="grid gap-3 lg:grid-cols-3 2xl:grid-cols-4">
            <SearchField
              label="Major"
              value={filters.majorSearch}
              onChange={(value) => setFilter('majorSearch', value)}
              placeholder="Software, medicine, law..."
            />
            <SearchField
              label="University"
              value={filters.universitySearch}
              onChange={(value) => setFilter('universitySearch', value)}
              placeholder="NUM, MUST, UFE..."
            />
            <SelectField
              label="Category"
              value={filters.category}
              onChange={(value) => setFilter('category', value)}
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </SelectField>
            <SelectField
              label="University"
              value={filters.university}
              onChange={(value) => setFilter('university', value)}
            >
              <option value="all">All universities</option>
              {universities.map((university) => (
                <option key={university.id} value={university.id}>
                  {university.shortName}
                </option>
              ))}
            </SelectField>
            <SelectField
              label="City"
              value={filters.city}
              onChange={(value) => setFilter('city', value)}
            >
              <option value="all">All cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </SelectField>
            <SelectField
              label="Type"
              value={filters.type}
              onChange={(value) => setFilter('type', value)}
            >
              <option value="all">Public and private</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </SelectField>
            <SelectField
              label="Eligibility"
              value={filters.eligibility}
              onChange={(value) => setFilter('eligibility', value)}
            >
              <option value="all">All statuses</option>
              <option value="eligible">Eligible</option>
              <option value="almost">Almost eligible</option>
              <option value="not-eligible">Not eligible</option>
              <option value="missing">Missing score</option>
            </SelectField>
            <SelectField
              label="Sort"
              value={filters.sort}
              onChange={(value) => setFilter('sort', value as SortOption)}
            >
              <option value="rank">Best ranked</option>
              <option value="score-asc">Lowest average required score</option>
              <option value="score-desc">Highest average required score</option>
              <option value="demand">Highest career demand</option>
              <option value="tuition">Most affordable</option>
              <option value="popularity">Most popular</option>
              <option value="az">A-Z</option>
            </SelectField>
            <label className="flex h-10 items-center justify-between rounded-full border border-black/10 bg-app px-3 text-[0.68rem] font-bold uppercase tracking-[0.04em] text-muted">
              Saved only
              <input
                type="checkbox"
                checked={filters.savedOnly}
                onChange={(event) =>
                  setFilter('savedOnly', event.target.checked)
                }
                className="h-4 w-4 accent-black"
              />
            </label>
            <button
              type="button"
              className="universities-card__link justify-center"
              onClick={() => setFilters(emptyMajorFilters)}
            >
              Clear filters
            </button>
          </div>
        </div>

        <div className="universities-grid">
          {filteredMajors.length ? (
            filteredMajors.map((major, index) => (
              <MajorCard
                key={major.id}
                major={major}
                index={index}
                scores={scores}
                savedIds={savedIds}
                comparedIds={comparedIds}
                onToggleSaved={onToggleSaved}
                onToggleCompare={onToggleCompare}
              />
            ))
          ) : (
            <EmptyState
              title="No majors match your filters"
              message="Try changing filters or entering more subject scores."
            />
          )}
        </div>
      </div>
    </ResultsFrame>
  );
}

function RecommendedTab({
  scores,
  savedIds,
  comparedIds,
  onToggleSaved,
  onToggleCompare,
}: {
  scores: Record<string, string>;
  savedIds: string[];
  comparedIds: string[];
  onToggleSaved: (id: string) => void;
  onToggleCompare: (id: string) => void;
}) {
  const strongest = useMemo(() => scoreStrengths(scores).slice(0, 4), [scores]);
  const suggestions = useMemo(() => recommendedCategories(scores), [scores]);
  const rankedMajors = useMemo(
    () =>
      [...majors].sort(
        (a, b) =>
          recommendationScore(b, scores) - recommendationScore(a, scores),
      ),
    [scores],
  );
  const eligible = rankedMajors
    .filter((major) => getEligibility(major, scores).status === 'eligible')
    .slice(0, 4);
  const almost = rankedMajors
    .filter((major) => getEligibility(major, scores).status === 'almost')
    .slice(0, 4);
  const highDemand = rankedMajors
    .filter((major) => major.demandScore >= 80)
    .slice(0, 4);

  return (
    <ResultsFrame
      title="Recommended majors"
      count={hasAnyScore(scores) ? suggestions.length : 0}
      meta="Based on strongest entered ЭЕШ subjects"
    >
      {!hasAnyScore(scores) ? (
        <EmptyState
          title="Enter your ЭЕШ scores to get recommendations"
          message="Your strongest subjects will guide suggested fields and major matches."
        />
      ) : (
        <div className="space-y-5">
          <div className="universities-grid">
            <RecommendationCard
              accent="universities-card--pink"
              label="Strongest subjects"
              title={strongest
                .map((subject) => `${subject.label} ${subject.score}`)
                .join(', ')}
              description="These are the entered subjects currently driving recommendations."
            />
            <RecommendationCard
              accent="universities-card--green"
              label="Suggested categories"
              title={suggestions.map((item) => item.category).join(', ')}
              description="Math + physics points toward technology and engineering; biology + chemistry points toward medicine and science."
            />
            <RecommendationCard
              accent="universities-card--blue"
              label="Saved shortlist"
              title={`${savedIds.length} saved majors`}
              description="Save promising majors and compare up to three options side by side."
            />
          </div>

          <MajorGroup
            title="Best eligible majors"
            majorsToShow={eligible}
            scores={scores}
            savedIds={savedIds}
            comparedIds={comparedIds}
            onToggleSaved={onToggleSaved}
            onToggleCompare={onToggleCompare}
            emptyTitle="No eligible majors yet"
            emptyMessage="Try adding more required subject scores."
          />
          <MajorGroup
            title="Almost eligible majors"
            majorsToShow={almost}
            scores={scores}
            savedIds={savedIds}
            comparedIds={comparedIds}
            onToggleSaved={onToggleSaved}
            onToggleCompare={onToggleCompare}
            emptyTitle="No almost eligible majors"
            emptyMessage="Your entered scores may already qualify or need a bigger improvement."
          />
          <MajorGroup
            title="High-demand matching majors"
            majorsToShow={highDemand}
            scores={scores}
            savedIds={savedIds}
            comparedIds={comparedIds}
            onToggleSaved={onToggleSaved}
            onToggleCompare={onToggleCompare}
            emptyTitle="No high-demand matches"
            emptyMessage="Add more scores to improve match quality."
          />
        </div>
      )}
    </ResultsFrame>
  );
}

function CompareTab({
  scores,
  comparedIds,
  onToggleCompare,
}: {
  scores: Record<string, string>;
  comparedIds: string[];
  onToggleCompare: (id: string) => void;
}) {
  const selectedMajors = majors.filter((major) =>
    comparedIds.includes(major.id),
  );

  return (
    <ResultsFrame
      title="Compare majors"
      count={`${selectedMajors.length}/3`}
      meta="Select up to three majors from any major card"
    >
      {!selectedMajors.length ? (
        <EmptyState
          title="No majors selected for comparison"
          message="Open All Majors or Recommended and choose up to three majors to compare."
        />
      ) : (
        <div className="grid gap-4 xl:grid-cols-3">
          {selectedMajors.map((major, index) => {
            const eligibility = getEligibility(major, scores);
            return (
              <article
                className={`universities-card ${accentClass(index)}`}
                key={major.id}
              >
                <div className="universities-card__header">
                  <div className="universities-card__title-block">
                    <h3 className="universities-card__name">{major.name}</h3>
                    <p className="universities-card__subtitle">
                      {major.universityName}
                    </p>
                  </div>
                  <EligibilityBadge eligibility={eligibility} />
                </div>

                <dl className="universities-card__metrics">
                  <Metric label="Rank" value={`#${major.rank}`} />
                  <Metric label="Demand" value={`${major.demandScore}/100`} />
                  <Metric
                    label="Tuition"
                    value={formatMoney(major.tuitionEstimate)}
                  />
                </dl>

                <dl className="universities-card__fields">
                  <Field label="Category" value={major.category} />
                  <Field label="Duration" value={major.duration} />
                  <Field label="Difficulty" value={major.difficulty} />
                  <Field
                    label="Required subjects"
                    value={major.requiredSubjects
                      .map((subject) => `${subject.subject}: ${subject.score}`)
                      .join(', ')}
                  />
                </dl>

                <button
                  type="button"
                  className="universities-card__link"
                  onClick={() => onToggleCompare(major.id)}
                >
                  Remove
                </button>
              </article>
            );
          })}
        </div>
      )}
    </ResultsFrame>
  );
}

function MajorGroup({
  title,
  majorsToShow,
  scores,
  savedIds,
  comparedIds,
  onToggleSaved,
  onToggleCompare,
  emptyTitle,
  emptyMessage,
}: {
  title: string;
  majorsToShow: Major[];
  scores: Record<string, string>;
  savedIds: string[];
  comparedIds: string[];
  onToggleSaved: (id: string) => void;
  onToggleCompare: (id: string) => void;
  emptyTitle: string;
  emptyMessage: string;
}) {
  return (
    <section className="space-y-3">
      <div className="universities-results__head">
        <div className="universities-results__title-group">
          <h3 className="universities-results__title">{title}</h3>
          <span className="universities-results__count">
            {majorsToShow.length}
          </span>
        </div>
      </div>
      <div className="universities-grid">
        {majorsToShow.length ? (
          majorsToShow.map((major, index) => (
            <MajorCard
              key={major.id}
              major={major}
              index={index}
              scores={scores}
              savedIds={savedIds}
              comparedIds={comparedIds}
              onToggleSaved={onToggleSaved}
              onToggleCompare={onToggleCompare}
            />
          ))
        ) : (
          <EmptyState title={emptyTitle} message={emptyMessage} />
        )}
      </div>
    </section>
  );
}

function MajorCard({
  major,
  index,
  scores,
  savedIds,
  comparedIds,
  onToggleSaved,
  onToggleCompare,
}: {
  major: Major;
  index: number;
  scores: Record<string, string>;
  savedIds: string[];
  comparedIds: string[];
  onToggleSaved: (id: string) => void;
  onToggleCompare: (id: string) => void;
}) {
  const eligibility = getEligibility(major, scores);
  const saved = savedIds.includes(major.id);
  const compared = comparedIds.includes(major.id);
  const compareDisabled = !compared && comparedIds.length >= 3;

  return (
    <article className={`universities-card ${accentClass(index)}`}>
      <div className="universities-card__header">
        <div className="universities-card__identity">
          <span className="universities-card__mark">
            {major.category.slice(0, 2)}
          </span>
          <div className="universities-card__title-block">
            <h3 className="universities-card__name">{major.name}</h3>
            <p className="universities-card__subtitle">
              {major.universityName}
            </p>
          </div>
        </div>
        <EligibilityBadge eligibility={eligibility} />
      </div>

      <p className="text-[0.8125rem] font-medium leading-6 text-muted">
        {major.description}
      </p>

      <dl className="universities-card__metrics">
        <Metric label="Rank" value={`#${major.rank}`} />
        <Metric label="Demand" value={`${major.demandScore}/100`} />
        <Metric label="Avg score" value={`${averageRequired(major)}`} />
      </dl>

      <div className="rounded-[0.95rem] bg-app/60 p-3">
        <p className="mb-2 text-[0.62rem] font-extrabold uppercase tracking-[0.05em] text-muted">
          Subject comparison
        </p>
        <div className="flex flex-col gap-2">
          {eligibility.comparisons.map((comparison) => (
            <SubjectRow comparison={comparison} key={comparison.key} />
          ))}
        </div>
      </div>

      <dl className="universities-card__fields">
        <Field label="Category" value={major.category} />
        <Field
          label="City / type"
          value={`${major.city} / ${major.universityType}`}
        />
        <Field label="Duration" value={major.duration} />
        <Field label="Tuition" value={formatMoney(major.tuitionEstimate)} />
        <Field label="Difficulty" value={major.difficulty} />
        <Field label="Salary" value={major.salaryPotential} />
      </dl>

      <div className="mt-auto flex flex-wrap gap-2">
        <button
          type="button"
          className={cn(
            'universities-card__link',
            saved && '!bg-black text-white!',
          )}
          onClick={() => onToggleSaved(major.id)}
        >
          <Heart size={14} strokeWidth={2.2} aria-hidden />
          {saved ? 'Saved' : 'Save'}
        </button>
        <button
          type="button"
          className={cn(
            'universities-card__link',
            compared && '!bg-black !text-white',
            compareDisabled && 'pointer-events-none opacity-45',
          )}
          onClick={() => onToggleCompare(major.id)}
          disabled={compareDisabled}
        >
          <ListChecks size={14} strokeWidth={2.2} aria-hidden />
          {compared ? 'Comparing' : 'Compare'}
        </button>
      </div>
    </article>
  );
}

function RecommendationCard({
  accent,
  label,
  title,
  description,
}: {
  accent: string;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <article className={`universities-card ${accent}`}>
      <span className="universities-card__status universities-card__status--pending">
        {label}
      </span>
      <h3 className="universities-card__name">
        {title || 'More scores needed'}
      </h3>
      <p className="text-[0.8125rem] font-medium leading-6 text-muted">
        {description}
      </p>
    </article>
  );
}

function EligibilityBadge({ eligibility }: { eligibility: EligibilityResult }) {
  return (
    <span
      className={`universities-card__status ${statusClass(eligibility.status)} inline-flex items-center gap-1.5`}
      title={eligibility.detail}
    >
      {statusIcon(eligibility.status)}
      {eligibility.label}
    </span>
  );
}

function SubjectRow({ comparison }: { comparison: SubjectComparison }) {
  let result = 'Missing subject';
  let className = 'text-[#8a2d2d]';

  if (!comparison.missing && comparison.diff !== null && comparison.diff >= 0) {
    result = `Your ${comparison.userScore} (+${comparison.diff})`;
    className = 'text-[#50620f]';
  } else if (!comparison.missing) {
    result = `Need ${comparison.needed} more`;
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 border-t border-dashed border-black/10 pt-2 first:border-t-0 first:pt-0">
      <span className="min-w-0 text-[0.72rem] font-bold text-main">
        {comparison.subject}: required {comparison.score}
      </span>
      <span className={`text-[0.7rem] font-extrabold ${className}`}>
        {result}
      </span>
    </div>
  );
}

function SearchField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.64rem] font-bold uppercase tracking-[0.04em] text-muted">
        {label}
      </span>
      <span className="flex h-10 items-center gap-2 rounded-full border border-black/10 bg-app px-3">
        <Search
          size={14}
          strokeWidth={2.2}
          className="text-muted"
          aria-hidden
        />
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-[0.8125rem] font-bold text-main outline-none placeholder:text-muted"
        />
      </span>
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.64rem] font-bold uppercase tracking-[0.04em] text-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 rounded-full border border-black/10 bg-app px-3 text-[0.8125rem] font-bold text-main outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/25"
      >
        {children}
      </select>
    </label>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="universities-card__metric">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="universities-results__state">
      <p className="universities-results__state-title">{title}</p>
      <p className="universities-results__state-text">{message}</p>
    </div>
  );
}

export default function MongolianUniversitiesPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('universities');
  const [selectedUniversityId, setSelectedUniversityId] = useState<
    string | null
  >(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [comparedIds, setComparedIds] = useState<string[]>([]);

  const scores = emptyScores;
  const counts = useMemo(() => getEligibilityCounts(majors, scores), [scores]);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setSelectedUniversityId(null);
  };

  const toggleSaved = (id: string) => {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const toggleCompare = (id: string) => {
    setComparedIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 3) return current;
      return [...current, id];
    });
  };

  return (
    <main className="space-y-6 p-4 md:p-6">
      <PageHeader counts={counts} savedCount={savedIds.length} />

      <section className="universities-search" aria-label="ЭЕШ tools">
        <div className="universities-toolbar universities-tabs-toolbar">
          <p className="universities-toolbar__label">Explore</p>
          <Tabs activeTab={activeTab} onChange={handleTabChange} />
        </div>

        {activeTab === 'universities' && (
          <UniversitiesTab
            scores={scores}
            selectedUniversityId={selectedUniversityId}
            onSelectUniversity={setSelectedUniversityId}
            onBack={() => setSelectedUniversityId(null)}
            savedIds={savedIds}
            comparedIds={comparedIds}
            onToggleSaved={toggleSaved}
            onToggleCompare={toggleCompare}
          />
        )}

        {activeTab === 'majors' && (
          <AllMajorsTab
            scores={scores}
            savedIds={savedIds}
            comparedIds={comparedIds}
            onToggleSaved={toggleSaved}
            onToggleCompare={toggleCompare}
          />
        )}

        {activeTab === 'recommended' && (
          <RecommendedTab
            scores={scores}
            savedIds={savedIds}
            comparedIds={comparedIds}
            onToggleSaved={toggleSaved}
            onToggleCompare={toggleCompare}
          />
        )}

        {activeTab === 'compare' && (
          <CompareTab
            scores={scores}
            comparedIds={comparedIds}
            onToggleCompare={toggleCompare}
          />
        )}
      </section>
    </main>
  );
}

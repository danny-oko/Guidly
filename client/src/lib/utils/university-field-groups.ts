export interface UniversityFieldGroup {
  id: string;
  label: string;
  keys: string[];
}

export const PROFILE_FIELD_KEYS = [
  'control',
  'institutionsize',
  'primaryfocus',
  'region',
  'setting',
  'menswomens',
  'religiousseereligionsheet',
  'howtoapply',
  'accessibletometropolitanarea',
  'wheredomoststudentslive',
  'undergraduate',
  'hbcu',
];

/** Compact subset for the left sidebar identity card */
export const PROFILE_SIDEBAR_KEYS = [
  'control',
  'institutionsize',
  'primaryfocus',
  'region',
  'setting',
  'menswomens',
  'howtoapply',
  'undergraduate',
];

/** High-value fields surfaced on the Overview tab */
export const OVERVIEW_GROUPS: UniversityFieldGroup[] = [
  {
    id: 'admissions-glance',
    label: 'Admissions snapshot',
    keys: [
      'internationaladmissionrate',
      'rdacceptancerate',
      'edacceptancerate',
      'eaacceptancerate',
      'testingreq',
      'earlyplanoffered',
      'eaoffered',
      'ed2offered',
      'yieldapprox',
    ],
  },
  {
    id: 'costs-glance',
    label: 'Costs & aid',
    keys: [
      'tuitionandfeeswithoutaid',
      'roomandboard',
      'totalcostofattendancewithoutaid',
      'averagecostin20232024afteraidmeritorneed',
      'typesofaidforinternationalstudents',
      'percentageofinternationalstudentswhoreceiveaid',
      'averageamountawarded',
      'meetsfulldemonstratedneed',
    ],
  },
  {
    id: 'deadlines-glance',
    label: 'Key deadlines',
    keys: [
      'edapplicationdeadline',
      'eaapplicationdeadline',
      'ed2applicationdeadline',
      'rddeadline',
      'eaednotificationdate',
      'rdnotificationdate',
    ],
  },
  {
    id: 'scores-glance',
    label: 'Test scores',
    keys: [
      'satcomp50ile',
      'satmath25ile',
      'satmath75ile',
      'satebrw25ile',
      'satebrw75ile',
      'actcomp25ile',
      'actcomp50ile',
      'actcompo75ile',
    ],
  },
];

export const PROGRAM_HIGHLIGHT_KEYS = [
  { label: 'Computer Science', keys: ['usnewsundergradcs', 'usnewscsai'] },
  { label: 'Business', keys: ['usnewsundergraduatebusiness'] },
  {
    label: 'Engineering',
    keys: ['usnewstop50engineeringeitherdoctorateornon-doctorate'],
  },
  { label: 'Economics', keys: ['usnewsundergradeconomics'] },
] as const;

export const ADMISSIONS_GROUPS: UniversityFieldGroup[] = [
  {
    id: 'rates',
    label: 'Acceptance & yield',
    keys: [
      'acceptancerate',
      'internationaladmissionrate',
      'rdacceptancerate',
      'edacceptancerate',
      'eaacceptancerate',
      'yieldapprox',
      'internationalyield',
      'admissionratedatafromclassyear',
    ],
  },
  {
    id: 'testing',
    label: 'Testing',
    keys: [
      'testingreq',
      'percentofacceptedstudentswhosubmittedsatscores',
      'percentofacceptedstudentswhosubmittedactscores',
      'satcomp50ile',
      'satmath25ile',
      'satmath75ile',
      'satebrw25ile',
      'satebrw75ile',
      'actcomp25ile',
      'actcomp50ile',
      'actcompo75ile',
    ],
  },
  {
    id: 'graduation',
    label: 'Graduation rates',
    keys: [
      'international4yeargraduationrateipeds',
      'international5yeargraduationrateipeds',
      'international6yeargraduationrateipeds',
      'percentofinternationalgraduateswhotakelongerthan4years',
      'internationaltransferoutrate',
    ],
  },
  {
    id: 'plans',
    label: 'Early plans',
    keys: [
      'earlyplanoffered',
      'eaoffered',
      'ed2offered',
      'edadvantageoverrd',
      'eaadvantageoverrd',
      'percentofclassof2027filleded',
    ],
  },
];

export const FINANCIAL_GROUPS: UniversityFieldGroup[] = [
  {
    id: 'costs',
    label: 'Cost of attendance',
    keys: [
      'tuitionandfeeswithoutaid',
      'roomandboard',
      'totalcostofattendancewithoutaid',
      'coafromyear',
      'averagecostin20232024afteraidmeritorneed',
      '20242025adjustedtuitionaftermeritscholarship',
      '20242025costofattendanceafterlargestmeritscholarship',
    ],
  },
  {
    id: 'aid',
    label: 'International aid',
    keys: [
      'typesofaidforinternationalstudents',
      'numberofinternationalstudentsawardedfinancialaidscholarships',
      'percentageofinternationalstudentswhoreceiveaid',
      'averageamountawarded',
      'totalaidawardedinmillions',
      'meetsfulldemonstratedneed',
      'aidapplicationawardrate',
      'firsttimefulltimefirstyearstudentswhoseneedwasfullymet',
    ],
  },
  {
    id: 'scholarships',
    label: 'Scholarships',
    keys: [
      'amountoflargestmeritscholarship',
      'nameandinfooflargestmeritscholarship',
      'nameofbiggestscholarship',
    ],
  },
];

export const DEADLINE_GROUPS: UniversityFieldGroup[] = [
  {
    id: 'applications',
    label: 'Application deadlines',
    keys: [
      'edapplicationdeadline',
      'eaapplicationdeadline',
      'ed2applicationdeadline',
      'prioritydeadline',
      'rddeadline',
      'rollingadmission',
      'acceptsapplicationsafterdeadlineonspaceavailablebasis',
    ],
  },
  {
    id: 'documents',
    label: 'Documents & notifications',
    keys: [
      'eaeddocumentdeadline',
      'rddocumentdeadline',
      'eaednotificationdate',
      'ed2notificationdate',
      'rdnotificationdate',
      'latesttestingforeaed',
      'latesttestingacceptedrd',
    ],
  },
  {
    id: 'financial-deadlines',
    label: 'Financial aid deadlines',
    keys: [
      'eaedfinancialaiddeadline',
      'ed2financialaiddeadline',
      'rdonlyfinancialaiddeadline',
    ],
  },
];

export const RANKING_GROUPS: UniversityFieldGroup[] = [
  {
    id: 'national',
    label: 'National & world',
    keys: [
      'usnewsnationaluniversities2025',
      'usnewsnationalliberalartscolleges',
      'timeshighereducation2024worlduniversities',
      'therankwithinusa',
      'qsworlduniversities',
      'qsworlduniversitieswithintheunitedstates',
      'wsjbestcollegesrank',
      'wsjbestcollegesscore',
    ],
  },
  {
    id: 'programs',
    label: 'Program rankings',
    keys: [
      'usnewsundergradcs',
      'usnewscsai',
      'qscomputerscience',
      'csrankingsorgoverallranking',
      'usnewsundergraduatebusiness',
      'qsbusiness',
      'usnewsundergradeconomics',
      'usnewstop50engineeringeitherdoctorateornon-doctorate',
      'usnewsundergradmechanicalengineering',
      'usnewsundergradelectricalengineering',
      'usnewsundergraduatecomputerengineering',
    ],
  },
  {
    id: 'flags',
    label: 'Prestige flags',
    keys: [
      'inusnewsnationalt25lact5',
      'inusnewsorforbesnationalt100lact40',
      'intimeshighereducationorqsglobaltop200',
    ],
  },
];

export const CAMPUS_GROUPS: UniversityFieldGroup[] = [
  {
    id: 'climate',
    label: 'Climate',
    keys: [
      'rangebetweenaveragetemperaturescoldestandhottestmonthsc',
      'coldestmonth2023',
      'averagetempin2023c',
      'warmestmonth2023',
      'averagemonthlyrainfallcm',
    ],
  },
  {
    id: 'context',
    label: 'Local context',
    keys: [
      'ofcountypopthatvotedfortrumpin2020',
      'abortionlawstatusnytasofoctober282024',
      'gundeathsnonsuicideper10000020182022bycountydeptofhealth',
      'oncampusviolentcrimesnonsexualreported20182022averageperyearope',
      'oncampusrapessexualassaultsreported20182022averageperyearope',
    ],
  },
];

export const HIGHLIGHT_BADGE_KEYS = [
  { label: 'US News T25', key: 'inusnewsnationalt25lact5' },
  { label: 'Top 100', key: 'inusnewsorforbesnationalt100lact40' },
  { label: 'Global Top 200', key: 'intimeshighereducationorqsglobaltop200' },
  { label: 'HBCU', key: 'hbcu' },
];

export const METRIC_FIELD_CONFIG = [
  {
    label: 'Acceptance rate',
    keys: ['acceptancerate'],
    unit: '%',
    max: 100,
    format: (v: number) => `${v}%`,
    attentionBelow: 10,
    range: 'Typical range 5% – 60%',
  },
  {
    label: 'Cost after aid',
    keys: ['averagecostin20232024afteraidmeritorneed'],
    unit: 'USD',
    maxKey: ['totalcostofattendancewithoutaid'],
    format: (v: number) => `$${v.toLocaleString()}`,
    rangeKey: ['totalcostofattendancewithoutaid'],
    rangeFormat: (v: number) => `COA $${v.toLocaleString()}`,
  },
  {
    label: 'SAT composite (50th %ile)',
    keys: ['satcomp50ile'],
    unit: 'score',
    max: 1600,
    format: (v: number) => String(v),
    competitiveAbove: 1500,
    range: 'Reference 800 – 1600',
  },
  {
    label: '4-year grad rate',
    keys: ['international4yeargraduationrateipeds'],
    unit: '%',
    max: 100,
    format: (v: number) => `${v}%`,
    range: 'International students',
  },
] as const;

export type UniversityStatus = 'Submitted' | 'Pending' | 'Not-Finished';

export interface University {
  id: number;
  name: string;
  description: string;
  logo: string;
  city: string;
  state: string;
  country: string;
  website: string;
  qs_rank: number;
  best_field: string;
  control: string;
  size: number;
  sex: string;
  primary_focus: string;
  religion: boolean;
  total_cost: number;
  coa: string;
  aid_international: string;
  number_aid_intl: number;
  percent_aid_intl: number;
  average_amount_aid: number;
  cost_after_aid: number;
  max_aid: number;
  max_aid_name: string | null;
  how_to_apply: string;
  note: string;
  acceptance_rate: number;
  rd_acceptance: number;
  rd_deadline: string | null;
  ed_acceptance: number;
  ed_deadline: string | null;
  ea_acceptance: number;
  ea_deadline: string | null;
  percent_sat: number;
  average_sat_score: number;
  percent_act: number;
  four_year_graduation_rate: number;
  five_year_graduation_rate: number;
  six_year_graduation_rate: number;
  ea_ed_financial_aid_deadline: string | null;
  ed2_application_deadline: string | null;
  ed2_financial_aid_deadline: string | null;
  rd_document_deadline: string | null;
  rd_only_financial_aid_deadline: string | null;
  status: UniversityStatus;
  acceptanceTrend: number[];
}

export interface DashboardStats {
  totalUniversities: number;
  avgAcceptanceRate: number;
  avgSatScore: number;
  avgQsRank: number;
  avgCostAfterAid: number;
  privateCount: number;
  publicCount: number;
  sizeBuckets: { label: string; count: number }[];
  acceptanceTrend: { name: string; rate: number }[];
}

export interface DashboardData {
  userName: string;
  universities: University[];
  stats: DashboardStats;
}

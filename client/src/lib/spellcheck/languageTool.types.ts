export interface LanguageToolReplacement {
  value: string;
}

export interface LanguageToolMatch {
  offset: number;
  length: number;
  message: string;
  replacements: LanguageToolReplacement[];
}

export interface LanguageToolResponse {
  matches: LanguageToolMatch[];
}

export type DocumentAccent = 'pink' | 'blue' | 'green' | 'yellow';

export interface EssayDocument {
  id: string;
  title: string;
  lastOpenedAt: string;
  createdAt: string;
  accent: DocumentAccent;
}

export interface CreateDocumentInput {
  title?: string;
  accent?: DocumentAccent;
}

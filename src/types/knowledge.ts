
export interface KnowledgeItem {
  id: string;
  name: string;
  filePath?: string;
  content?: string;
  type: 'text' | 'file';
}


export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ActionLogStep {
  text: string;
  source?: string;
  document?: string;
}

export interface KnowledgeItem {
  id: string;
  name: string;
  filePath?: string;
}

export interface ChatHistory {
  id: string;
  messages: Message[];
  title?: string;
}

export interface BookmarkItem {
  id: string;
  title: string;
  date: string;
  content: string;
  documentPath?: string;
  documentName?: string;
}

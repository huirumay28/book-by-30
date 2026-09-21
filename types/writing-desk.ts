export interface DailyLog {
  id: string;
  date: string; // YYYY-MM-DD
  hitTheFloor: boolean;
  journalEntry: string;
  wordCount?: number;
  createdAt: string;
}

export interface WritingTask {
  id: string;
  title: string;
  status: "todo" | "doing" | "done";
  notes: string;
  dueDate?: string; // YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
}

export interface Submission {
  id: string;
  tier: 1 | 2 | 3 | 4;
  story: string;
  magazine: string;
  whyItFits: string;
  sendByDate: string; // YYYY-MM-DD
  status: "queued" | "sent" | "accepted" | "rejected" | "withdrawn";
  sentDate?: string; // YYYY-MM-DD
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface InspoItem {
  id: string;
  content: string;
  source?: string;
  tags: string[];
  note?: string;
  createdAt: string;
}

export interface AppState {
  dailyLogs: DailyLog[];
  writingTasks: WritingTask[];
  submissions: Submission[];
  inspoItems: InspoItem[];
  lastSync: string;
}

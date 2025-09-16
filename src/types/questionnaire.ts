export interface QuestionOption {
  text: string;
  score: number;
}

export interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
}

export interface QuestionnaireResult {
  totalScore: number;
  sleepType: 'morning' | 'evening' | 'intermediate';
  category: string;
  description: string;
  lightTherapyTime?: string;
  bedtime: string;
  wakeTime: string;
}

export interface UserAnswer {
  questionId: number;
  selectedScore: number;
}
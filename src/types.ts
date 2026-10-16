export type OptionId = 'A' | 'B' | 'C' | 'D';

export interface Option {
  id: OptionId;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export interface AnswerItem {
  questionId: number;
  question: string;
  optionId: string | null;
  answer: string | null;
}

export interface AssessmentPayload {
  source: string;
  utm_source: string | null;
  submittedAt: string;
  answers: AnswerItem[];
}

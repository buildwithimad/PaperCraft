export interface MCQ {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

export interface FillBlank {
  id: string;
  question: string;
  answer: string;
}

export interface ShortQuestion {
  id: string;
  question: string;
  marks: number;
}

export interface LongQuestion {
  id: string;
  question: string;
  marks: number;
}
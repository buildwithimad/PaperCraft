import type {
    FillBlank,
    LongQuestion,
    MCQ,
    ShortQuestion,
} from "./question";

export interface Paper {
  schoolName: string;
  examName: string;
  className: string;
  subject: string;
  date: string;
  time: string;
  totalMarks: number;
  instructions: string;

  mcqs: MCQ[];

  fillBlanks: FillBlank[];

  shortQuestions: ShortQuestion[];

  longQuestions: LongQuestion[];
}
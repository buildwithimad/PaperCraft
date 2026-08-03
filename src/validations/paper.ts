import { z } from "zod";

// --- 1. Individual Question Schemas ---
export const mcqSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(1, { message: "Question is required" }),
  optionA: z.string().min(1, { message: "Option A is required" }),
  optionB: z.string().min(1, { message: "Option B is required" }),
  optionC: z.string().min(1, { message: "Option C is required" }),
  optionD: z.string().min(1, { message: "Option D is required" }),
});

export const fillBlankSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(1, { message: "Question is required" }),
});

export const shortQuestionSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(1, { message: "Question is required" }),
  marks: z.string().min(1, { message: "Marks required" }),
});

export const longQuestionSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(1, { message: "Question is required" }),
  marks: z.string().min(1, { message: "Marks required" }),
});

export const matchingRowSchema = z.object({
  id: z.string().optional(),
  left: z.string().min(1, { message: "Left column text required" }),
  right: z.string().min(1, { message: "Right column text required" }),
});

// --- 2. Section Schemas (No .default([]) here!) ---
export const mcqSectionSchema = z.object({
  title: z.string().optional(),
  questions: z.array(mcqSchema),
});

export const fillBlankSectionSchema = z.object({
  title: z.string().optional(),
  questions: z.array(fillBlankSchema),
});

export const shortQuestionSectionSchema = z.object({
  title: z.string().optional(),
  questions: z.array(shortQuestionSchema),
});

export const longQuestionSectionSchema = z.object({
  title: z.string().optional(),
  questions: z.array(longQuestionSchema),
});

export const matchingSectionSchema = z.object({
  title: z.string().optional(),
  marks: z.string().optional(),
  instructions: z.string().optional(),
  rows: z.array(matchingRowSchema),
});

// --- 3. Main Paper Schema ---
export const paperSchema = z.object({
  logo: z.string().optional(),
  schoolName: z.string().min(2, { message: "School name is required" }),
  examName: z.string().min(2, { message: "Exam name is required" }),
  className: z.string().min(1, { message: "Class is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().optional(),
  totalMarks: z.string().min(1, { message: "Total marks required" }),
  instructions: z.string().optional(),

  mcqSections: z.array(mcqSectionSchema),
  fillBlankSections: z.array(fillBlankSectionSchema),
  shortQuestionSections: z.array(shortQuestionSectionSchema),
  longQuestionSections: z.array(longQuestionSectionSchema),
  matchingSections: z.array(matchingSectionSchema),
});

export type PaperValues = z.infer<typeof paperSchema>;
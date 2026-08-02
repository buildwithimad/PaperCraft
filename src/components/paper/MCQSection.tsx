"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PaperValues } from "@/validations/paper";
import { Plus, Trash2 } from "lucide-react"; // Make sure lucide-react is installed
import { useFieldArray, useFormContext } from "react-hook-form";

export function MCQSection({ lang }: { lang: "en" | "ur" }) {
  const { control, register } = useFormContext<PaperValues>();

  // 1. Parent Field Array: Manages the sections
  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "mcqSections",
  });

  const isUrdu = lang === "ur";

  return (
    <div className="space-y-6" dir={isUrdu ? "rtl" : "ltr"}>
      {sectionFields.map((section, sectionIndex) => (
        <Card key={section.id} className="rounded-lg border shadow-none">
          {/* Section Header & Title Input */}
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
            <div className="flex-1 space-y-2">
              <Label
                htmlFor={`mcq-title-${sectionIndex}`}
                className="text-sm font-medium"
              >
                {isUrdu ? "سیکشن کا عنوان (اختیاری)" : "Section Title (Optional)"}
              </Label>
              <Input
                id={`mcq-title-${sectionIndex}`}
                {...register(`mcqSections.${sectionIndex}.title`)}
                placeholder={
                  isUrdu
                    ? "مثال: حصہ اول - معروضی سوالات"
                    : "e.g., SECTION - A (Multiple Choice Questions)"
                }
                className="rounded-md"
                dir={isUrdu ? "rtl" : "ltr"}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="shrink-0 rounded-md text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => removeSection(sectionIndex)}
              title={isUrdu ? "سیکشن حذف کریں" : "Remove Section"}
              aria-label={isUrdu ? "سیکشن حذف کریں" : "Remove Section"}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            {/* 2. Child Component: Manages the questions for this specific section */}
            <MCQQuestionList sectionIndex={sectionIndex} lang={lang} />
          </CardContent>
        </Card>
      ))}

      {/* Button to add a completely new MCQ Section */}
      <Button
        type="button"
        variant="outline"
        className="w-full rounded-md border-dashed"
        onClick={() => appendSection({ title: "", questions: [] })}
      >
        <Plus className="mr-2 h-4 w-4" />
        {isUrdu ? "نیا ایم سی کیو سیکشن شامل کریں" : "Add New MCQ Section"}
      </Button>
    </div>
  );
}

// --- CHILD COMPONENT ---
function MCQQuestionList({
  sectionIndex,
  lang,
}: {
  sectionIndex: number;
  lang: "en" | "ur";
}) {
  const { control, register } = useFormContext<PaperValues>();
  const isUrdu = lang === "ur";

  // Child Field Array: Manages questions ONLY inside this specific sectionIndex
  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: `mcqSections.${sectionIndex}.questions`,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          {isUrdu ? "سوالات" : "Questions"}
        </span>
        <Badge variant="secondary" className="rounded-md font-normal">
          {questionFields.length} {isUrdu ? "سوالات" : "questions"}
        </Badge>
      </div>

      {questionFields.map((question, qIndex) => (
        <div key={question.id} className="space-y-4 rounded-md border p-4">
          {/* Question Header + Remove Button */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md p-0 font-normal"
              >
                {qIndex + 1}
              </Badge>
              <Label
                htmlFor={`mcq-question-${sectionIndex}-${qIndex}`}
                className="text-xs font-medium text-muted-foreground"
              >
                {isUrdu ? `سوال نمبر ${qIndex + 1}` : `Question ${qIndex + 1}`}
              </Label>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              onClick={() => removeQuestion(qIndex)}
              aria-label={isUrdu ? "سوال حذف کریں" : "Remove question"}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <Input
            id={`mcq-question-${sectionIndex}-${qIndex}`}
            {...register(`mcqSections.${sectionIndex}.questions.${qIndex}.question`)}
            placeholder={isUrdu ? "سوال درج کریں..." : "Enter question..."}
            className="rounded-md"
            dir={isUrdu ? "rtl" : "ltr"}
          />

          <div className="grid grid-cols-2 gap-3">
            {(["A", "B", "C", "D"] as const).map((opt) => (
              <div key={opt} className="space-y-1.5">
                <Label
                  htmlFor={`mcq-option-${sectionIndex}-${qIndex}-${opt}`}
                  className="text-xs text-muted-foreground"
                >
                  {isUrdu ? `آپشن ${opt}` : `Option ${opt}`}
                </Label>
                <Input
                  id={`mcq-option-${sectionIndex}-${qIndex}-${opt}`}
                  {...register(
                    `mcqSections.${sectionIndex}.questions.${qIndex}.option${opt}`
                  )}
                  placeholder={`Option ${opt}`}
                  className="rounded-md"
                  dir={isUrdu ? "rtl" : "ltr"}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Button to add a question to THIS section */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="rounded-md"
        onClick={() => appendSectionQuestion()} // Mapped to appendQuestion below
      >
        <Plus className="mr-1 h-4 w-4" />
        {isUrdu ? "سوال شامل کریں" : "Add Question"}
      </Button>
    </div>
  );

  function appendSectionQuestion() {
    appendQuestion({ question: "", optionA: "", optionB: "", optionC: "", optionD: "" });
  }
}
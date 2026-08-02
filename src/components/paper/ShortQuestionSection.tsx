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
import { Textarea } from "@/components/ui/textarea";
import { PaperValues } from "@/validations/paper";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

const translations = {
  en: {
    sectionTitlePlaceholder: "e.g., SECTION - C (Short Questions)",
    addSection: "Add New Short Question Section",
    addQuestion: "Add Short Question",
    questionPlaceholder: "Enter short question statement...",
    marks: "Marks",
    qPrefix: "Short Q# ",
    questions: "Questions",
  },
  ur: {
    sectionTitlePlaceholder: "مثال: حصہ سوم - مختصر سوالات",
    addSection: "نیا مختصر سوالات کا سیکشن شامل کریں",
    addQuestion: "سوال شامل کریں",
    questionPlaceholder: "مختصر سوال کا متن درج کریں...",
    marks: "نمبر",
    qPrefix: "سوال نمبر ",
    questions: "سوالات",
  },
};

export function ShortQuestionSection({ lang }: { lang: "en" | "ur" }) {
  const t = translations[lang];
  const { control, register } = useFormContext<PaperValues>();

  // Parent Field Array: Manages the sections
  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "shortQuestionSections",
  });

  const isUrdu = lang === "ur";

  return (
    <div className="space-y-6" dir={isUrdu ? "rtl" : "ltr"}>
      {sectionFields.map((section, sectionIndex) => (
        <Card key={section.id} className="rounded-lg border shadow-none">
          {/* Section Header */}
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
            <div className="flex-1 space-y-2">
              <Label
                htmlFor={`short-title-${sectionIndex}`}
                className="text-sm font-medium"
              >
                {isUrdu ? "سیکشن کا عنوان (اختیاری)" : "Section Title (Optional)"}
              </Label>
              <Input
                id={`short-title-${sectionIndex}`}
                {...register(`shortQuestionSections.${sectionIndex}.title`)}
                placeholder={t.sectionTitlePlaceholder}
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
            {/* Child Component for Questions */}
            <ShortQuestionList sectionIndex={sectionIndex} lang={lang} />
          </CardContent>
        </Card>
      ))}

      {/* Button to add a new Short Question Section */}
      <Button
        type="button"
        variant="outline"
        className="w-full rounded-md border-dashed"
        onClick={() => appendSection({ title: "", questions: [] })}
      >
        <Plus className="mr-2 h-4 w-4" />
        {t.addSection}
      </Button>
    </div>
  );
}

// --- CHILD COMPONENT ---
function ShortQuestionList({
  sectionIndex,
  lang,
}: {
  sectionIndex: number;
  lang: "en" | "ur";
}) {
  const t = translations[lang];
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<PaperValues>();
  const isUrdu = lang === "ur";

  // Child Field Array: Manages questions ONLY inside this specific section
  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: `shortQuestionSections.${sectionIndex}.questions`,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          {t.questions}
        </span>
        <Badge variant="secondary" className="rounded-md font-normal">
          {questionFields.length} {t.questions}
        </Badge>
      </div>

      {questionFields.map((question, qIndex) => {
        // Safely access nested errors for this specific question
        const err = errors.shortQuestionSections?.[sectionIndex]?.questions?.[qIndex];

        return (
          <div key={question.id} className="space-y-3 rounded-md border p-4">
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className="rounded-md font-normal text-muted-foreground"
              >
                {t.qPrefix}
                {qIndex + 1}
              </Badge>
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

            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Question Textarea */}
              <div className="flex-1 space-y-1.5">
                <Textarea
                  rows={2} // Slightly smaller than Long Questions
                  {...register(`shortQuestionSections.${sectionIndex}.questions.${qIndex}.question`)}
                  placeholder={t.questionPlaceholder}
                  className="rounded-md"
                  dir={isUrdu ? "rtl" : "ltr"}
                  aria-invalid={!!err?.question}
                />
                {err?.question && (
                  <p className="text-xs text-destructive">{err.question.message}</p>
                )}
              </div>

              {/* Marks Input */}
              <div className="flex w-full flex-col gap-1.5 sm:w-28">
                <Label
                  htmlFor={`short-marks-${sectionIndex}-${qIndex}`}
                  className="text-xs font-medium text-muted-foreground"
                >
                  {t.marks}
                </Label>
                <Input
                  id={`short-marks-${sectionIndex}-${qIndex}`}
                  {...register(`shortQuestionSections.${sectionIndex}.questions.${qIndex}.marks`)}
                  placeholder="2" // Default placeholder for short questions
                  className="rounded-md"
                  dir={isUrdu ? "rtl" : "ltr"}
                  aria-invalid={!!err?.marks}
                />
                {err?.marks && (
                  <p className="text-xs text-destructive">{err.marks.message}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Button to add a question to THIS section */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="rounded-md"
        onClick={() => appendQuestion({ question: "", marks: "2" })} // Defaults to 2 marks
      >
        <Plus className="mr-1 h-4 w-4" />
        {t.addQuestion}
      </Button>
    </div>
  );
}
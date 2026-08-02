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
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export function FillBlankSection({ lang }: { lang: "en" | "ur" }) {
  const { control, register } = useFormContext<PaperValues>();

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "fillBlankSections",
  });

  const isUrdu = lang === "ur";

  return (
    <div className="space-y-6" dir={isUrdu ? "rtl" : "ltr"}>
      {sectionFields.map((section, sectionIndex) => (
        <Card key={section.id} className="rounded-lg border shadow-none">
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
            <div className="flex-1 space-y-2">
              <Label
                htmlFor={`fill-blank-title-${sectionIndex}`}
                className="text-sm font-medium"
              >
                {isUrdu ? "سیکشن کا عنوان (اختیاری)" : "Section Title (Optional)"}
              </Label>
              <Input
                id={`fill-blank-title-${sectionIndex}`}
                {...register(`fillBlankSections.${sectionIndex}.title`)}
                placeholder={
                  isUrdu
                    ? "مثال: حصہ دوم - خالی جگہیں"
                    : "e.g., SECTION - B (Fill in the blanks)"
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
              aria-label={isUrdu ? "سیکشن حذف کریں" : "Remove section"}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <FillBlankQuestionList sectionIndex={sectionIndex} lang={lang} />
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full rounded-md border-dashed"
        onClick={() => appendSection({ title: "", questions: [] })}
      >
        <Plus className="mr-2 h-4 w-4" />
        {isUrdu ? "نیا خالی جگہوں کا سیکشن شامل کریں" : "Add New Fill-in-Blanks Section"}
      </Button>
    </div>
  );
}

function FillBlankQuestionList({
  sectionIndex,
  lang,
}: {
  sectionIndex: number;
  lang: "en" | "ur";
}) {
  const { control, register } = useFormContext<PaperValues>();
  const isUrdu = lang === "ur";

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: `fillBlankSections.${sectionIndex}.questions`,
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

      <div className="space-y-3">
        {questionFields.map((question, qIndex) => (
          <div
            key={question.id}
            className="flex items-center gap-3 rounded-md border p-3"
          >
            <Badge
              variant="outline"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md p-0 font-normal"
            >
              {qIndex + 1}
            </Badge>
            <Input
              {...register(
                `fillBlankSections.${sectionIndex}.questions.${qIndex}.question`
              )}
              placeholder={
                isUrdu
                  ? "جملہ درج کریں (خالی جگہ کے لیے ______ استعمال کریں)"
                  : "Enter sentence (use ______ for blank)"
              }
              className="flex-1 rounded-md"
              dir={isUrdu ? "rtl" : "ltr"}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              onClick={() => removeQuestion(qIndex)}
              aria-label={isUrdu ? "سوال حذف کریں" : "Remove question"}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="rounded-md"
        onClick={() => appendQuestion({ question: "" })}
      >
        <Plus className="mr-1 h-4 w-4" />
        {isUrdu ? "خالی جگہ شامل کریں" : "Add Blank"}
      </Button>
    </div>
  );
}
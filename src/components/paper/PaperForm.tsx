"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { savePaperAction, updatePaperAction } from "@/actions/paper";
import { FillBlankSection } from "@/components/paper/FillBlankSection";
import { LongQuestionSection } from "@/components/paper/LongQuestionSection";
import { MCQSection } from "@/components/paper/MCQSection";
import { PaperDetails } from "@/components/paper/PaperDetails";
import { ShortQuestionSection } from "@/components/paper/ShortQuestionSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PaperValues, paperSchema } from "@/validations/paper";

interface PaperFormProps {
  lang: "en" | "ur";
  paperId?: string;
  defaultValues?: PaperValues;
}

export function PaperForm({ lang, paperId, defaultValues }: PaperFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const isUrdu = lang === "ur";
  const isEdit = !!paperId;

  const methods = useForm<PaperValues>({
    resolver: zodResolver(paperSchema),
    defaultValues: defaultValues || {
      logo: "",
      schoolName: "",
      examName: "",
      className: "",
      subject: "",
      date: new Date().toISOString().split("T")[0],
      time: "",
      totalMarks: "",
      instructions: "",
      mcqSections: [
        {
          title: isUrdu
            ? "حصہ اول: کثیر الانتخابی سوالات"
            : "SECTION - A (Multiple Choice Questions)",
          questions: [],
        },
      ],
      fillBlankSections: [],
      shortQuestionSections: [],
      longQuestionSections: [],
    },
  });

  const mcqCount = methods.watch("mcqSections")?.length ?? 0;
  const fillBlankCount = methods.watch("fillBlankSections")?.length ?? 0;
  const shortCount = methods.watch("shortQuestionSections")?.length ?? 0;
  const longCount = methods.watch("longQuestionSections")?.length ?? 0;

  const onSubmit = async (data: PaperValues) => {
    console.log("SUBMIT DATA:", data);
    setIsSaving(true);

    try {
      let result;
      if (isEdit && paperId) {
        result = await updatePaperAction(paperId, data);
      } else {
        result = await savePaperAction(data);
      }

      if (result.success && result.paperId) {
        toast.success(
          isUrdu
            ? isEdit
              ? "پیپر کامیابی سے اپ ڈیٹ ہو گیا!"
              : "پیپر کامیابی سے محفوظ ہو گیا!"
            : isEdit
              ? "Paper updated successfully!"
              : "Paper saved successfully!"
        );
        router.push(`/${lang}/paper/${result.paperId}`);
      } else {
        toast.error(
          result.error || (isUrdu ? "خرابی پیش آئی" : "Something went wrong")
        );
        setIsSaving(false);
      }
    } catch (err) {
      toast.error(
        isUrdu ? "غیر متوقع خرابی پیش آئی" : "An unexpected error occurred"
      );
      setIsSaving(false);
    }
  };

  return (
    <div
      className="mx-auto max-w-[1400px] space-y-10 px-2 py-10 sm:px-2 lg:px-8"
      dir={isUrdu ? "rtl" : "ltr"}
    >
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          {isUrdu
            ? isEdit
              ? "پیپر میں ترمیم کریں"
              : "امتحانی پرچہ بنائیں"
            : isEdit
              ? "Edit Paper"
              : "Create Examination Paper"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isUrdu
            ? isEdit
              ? "محفوظ شدہ پیپر میں تبدیلیاں کریں۔"
              : "اسکولوں کے لیے پیشہ ورانہ امتحانی پرچے تیار کریں۔"
            : isEdit
              ? "Make changes to your saved paper."
              : "Create professional examination papers for schools."}
        </p>
      </div>

      <Separator />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-10">
          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50/50 pb-4">
              <CardTitle className="text-lg font-semibold text-slate-900">
                {isUrdu ? "ہیڈر اور بنیادی تفصیلات" : "Header & Basic Details"}
              </CardTitle>
              <CardDescription>
                {isUrdu
                  ? "اسکول، مضمون اور امتحان سے متعلق بنیادی معلومات درج کریں۔"
                  : "Enter the school, subject, and exam-level information for this paper."}
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <PaperDetails lang={lang} />
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 bg-slate-50/50 pb-4">
              <div className="space-y-1.5">
                <CardTitle className="text-lg font-semibold text-slate-900">
                  {isUrdu
                    ? "کثیر الانتخابی سوالات (MCQs)"
                    : "Multiple Choice Questions"}
                </CardTitle>
                <CardDescription>
                  {isUrdu
                    ? "معروضی سوالات اور ان کے آپشنز شامل کریں۔"
                    : "Add objective questions with four options each."}
                </CardDescription>
              </div>
              <Badge
                variant="secondary"
                className="shrink-0 rounded-md font-normal"
              >
                {mcqCount} {isUrdu ? "سیکشنز" : "sections"}
              </Badge>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <MCQSection lang={lang} />
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 bg-slate-50/50 pb-4">
              <div className="space-y-1.5">
                <CardTitle className="text-lg font-semibold text-slate-900">
                  {isUrdu ? "خالی جگہیں پر کریں" : "Fill in the Blanks"}
                </CardTitle>
                <CardDescription>
                  {isUrdu
                    ? "خالی جگہوں کے ساتھ جملے شامل کریں۔"
                    : "Add sentences with a blank for students to complete."}
                </CardDescription>
              </div>
              <Badge
                variant="secondary"
                className="shrink-0 rounded-md font-normal"
              >
                {fillBlankCount} {isUrdu ? "سیکشنز" : "sections"}
              </Badge>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <FillBlankSection lang={lang} />
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 bg-slate-50/50 pb-4">
              <div className="space-y-1.5">
                <CardTitle className="text-lg font-semibold text-slate-900">
                  {isUrdu ? "مختصر سوالات" : "Short Questions"}
                </CardTitle>
                <CardDescription>
                  {isUrdu
                    ? "مختصر جوابات والے سوالات شامل کریں۔"
                    : "Add short-answer questions with marks allocation."}
                </CardDescription>
              </div>
              <Badge
                variant="secondary"
                className="shrink-0 rounded-md font-normal"
              >
                {shortCount} {isUrdu ? "سیکشنز" : "sections"}
              </Badge>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <ShortQuestionSection lang={lang} />
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 bg-slate-50/50 pb-4">
              <div className="space-y-1.5">
                <CardTitle className="text-lg font-semibold text-slate-900">
                  {isUrdu ? "تفصیلی سوالات" : "Long Questions"}
                </CardTitle>
                <CardDescription>
                  {isUrdu
                    ? "تفصیلی یا مضمون نما سوالات شامل کریں۔"
                    : "Add long-form or essay-style questions with marks allocation."}
                </CardDescription>
              </div>
              <Badge
                variant="secondary"
                className="shrink-0 rounded-md font-normal"
              >
                {longCount} {isUrdu ? "سیکشنز" : "sections"}
              </Badge>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <LongQuestionSection lang={lang} />
            </CardContent>
          </Card>

          <div className="flex justify-end border-t pt-6">
            <Button
              type="submit"
              size="lg"
              loading={isSaving}
              loadingText={
                isUrdu
                  ? isEdit
                    ? "اپ ڈیٹ ہو رہا ہے..."
                    : "محفوظ ہو رہا ہے..."
                  : isEdit
                    ? "Updating Paper..."
                    : "Saving Paper..."
              }
              className="w-full rounded-md sm:w-auto sm:min-w-[200px]"
            >
              {isUrdu
                ? isEdit
                  ? "پیپر اپ ڈیٹ کریں"
                  : "پیپر بنائیں اور پرنٹ کریں"
                : isEdit
                  ? "Update Paper"
                  : "Generate Paper & Print"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

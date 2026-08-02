"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { savePaperAction } from "@/actions/paper";
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

interface PageProps {
  params: Promise<{
    lang: "en" | "ur";
  }>;
}

export default function CreatePaperPage({ params }: PageProps) {
  // 1. React.use() unwraps the Promise params properly in modern Next.js
  const { lang } = use(params);
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const isUrdu = lang === "ur";

  // 2. Form state initialization with matching schema structure
  const methods = useForm<PaperValues>({
    resolver: zodResolver(paperSchema),
    defaultValues: {
      logo: "",
      schoolName: "",
      examName: "",
      className: "",
      subject: "",
      date: new Date().toISOString().split("T")[0], // Default to today's date YYYY-MM-DD
      time: "",
      totalMarks: "",
      instructions: "",
      mcqSections: [
        {
          title: isUrdu ? "حصہ اول: کثیر الانتخابی سوالات" : "SECTION - A (Multiple Choice Questions)",
          questions: [],
        },
      ],
      fillBlankSections: [],
      shortQuestionSections: [],
      longQuestionSections: [],
    },
  });

  // Live section counts for the card badges — read-only watch, no logic change
  const mcqCount = methods.watch("mcqSections")?.length ?? 0;
  const fillBlankCount = methods.watch("fillBlankSections")?.length ?? 0;
  const shortCount = methods.watch("shortQuestionSections")?.length ?? 0;
  const longCount = methods.watch("longQuestionSections")?.length ?? 0;

  const onSubmit = async (data: PaperValues) => {
    setIsSaving(true);

    try {
      // 3. Save to Supabase JSONB column via Server Action
      const result = await savePaperAction(data);

      if (result.success) {
        toast.success(
          isUrdu ? "پیپر کامیابی سے محفوظ ہو گیا!" : "Paper saved successfully!"
        );
        // Redirect to printable paper page
        router.push(`/${lang}/paper/${result.paperId}`);
      } else {
        toast.error(result.error || (isUrdu ? "خرابی پیش آئی" : "Something went wrong"));
        setIsSaving(false);
      }
    } catch (err) {
      toast.error(isUrdu ? "غیر متوقع خرابی پیش آئی" : "An unexpected error occurred");
      setIsSaving(false);
    }
  };

  return (
    <div
      className="mx-auto max-w-[1200px] space-y-8 px-4 py-8 sm:px-6 lg:px-8"
      dir={isUrdu ? "rtl" : "ltr"}
    >
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">
          {isUrdu ? "امتحانی پرچہ بنائیں" : "Create Examination Paper"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isUrdu
            ? "اسکولوں کے لیے پیشہ ورانہ امتحانی پرچے تیار کریں۔"
            : "Create professional examination papers for schools."}
        </p>
      </div>

      <Separator />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Basic Metadata Header Information */}
          <Card className="rounded-lg border shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-medium">
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

          {/* Section 2: Multiple Choice Questions */}
          <Card className="rounded-lg border shadow-none">
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
              <div className="space-y-1.5">
                <CardTitle className="text-base font-medium">
                  {isUrdu ? "کثیر الانتخابی سوالات (MCQs)" : "Multiple Choice Questions"}
                </CardTitle>
                <CardDescription>
                  {isUrdu
                    ? "معروضی سوالات اور ان کے آپشنز شامل کریں۔"
                    : "Add objective questions with four options each."}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="shrink-0 rounded-md font-normal">
                {mcqCount} {isUrdu ? "سیکشنز" : "sections"}
              </Badge>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <MCQSection lang={lang} />
            </CardContent>
          </Card>

          {/* Section 3: Fill in the Blanks */}
          <Card className="rounded-lg border shadow-none">
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
              <div className="space-y-1.5">
                <CardTitle className="text-base font-medium">
                  {isUrdu ? "خالی جگہیں پر کریں" : "Fill in the Blanks"}
                </CardTitle>
                <CardDescription>
                  {isUrdu
                    ? "خالی جگہوں کے ساتھ جملے شامل کریں۔"
                    : "Add sentences with a blank for students to complete."}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="shrink-0 rounded-md font-normal">
                {fillBlankCount} {isUrdu ? "سیکشنز" : "sections"}
              </Badge>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <FillBlankSection lang={lang} />
            </CardContent>
          </Card>

          {/* Section 4: Short Questions */}
          <Card className="rounded-lg border shadow-none">
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
              <div className="space-y-1.5">
                <CardTitle className="text-base font-medium">
                  {isUrdu ? "مختصر سوالات" : "Short Questions"}
                </CardTitle>
                <CardDescription>
                  {isUrdu
                    ? "مختصر جوابات والے سوالات شامل کریں۔"
                    : "Add short-answer questions with marks allocation."}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="shrink-0 rounded-md font-normal">
                {shortCount} {isUrdu ? "سیکشنز" : "sections"}
              </Badge>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <ShortQuestionSection lang={lang} />
            </CardContent>
          </Card>

          {/* Section 5: Long Questions */}
          <Card className="rounded-lg border shadow-none">
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
              <div className="space-y-1.5">
                <CardTitle className="text-base font-medium">
                  {isUrdu ? "تفصیلی سوالات" : "Long Questions"}
                </CardTitle>
                <CardDescription>
                  {isUrdu
                    ? "تفصیلی یا مضمون نما سوالات شامل کریں۔"
                    : "Add long-form or essay-style questions with marks allocation."}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="shrink-0 rounded-md font-normal">
                {longCount} {isUrdu ? "سیکشنز" : "sections"}
              </Badge>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <LongQuestionSection lang={lang} />
            </CardContent>
          </Card>

          {/* Form Actions Footer */}
          <div className="flex justify-end border-t pt-6">
            <Button
              type="submit"
              size="lg"
              loading={isSaving}
              loadingText={isUrdu ? "محفوظ ہو رہا ہے..." : "Saving Paper..."}
              className="w-full rounded-md sm:w-auto sm:min-w-[200px]"
            >
              {isUrdu ? "پیپر بنائیں اور پرنٹ کریں" : "Generate Paper & Print"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
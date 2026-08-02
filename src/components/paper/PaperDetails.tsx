"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PaperValues } from "@/validations/paper";
import { useFormContext } from "react-hook-form";

const labels = {
  en: {
    schoolName: "School Name",
    examName: "Exam Name",
    className: "Class",
    subject: "Subject",
    date: "Date",
    time: "Time / Duration",
    totalMarks: "Total Marks",
    instructions: "Instructions (Optional)",
    placeholders: {
      schoolName: "e.g., Army Public School",
      examName: "e.g., First Term Examination 2026",
      className: "e.g., Class 9 or 10th",
      subject: "e.g., Mathematics",
      date: "YYYY-MM-DD",
      time: "e.g., 2 Hours or 30 Mins",
      totalMarks: "e.g., 75",
      instructions: "1. All questions are compulsory.\n2. Use of calculator is allowed.",
    },
  },
  ur: {
    schoolName: "اسکول کا نام",
    examName: "امتحان کا نام",
    className: "جماعت",
    subject: "مضمون",
    date: "تاریخ",
    time: "وقت / دورانیہ",
    totalMarks: "کل نمبر",
    instructions: "ہدایات (اختیاری)",
    placeholders: {
      schoolName: "مثال: گورنمنٹ ہائی اسکول",
      examName: "مثال: سالانہ امتحان ۲۰۲۶",
      className: "مثال: نہم یا دہم",
      subject: "مثال: ریاضی",
      date: "سال-مہینہ-دن",
      time: "مثال: ۲ گھنٹے",
      totalMarks: "مثال: ۷۵",
      instructions: "۱۔ تمام سوالات لازمی ہیں۔\n۲۔ کیلکولیٹر کے استعمال کی اجازت ہے۔",
    },
  },
};

export function PaperDetails({ lang }: { lang: "en" | "ur" }) {
  const t = labels[lang];
  const isUrdu = lang === "ur";

  // Access react-hook-form directly from FormProvider
  const {
    register,
    formState: { errors },
  } = useFormContext<PaperValues>();

  return (
    <div className="space-y-6" dir={isUrdu ? "rtl" : "ltr"}>
      {/* Top Row: School & Exam Name */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="schoolName">
            {t.schoolName} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="schoolName"
            {...register("schoolName")}
            placeholder={t.placeholders.schoolName}
            dir={isUrdu ? "rtl" : "ltr"}
            className="rounded-md"
            aria-invalid={!!errors.schoolName}
          />
          {errors.schoolName && (
            <p className="text-xs text-destructive">{errors.schoolName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="examName">
            {t.examName} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="examName"
            {...register("examName")}
            placeholder={t.placeholders.examName}
            dir={isUrdu ? "rtl" : "ltr"}
            className="rounded-md"
            aria-invalid={!!errors.examName}
          />
          {errors.examName && (
            <p className="text-xs text-destructive">{errors.examName.message}</p>
          )}
        </div>
      </div>

      {/* Middle Grid: Class, Subject, Total Marks, Date, Time */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <div className="space-y-2">
          <Label htmlFor="className">
            {t.className} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="className"
            {...register("className")}
            placeholder={t.placeholders.className}
            dir={isUrdu ? "rtl" : "ltr"}
            className="rounded-md"
            aria-invalid={!!errors.className}
          />
          {errors.className && (
            <p className="text-xs text-destructive">{errors.className.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">
            {t.subject} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="subject"
            {...register("subject")}
            placeholder={t.placeholders.subject}
            dir={isUrdu ? "rtl" : "ltr"}
            className="rounded-md"
            aria-invalid={!!errors.subject}
          />
          {errors.subject && (
            <p className="text-xs text-destructive">{errors.subject.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalMarks">
            {t.totalMarks} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="totalMarks"
            {...register("totalMarks")}
            placeholder={t.placeholders.totalMarks}
            dir={isUrdu ? "rtl" : "ltr"}
            className="rounded-md"
            aria-invalid={!!errors.totalMarks}
          />
          {errors.totalMarks && (
            <p className="text-xs text-destructive">{errors.totalMarks.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">
            {t.date} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="date"
            type="date"
            {...register("date")}
            className="rounded-md"
            aria-invalid={!!errors.date}
          />
          {errors.date && (
            <p className="text-xs text-destructive">{errors.date.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">{t.time}</Label>
          <Input
            id="time"
            {...register("time")}
            placeholder={t.placeholders.time}
            dir={isUrdu ? "rtl" : "ltr"}
            className="rounded-md"
          />
        </div>
      </div>

      {/* Bottom Row: Instructions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="instructions">{t.instructions}</Label>
          <Textarea
            id="instructions"
            rows={3}
            {...register("instructions")}
            placeholder={t.placeholders.instructions}
            dir={isUrdu ? "rtl" : "ltr"}
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
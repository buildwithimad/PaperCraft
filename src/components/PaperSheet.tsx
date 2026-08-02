"use client";

import { PaperValues } from "@/validations/paper";
import { useEffect, useRef } from "react";

interface PaperSheetProps {
  data: PaperValues;
  lang: "en" | "ur";
}

const labels = {
  en: {
    class: "Class",
    subject: "Subject",
    date: "Date",
    totalMarks: "Total Marks",
    obtMarks: "Obt. Marks",
    checkedBy: "Checked by",
    recheckedBy: "Rechecked by",
    invigilator: "Invigilator",
    instructionsHeading: "Instructions:",
    teacherSign: "Teacher Signature",
    principalSign: "Principal Signature",
    optA: "(A)",
    optB: "(B)",
    optC: "(C)",
    optD: "(D)",
    defaultSectionA: "SECTION - A",
    defaultSectionB: "SECTION - B",
    defaultSectionC: "SECTION - C",
    defaultSectionD: "SECTION - D",
  },
  ur: {
    class: "جماعت",
    subject: "مضمون",
    date: "تاریخ",
    totalMarks: "کل نمبر",
    obtMarks: "حاصل کردہ نمبر",
    checkedBy: "چیک کنندہ",
    recheckedBy: "دوبارہ چیک کنندہ",
    invigilator: "نگران",
    instructionsHeading: "ہدایات:",
    teacherSign: "دستخط استاد",
    principalSign: "دستخط پرنسپل",
    optA: "الف)",
    optB: "ب)",
    optC: "ج)",
    optD: "د)",
    defaultSectionA: "حصہ اول",
    defaultSectionB: "حصہ دوم",
    defaultSectionC: "حصہ سوم",
    defaultSectionD: "حصہ چہارم",
  },
};

// A4 usable height in px at 96dpi, after the 8mm @page margin on top and bottom.
const A4_HEIGHT_MM = 297;
const PAGE_MARGIN_MM = 8;
const MM_TO_PX = 3.7795275591;
const MAX_PRINT_HEIGHT_PX = Math.floor(
  (A4_HEIGHT_MM - PAGE_MARGIN_MM * 2) * MM_TO_PX
);

export function PaperSheet({ data, lang }: PaperSheetProps) {
  const t = labels[lang];
  const isRtl = lang === "ur";
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sheetRef.current;
    if (!node) return;

    const fitToOnePage = () => {
      // Reset before measuring, so we always measure true content height.
      node.style.zoom = "1";

      const contentHeight = node.scrollHeight;

      if (contentHeight > MAX_PRINT_HEIGHT_PX) {
        const scale = MAX_PRINT_HEIGHT_PX / contentHeight;
        // `zoom` (unlike transform: scale) reflows the box, so the
        // print engine's page-break calculation sees the smaller size.
        node.style.zoom = String(scale);
      }
    };

    const resetZoom = () => {
      node.style.zoom = "1";
    };

    window.addEventListener("beforeprint", fitToOnePage);
    window.addEventListener("afterprint", resetZoom);

    return () => {
      window.removeEventListener("beforeprint", fitToOnePage);
      window.removeEventListener("afterprint", resetZoom);
    };
  }, [data]);

  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 8mm;
          }
        }
      `}</style>

      <div
        ref={sheetRef}
        dir={isRtl ? "rtl" : "ltr"}
        className="mx-auto flex flex-col bg-white text-black font-serif text-[11px] leading-tight p-6 sm:p-8 print:p-6 print:m-0 w-full max-w-[210mm] print:min-h-0 shadow-none print:shadow-none print:border-none box-border"
      >
        {/* Header and Info Table Combined Structure */}
        <div className="border border-black mb-2 print:mb-0">
          {/* Top Row: Logo & Titles */}
          <div className="flex border-b border-black">
            {/* Logo Section */}
            <div className="w-14 h-14 sm:w-20 sm:h-20 p-1.5 flex items-center justify-center border-e border-black shrink-0 bg-white">
              {/* Uses custom URL if provided, otherwise defaults to public/logo.png */}
              <img
                src={data.logo || "/logo.png"}
                alt="School Logo"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Titles Section */}
            <div className="flex-1 flex flex-col items-center justify-center p-2 text-center">
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight m-0 leading-tight">
                {data.schoolName}
              </h1>
              <h2 className="text-sm sm:text-lg font-bold mt-1 mb-0">
                {data.examName}
              </h2>
            </div>
          </div>

          {/* 3x3 Details Grid */}
          <div className="grid grid-cols-3 text-[11px] sm:text-[13px]">
            {/* Row 1 */}
            <div className="border-b border-e border-black p-1.5 sm:p-2 flex gap-1.5 items-center">
              <span className="font-bold whitespace-nowrap">{t.date}:</span>
              <span className="font-semibold">{data.date}</span>
            </div>
            <div className="border-b border-e border-black p-1.5 sm:p-2 flex gap-1.5 items-center">
              <span className="font-bold whitespace-nowrap">{t.class}:</span>
              <span className="font-semibold">{data.className}</span>
            </div>
            <div className="border-b border-black p-1.5 sm:p-2 flex gap-1.5 items-center">
              <span className="font-bold whitespace-nowrap">{t.subject}:</span>
              <span className="font-semibold">{data.subject}</span>
            </div>

            {/* Row 2 */}
            <div className="border-b border-e border-black p-1.5 sm:p-2 flex gap-1.5 items-center">
              <span className="font-bold whitespace-nowrap">{t.totalMarks}:</span>
              <span className="font-semibold">{data.totalMarks}</span>
            </div>
            <div className="border-b border-e border-black p-1.5 sm:p-2 flex gap-1.5 items-center">
              <span className="font-bold whitespace-nowrap">{t.obtMarks}:</span>
            </div>
            <div className="border-b border-black p-1.5 sm:p-2 flex gap-1.5 items-center">
              <span className="font-bold whitespace-nowrap">{t.checkedBy}:</span>
            </div>

            {/* Row 3 - Invigilator spans 2 columns to perfectly fill the grid */}
            <div className="border-e border-black p-1.5 sm:p-2 flex gap-1.5 items-center">
              <span className="font-bold whitespace-nowrap">{t.recheckedBy}:</span>
            </div>
            <div className="col-span-2 p-1.5 sm:p-2 flex gap-1.5 items-center">
              <span className="font-bold whitespace-nowrap">{t.invigilator}:</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        {data.instructions && (
          <div className="mb-2 text-[10px] sm:text-[11px] border-b border-black pb-1">
            <span className="font-bold inline-block mr-1">{t.instructionsHeading}</span><br />
            <span className="whitespace-pre-line leading-tight">{data.instructions}</span>
          </div>
        )}

        {/* --- NESTED SECTION RENDERING --- */}

        {/* 1. MCQ Sections */}
        {data.mcqSections?.map((section, sIdx) => {
          if (!section.questions || section.questions.length === 0) return null;
          return (
            <div key={`mcq-sec-${sIdx}`} className="mb-2">
              <div className="bg-zinc-100 print:bg-transparent border-y border-black py-0.5 px-1 mb-1.5 font-bold text-[11px] uppercase">
                {section.title || t.defaultSectionA}
              </div>
              <div className="space-y-1.5">
                {section.questions.map((mcq, idx) => (
                  <div key={idx}>
                    <p className="font-medium m-0">
                      <span className="font-bold">{idx + 1}.</span> {mcq.question}
                    </p>
                    <div className="grid grid-cols-4 gap-1 pl-4 rtl:pr-4">
                      <div><span className="font-semibold">{t.optA}</span> {mcq.optionA}</div>
                      <div><span className="font-semibold">{t.optB}</span> {mcq.optionB}</div>
                      <div><span className="font-semibold">{t.optC}</span> {mcq.optionC}</div>
                      <div><span className="font-semibold">{t.optD}</span> {mcq.optionD}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* 2. Fill in the Blanks Sections */}
        {data.fillBlankSections?.map((section, sIdx) => {
          if (!section.questions || section.questions.length === 0) return null;
          return (
            <div key={`fb-sec-${sIdx}`} className="mb-2">
              <div className="bg-zinc-100 print:bg-transparent border-y border-black py-0.5 px-1 mb-1.5 font-bold text-[11px] uppercase">
                {section.title || t.defaultSectionB}
              </div>
              <div className="space-y-1">
                {section.questions.map((fb, idx) => (
                  <div key={idx}>
                    <span className="font-bold">{idx + 1}.</span> {fb.question}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* 3. Short Questions Sections */}
        {data.shortQuestionSections?.map((section, sIdx) => {
          if (!section.questions || section.questions.length === 0) return null;
          return (
            <div key={`sq-sec-${sIdx}`} className="mb-2">
              <div className="bg-zinc-100 print:bg-transparent border-y border-black py-0.5 px-1 mb-1.5 font-bold text-[11px] uppercase">
                {section.title || t.defaultSectionC}
              </div>
              <div className="space-y-1">
                {section.questions.map((sq, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-1">
                    <div>
                      <span className="font-bold">{idx + 1}.</span> {sq.question}
                    </div>
                    <div className="font-bold whitespace-nowrap border border-black px-1 rounded text-[9px]">
                      [{sq.marks}]
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* 4. Long Questions Sections */}
        {data.longQuestionSections?.map((section, sIdx) => {
          if (!section.questions || section.questions.length === 0) return null;
          return (
            <div key={`lq-sec-${sIdx}`} className="mb-2">
              <div className="bg-zinc-100 print:bg-transparent border-y border-black py-0.5 px-1 mb-1.5 font-bold text-[11px] uppercase">
                {section.title || t.defaultSectionD}
              </div>
              <div className="space-y-1.5">
                {section.questions.map((lq, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-1">
                    <div>
                      <span className="font-bold">{idx + 1}.</span> {lq.question}
                    </div>
                    <div className="font-bold whitespace-nowrap border border-black px-1 rounded text-[9px]">
                      [{lq.marks}]
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Footer Signatures */}
        <div className="mt-8 pt-2 pb-2 flex justify-between items-end font-bold text-[10px]">
          <div className="text-center">
            <div className="w-32 border-b border-black mb-1"></div>
            {t.teacherSign}
          </div>

          <div className="text-center">
            <div className="w-32 border-b border-black mb-1"></div>
            {t.principalSign}
          </div>
        </div>
      </div>
    </>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Printer } from "lucide-react";
import Link from "next/link";

interface PrintActionsProps {
  lang: "en" | "ur";
}

export function PrintActions({ lang }: PrintActionsProps) {
  const isUrdu = lang === "ur";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="sticky top-4 z-50 max-w-[210mm] mx-auto px-4 mb-6 print:hidden">
      <Card className="border border-border rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-center justify-between sm:justify-between gap-4 sm:gap-4">
        <Link href={`/${lang}/paper`}>
          <Button variant="ghost" size="sm" className="w-full sm:w-auto">
            <ArrowLeft className={`h-4 w-4 ${isUrdu ? "rotate-180 ml-2" : "mr-2"}`} />
            {isUrdu ? "پیپر بنائیں" : "Back to Form"}
          </Button>
        </Link>

        <Button variant="default" size="sm" className="w-full sm:w-auto" onClick={handlePrint}>
          <Printer className={`h-4 w-4 ${isUrdu ? "ml-2" : "mr-2"}`} />
          {isUrdu ? "پیپر پرنٹ کریں / PDF" : "Print / Save PDF"}
        </Button>
      </Card>
    </div>
  );
}
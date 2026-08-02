import { PaperSheet } from "@/components/PaperSheet"; // Import PaperSheet component
import { PrintActions } from "@/components/paper/PrintActions";
import { createClient } from "@/utils/supabase/server";
import { PaperValues } from "@/validations/paper";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    lang: "en" | "ur";
    id: string;
  }>;
}

export default async function ViewPaperPage({ params }: PageProps) {
  const { lang, id } = await params;
  const supabase = await createClient();

  // Fetch paper row by UUID from Supabase
  const { data: paper, error } = await supabase
    .from("papers")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !paper) {
    notFound();
  }

  // Cast the stored JSONB data to your form's PaperValues type
  const paperData = paper.paper_data as PaperValues;

  return (
    <div className="min-h-screen bg-slate-100 py-8 print:bg-white print:py-0">
  <PrintActions lang={lang} />

  <main
    id="paper-sheet"
    className="max-w-[210mm] mx-auto shadow-md print:shadow-none print:max-w-none print:w-full"
  >
    <PaperSheet data={paperData} lang={lang} />
  </main>
</div>
  );
}
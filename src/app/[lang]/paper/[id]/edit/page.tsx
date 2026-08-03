import { PaperForm } from "@/components/paper/PaperForm";
import { getPaperById } from "@/services/paperServices";
import { PaperValues } from "@/validations/paper";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    lang: "en" | "ur";
    id: string;
  }>;
}

export default async function EditPaperPage({ params }: PageProps) {
  const { lang, id } = await params;

  try {
    const paper = await getPaperById(id);
    const defaultValues = paper.paper_data as PaperValues;

    return (
      <PaperForm lang={lang} paperId={id} defaultValues={defaultValues} />
    );
  } catch (error) {
    // If the paper doesn't exist or the user doesn't own it, show 404
    notFound();
  }
}

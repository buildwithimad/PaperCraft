import { PaperForm } from "@/components/paper/PaperForm";

interface PageProps {
  params: Promise<{
    lang: "en" | "ur";
  }>;
}

export default async function CreatePaperPage({ params }: PageProps) {
  const { lang } = await params;
  
  return <PaperForm lang={lang} />;
}
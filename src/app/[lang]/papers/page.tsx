import { getAllPapers } from "@/services/paperServices";

import PapersClient from "./PaperClient";

interface Props {
  params: Promise<{
    lang: "en" | "ur";
  }>;
}

export default async function PapersPage({
  params,
}: Props) {
  const { lang } = await params;

  const papers = await getAllPapers();

  return (
    <PapersClient
      lang={lang}
      papers={papers}
    />
  );
}
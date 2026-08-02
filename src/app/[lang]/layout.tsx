import DashboardLayout from "@/components/layout/DashboardLayout";
import { requireUser } from "@/services/authService";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    lang: "en" | "ur";
  }>;
};

export default async function LangLayout({
  children,
  params,
}: Props) {
  // Protect all routes under /[lang]
  await requireUser();

  const { lang } = await params;

  return (
    <DashboardLayout lang={lang}>
      {children}
    </DashboardLayout>
  );
}
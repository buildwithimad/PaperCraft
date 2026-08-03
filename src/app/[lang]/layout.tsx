import DashboardLayout from "@/components/layout/DashboardLayout";
import { requireUser } from "@/services/authService";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

export default async function LangLayout({
  children,
  params,
}: Props) {
  await requireUser();

  const { lang } = await params;

  return (
    <DashboardLayout lang={lang as "en" | "ur"}>
      {children}
    </DashboardLayout>
  );
}
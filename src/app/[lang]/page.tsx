import DashboardClient from "./DashboardClient";

import { getDashboardData } from "@/services/dashboardService";

interface Props {
  params: Promise<{
    lang: "en" | "ur";
  }>;
}

export default async function DashboardPage({
  params,
}: Props) {
  const { lang } = await params;

  const dashboard = await getDashboardData();

  return (
    <DashboardClient
      lang={lang}
      dashboard={dashboard}
    />
  );
}
"use client";

import {
    BookOpen,
    CalendarDays,
    FileText,
    GraduationCap,
    School,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { DashboardData } from "@/types/dashboard";

interface Props {
  lang: "en" | "ur";
  dashboard: DashboardData;
}

export default function DashboardClient({ dashboard, lang }: Props) {
  const isUrdu = lang === "ur";

  return (
    <div className="space-y-8" dir={isUrdu ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">
          {isUrdu ? "ڈیش بورڈ" : "Dashboard"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isUrdu ? "تمام پیپرز کا خلاصہ" : "Overview of your examination papers"}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <AnalyticsCard
          title={isUrdu ? "کل پیپرز" : "Total Papers"}
          value={dashboard.cards.totalPapers}
          icon={<FileText className="size-5" />}
        />

        <AnalyticsCard
          title={isUrdu ? "آج" : "Today"}
          value={dashboard.cards.papersToday}
          icon={<CalendarDays className="size-5" />}
        />

        <AnalyticsCard
          title={isUrdu ? "اس مہینے" : "This Month"}
          value={dashboard.cards.papersThisMonth}
          icon={<BookOpen className="size-5" />}
        />

        <AnalyticsCard
          title={isUrdu ? "مضامین" : "Subjects"}
          value={dashboard.cards.totalSubjects}
          icon={<GraduationCap className="size-5" />}
        />

        <AnalyticsCard
          title={isUrdu ? "کلاسز" : "Classes"}
          value={dashboard.cards.totalClasses}
          icon={<School className="size-5" />}
        />
      </div>

      {/* Recent Papers */}
      <Card className="rounded-lg border shadow-none">
        <CardHeader>
          <CardTitle className="text-base font-medium">
            {isUrdu ? "حالیہ پیپرز" : "Recent Papers"}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {dashboard.recentPapers.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-muted-foreground">
              {isUrdu ? "کوئی پیپر موجود نہیں۔" : "No papers found."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="whitespace-nowrap">
                      {isUrdu ? "امتحان" : "Exam"}
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      {isUrdu ? "اسکول" : "School"}
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      {isUrdu ? "جماعت" : "Class"}
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      {isUrdu ? "مضمون" : "Subject"}
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      {isUrdu ? "تاریخ" : "Date"}
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {dashboard.recentPapers.map((paper) => (
                    <TableRow key={paper.id}>
                      <TableCell className="max-w-[200px] truncate font-medium">
                        {paper.exam_name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {paper.school_name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {paper.class_name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {paper.subject}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {new Date(paper.created_at).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
})}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

interface AnalyticsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

function AnalyticsCard({ title, value, icon }: AnalyticsCardProps) {
  return (
    <Card className="rounded-lg border shadow-none">
      <CardContent className="flex items-center justify-between gap-4 p-6">
        <div className="min-w-0">
          <p className="truncate text-sm text-muted-foreground">{title}</p>
          <h2 className="mt-2 text-3xl font-semibold tabular-nums">{value}</h2>
        </div>

        <div className="flex size-11 shrink-0 items-center justify-center rounded-md border text-muted-foreground">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
import { requireApiUser } from "@/services/authService";
import { DashboardData } from "@/types/dashboard";

export async function getDashboardData(): Promise<DashboardData> {
  const { supabase, user } = await requireApiUser();

  const { data, error } = await supabase
    .from("papers")
    .select(`
      id,
      school_name,
      exam_name,
      class_name,
      subject,
      created_at
    `)
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  const papers = data ?? [];

  const today = new Date();
  const todayString = today.toISOString().slice(0, 10);

  const month = today.getMonth();
  const year = today.getFullYear();

  const totalSubjects = new Set(
    papers.map((paper) => paper.subject)
  ).size;

  const totalClasses = new Set(
    papers.map((paper) => paper.class_name)
  ).size;

  const papersToday = papers.filter((paper) =>
    paper.created_at.startsWith(todayString)
  ).length;

  const papersThisMonth = papers.filter((paper) => {
    const date = new Date(paper.created_at);

    return (
      date.getMonth() === month &&
      date.getFullYear() === year
    );
  }).length;

  const subjectMap = new Map<string, number>();

  papers.forEach((paper) => {
    subjectMap.set(
      paper.subject,
      (subjectMap.get(paper.subject) ?? 0) + 1
    );
  });

  const classMap = new Map<string, number>();

  papers.forEach((paper) => {
    classMap.set(
      paper.class_name,
      (classMap.get(paper.class_name) ?? 0) + 1
    );
  });

  const monthMap = new Map<string, number>();

  papers.forEach((paper) => {
    const date = new Date(paper.created_at);

    const key = date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    monthMap.set(
      key,
      (monthMap.get(key) ?? 0) + 1
    );
  });

  return {
    cards: {
      totalPapers: papers.length,
      papersToday,
      papersThisMonth,
      totalSubjects,
      totalClasses,
    },

    recentPapers: papers.slice(0, 10),

    papersPerSubject: [...subjectMap.entries()].map(
      ([subject, total]) => ({
        subject,
        total,
      })
    ),

    papersPerClass: [...classMap.entries()].map(
      ([className, total]) => ({
        className,
        total,
      })
    ),

    papersPerMonth: [...monthMap.entries()].map(
      ([month, total]) => ({
        month,
        total,
      })
    ),
  };
}
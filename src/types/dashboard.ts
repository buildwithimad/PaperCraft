export interface DashboardData {
  cards: {
    totalPapers: number;
    papersToday: number;
    papersThisMonth: number;
    totalSubjects: number;
    totalClasses: number;
  };

  recentPapers: {
    id: string;
    school_name: string;
    exam_name: string;
    class_name: string;
    subject: string;
    created_at: string;
  }[];

  papersPerMonth: {
    month: string;
    total: number;
  }[];

  papersPerSubject: {
    subject: string;
    total: number;
  }[];

  papersPerClass: {
    className: string;
    total: number;
  }[];
}
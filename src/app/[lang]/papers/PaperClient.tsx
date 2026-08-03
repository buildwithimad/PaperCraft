"use client";

import {
  Calendar,
  FileText,
  GraduationCap,
  Inbox,
  Loader2,
  Pencil,
  PlusCircle,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { deletePaperAction } from "@/actions/paper";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Paper {
  id: string;
  school_name: string;
  exam_name: string;
  class_name: string;
  subject: string;
  exam_date: string;
  total_marks: string;
  created_at: string;
}

interface Props {
  lang: "en" | "ur";
  papers: Paper[];
}

export default function PapersClient({ papers, lang }: Props) {
  const isUrdu = lang === "ur";
  const router = useRouter();

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [paperPendingDelete, setPaperPendingDelete] = useState<Paper | null>(
    null
  );

  const openDeleteDialog = (paper: Paper) => {
    setPaperPendingDelete(paper);
  };

  const closeDeleteDialog = () => {
    if (deletingId) return;
    setPaperPendingDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!paperPendingDelete || deletingId) return;

    const paperId = paperPendingDelete.id;
    setDeletingId(paperId);

    try {
      const result = await deletePaperAction(paperId, lang);

      if (result.success) {
        toast.success(isUrdu ? "پیپر حذف کر دیا گیا۔" : "Paper deleted.");
        setPaperPendingDelete(null);
        router.refresh();
      } else {
        toast.error(
          result.error ||
            (isUrdu ? "پیپر حذف نہیں ہو سکا۔" : "Failed to delete paper.")
        );
      }
    } catch {
      toast.error(
        isUrdu ? "غیر متوقع خرابی پیش آئی۔" : "An unexpected error occurred."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div
      className="mx-auto max-w-[1200px] space-y-10 px-4 py-10 sm:px-6 lg:px-8"
      dir={isUrdu ? "rtl" : "ltr"}
    >
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          {isUrdu ? "تمام پیپرز" : "All Papers"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isUrdu
            ? "تمام محفوظ شدہ پیپرز"
            : "Browse all saved examination papers."}
        </p>
      </div>

      <Separator />

      {papers.length === 0 ? (
        <Card className="border-slate-200 bg-white">
          <CardContent className="flex flex-col items-center gap-4 py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
              <Inbox className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {isUrdu ? "کوئی پیپر موجود نہیں" : "No Papers Found"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isUrdu
                  ? "آپ نے ابھی تک کوئی پیپر نہیں بنایا۔"
                  : "You haven't created any papers yet."}
              </p>
            </div>
            <Button asChild size="sm" className="mt-2 rounded-md">
              <Link href={`/${lang}/paper`}>
                <PlusCircle className="h-4 w-4" />
                {isUrdu ? "پیپر بنائیں" : "Create Paper"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {papers.map((paper) => {
            const isDeleting = deletingId === paper.id;

            return (
              <Card
                key={paper.id}
                className="flex flex-col border-slate-200"
              >
                <CardHeader className="space-y-2 bg-slate-50/50 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-1 text-lg font-semibold text-slate-900">
                      {paper.exam_name}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="shrink-0 rounded-md font-normal"
                    >
                      {paper.total_marks} {isUrdu ? "نمبر" : "marks"}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-1">
                    {paper.school_name}
                  </CardDescription>
                </CardHeader>

                <Separator />

                <CardContent className="flex-1 space-y-3 pt-6">
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {isUrdu ? "جماعت:" : "Class:"}
                    </span>
                    <span className="font-medium">{paper.class_name}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {isUrdu ? "مضمون:" : "Subject:"}
                    </span>
                    <span className="font-medium">{paper.subject}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {isUrdu ? "تاریخ:" : "Date:"}
                    </span>
                    <span className="font-medium">{paper.exam_date}</span>
                  </div>
                </CardContent>

                <CardFooter className="flex w-full items-center gap-2">
                  <Button asChild size="sm" className="flex-1 min-w-0 rounded-lg">
                    <Link
                      href={`/${lang}/paper/${paper.id}`}
                      aria-label={
                        isUrdu
                          ? `${paper.exam_name} کھولیں`
                          : `Open ${paper.exam_name}`
                      }
                    >
                      <span className="truncate">{isUrdu ? "کھولیں" : "Open"}</span>
                    </Link>
                  </Button>

                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="icon-sm"
                      className="rounded-lg cursor-pointer"
                      aria-label={
                        isUrdu
                          ? `${paper.exam_name} میں ترمیم کریں`
                          : `Edit ${paper.exam_name}`
                      }
                    >
                      <Link href={`/${lang}/paper/${paper.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      type="button"
                      variant="destructive"
                      size="icon-sm"
                      className="rounded-lg cursor-pointer"
                      aria-label={
                        isUrdu
                          ? `${paper.exam_name} حذف کریں`
                          : `Delete ${paper.exam_name}`
                      }
                      disabled={deletingId !== null}
                      onClick={() => openDeleteDialog(paper)}
                    >
                      {isDeleting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      <AlertDialog
        open={paperPendingDelete !== null}
        onOpenChange={(open) => {
          if (!open) closeDeleteDialog();
        }}
      >
        <AlertDialogContent className="rounded-lg border shadow-none">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isUrdu ? "پیپر حذف کریں" : "Delete Paper"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isUrdu
                ? "یہ عمل واپس نہیں کیا جا سکتا۔"
                : "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={deletingId !== null}
              className="rounded-md"
            >
              {isUrdu ? "منسوخ کریں" : "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleConfirmDelete();
              }}
              disabled={deletingId !== null}
              className="rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive"
            >
              {deletingId !== null ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isUrdu ? "حذف ہو رہا ہے..." : "Deleting..."}
                </>
              ) : isUrdu ? (
                "حذف کریں"
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
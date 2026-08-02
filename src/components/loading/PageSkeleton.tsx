import { Skeleton } from "@/components/ui/skeleton";

function HeaderSkeleton() {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-72 sm:w-96" />
      </div>

      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </header>
  );
}

function SectionHeaderSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3 mb-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-5 w-6 rounded-md" />
      </div>
      <Skeleton className="h-8 w-28 rounded-md self-start sm:self-auto" />
    </div>
  );
}

function PaperDetailsSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <div className="mb-4 sm:mb-6 border-b border-border pb-3">
        <Skeleton className="h-6 w-56 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div className="space-y-2 md:col-span-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </div>
  );
}

function MCQSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <SectionHeaderSkeleton />
      <div className="space-y-4">
        <div className="rounded-md border border-border bg-background p-4 space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-9 w-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionSkeleton({ hasMarks = false }: { hasMarks?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <SectionHeaderSkeleton />
      <div className="space-y-3">
        <div className="rounded-md border border-border bg-background p-3.5 space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Skeleton className={`w-full ${hasMarks ? "h-14" : "h-9"}`} />
            </div>
            {hasMarks && (
              <div className="w-full sm:w-28 space-y-1">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-8 w-full" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <HeaderSkeleton />
        <div className="space-y-6">
          <PaperDetailsSkeleton />
          <MCQSkeleton />
          <QuestionSkeleton /> {/* Fill in the Blanks */}
          <QuestionSkeleton hasMarks /> {/* Short Questions */}
          <QuestionSkeleton hasMarks /> {/* Long Questions */}
        </div>
      </div>
    </div>
  );
}
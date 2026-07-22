import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card/50">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-10" />
        </div>
        <Skeleton className="mb-2 h-6 w-3/4" />
        <Skeleton className="mb-1 h-4 w-full" />
        <Skeleton className="mb-4 h-4 w-5/6" />
        <div className="mt-auto flex items-end justify-between border-t border-border/50 pt-4">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-7 w-16" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

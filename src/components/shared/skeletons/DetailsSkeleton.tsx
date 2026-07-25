import { Skeleton } from "@/components/ui/skeleton";

export function DetailsSkeleton() {
  return (
    <div className="container mx-auto py-10 px-4">
      {/* Breadcrumb skeleton */}
      <Skeleton className="h-5 w-48 mb-8" />
      
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image side */}
        <div className="space-y-4">
          <Skeleton className="h-[400px] md:h-[500px] w-full rounded-2xl" />
        </div>
        
        {/* Details side */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            
            <Skeleton className="h-10 md:h-12 w-full max-w-md" />
            <Skeleton className="h-10 md:h-12 w-3/4 max-w-md" />
            
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-6 w-32" />
            </div>
            
            <Skeleton className="h-8 w-32" />
            
            <div className="space-y-2 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
            
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-12 flex-1 rounded-md" />
              <Skeleton className="h-12 flex-1 rounded-md" />
            </div>
            
            <div className="pt-8 space-y-4">
              <Skeleton className="h-px w-full" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

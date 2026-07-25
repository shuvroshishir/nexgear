"use client";

import { ErrorState } from "@/components/shared/ErrorState";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container py-20">
      <ErrorState 
        title="Dashboard Error"
        message={error.message || "Something went wrong loading the dashboard."}
        onRetry={reset} 
      />
    </div>
  );
}

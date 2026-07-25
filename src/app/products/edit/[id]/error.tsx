"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function EditProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background pb-20 pt-28">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="p-8 border border-red-500/20 bg-red-500/5 rounded-2xl flex flex-col items-center gap-4">
          <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center mb-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Something went wrong!
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
            An unexpected error occurred while trying to load the edit product page.
            This could be a temporary issue or a missing resource.
          </p>
          <div className="flex items-center gap-4">
            <Button onClick={() => reset()} className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Try again
            </Button>
            <Link href="/products/manage">
              <Button variant="outline">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

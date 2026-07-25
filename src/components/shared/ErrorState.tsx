"use client";

import { motion } from "framer-motion";
import { AlertCircle, RotateCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showBack?: boolean;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred while fetching data. Please try again.",
  onRetry,
  showBack = false,
  className = "",
}: ErrorStateProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center text-center p-8 md:p-12 border rounded-xl bg-destructive/5 border-destructive/20 min-h-[300px] ${className}`}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive mb-6">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 text-destructive">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-8">{message}</p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <Button onClick={onRetry} variant="default" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
        )}
        {showBack && (
          <Button onClick={() => router.back()} variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        )}
      </div>
    </motion.div>
  );
}

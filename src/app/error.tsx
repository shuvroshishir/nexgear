"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCcw, Home, ServerCrash } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error caught by Error Boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-destructive/10 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[80px] opacity-30"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ rotate: -15, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mb-8"
        >
          <div className="p-6 bg-destructive/10 rounded-full border border-destructive/20">
            <ServerCrash className="w-16 h-16 text-destructive" strokeWidth={1.5} />
          </div>
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(var(--destructive), 0)",
                "0 0 0 20px rgba(var(--destructive), 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full bg-destructive/20 -z-10"
          />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">
          Something went wrong
        </h1>

        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
          We encountered an unexpected error while processing your request. It might be a temporary connection issue.
        </p>
        
        {/* Development only error message display for easier debugging */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-10 w-full text-left bg-card/50 backdrop-blur-sm border border-destructive/20 p-4 rounded-xl overflow-x-auto">
            <p className="text-destructive font-mono text-sm break-all">
              {error.message || "Unknown error occurred"}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Button 
            size="lg" 
            variant="default"
            className="w-full sm:w-auto min-w-[160px] group bg-foreground text-background hover:bg-foreground/90" 
            onClick={() => reset()}
          >
            <RefreshCcw className="w-4 h-4 mr-2 transition-transform group-hover:-rotate-180 duration-500" />
            Try Again
          </Button>

          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto min-w-[160px] group border-border hover:bg-secondary/50 transition-colors" 
            render={<Link href="/" />}
          >
            <Home className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

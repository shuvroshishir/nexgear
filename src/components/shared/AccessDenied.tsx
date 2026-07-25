"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AccessDenied() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] opacity-30"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mb-8"
        >
          <div className="p-6 bg-red-500/10 rounded-full border border-red-500/20">
            <ShieldAlert className="w-16 h-16 text-red-500" strokeWidth={1.5} />
          </div>
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(239, 68, 68, 0)",
                "0 0 0 20px rgba(239, 68, 68, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full bg-red-500/20 -z-10"
          />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">
          Access Denied
        </h1>
        
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4">
          Admin Privileges Required
        </h2>

        <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto leading-relaxed">
          You do not have permission to view this page. If you believe this is a mistake, please contact the system administrator.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Button 
            size="lg" 
            variant="default"
            className="w-full sm:w-auto min-w-[160px] group" 
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Go Back
          </Button>

          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto min-w-[160px] group transition-colors" 
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

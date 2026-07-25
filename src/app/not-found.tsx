"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Compass, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px] opacity-30"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-8"
        >
          <AlertCircle className="w-24 h-24 text-primary/80" strokeWidth={1.5} />
          <motion.div 
            animate={{ 
              boxShadow: ["0 0 0 0 rgba(var(--primary), 0)", "0 0 0 20px rgba(var(--primary), 0)"] 
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 rounded-full bg-primary/20 -z-10"
          />
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
          Lost in the digital void
        </h2>
        
        <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto leading-relaxed">
          The page you are looking for has been moved, deleted, or possibly never existed. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Button size="lg" className="w-full sm:w-auto min-w-[160px] group" render={<Link href="/" />}>
            <Home className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
            Back to Home
          </Button>

          <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[160px] group border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors" render={<Link href="/products" />}>
            <Compass className="w-4 h-4 mr-2 transition-transform group-hover:rotate-45" />
            Browse Products
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

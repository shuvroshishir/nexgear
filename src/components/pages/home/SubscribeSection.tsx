"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const SubscribeSection = () => {
  return (
    <section className="container py-24 mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-zinc-950 dark:bg-black p-8 md:p-16 text-center shadow-2xl border border-white/10"
      >
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[200px] bg-primary/30 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md w-fit mb-6">
            <Sparkles className="size-4 text-primary" />
            Stay Ahead of the Curve
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Join the NexGear Newsletter
          </h2>
          
          <p className="mb-10 text-white/60 text-lg">
            Get exclusive access to pre-orders, tech drops, and special offers delivered straight to your inbox. No spam, just pure tech.
          </p>
          
          <form className="flex flex-col sm:flex-row w-full gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-primary rounded-xl"
              required
            />
            <Button type="submit" className="h-12 px-8 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transition-all">
              Subscribe
              <Send className="ml-2 size-4" />
            </Button>
          </form>
          
          <p className="text-white/40 text-xs mt-6">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

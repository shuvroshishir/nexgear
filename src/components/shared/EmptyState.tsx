"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon: Icon, action, className = "" }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex flex-col items-center justify-center text-center p-8 md:p-16 border rounded-xl bg-card border-dashed min-h-[300px] ${className}`}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold tracking-tight mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </motion.div>
  );
}

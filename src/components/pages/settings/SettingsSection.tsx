"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SettingsSectionProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: ReactNode;
  delay?: number;
  danger?: boolean;
}

export function SettingsSection({
  title,
  description,
  icon: Icon,
  children,
  delay = 0,
  danger = false,
}: SettingsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className={`overflow-hidden ${danger ? "border-destructive/50 bg-destructive/5" : ""}`}>
        <CardHeader className={`${danger ? "text-destructive" : ""}`}>
          <CardTitle className="text-lg flex items-center gap-2">
            {Icon && <Icon className={`h-5 w-5 ${danger ? "text-destructive" : "text-primary"}`} />}
            {title}
          </CardTitle>
          {description && (
            <CardDescription className={danger ? "text-destructive/70" : ""}>
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
}

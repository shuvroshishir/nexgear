"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, Store } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function QuickActions() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-2"
    >
      <Link href="/products/create">
        <Button className="bg-primary hover:bg-emerald-600 transition-colors shadow-sm gap-2">
          <PlusCircle className="h-4 w-4" />
          Create Product
        </Button>
      </Link>
      
      <Link href="/products/manage">
        <Button variant="outline" className="gap-2 shadow-sm">
          <Settings className="h-4 w-4" />
          Manage Products
        </Button>
      </Link>
      
      <Link href="/products">
        <Button variant="secondary" className="gap-2 shadow-sm">
          <Store className="h-4 w-4" />
          View Store
        </Button>
      </Link>
    </motion.div>
  );
}

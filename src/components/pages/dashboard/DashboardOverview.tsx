"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Star, Grid, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardOverviewProps {
  totalProducts: number;
  featuredProducts: number;
  uniqueCategoriesCount: number;
  avgPrice: number;
}

export function DashboardOverview({
  totalProducts,
  featuredProducts,
  uniqueCategoriesCount,
  avgPrice
}: DashboardOverviewProps) {
  
  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Featured Products",
      value: featuredProducts,
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      title: "Categories",
      value: uniqueCategoriesCount,
      icon: Grid,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      title: "Avg Product Price",
      value: `$${avgPrice.toFixed(2)}`,
      icon: DollarSign,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300 group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

"use client";

import { Smartphone, Laptop, Headphones, Watch, Gamepad2, Mouse } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const CategoriesSection = () => {
  const categories = [
    { name: "Laptops & PCs", icon: Laptop, count: "124 Products" },
    { name: "Smartphones", icon: Smartphone, count: "86 Products" },
    { name: "Audio & Sound", icon: Headphones, count: "54 Products" },
    { name: "Wearables", icon: Watch, count: "32 Products" },
    { name: "Gaming", icon: Gamepad2, count: "112 Products" },
    { name: "Accessories", icon: Mouse, count: "245 Products" },
  ];

  return (
    <section className="container py-24 mx-auto">
      <div className="mb-12 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Category</span>
        </h2>
        <p className="mt-3 text-muted-foreground max-w-lg">
          Explore our premium tech categories and find exactly what you need to upgrade your lifestyle.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Link
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative flex flex-col items-center justify-center p-6 h-full min-h-[160px] rounded-2xl border border-border bg-card/50 overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 p-4 rounded-xl bg-background/80 shadow-sm border border-border/50 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]">
                <cat.icon className="size-8 text-primary" />
              </div>
              
              <h3 className="relative z-10 font-bold text-sm text-foreground text-center group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              
              <span className="relative z-10 text-xs font-medium text-muted-foreground mt-1">
                {cat.count}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

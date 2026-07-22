"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/types/product";
import { ProductCard } from "@/components/shared/ProductCard";
import { ProductCardSkeleton } from "@/components/shared/ProductCardSkeleton";
import Link from "next/link";

export const LatestArrivalsSection = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestProducts() {
      try {
        const res = await fetch("/api/products?limit=8");
        const json = await res.json();
        // Just as a mockup for "latest", we might reverse the array if the backend doesn't sort
        const data = json.data || [];
        setProducts(data.reverse());
      } catch (error) {
        console.error("Failed to fetch latest products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestProducts();
  }, []);

  return (
    <section className="container py-24 mx-auto relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between relative z-10">
        <div>
          <div className="flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-500 w-fit mb-4">
            <Flame className="size-3.5" />
            Just Dropped
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Arrivals</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg">
            Be the first to get your hands on the newest tech releases. Limited stock available.
          </p>
        </div>

        <Button variant="outline" className="w-full sm:w-auto group border-border/50 hover:border-foreground/20" asChild>
          <Link href="/products" className="flex items-center">
            Shop All New
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative z-10"
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
      </motion.div>
    </section>
  );
};

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/types/product";
import { ProductCard } from "@/components/shared/ProductCard";
import { ProductCardSkeleton } from "@/components/shared/ProductCardSkeleton";

export const FeaturedProductsSection = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products?limit=8");
        const json = await res.json();
        setProducts(json.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="container py-24 mx-auto">
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary w-fit mb-4">
            <Sparkles className="size-3.5" />
            New Arrivals
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Products</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg">
            Discover our most popular premium tech gadgets, carefully curated for the ultimate experience.
          </p>
        </div>

        <Button variant="outline" className="w-full sm:w-auto hover:bg-primary/10 hover:text-primary transition-colors border-primary/20" render={<Link href="/products" />}>
          <span className="flex items-center">
            View All Collection
            <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Button>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
      </motion.div>
    </section>
  );
};

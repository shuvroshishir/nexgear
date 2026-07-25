"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/types/product";
import { ProductCard } from "@/components/shared/ProductCard";
import { ProductCardSkeleton } from "@/components/shared/ProductCardSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";

export const FeaturedProductsSection = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/products?limit=8");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setProducts(json.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

        <Button variant="outline" className="w-full sm:w-auto hover:bg-primary/10 hover:text-primary transition-colors border-primary/20" render={<Link href="/products" />} nativeButton={false}>
          <span className="flex items-center">
            View All Collection
            <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Button>
      </div>

      {error ? (
        <ErrorState onRetry={fetchProducts} />
      ) : loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <EmptyState 
          title="No Products Found" 
          description="We couldn't find any featured products at this moment." 
          icon={Sparkles}
        />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((product, idx) => (
            <motion.div
              key={product._id || product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

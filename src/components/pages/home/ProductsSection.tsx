"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/types/product";

export const FeaturedProductsSection = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products?limit=6");
        const json = await res.json();
        setProducts(json.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="container py-20">
        <p className="text-center text-muted-foreground">Loading products...</p>
      </section>
    );
  }

  return (
    <section className="container py-20 mx-auto">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Featured Products
          </h2>
          <p className="mt-2 text-muted-foreground">
            Discover our most popular products.
          </p>
        </div>

        <Button variant="outline">
          <Link href="/products" className="flex">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 6).map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-xl border bg-background transition-all hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="space-y-3 p-5">
              <span className="text-sm text-muted-foreground">
                {product.category}
              </span>

              <h3 className="line-clamp-1 text-xl font-semibold">
                {product.title}
              </h3>

              <p className="line-clamp-2 text-sm text-muted-foreground">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">${product.price}</span>

                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{product.rating}</span>
                </div>
              </div>
              <Link href={`/products/${product.id}`}>
                <Button className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

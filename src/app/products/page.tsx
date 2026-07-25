"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ShoppingCart, Star, Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { TProduct } from "@/types/product";
import { ProductCard } from "@/components/shared/ProductCard";
import { ProductCardSkeleton } from "@/components/shared/ProductCardSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";

function ProductsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<TProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 12, totalPages: 1 });

  // Current filters from URL
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const rating = searchParams.get("rating") || "0";
  const sort = searchParams.get("sort") || "newest";
  
  // Local state for search input
  const [searchInput, setSearchInput] = useState(search);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(false);
      try {
        const query = new URLSearchParams({
          page,
          limit: "12",
          ...(search && { search }),
          ...(category !== "all" && { category }),
          ...(rating !== "0" && { rating }),
          ...(sort !== "newest" && { sort })
        });
        
        const res = await fetch(`/api/products?${query.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch");
        
        const json = await res.json();
        
        setProducts(json.data || []);
        setMeta(json.meta || { total: 0, page: 1, limit: 12, totalPages: 1 });
      } catch (error) {
        console.error(error);
        setProducts([]);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [page, search, category, rating, sort]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`${pathname}?${createQueryString("search", searchInput)}&page=1`);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    router.push(`${pathname}?${createQueryString("search", "")}&page=1`);
  }

  const handleFilterChange = (key: string, value: string) => {
    router.push(`${pathname}?${createQueryString(key, value)}&page=1`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= meta.totalPages) {
      router.push(`${pathname}?${createQueryString("page", newPage.toString())}`);
    }
  };

  return (
    <section className="container py-20 mx-auto">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">All Products</h2>
          <p className="mt-2 text-muted-foreground">
            Browse our entire collection.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row w-full md:w-auto flex-wrap">
          <form onSubmit={handleSearch} className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-9 pr-9"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput && (
              <button 
                type="button" 
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </form>

          <select
            className="flex h-9 w-full sm:w-40 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            value={category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          
          <select
            className="flex h-9 w-full sm:w-36 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            value={rating}
            onChange={(e) => handleFilterChange("rating", e.target.value)}
          >
            <option value="0">All Ratings</option>
            <option value="4">4 Stars & Up</option>
            <option value="3">3 Stars & Up</option>
            <option value="2">2 Stars & Up</option>
          </select>
          
          <select
            className="flex h-9 w-full sm:w-40 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            value={sort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Highest Rated</option>
          </select>
        </div>
      </div>

      {error ? (
        <ErrorState onRetry={() => {
          setError(false);
          setLoading(true);
          // fetchProducts is called via useEffect anyway when state updates, but we can trigger re-fetch by doing:
          router.push(pathname); 
        }} />
      ) : loading ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <EmptyState 
          title="No Products Found" 
          description="We couldn't find any products matching your search criteria." 
          icon={Search}
          action={
            <Button variant="outline" onClick={() => router.push(pathname)}>
              Clear all filters
            </Button>
          }
        />
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {meta.totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(meta.page - 1)}
                disabled={meta.page <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-1 px-4 text-sm font-medium">
                Page {meta.page} of {meta.totalPages}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(meta.page + 1)}
                disabled={meta.page >= meta.totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container py-20 mx-auto">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
           <div>
            <h2 className="text-3xl font-bold tracking-tight">All Products</h2>
            <p className="mt-2 text-muted-foreground">Browse our entire collection.</p>
           </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}

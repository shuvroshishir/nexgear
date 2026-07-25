"use client";

import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TProduct } from "@/types/product";

export default function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = useParams();

  const [product, setProduct] = useState<TProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <main className="container py-16 mx-auto">
      <div className="grid gap-12 lg:grid-cols-2 mb-16">
        <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted/20">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {product.category}
          </p>

          <h1 className="text-4xl font-bold">{product.title}</h1>

          <div className="flex items-center gap-2">
            <Star className="fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-lg">{product.rating}</span>
            <span className="text-muted-foreground ml-2">(128 reviews)</span>
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed">{product.description}</p>

          <div className="text-4xl font-bold">${product.price}</div>

          <p className="text-sm font-medium">
            Availability:
            <span className={`ml-2 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
            </span>
          </p>

          <Button size="lg" className="w-full sm:w-auto mt-4" disabled={product.stock <= 0}>
            <ShoppingCart className="mr-2 size-5" />
            Add to Cart
          </Button>
          
          <div className="mt-8 pt-8 border-t">
            <h3 className="font-semibold text-lg mb-4">Key Specifications</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Premium quality materials</li>
              <li>• Designed for everyday use</li>
              <li>• 1 year extended warranty</li>
              <li>• Fast shipping available</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mb-16 border-t pt-16">
        <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 p-6 border rounded-xl bg-card">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="font-semibold">Excellent product!</span>
            </div>
            <p className="text-sm text-muted-foreground">"I've been using this for a week and it exceeded my expectations. The build quality is fantastic and it looks great. Highly recommend to anyone."</p>
            <p className="text-xs font-medium text-primary">Sarah Jenkins - Verified Buyer</p>
          </div>
          
          <div className="space-y-4 p-6 border rounded-xl bg-card">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4].map(i => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                <Star className="h-4 w-4 text-muted" />
              </div>
              <span className="font-semibold">Great value for money</span>
            </div>
            <p className="text-sm text-muted-foreground">"Good overall experience. Shipping was fast and the item was exactly as described. Only taking off one star because the packaging was slightly damaged."</p>
            <p className="text-xs font-medium text-primary">Michael Chen - Verified Buyer</p>
          </div>
        </div>
      </div>
      
      {/* Related Products Section */}
      <div className="border-t pt-16">
        <h2 className="text-2xl font-bold mb-8">Related Items</h2>
        <RelatedProducts category={product.category} currentProductId={product._id as string} />
      </div>
    </main>
  );
}

function RelatedProducts({ category, currentProductId }: { category: string, currentProductId: string }) {
  const [related, setRelated] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      try {
        // Fetch products from the same category
        const res = await fetch(`/api/products?category=${category}&limit=5`);
        const json = await res.json();
        
        if (res.ok && json.data) {
          // Filter out the current product and take only 4
          const filtered = json.data.filter((p: TProduct) => p.id !== currentProductId).slice(0, 4);
          setRelated(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch related products", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRelated();
  }, [category, currentProductId]);

  if (loading) {
    return <div className="h-64 flex items-center justify-center border rounded-xl bg-muted/20">Loading related items...</div>;
  }

  if (related.length === 0) {
    return <p className="text-muted-foreground">No related items found.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {related.map((product) => (
        <a key={product.id} href={`/products/${product.id}`} className="group flex flex-col overflow-hidden rounded-xl border bg-background hover:shadow-md transition-all">
          <div className="relative aspect-square overflow-hidden bg-muted/20">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="line-clamp-1 font-semibold">{product.title}</h3>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-bold">${product.price}</span>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {product.rating}
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

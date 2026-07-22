import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/types/product";

export function ProductCard({ product }: { product: TProduct }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] hover:border-primary/30">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/30">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Link href={`/products/${product.id}`} className="block w-full">
            <Button className="w-full bg-primary/90 hover:bg-primary backdrop-blur-md">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Quick View
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-xs font-medium text-muted-foreground">{product.rating}</span>
          </div>
        </div>

        <h3 className="mb-1 text-lg font-bold tracking-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between border-t border-border/50 pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Price</span>
            <span className="text-xl font-black text-foreground">${product.price}</span>
          </div>
          {product.stock < 10 ? (
            <span className="text-xs font-medium text-destructive">Only {product.stock} left</span>
          ) : (
            <span className="text-xs font-medium text-emerald-500 dark:text-emerald-400">In Stock</span>
          )}
        </div>
      </div>
    </div>
  );
}

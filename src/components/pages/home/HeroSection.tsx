import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="mx-auto max-w-3xl text-center">
        <Badge
          variant="secondary"
          className="rounded-full border border-border py-1"
        >
          <Link href="/products" className="flex">
            New Collection 2026
            <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Badge>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.15]">
          Discover Quality Products for Every Lifestyle
        </h1>

        <p className="mt-6 text-base text-muted-foreground md:text-lg">
          Shop the latest electronics, fashion, home essentials, beauty
          products, and more. Enjoy secure checkout, fast delivery, and
          unbeatable prices—all in one place.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="rounded-full text-base">
            <Link href="/products" className="flex">
              Shop Now
              <ArrowUpRight className="size-5" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
          >
            <Link href="/categories" className="flex">
              <ShoppingBag className="size-5" />
              Browse Categories
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

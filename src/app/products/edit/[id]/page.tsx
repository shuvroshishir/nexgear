"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

import { AccessDenied } from "@/components/shared/AccessDenied";
import { isAdmin } from "@/lib/admin";
import { authClient } from "@/lib/auth-client";
import { Edit, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

import { ProductForm } from "@/components/forms/ProductForm";
import { TProduct } from "@/types/product";

import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: session, isPending: isAuthPending } = authClient.useSession();
  const [product, setProduct] = useState<TProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthPending && !session) {
      router.push("/login");
    }
  }, [isAuthPending, session, router]);

  useEffect(() => {
    if (session && isAdmin(session.user.email)) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`/api/products/${id}`);
          if (!res.ok) {
            throw new Error("Failed to load product");
          }
          const data = await res.json();
          setProduct(data);
        } catch (err) {
          setError("Could not load product. It might have been deleted.");
          toast.error("Failed to load product");
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id, session]);

  if (isAuthPending || (session && loading)) {
    return <LoadingSpinner />;
  }

  if (!session) {
    return null;
  }

  if (!isAdmin(session.user.email)) {
    return <AccessDenied />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background pb-20 pt-28">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="p-8 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl font-medium">
            {error || "Product not found."}
          </div>
          <Link href="/products/manage">
            <Button variant="outline" className="mt-8">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-28">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/products/manage">
              <Button variant="ghost" className="mb-4 -ml-4 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <Edit className="h-8 w-8 text-primary" /> Edit Product
            </h1>
            <p className="text-muted-foreground mt-2">
              Update information for "{product.title}".
            </p>
          </div>
        </div>

        <ProductForm mode="edit" initialData={product} productId={id} />
      </div>
    </div>
  );
}

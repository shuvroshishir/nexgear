"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { AccessDenied } from "@/components/shared/AccessDenied";
import { isAdmin } from "@/lib/admin";
import { authClient } from "@/lib/auth-client";
import { PackagePlus, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ProductForm } from "@/components/forms/ProductForm";

export default function AddProductPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (!session) {
    return null;
  }

  if (!isAdmin(session.user.email)) {
    return <AccessDenied />;
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-28">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/products/manage">
              <Button variant="ghost" className="mb-4 -ml-4 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Manage
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <PackagePlus className="h-8 w-8 text-primary" /> Create Product
            </h1>
            <p className="text-muted-foreground mt-2">
              Add a new product to your marketplace catalog.
            </p>
          </div>
        </div>

        <ProductForm mode="create" />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Trash2, Edit, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TProduct } from "@/types/product";

import { AccessDenied } from "@/components/shared/AccessDenied";
import { isAdmin } from "@/lib/admin";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { TableSkeleton } from "@/components/shared/skeletons/TableSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";

export default function ManageProductsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/products?limit=100"); // Fetching enough for manage view without pagination for now
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setProducts(json.data || []);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [modalState, setModalState] = useState<{ isOpen: boolean; productId: string | null; isDeleting: boolean }>({
    isOpen: false,
    productId: null,
    isDeleting: false
  });

  const confirmDelete = async () => {
    if (!modalState.productId) return;
    
    setModalState(prev => ({ ...prev, isDeleting: true }));
    try {
      const res = await fetch(`/api/products/${modalState.productId}`, {
        method: "DELETE",
      });
      
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        toast.success("Product Deleted Successfully");
        setProducts(products.filter(p => p.id !== modalState.productId));
      } else {
        toast.error(data.error || "Failed to delete product");
      }
    } catch (error) {
      toast.error("An error occurred while deleting");
    } finally {
      setModalState({ isOpen: false, productId: null, isDeleting: false });
    }
  };

  const handleDeleteClick = (id: string) => {
    setModalState({ isOpen: true, productId: id, isDeleting: false });
  };

  if (isPending) {
    return (
      <div className="container py-10 mx-auto">
        <TableSkeleton />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (!isAdmin(session.user.email)) {
    return <AccessDenied />;
  }

  return (
    <div className="container py-10 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your store's products</p>
        </div>
        <Link href="/products/create">
          <Button>Add New Product</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Product Inventory</CardTitle>
          <CardDescription>View and manage all products currently in your catalog.</CardDescription>
        </CardHeader>

        <CardContent>
          {error ? (
            <div className="py-10">
              <ErrorState onRetry={fetchProducts} />
            </div>
          ) : loading ? (
            <TableSkeleton rows={5} columns={5} />
          ) : products.length === 0 ? (
            <div className="py-10">
              <EmptyState 
                title="No Products Found"
                description="You haven't added any products to your store yet."
                icon={Package}
                action={
                  <Link href="/products/create">
                    <Button>Create your first product</Button>
                  </Link>
                }
              />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          {product.image ? (
                            <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full bg-secondary/20" />
                          )}
                        </div>
                        <span className="line-clamp-1">{product.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/products/${product.id}`}>
                          <Button variant="outline" size="icon" title="View details">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/products/edit/${product.id}`}>
                          <Button variant="outline" size="icon" title="Edit product">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          title="Delete product"
                          onClick={() => handleDeleteClick(product.id!)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ConfirmModal 
        isOpen={modalState.isOpen}
        onClose={() => !modalState.isDeleting && setModalState(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        isLoading={modalState.isDeleting}
      />
    </div>
  );
}

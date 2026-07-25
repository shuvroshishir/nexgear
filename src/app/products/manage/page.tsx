"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Trash2, Edit } from "lucide-react";
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

export default function ManageProductsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products?limit=100"); // Fetching enough for manage view without pagination for now
      const json = await res.json();
      if (res.ok) {
        setProducts(json.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  };

  if (isPending) {
    return <div className="min-h-[80vh] flex items-center justify-center">Loading...</div>;
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
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 border border-dashed rounded-lg bg-muted/10">
              <p className="text-muted-foreground mb-4">No products found.</p>
              <Link href="/products/create">
                <Button variant="outline">Create your first product</Button>
              </Link>
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
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          title="Delete product"
                          onClick={() => handleDelete(product.id!)}
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
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { AccessDenied } from "@/components/shared/AccessDenied";
import { isAdmin } from "@/lib/admin";
import { authClient } from "@/lib/auth-client";
import { PackagePlus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function AddProductPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (!isAdmin(session.user.email)) {
    return <AccessDenied />;
  }

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    category: "",
    price: "",
    rating: "0",
    stock: "10",
    image: "",
    description: "",
    featured: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          rating: parseFloat(formData.rating),
          stock: parseInt(formData.stock),
        })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Product Created Successfully");
        router.push("/products/manage");
      } else {
        toast.error(data.error || "Failed to create product");
        setError(data.error || "Failed to create product");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 pt-28">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Button asChild variant="ghost" className="mb-4 -ml-4 text-muted-foreground hover:text-foreground">
              <Link href="/products/manage">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <PackagePlus className="h-8 w-8 text-primary" /> Create Product
            </h1>
            <p className="text-muted-foreground mt-2">
              Add a new product to your marketplace catalog.
            </p>
          </div>
        </div>

        <Card className="border-border shadow-xl shadow-black/5 rounded-2xl overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/50 pb-6">
            <CardTitle className="text-xl">Product Information</CardTitle>
            <CardDescription>All required fields must be filled out to list this product.</CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            {error && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-muted-foreground font-semibold">Product Title *</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    required 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="e.g. Quantum X Pro Headphones" 
                    className="h-12 bg-background/50 rounded-xl"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="category" className="text-muted-foreground font-semibold">Category *</Label>
                  <Input 
                    id="category" 
                    name="category" 
                    required 
                    value={formData.category} 
                    onChange={handleChange} 
                    placeholder="e.g. Audio" 
                    className="h-12 bg-background/50 rounded-xl"
                  />
                </div>

                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="shortDescription" className="text-muted-foreground font-semibold">Short Description *</Label>
                  <Input 
                    id="shortDescription" 
                    name="shortDescription" 
                    required 
                    value={formData.shortDescription} 
                    onChange={handleChange} 
                    placeholder="A brief catchy summary of the product..." 
                    className="h-12 bg-background/50 rounded-xl"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="price" className="text-muted-foreground font-semibold">Price ($) *</Label>
                  <Input 
                    id="price" 
                    name="price" 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    required 
                    value={formData.price} 
                    onChange={handleChange} 
                    placeholder="299.99" 
                    className="h-12 bg-background/50 rounded-xl"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="stock" className="text-muted-foreground font-semibold">Initial Stock *</Label>
                  <Input 
                    id="stock" 
                    name="stock" 
                    type="number" 
                    min="0" 
                    required 
                    value={formData.stock} 
                    onChange={handleChange} 
                    className="h-12 bg-background/50 rounded-xl"
                  />
                </div>

                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="image" className="text-muted-foreground font-semibold">Primary Image URL *</Label>
                  <Input 
                    id="image" 
                    name="image" 
                    type="url" 
                    required
                    value={formData.image} 
                    onChange={handleChange} 
                    placeholder="https://images.unsplash.com/photo-..." 
                    className="h-12 bg-background/50 rounded-xl"
                  />
                </div>
                
                <div className="space-y-3 md:col-span-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-5 h-5 accent-primary rounded cursor-pointer"
                  />
                  <Label htmlFor="featured" className="cursor-pointer text-base text-foreground font-medium">Feature this product on the home page</Label>
                </div>

                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="description" className="text-muted-foreground font-semibold">Full Description *</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    required 
                    value={formData.description} 
                    onChange={handleChange} 
                    placeholder="Describe your product in complete detail..." 
                    className="min-h-[160px] bg-background/50 rounded-xl resize-y"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-8 border-t border-border">
                <Button asChild variant="outline" className="h-12 px-8 rounded-xl">
                  <Link href="/products/manage">Cancel</Link>
                </Button>
                <Button type="submit" disabled={loading} className="h-12 px-8 rounded-xl font-semibold shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transition-all">
                  {loading ? "Creating Product..." : "Create Product"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

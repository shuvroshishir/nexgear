"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { TProduct } from "@/types/product";
import Link from "next/link";

interface ProductFormProps {
  mode: "create" | "edit";
  initialData?: Partial<TProduct>;
  productId?: string;
}

export function ProductForm({ mode, initialData, productId }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        title: initialData.title || "",
        shortDescription: initialData.shortDescription || "",
        category: initialData.category || "",
        price: initialData.price !== undefined ? String(initialData.price) : "",
        rating: initialData.rating !== undefined ? String(initialData.rating) : "0",
        stock: initialData.stock !== undefined ? String(initialData.stock) : "10",
        image: initialData.image || "",
        description: initialData.description || "",
        featured: initialData.featured || false,
      });
    }
  }, [mode, initialData]);

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
      const endpoint = mode === "create" ? "/api/products" : `/api/products/${productId}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(endpoint, {
        method,
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
        toast.success(mode === "create" ? "Product Created Successfully" : "Product Updated Successfully");
        router.push("/products/manage");
      } else {
        toast.error(data.error || `Failed to ${mode} product`);
        setError(data.error || `Failed to ${mode} product`);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border shadow-xl shadow-black/5 rounded-2xl overflow-hidden">
      <CardHeader className="bg-muted/30 border-b border-border/50 pb-6">
        <CardTitle className="text-xl">Product Information</CardTitle>
        <CardDescription>All required fields must be filled out to {mode} this product.</CardDescription>
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
            <Button type="button" variant="outline" className="h-12 px-8 rounded-xl" onClick={() => router.push("/products/manage")}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="h-12 px-8 rounded-xl font-semibold shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transition-all">
              {loading ? (mode === "create" ? "Creating Product..." : "Updating Product...") : (mode === "create" ? "Create Product" : "Save Changes")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

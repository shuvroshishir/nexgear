"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    rating: "5",
    stock: "10",
    image: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
          featured: false
        })
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/products/manage");
      } else {
        setError(data.error || "Failed to create product");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10 mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add New Product</CardTitle>
          <CardDescription>Fill in the details below to add a new product to your catalog.</CardDescription>
        </CardHeader>

        <CardContent>
          {error && <div className="mb-6 p-3 bg-red-100 text-red-600 rounded-md text-sm">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Product Title *</Label>
                <Input id="title" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g. Wireless Headphones" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input id="category" name="category" required value={formData.category} onChange={handleChange} placeholder="e.g. Electronics" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input id="price" name="price" type="number" step="0.01" min="0" required value={formData.price} onChange={handleChange} placeholder="99.99" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Initial Stock *</Label>
                <Input id="stock" name="stock" type="number" min="0" required value={formData.stock} onChange={handleChange} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="image">Image URL (Optional)</Label>
                <Input id="image" name="image" type="url" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Full Description *</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  required 
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Describe your product in detail..." 
                  className="min-h-[120px]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Submit Product"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

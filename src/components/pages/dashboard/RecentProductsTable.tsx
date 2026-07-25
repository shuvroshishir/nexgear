"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TProduct } from "@/types/product";
import { motion } from "framer-motion";

export function RecentProductsTable({ products }: { products: TProduct[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Recent Additions</CardTitle>
          <CardDescription>The latest products added to your catalog</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Added Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product.id || product._id?.toString()}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-muted flex-shrink-0 border">
                          {product.image ? (
                            <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full bg-secondary/20" />
                          )}
                        </div>
                        <span className="line-clamp-1">{product.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No recent products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}

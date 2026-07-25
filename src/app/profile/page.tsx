"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { isAdmin } from "@/lib/admin";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ProfileSkeleton } from "@/components/shared/skeletons/ProfileSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Settings, Shield, User as UserIcon, Calendar, Package, LogIn, LayoutDashboard, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [productsCount, setProductsCount] = useState<number | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  const user = session?.user;
  const isAdminUser = isAdmin(user?.email);

  useEffect(() => {
    if (isAdminUser) {
      // Fetch total products added if admin
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
          if (data?.meta?.total !== undefined) {
            setProductsCount(data.meta.total);
          }
        })
        .catch(console.error);
    }
  }, [isAdminUser]);

  if (isPending || !session) {
    return <ProfileSkeleton />;
  }

  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : "Not Available";

  const lastLogin = user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : "Not Available";

  return (
    <div className="container max-w-4xl py-10 mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your account information and preferences.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="overflow-hidden border-border/50 shadow-sm bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <div className="h-32 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent w-full border-b" />
          <CardContent className="pt-0 relative px-6 sm:px-10 pb-10">
            <div className="flex flex-col sm:flex-row gap-6 sm:items-end -mt-12 mb-6">
              <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                <AvatarImage src={user?.image || undefined} alt={user?.name || "User avatar"} />
                <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                  {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 pb-2">
                <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>
                <div className="flex items-center text-muted-foreground gap-2">
                  <span>{user?.email}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isAdminUser ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'}`}>
                    {isAdminUser ? "Administrator" : "Standard User"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div 
          className="md:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Full Name</span>
                  <p className="font-medium">{user?.name || "Not provided"}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Email Address</span>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">User ID</span>
                  <p className="font-medium text-xs font-mono bg-muted px-2 py-1 rounded w-fit">{user?.id?.substring(0, 12)}...</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Account Status</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <p className="font-medium">Active</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              {isAdminUser && (
                <>
                  <Button variant="default" render={<Link href="/dashboard" />} nativeButton={false}>
                    <span className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Go to Dashboard
                    </span>
                  </Button>
                  <Button variant="outline" render={<Link href="/products/manage" />} nativeButton={false}>
                    <span className="flex items-center">
                      <Package className="mr-2 h-4 w-4" />
                      Manage Products
                    </span>
                  </Button>
                </>
              )}
              <Button variant={isAdminUser ? "secondary" : "default"} render={<Link href="/products" />} nativeButton={false}>
                <span className="flex items-center">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  View Products
                </span>
              </Button>
              <Button variant="outline" render={<Link href="/settings" />} nativeButton={false}>
                <span className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Go to Settings
                </span>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground">{joinDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <LogIn className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Last Login</p>
                  <p className="text-sm text-muted-foreground">{lastLogin}</p>
                </div>
              </div>
              {isAdminUser && (
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Products in Catalog</p>
                    <p className="text-sm text-muted-foreground">
                      {productsCount !== null ? productsCount : "Loading..."}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

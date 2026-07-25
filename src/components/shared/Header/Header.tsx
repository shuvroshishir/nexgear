"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { Calendar, Menu, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  
  // Hardcoded for demo logic but can also use env variables
  // Wait we need to check process.env.NEXT_PUBLIC_ADMIN_EMAIL or similar if it's public.
  // Better yet, just check if email is admin@nexgear.com.
  const isAdmin = user?.email === "admin@nexgear.com";

  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { title: "Home", url: "/" },
    { title: "Explore", url: "/products" },
    { title: "About", url: "/about" },
    ...(isAdmin ? [{ title: "Dashboard", url: "/products/manage" }] : []),
    ...(isAdmin ? [{ title: "Add Item", url: "/products/create" }] : []),
  ];

  const handleNavigation = (url: string) => {
    router.push(url);
    setMobileOpen(false);
  };

  const handleLogoutClick = async () => {
    setMobileOpen(false);
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <button
          onClick={() => handleNavigation("/")}
          className="flex items-center gap-2 font-semibold text-xl hover:opacity-80 transition-opacity"
        >
          <Image src="/asstes/logo.png" alt="Logo" width={30} height={30} />
          <span>NexGear</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link href={item.url} key={item.url}>
              <button className="text-sm font-medium transition-colors hover:text-primary">
                {item.title}
              </button>
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons & Theme */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />

          {user ? (
            <>
              <div className="text-sm text-muted-foreground ml-2">{user.email}</div>
              <Button onClick={handleLogoutClick} size="sm">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => handleNavigation("/signup")}
                size="sm"
                className="ml-2"
              >
                Sign Up
              </Button>
              <Button onClick={() => handleNavigation("/login")} size="sm">
                Login
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent side="right" className="w-75">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Image src="/asstes/logo.png" alt="Logo" width={30} height={30} />
                NexGear
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8">
              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <Link href={item.url} key={item.url}>
                    <button className="w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors">
                      {item.title}
                    </button>
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-2 pt-4 border-t">
                {user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      <div className="font-medium text-foreground">
                        {user.email}
                      </div>
                    </div>
                    <Button
                      onClick={handleLogoutClick}
                      variant="outline"
                      className="w-full"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleNavigation("/login")}
                      variant="outline"
                      className="w-full"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => handleNavigation("/signup")}
                      className="w-full"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

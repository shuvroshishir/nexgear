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
import { isAdmin } from "@/lib/admin";
import { toast } from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  
  const isAdminUser = isAdmin(user?.email);

  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { title: "Home", url: "/" },
    { title: "Explore", url: "/products" },
    { title: "About", url: "/about" },
    { title: "Support", url: "/support" },
    { title: "Contact", url: "/contact" },
  ];

  const handleNavigation = (url: string) => {
    router.push(url);
    setMobileOpen(false);
  };

  const handleLogoutClick = async () => {
    setMobileOpen(false);
    await authClient.signOut();
    toast.success("Successfully logged out!");
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
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <button className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ml-2" />
              }>
                <Avatar className="h-9 w-9 border transition-opacity hover:opacity-80">
                  <AvatarImage src={user?.image || undefined} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                
                {isAdminUser ? (
                  <>
                    <DropdownMenuItem onClick={() => handleNavigation("/dashboard")} className="cursor-pointer">
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigation("/products/create")} className="cursor-pointer">
                      Create Product
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigation("/products/manage")} className="cursor-pointer">
                      Manage Products
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem disabled>Profile</DropdownMenuItem>
                    <DropdownMenuItem disabled>Settings</DropdownMenuItem>
                  </>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogoutClick}
                  className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            <SheetTrigger render={
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            } />
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
                    <div className="flex items-center gap-3 px-3 py-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={user?.image || undefined} alt={user?.name || "User"} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-medium leading-none truncate">{user?.name || "User"}</span>
                        <span className="text-xs text-muted-foreground truncate mt-1">{user?.email}</span>
                      </div>
                    </div>
                    {isAdminUser && (
                      <div className="flex flex-col gap-2 mt-2">
                        <Button
                          onClick={() => handleNavigation("/dashboard")}
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Dashboard
                        </Button>
                        <Button
                          onClick={() => handleNavigation("/products/manage")}
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Manage Products
                        </Button>
                      </div>
                    )}
                    <Button
                      onClick={handleLogoutClick}
                      variant="outline"
                      className="w-full mt-2"
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

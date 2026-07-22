"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, MessageCircleCode, ShoppingBag } from "lucide-react";
import Link from "next/link";

const footerSections = [
  {
    title: "Quick Links",
    links: [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "Products",
        href: "/products",
      },
      {
        title: "About Us",
        href: "/about",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        title: "Contact Us",
        href: "/contact",
      },
      {
        title: "Login",
        href: "/login",
      },
      {
        title: "Sign Up",
        href: "/signup",
      },
    ],
  },
];

export default function Footer() {
  return (
    <div className="flex flex-col mt-auto">
      <div className="grow bg-muted" />
      <footer className="border-t bg-background">
        <div className="container mx-auto">
          <div className="py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-8 gap-y-10 px-6 xl:px-0">
            <div className="col-span-full xl:col-span-2">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 font-semibold text-xl hover:opacity-80 transition-opacity">
                <ShoppingBag className="h-6 w-6" />
                <span>NexGear</span>
              </Link>

              <p className="mt-4 text-muted-foreground">
                Your Trusted Online Shopping Destination.
              </p>
            </div>

            {footerSections.map(({ title, links }) => (
              <div key={title}>
                <h6 className="font-medium">{title}</h6>
                <ul className="mt-6 space-y-4">
                  {links.map(({ title, href }) => (
                    <li key={title}>
                      <Link
                        href={href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Subscribe Newsletter */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-3 xl:col-span-3">
              <h6 className="font-medium">Stay up to date</h6>
              <form className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="grow w-full max-w-sm"
                  required
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
          <Separator />
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" className="font-medium hover:text-foreground">
                NexGear
              </Link>
              . All rights reserved.
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <Link href="https://github.com" target="_blank" className="hover:text-foreground">
                <MessageCircleCode className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="hover:text-foreground">
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

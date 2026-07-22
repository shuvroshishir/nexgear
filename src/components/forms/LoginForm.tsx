"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDemoLogin = () => {
    setEmail("admin@nexgear.com");
    setPassword("admin123");
  };

  async function handleSubmit(data: React.FormEvent) {
    data.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError(result.error || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>

          <p className="text-muted-foreground text-sm">
            Enter your email below to login
          </p>
        </div>
        
        {error && (
          <div className="p-3 bg-red-100 text-red-600 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label>Email</Label>

            <Input
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label>Password</Label>

              <Link
                href="/forgot-password"
                className="ml-auto text-sm underline-offset-4 hover:underline text-primary"
              >
                Forgot password?
              </Link>
            </div>

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full" 
            onClick={handleDemoLogin}
          >
            Demo Login
          </Button>
        </div>

        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="underline underline-offset-4 text-primary font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
}

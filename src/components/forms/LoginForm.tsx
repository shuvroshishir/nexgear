"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({ 
        provider: "google",
        callbackURL: "/",
      });
      // Note: Google redirects, so success toast might not show long, but good practice
      toast.success("Redirecting to Google...");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Google sign in failed";
      toast.error(message);
      setError(message);
    }
  };

  async function handleSubmit(data: React.FormEvent) {
    data.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: resultError } = await authClient.signIn.email({
        email,
        password,
      });

      if (resultError) {
        toast.error(resultError.message || "Login failed");
        setError(resultError.message || "Login failed");
      } else {
        toast.success("Successfully logged in!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Access Portal</h1>
        <p className="text-muted-foreground text-sm max-w-sm">
          Enter your credentials to securely access your NexGear account
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center font-medium backdrop-blur-sm"
        >
          {error}
        </motion.div>
      )}

      <div className="grid gap-5">
        <div className="grid gap-2">
          <Label className="text-muted-foreground ml-1">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground/70" />
            <Input
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-background/50 border-border text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary focus-visible:border-primary h-12 rounded-xl transition-all"
              required
            />
          </div>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between ml-1">
            <Label className="text-muted-foreground">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary hover:text-emerald-500 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground/70" />
            <Input
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 bg-background/50 border-border text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary focus-visible:border-primary h-12 rounded-xl transition-all"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded-xl text-base font-semibold shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transition-all mt-2 group"
          disabled={loading}
        >
          {loading ? "Authenticating..." : "Login to NexGear"}
          {!loading && <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />}
        </Button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-4 text-muted-foreground font-medium tracking-wider backdrop-blur-md rounded-full">
              Or continue with
            </span>
          </div>
        </div>

        <div className="">
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 rounded-xl bg-background/50 border-border hover:bg-accent transition-all text-foreground font-medium flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </Button>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground mt-2">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary hover:text-emerald-500 font-semibold transition-colors">
          Sign up now
        </Link>
      </div>
    </motion.form>
  );
}

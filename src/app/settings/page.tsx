"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { SettingsSkeleton } from "@/components/shared/skeletons/SettingsSkeleton";
import { SettingsSection } from "@/components/pages/settings/SettingsSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { User, Palette, Shield, AlertTriangle, Monitor, Moon, Sun, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { theme, setTheme } = useTheme();
  
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    } else if (session?.user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(session.user.name || "");
      setImageUrl(session.user.image || "");
    }
  }, [isPending, session, router]);

  if (isPending || !session || !mounted) {
    return <SettingsSkeleton />;
  }

  const user = session.user;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    
    if (name === user.name && imageUrl === (user.image || "")) {
      toast("No changes to save", { icon: "ℹ️" });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: imageUrl.trim(),
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
      router.refresh();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Failed to logout");
    }
  };

  // The mounted check is handled by the skeleton loading phase above

  return (
    <div className="container max-w-3xl py-10 mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <SettingsSection
          title="Profile Settings"
          description="Update your personal details here."
          icon={User}
          delay={0.1}
        >
          <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Profile Image URL</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/your-image.jpg"
              />
              <p className="text-xs text-muted-foreground">
                Provide a direct URL to an image. Leave blank to use the default avatar.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="bg-muted/50 cursor-not-allowed text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground">
                Your email address is managed by your authentication provider and cannot be changed here.
              </p>
            </div>
            <Button type="submit" disabled={isSaving || (name === user.name && imageUrl === (user.image || ""))}>
              {isSaving ? (
                <>
                  <LoadingSpinner className="mr-2 h-4 w-4" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </SettingsSection>

        {/* Appearance */}
        <SettingsSection
          title="Appearance"
          description="Customize the look and feel of NexGear."
          icon={Palette}
          delay={0.2}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setTheme("light")}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                theme === "light" 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50 hover:bg-accent"
              }`}
            >
              <Sun className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Light</span>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                theme === "dark" 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50 hover:bg-accent"
              }`}
            >
              <Moon className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Dark</span>
            </button>
            <button
              onClick={() => setTheme("system")}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                theme === "system" 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50 hover:bg-accent"
              }`}
            >
              <Monitor className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">System</span>
            </button>
          </div>
        </SettingsSection>

        {/* Security & Account */}
        <SettingsSection
          title="Account & Security"
          description="Review your active sessions and connected accounts."
          icon={Shield}
          delay={0.3}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-sm">Session Active</p>
                  <p className="text-xs text-muted-foreground">You are currently logged in securely.</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                <div className="flex-1">
                  <p className="font-medium text-sm">Authentication Provider</p>
                  <p className="text-xs text-muted-foreground">
                    You are authenticated via Google.
                  </p>
                </div>
                <div className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full font-medium w-fit">
                  Google Connected
                </div>
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* Danger Zone */}
        <SettingsSection
          title="Danger Zone"
          description="Irreversible and destructive actions."
          icon={AlertTriangle}
          delay={0.4}
          danger
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-sm">Log out of your account</p>
              <p className="text-xs text-muted-foreground/80">
                You will be required to log back in to access your profile and settings.
              </p>
            </div>
            <Button variant="destructive" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
}

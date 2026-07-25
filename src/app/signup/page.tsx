import { SignupForm } from "@/components/forms/SignupForm";
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2 bg-background">
      {/* Left Column: Picture */}
      <div className="relative hidden lg:block overflow-hidden bg-black">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/10 to-background/90" />
        <Image
          src="https://images.unsplash.com/photo-1636115305669-9096bffe87fd?q=80&w=1172&auto=format&fit=crop"
          alt="Premium Circuit"
          fill
          priority
          className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute bottom-20 left-12 z-20 max-w-md">
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-black/50 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md w-fit mb-4">
            <Sparkles className="size-4" />
            Join the Revolution
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Next generation of tech is here</h2>
          <p className="text-white/70 text-lg">
            Create an account today to discover exclusive deals, premium audio, and powerful wearable gadgets tailored to your lifestyle.
          </p>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="relative flex flex-col items-center justify-center p-6 md:p-10 lg:p-12 overflow-hidden">
        {/* Background Effects for the right side */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full opacity-30 mix-blend-screen pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Header */}
        <div className="relative z-10 w-full max-w-md mb-8 flex justify-center lg:justify-start">
          <Link href="/" className="group flex items-center gap-3 font-bold text-3xl">
            <Image src="/asstes/logo.png" alt="Logo" width={40} height={40} className="transition-transform duration-300 group-hover:scale-110" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">NexGear</span>
          </Link>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="rounded-3xl border border-border bg-card/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        
        {/* Inner reverse spinning ring */}
        <div className="absolute w-8 h-8 rounded-full border-4 border-emerald-500/20 border-b-emerald-500 animate-[spin_1.5s_linear_infinite_reverse]" />
        
        {/* Center dot/logo placeholder */}
        <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
      </div>
    </div>
  );
}

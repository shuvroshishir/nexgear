"use client";

import { Users, ShoppingBag, Award, Clock } from "lucide-react";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ from, to, suffix }: { from: number; to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, suffix]);

  return <span ref={ref}>{from}{suffix}</span>;
}

export const StatisticsSection = () => {
  const stats = [
    { value: 10, suffix: "K+", label: "Happy Customers", icon: Users },
    { value: 500, suffix: "+", label: "Premium Products", icon: ShoppingBag },
    { value: 50, suffix: "+", label: "Top Brands", icon: Award },
    { value: 24, suffix: "/7", label: "Customer Support", icon: Clock },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-zinc-950 dark:bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="p-4 rounded-full bg-primary/20 mb-4 text-primary">
                <stat.icon className="size-6" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2">
                <Counter from={0} to={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-white/60 font-medium text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

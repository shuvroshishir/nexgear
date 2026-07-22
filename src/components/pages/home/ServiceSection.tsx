"use client";

import { ShieldCheck, CreditCard, Truck, Award, Headset } from "lucide-react";
import { motion } from "framer-motion";

export const ServiceSection = () => {
  const features = [
    {
      title: "Premium Quality",
      description: "Authentic, high-end gear from top global brands.",
      icon: ShieldCheck,
    },
    {
      title: "Secure Payment",
      description: "256-bit encryption for safe and secure transactions.",
      icon: CreditCard,
    },
    {
      title: "Fast Delivery",
      description: "Lightning-fast shipping directly to your doorstep.",
      icon: Truck,
    },
    {
      title: "Warranty",
      description: "1-year extended warranty on all tech purchases.",
      icon: Award,
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock dedicated customer assistance.",
      icon: Headset,
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden border-y border-border/50 bg-muted/20">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">NexGear</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the ultimate tech shopping journey with our premium services designed for enthusiasts.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(20,184,166,0.05)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 mb-5 p-4 rounded-full bg-primary/10 text-primary transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110">
                <feature.icon size={28} strokeWidth={1.5} />
              </div>
              
              <h3 className="relative z-10 text-lg font-bold mb-2">{feature.title}</h3>
              <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

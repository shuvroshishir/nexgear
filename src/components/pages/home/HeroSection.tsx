"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 0,
    badge: "Next-Gen Gadgets Arrived",
    title: "Elevate Your",
    titleHighlight: "Digital Life",
    description: "Step into the future with NexGear. We provide the most advanced, premium tech gadgets designed to enhance your daily lifestyle and productivity.",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: 1,
    badge: "Exclusive Collection",
    title: "Immersive",
    titleHighlight: "Audio Experience",
    description: "Discover crystal clear sound with our latest noise-canceling headphones. Premium audio designed for audiophiles.",
    image: "https://plus.unsplash.com/premium_photo-1677838847804-4054143fb91a?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: 2,
    badge: "Limited Edition",
    title: "Power In",
    titleHighlight: "Your Hands",
    description: "Experience unparalleled performance with the newest generation of smartwatches and fitness trackers. Push your limits.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop",
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [currentSlide]); // Reset timer when slide changes

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative flex min-h-[65vh] w-full items-center justify-center overflow-hidden bg-background px-6 pt-12 pb-24 md:pt-16 lg:pt-20">
      {/* Background Gradient & Glow Effects */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 blur-[120px] rounded-full opacity-50 mix-blend-screen pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="container relative z-10 mx-auto flex flex-col items-center justify-between gap-12 lg:flex-row"
        >
          {/* Left Content Area */}
          <div className="flex flex-1 flex-col items-start text-left">
            <div
              className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm"
            >
              <Sparkles className="mr-2 size-4" />
              <span>{slide.badge}</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {slide.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                {slide.titleHighlight}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              {slide.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link href="/products">
                <Button size="lg" className="flex items-center justify-center gap-2 rounded-full font-semibold shadow-lg shadow-primary/25 group px-8 py-6 text-base md:text-lg">
                  Shop Collection
                  <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center justify-center gap-2 rounded-full font-semibold group px-8 py-6 text-base md:text-lg"
                >
                  View Categories
                  <ChevronRight className="size-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image Area */}
          <div className="relative flex-1 w-full max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg mx-auto lg:mx-0">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl group">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent mix-blend-overlay pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/50 p-2 text-foreground backdrop-blur-md transition-all hover:bg-primary hover:text-primary-foreground sm:flex md:left-8"
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/50 p-2 text-foreground backdrop-blur-md transition-all hover:bg-primary hover:text-primary-foreground sm:flex md:right-8"
        aria-label="Next slide"
      >
        <ChevronRight className="size-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {slides.map((s, index) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              currentSlide === index ? "w-8 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground"
      >
        <span className="text-xs font-medium uppercase tracking-widest mb-1">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Tech Enthusiast",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      content:
        "NexGear is my go-to for premium gadgets. The shopping experience is buttery smooth, and the shipping is incredibly fast.",
      rating: 5,
    },
    {
      id: 2,
      name: "Mark Wilson",
      role: "Software Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      content:
        "I bought my entire workspace setup here. Authentic products, excellent warranties, and a UI that feels like the future.",
      rating: 5,
    },
    {
      id: 3,
      name: "Sophia Lee",
      role: "Digital Nomad",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      content:
        "Customer support is genuinely 24/7. I had an issue with my delivery and they resolved it in under 10 minutes.",
      rating: 4,
    },
    {
      id: 4,
      name: "David Chen",
      role: "Gamer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      content:
        "Got my custom mechanical keyboard from NexGear. The tracking was precise and the product quality is top-tier.",
      rating: 5,
    },
  ];

  return (
    <section className="container py-24 mx-auto overflow-hidden">
      <div className="mb-12 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Thousands</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Don't just take our word for it. Here is what our community of tech lovers has to say about NexGear.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto px-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-6 rounded-2xl bg-card border border-border h-full flex flex-col hover:border-primary/50 transition-colors">
                  <div className="flex gap-1 mb-4 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${i < testimonial.rating ? "fill-current" : "fill-muted text-muted"}`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-6 flex-1 italic text-sm leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="relative size-12 rounded-full overflow-hidden border border-border">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 size-10 border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all" />
          <CarouselNext className="hidden md:flex -right-12 size-10 border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all" />
        </Carousel>
      </div>
    </section>
  );
};

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Search, 
  Package, 
  Truck, 
  RefreshCcw, 
  CreditCard, 
  UserCircle, 
  Info,
  ArrowRight,
  Headset
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const supportCategories = [
  {
    title: "Orders",
    icon: Package,
    description: "Track, modify, or cancel an existing order."
  },
  {
    title: "Shipping",
    icon: Truck,
    description: "Learn about delivery times and shipping rates."
  },
  {
    title: "Returns",
    icon: RefreshCcw,
    description: "How to return or exchange a product."
  },
  {
    title: "Payments",
    icon: CreditCard,
    description: "Manage payment methods and billing."
  },
  {
    title: "Account",
    icon: UserCircle,
    description: "Update profile, password, and preferences."
  },
  {
    title: "Product Information",
    icon: Info,
    description: "Specs, manuals, and compatibility guides."
  }
];

const faqs = [
  {
    id: "ordering",
    question: "How do I place an order?",
    answer: "Placing an order is simple. Browse our catalog, add the desired items to your cart, and proceed to checkout. You can check out as a guest or create an account for a faster experience next time."
  },
  {
    id: "payments",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are securely encrypted."
  },
  {
    id: "shipping",
    question: "How long will it take to get my order?",
    answer: "Standard shipping typically takes 3-5 business days. Expedited shipping is available at checkout for 1-2 day delivery. International shipping times vary by destination."
  },
  {
    id: "warranty",
    question: "Do your products come with a warranty?",
    answer: "Yes, all NexGear electronics come with a standard 1-year manufacturer warranty covering defects in materials and workmanship. Extended warranties are also available."
  },
  {
    id: "returns",
    question: "What is your return policy?",
    answer: "We offer a 30-day hassle-free return policy. If you are not completely satisfied with your purchase, you can return it within 30 days for a full refund, provided it is in original condition."
  },
  {
    id: "account",
    question: "How can I reset my password?",
    answer: "Click on the 'Login' button and select 'Forgot Password'. Enter the email associated with your account, and we will send you a secure link to reset your password."
  }
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-background to-background" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Help & Support
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              How can we help you today? Search our knowledge base or browse categories below.
            </p>
            
            <div className="relative max-w-2xl mx-auto group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Search for articles, questions, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 md:h-16 text-base md:text-lg rounded-2xl bg-background/80 backdrop-blur border-border focus-visible:ring-primary/50 shadow-xl shadow-black/5 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 relative z-20">
        
        {/* Support Categories */}
        <div className="mb-24">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {supportCategories.map((category) => (
              <motion.div key={category.title} variants={itemVariants}>
                <Card className="p-6 md:p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer h-full group bg-card/50 backdrop-blur">
                  <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <category.icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{category.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">Quick answers to our most common inquiries.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-xl shadow-black/5"
          >
            <Accordion className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="py-2">
                  <AccordionTrigger className="text-left font-semibold text-[15px] hover:no-underline hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-4xl mx-auto p-10 md:p-14 text-center bg-linear-to-br from-primary/10 via-background to-transparent border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Headset className="size-48" />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="mx-auto size-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <Headset className="size-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Still Need Help?</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Can&apos;t find the answer you&apos;re looking for? Our dedicated support team is ready to assist you.
              </p>
              <div className="pt-4">
                <Link href="/contact">
                  <Button size="lg" className="h-14 px-8 rounded-xl text-base font-semibold shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transition-all">
                    Contact Support <ArrowRight className="ml-2 size-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>

      </section>
    </div>
  );
}

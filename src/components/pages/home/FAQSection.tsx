"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "Are all products on NexGear authentic?",
      answer:
        "Yes, absolutely. We source all our products directly from manufacturers and authorized global distributors. Every item comes with a verified authenticity guarantee and original manufacturer warranty.",
    },
    {
      question: "What is your return and refund policy?",
      answer:
        "We offer a 30-day hassle-free return policy for all unopened items. For defective products, we provide instant replacements or full refunds within 14 days of delivery. Custom-built PCs and customized gadgets are subject to a restocking fee.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship globally! International shipping usually takes 5-10 business days depending on the destination. All packages are fully insured and tracked.",
    },
    {
      question: "How does the warranty claim process work?",
      answer:
        "If your product develops a fault within the warranty period, simply log into your NexGear account, navigate to 'My Orders', and click 'Claim Warranty'. Our 24/7 support team will arrange a free pickup and replacement for you.",
    },
    {
      question: "Can I cancel or change my order after placing it?",
      answer:
        "You can modify or cancel your order within 2 hours of placement. Since we process and dispatch orders rapidly to ensure fast delivery, changes cannot be made once the order has entered the shipping phase.",
    },
  ];

  return (
    <section className="container py-24 mx-auto max-w-4xl">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Questions</span>
        </h2>
        <p className="text-muted-foreground">
          Everything you need to know about shopping with NexGear.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="bg-card/50 border border-border/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b-border/50 px-2">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary transition-colors py-5 text-sm md:text-base hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
};

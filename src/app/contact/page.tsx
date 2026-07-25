"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const Github = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
);

const Linkedin = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
);

const Twitter = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Simulated validation and submission
    setTimeout(() => {
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        setError("Please fill out all fields.");
        setLoading(false);
        return;
      }
      if (!/^\\S+@\\S+\\.\\S+$/.test(formData.email)) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
      }
      
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 flex items-center justify-center">
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
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have a question about a product, your order, or just want to say hi? We're here to help you navigate the NexGear universe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {/* Contact Form (Left) */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-xl shadow-black/5">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground">Send us a message</h2>
                <p className="text-muted-foreground mt-2">Our team typically responds within 24 hours.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl text-sm font-medium">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-muted-foreground">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-background/50 h-12 rounded-xl transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-muted-foreground">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-background/50 h-12 rounded-xl transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-muted-foreground">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-background/50 h-12 rounded-xl transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-muted-foreground">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-background/50 rounded-xl resize-none transition-all"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="h-12 px-8 rounded-xl font-semibold shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transition-all group"
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && <Send className="ml-2 size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info (Right) */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-xl shadow-black/5">
              <h3 className="text-xl font-bold text-foreground mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Email</h4>
                    <p className="text-sm text-muted-foreground mt-1">support@nexgear.com</p>
                    <p className="text-sm text-muted-foreground">sales@nexgear.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Phone</h4>
                    <p className="text-sm text-muted-foreground mt-1">+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">Toll-free: 1-800-NEX-GEAR</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Office</h4>
                    <p className="text-sm text-muted-foreground mt-1">123 Tech Boulevard<br/>Suite 400<br/>San Francisco, CA 94105</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Business Hours</h4>
                    <p className="text-sm text-muted-foreground mt-1">Monday - Friday<br/>9:00 AM - 6:00 PM (PST)</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  <a href="#" className="p-2 bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors">
                    <Twitter className="size-5" />
                  </a>
                  <a href="#" className="p-2 bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors">
                    <Github className="size-5" />
                  </a>
                  <a href="#" className="p-2 bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors">
                    <Linkedin className="size-5" />
                  </a>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-linear-to-br from-primary/10 to-transparent border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="size-5 text-primary" />
                <h3 className="font-semibold text-foreground">Looking for quick answers?</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Check out our comprehensive help center for answers to common questions about shipping, returns, and more.
              </p>
              <Link href="/support" className="flex items-center justify-center w-full">
                <Button variant="outline" className="w-full bg-background">
                  Visit Help Center <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </Card>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

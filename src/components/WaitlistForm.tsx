"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string()
  .trim()
  .min(1, "Please enter your email")
  .email("Please enter a valid email address")
  .max(255, "Email must be less than 255 characters");

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    // Lazy-load Supabase only when form is submitted (reduces initial bundle by ~35KB)
    const { supabase } = await import("@/integrations/supabase/client");

    const { data, error } = await supabase.functions.invoke("waitlist-signup", {
      body: { email: email.toLowerCase().trim() },
    });

    setIsLoading(false);

    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    if (data?.error === "already_registered") {
      toast.info("You're already on the waitlist!");
      return;
    }

    if (data?.error) {
      if (data.error.includes("Too many requests")) {
        toast.error("Too many attempts. Please try again in an hour.");
      } else {
        toast.error(data.error);
      }
      return;
    }

    toast.success("You're on the list! We'll notify you when we launch.");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <div className="relative flex-1 rounded-[10px] border border-border bg-surface-2 focus-within:border-primary transition-colors">
        <label htmlFor="waitlist-email" className="sr-only">Email address</label>
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" aria-hidden="true" />
        <input
          type="email"
          id="waitlist-email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-transparent focus:outline-none transition-all text-foreground placeholder:text-text-tertiary font-barlow rounded-[10px]"
          disabled={isLoading}
          aria-required="true"
          autoComplete="email"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="px-8 py-4 bg-primary hover:bg-forge-orange-dark text-primary-foreground font-barlow-condensed font-bold uppercase tracking-wider transition-all disabled:opacity-50 whitespace-nowrap btn-neon rounded-[14px]"
      >
        {isLoading ? "Joining..." : "Join Waitlist"}
      </button>
    </form>
  );
};

export default WaitlistForm;

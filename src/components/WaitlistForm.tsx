import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);
    
    const { error } = await supabase
      .from("waitlist")
      .insert({ email: email.toLowerCase().trim() });

    setIsLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast.info("You're already on the waitlist!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      return;
    }

    toast.success("You're on the list! We'll notify you when we launch.");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <div className="relative flex-1">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 whitespace-nowrap"
      >
        {isLoading ? "Joining..." : "Join Waitlist"}
      </button>
    </form>
  );
};

export default WaitlistForm;

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RATE_LIMIT_WINDOW_MINUTES = 60;
const MAX_REQUESTS_PER_WINDOW = 3;

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get client IP from headers
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
      || req.headers.get("cf-connecting-ip") 
      || req.headers.get("x-real-ip") 
      || "unknown";

    console.log(`Waitlist signup attempt from IP: ${clientIP}`);

    // Parse request body
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 255) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Clean up old rate limit entries
    await supabase.rpc("cleanup_old_rate_limits");

    // Check rate limit
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();
    
    const { count, error: rateLimitError } = await supabase
      .from("waitlist_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", clientIP)
      .gte("created_at", windowStart);

    if (rateLimitError) {
      console.error("Rate limit check error:", rateLimitError);
    }

    if (count && count >= MAX_REQUESTS_PER_WINDOW) {
      console.log(`Rate limit exceeded for IP: ${clientIP}, count: ${count}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Record this attempt for rate limiting
    const { error: insertRateLimitError } = await supabase
      .from("waitlist_rate_limits")
      .insert({ ip_address: clientIP });

    if (insertRateLimitError) {
      console.error("Failed to record rate limit:", insertRateLimitError);
    }

    // Insert into waitlist
    const { error: insertError } = await supabase
      .from("waitlist")
      .insert({ email: email.toLowerCase().trim() });

    if (insertError) {
      if (insertError.code === "23505") {
        console.log(`Duplicate email attempt: ${email}`);
        return new Response(
          JSON.stringify({ error: "already_registered" }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      console.error("Waitlist insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to join waitlist" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Successfully added to waitlist: ${email}`);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
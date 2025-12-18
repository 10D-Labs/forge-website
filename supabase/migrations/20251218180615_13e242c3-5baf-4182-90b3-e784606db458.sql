-- Create rate limits table for tracking submissions
CREATE TABLE public.waitlist_rate_limits (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.waitlist_rate_limits ENABLE ROW LEVEL SECURITY;

-- Only allow inserts from service role (edge function)
CREATE POLICY "Service role only" ON public.waitlist_rate_limits
FOR ALL USING (false);

-- Create index for fast IP lookups
CREATE INDEX idx_waitlist_rate_limits_ip_created 
ON public.waitlist_rate_limits (ip_address, created_at DESC);

-- Function to clean up old rate limit entries (older than 1 hour)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.waitlist_rate_limits
  WHERE created_at < now() - interval '1 hour';
$$;
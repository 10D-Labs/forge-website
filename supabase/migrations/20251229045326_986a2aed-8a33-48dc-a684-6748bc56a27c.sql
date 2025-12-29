-- Remove public INSERT access from waitlist table (now only edge function with service role can insert)
DROP POLICY IF EXISTS "Anyone can join waitlist" ON public.waitlist;

-- Add policy to allow service role to insert (for edge function)
CREATE POLICY "Service role can insert into waitlist"
ON public.waitlist
FOR INSERT
TO service_role
WITH CHECK (true);

-- Fix rate limits table - allow service role to manage it
DROP POLICY IF EXISTS "Deny public insert on rate limits" ON public.waitlist_rate_limits;
DROP POLICY IF EXISTS "Deny public select on rate limits" ON public.waitlist_rate_limits;
DROP POLICY IF EXISTS "Deny public update on rate limits" ON public.waitlist_rate_limits;
DROP POLICY IF EXISTS "Deny public delete on rate limits" ON public.waitlist_rate_limits;

-- Allow service role full access to rate limits
CREATE POLICY "Service role can manage rate limits"
ON public.waitlist_rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Deny public access to rate limits
CREATE POLICY "Deny public access to rate limits"
ON public.waitlist_rate_limits
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);
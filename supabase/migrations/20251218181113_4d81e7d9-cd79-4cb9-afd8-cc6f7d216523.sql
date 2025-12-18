-- Drop existing policy
DROP POLICY IF EXISTS "Service role only" ON public.waitlist_rate_limits;

-- Create proper restrictive policies for each operation
-- These deny all access to anon/authenticated users (service role bypasses RLS)
CREATE POLICY "Deny public select on rate limits" 
ON public.waitlist_rate_limits 
FOR SELECT 
TO anon, authenticated
USING (false);

CREATE POLICY "Deny public insert on rate limits" 
ON public.waitlist_rate_limits 
FOR INSERT 
TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "Deny public update on rate limits" 
ON public.waitlist_rate_limits 
FOR UPDATE 
TO anon, authenticated
USING (false);

CREATE POLICY "Deny public delete on rate limits" 
ON public.waitlist_rate_limits 
FOR DELETE 
TO anon, authenticated
USING (false);
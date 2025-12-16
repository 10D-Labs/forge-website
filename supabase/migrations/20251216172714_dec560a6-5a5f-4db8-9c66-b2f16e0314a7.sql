-- Add restrictive SELECT policy to deny public reads
CREATE POLICY "Deny public reads on waitlist"
ON public.waitlist
FOR SELECT
USING (false);

-- Add restrictive UPDATE policy
CREATE POLICY "Deny public updates on waitlist"
ON public.waitlist
FOR UPDATE
USING (false);

-- Add restrictive DELETE policy  
CREATE POLICY "Deny public deletes on waitlist"
ON public.waitlist
FOR DELETE
USING (false);
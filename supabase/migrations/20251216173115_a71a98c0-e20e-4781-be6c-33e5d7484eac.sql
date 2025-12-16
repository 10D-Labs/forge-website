-- Add length constraint on email column
ALTER TABLE public.waitlist
ALTER COLUMN email TYPE VARCHAR(255);

-- Add email format validation constraint
ALTER TABLE public.waitlist
ADD CONSTRAINT waitlist_email_format_check
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
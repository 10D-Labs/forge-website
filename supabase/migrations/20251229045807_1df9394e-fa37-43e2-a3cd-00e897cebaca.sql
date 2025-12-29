-- Revoke public execution rights on cleanup function
REVOKE EXECUTE ON FUNCTION public.cleanup_old_rate_limits() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.cleanup_old_rate_limits() FROM anon;
REVOKE EXECUTE ON FUNCTION public.cleanup_old_rate_limits() FROM authenticated;

-- Grant execution only to service_role (used by edge functions)
GRANT EXECUTE ON FUNCTION public.cleanup_old_rate_limits() TO service_role;
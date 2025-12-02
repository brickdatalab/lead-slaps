-- Grant the anon role access to the public schema
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.inventory_segments TO anon;
-- Create inventory_snapshots table to track historical quantities
CREATE TABLE public.inventory_snapshots (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  segment_id uuid NOT NULL REFERENCES public.inventory_segments(id) ON DELETE CASCADE,
  available_quantity integer NOT NULL,
  captured_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Index for efficient lookups by segment and time
CREATE INDEX idx_inventory_snapshots_segment_time ON public.inventory_snapshots(segment_id, captured_at DESC);

-- Enable RLS
ALTER TABLE public.inventory_snapshots ENABLE ROW LEVEL SECURITY;

-- Public read access (same as inventory_segments)
CREATE POLICY "Allow public read access to inventory_snapshots"
ON public.inventory_snapshots
FOR SELECT
USING (true);

-- Allow inserts from anon (for the client-side snapshot capture)
CREATE POLICY "Allow public insert to inventory_snapshots"
ON public.inventory_snapshots
FOR INSERT
WITH CHECK (true);
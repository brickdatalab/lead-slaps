import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type ProductKey = 'direct_submissions' | 'alpha_data' | 'pulse_data';
export type AgeBandKey = 'lt_15' | '15_30' | '30_90' | '90_180' | '180_365' | '1_2y';

export interface InventorySegment {
  id: string;
  productKey: ProductKey;
  productLabel: string;
  ageBandKey: AgeBandKey;
  ageBandLabel: string;
  priceCents: number;
  availableQuantity: number;
  maxQuantity: number;
  squareVariationId?: string | null;
  // 7-day change tracking
  change7d?: number | null;
  changePercent7d?: number | null;
}

export interface UseInventorySegmentsResult {
  segments: InventorySegment[];
  isLoading: boolean;
  error: string | null;
  lastRefreshed: Date | null;
  refresh: () => Promise<void>;
}

export function useInventorySegments(autoRefreshInterval?: number): UseInventorySegmentsResult {
  const [segments, setSegments] = useState<InventorySegment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const fetchSegments = async () => {
    try {
      setError(null);
      
      // Fetch current inventory
      const { data, error: fetchError } = await supabase
        .from('inventory_segments')
        .select('*')
        .order('product_key')
        .order('age_band_key');

      if (fetchError) throw fetchError;

      // Calculate 7 days ago timestamp
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // Fetch the oldest snapshot within last 7 days for each segment
      const segmentIds = (data || []).map(row => row.id);
      
      let historicalData: Record<string, number> = {};
      
      if (segmentIds.length > 0) {
        // Get snapshots from ~7 days ago (closest to 7 days)
        const { data: snapshots } = await supabase
          .from('inventory_snapshots')
          .select('segment_id, available_quantity, captured_at')
          .in('segment_id', segmentIds)
          .gte('captured_at', sevenDaysAgo.toISOString())
          .order('captured_at', { ascending: true });

        // Get the earliest snapshot for each segment (closest to 7 days ago)
        if (snapshots) {
          for (const snap of snapshots) {
            if (!historicalData[snap.segment_id]) {
              historicalData[snap.segment_id] = snap.available_quantity;
            }
          }
        }
      }

      const mappedSegments: InventorySegment[] = (data || []).map((row) => {
        const historical = historicalData[row.id];
        const change7d = historical !== undefined ? row.available_quantity - historical : null;
        const changePercent7d = historical !== undefined && historical !== 0 
          ? ((row.available_quantity - historical) / historical) * 100 
          : null;

        return {
          id: row.id,
          productKey: row.product_key as ProductKey,
          productLabel: row.product_label,
          ageBandKey: row.age_band_key as AgeBandKey,
          ageBandLabel: row.age_band_label,
          priceCents: row.price_cents,
          availableQuantity: row.available_quantity,
          maxQuantity: row.max_quantity,
          squareVariationId: row.square_variation_id,
          change7d,
          changePercent7d,
        };
      });

      setSegments(mappedSegments);
      setLastRefreshed(new Date());

      // Save snapshot for each segment (fire and forget)
      if (data && data.length > 0) {
        const snapshots = data.map(row => ({
          segment_id: row.id,
          available_quantity: row.available_quantity,
        }));
        
        supabase
          .from('inventory_snapshots')
          .insert(snapshots)
          .then(({ error: insertError }) => {
            if (insertError) {
              console.warn('Failed to save inventory snapshot:', insertError);
            }
          });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load inventory');
      console.error('Error fetching inventory segments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSegments();
  }, []);

  useEffect(() => {
    if (!autoRefreshInterval) return;

    const interval = setInterval(fetchSegments, autoRefreshInterval);
    return () => clearInterval(interval);
  }, [autoRefreshInterval]);

  return {
    segments,
    isLoading,
    error,
    lastRefreshed,
    refresh: fetchSegments,
  };
}

import { useState } from 'react';
import { InventorySegment, ProductKey } from '@/hooks/useInventorySegments';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface InventoryDashboardProps {
  segments: InventorySegment[];
  isLoading: boolean;
  error: string | null;
  lastRefreshed: Date | null;
  onSegmentSelect: (productKey: ProductKey, segmentId: string) => void;
}

type SegmentStatus = 'healthy' | 'tight' | 'waitlist';

function getSegmentStatus(availableQuantity: number, maxQuantity: number): SegmentStatus {
  if (availableQuantity <= 0) return 'waitlist';
  const ratio = maxQuantity > 0 ? availableQuantity / maxQuantity : 1;
  return ratio > 0.2 ? 'healthy' : 'tight';
}

function getStatusConfig(status: SegmentStatus) {
  switch (status) {
    case 'healthy':
      return {
        color: 'bg-emerald-500 text-white',
        label: 'Healthy',
      };
    case 'tight':
      return {
        color: 'bg-amber-500 text-white',
        label: 'Tight',
      };
    case 'waitlist':
      return {
        color: 'bg-red-500 text-white',
        label: 'Waitlist',
      };
  }
}

interface GroupedProduct {
  productKey: ProductKey;
  productLabel: string;
  totalAvailable: number;
  totalMax: number;
  segments: InventorySegment[];
}

function groupByProduct(segments: InventorySegment[]): GroupedProduct[] {
  const groups = new Map<ProductKey, GroupedProduct>();
  
  // Define product order
  const productOrder: ProductKey[] = ['direct_submissions', 'alpha_data', 'pulse_data'];
  
  segments.forEach((segment) => {
    if (!groups.has(segment.productKey)) {
      groups.set(segment.productKey, {
        productKey: segment.productKey,
        productLabel: segment.productLabel,
        totalAvailable: 0,
        totalMax: 0,
        segments: [],
      });
    }
    const group = groups.get(segment.productKey)!;
    group.totalAvailable += segment.availableQuantity;
    group.totalMax += segment.maxQuantity;
    group.segments.push(segment);
  });

  // Sort by product order
  return productOrder
    .filter((key) => groups.has(key))
    .map((key) => groups.get(key)!);
}

export function InventoryDashboard({
  segments,
  isLoading,
  error,
  lastRefreshed,
  onSegmentSelect,
}: InventoryDashboardProps) {
  const [expandedProducts, setExpandedProducts] = useState<Set<ProductKey>>(new Set());
  
  const formatNumber = (num: number) => num.toLocaleString();
  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  const toggleProduct = (productKey: ProductKey) => {
    setExpandedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(productKey)) {
        next.delete(productKey);
      } else {
        next.add(productKey);
      }
      return next;
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading live inventory…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Live availability is temporarily unavailable. Pricing will still be validated at checkout.
        </p>
      </div>
    );
  }

  if (segments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Inventory data is not available yet. You can still configure an order and we'll confirm availability during checkout.
        </p>
      </div>
    );
  }

  const groupedProducts = groupByProduct(segments);

  return (
    <div className="space-y-4">
      {lastRefreshed && (
        <p className="text-sm text-muted-foreground">
          Live inventory last refreshed: {lastRefreshed.toLocaleTimeString()}
        </p>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold w-8"></th>
              <th className="text-left py-3 px-4 font-semibold">Product</th>
              <th className="text-left py-3 px-4 font-semibold">Available now</th>
              <th className="text-left py-3 px-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {groupedProducts.map((group) => {
              const isExpanded = expandedProducts.has(group.productKey);
              const status = getSegmentStatus(group.totalAvailable, group.totalMax);
              const statusConfig = getStatusConfig(status);

              return (
                <>
                  {/* Product Row */}
                  <tr
                    key={group.productKey}
                    className="border-b hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => toggleProduct(group.productKey)}
                  >
                    <td className="py-4 px-4">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                    </td>
                    <td className="py-4 px-4 font-medium">{group.productLabel}</td>
                    <td className="py-4 px-4">{formatNumber(group.totalAvailable)}</td>
                    <td className="py-4 px-4">
                      <Badge variant="secondary" className={statusConfig.color}>
                        {statusConfig.label}
                      </Badge>
                    </td>
                  </tr>
                  
                  {/* Expanded Age Band Rows */}
                  {isExpanded && group.segments.map((segment) => {
                    const segmentStatus = getSegmentStatus(segment.availableQuantity, segment.maxQuantity);
                    const segmentStatusConfig = getStatusConfig(segmentStatus);
                    
                    return (
                      <tr
                        key={segment.id}
                        className="border-b bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSegmentSelect(segment.productKey, segment.id);
                        }}
                      >
                        <td className="py-3 px-4"></td>
                        <td className="py-3 px-4 pl-8">
                          <div>
                            <span className="text-slate-700">{segment.ageBandLabel}</span>
                            <span className="text-slate-500 ml-3">{formatPrice(segment.priceCents)} / record</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{formatNumber(segment.availableQuantity)}</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className={segmentStatusConfig.color}>
                            {segmentStatusConfig.label}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { InventorySegment, ProductKey } from '@/hooks/useInventorySegments';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        progressColor: 'bg-emerald-500',
        label: 'Healthy',
        caption: 'Plenty of capacity available',
      };
    case 'tight':
      return {
        color: 'bg-amber-500 text-white',
        progressColor: 'bg-amber-500',
        label: 'Tight',
        caption: 'Limited capacity remaining',
      };
    case 'waitlist':
      return {
        color: 'bg-red-500 text-white',
        progressColor: 'bg-red-500',
        label: 'Waitlist',
        caption: 'Temporarily sold out',
      };
  }
}

function formatChange(change: number | null | undefined, percent: number | null | undefined) {
  if (change === null || change === undefined) return null;
  
  const absChange = Math.abs(change);
  const sign = change >= 0 ? '+' : '-';
  const percentStr = percent !== null && percent !== undefined 
    ? ` (${change >= 0 ? '+' : ''}${percent.toFixed(1)}%)`
    : '';
  
  return {
    text: `${sign}${absChange.toLocaleString()}${percentStr}`,
    isPositive: change >= 0,
    isNeutral: change === 0,
  };
}

interface GroupedProduct {
  productKey: ProductKey;
  productLabel: string;
  totalAvailable: number;
  totalMax: number;
  totalChange7d: number | null;
  totalChangePercent7d: number | null;
  segments: InventorySegment[];
}

function groupByProduct(segments: InventorySegment[]): GroupedProduct[] {
  const groups = new Map<ProductKey, GroupedProduct>();
  const productOrder: ProductKey[] = ['direct_submissions', 'alpha_data', 'pulse_data'];
  
  segments.forEach((segment) => {
    if (!groups.has(segment.productKey)) {
      groups.set(segment.productKey, {
        productKey: segment.productKey,
        productLabel: segment.productLabel,
        totalAvailable: 0,
        totalMax: 0,
        totalChange7d: null,
        totalChangePercent7d: null,
        segments: [],
      });
    }
    const group = groups.get(segment.productKey)!;
    group.totalAvailable += segment.availableQuantity;
    group.totalMax += segment.maxQuantity;
    
    // Aggregate 7-day change
    if (segment.change7d !== null && segment.change7d !== undefined) {
      group.totalChange7d = (group.totalChange7d ?? 0) + segment.change7d;
    }
    
    group.segments.push(segment);
  });

  // Calculate percentage for aggregated totals
  groups.forEach((group) => {
    if (group.totalChange7d !== null) {
      const previousTotal = group.totalAvailable - group.totalChange7d;
      if (previousTotal !== 0) {
        group.totalChangePercent7d = (group.totalChange7d / previousTotal) * 100;
      }
    }
  });

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
      
      <div className="space-y-3">
        {groupedProducts.map((group) => {
          const isExpanded = expandedProducts.has(group.productKey);
          const status = getSegmentStatus(group.totalAvailable, group.totalMax);
          const statusConfig = getStatusConfig(status);
          const utilizationPercent = group.totalMax > 0 
            ? (group.totalAvailable / group.totalMax) * 100 
            : 0;

          return (
            <div 
              key={group.productKey}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              {/* Product Header - Clickable */}
              <div
                className="p-5 cursor-pointer select-none hover:bg-slate-50 transition-colors"
                onClick={() => toggleProduct(group.productKey)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <ChevronDown 
                      className={cn(
                        "w-5 h-5 text-slate-400 transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )} 
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900">{group.productLabel}</h3>
                      <p className="text-sm text-slate-500">
                        {group.segments.length} age band{group.segments.length !== 1 ? 's' : ''} available
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">{formatNumber(group.totalAvailable)}</p>
                      <div className="flex items-center justify-end gap-1">
                        {(() => {
                          const change = formatChange(group.totalChange7d, group.totalChangePercent7d);
                          if (!change) return <p className="text-xs text-slate-500">records available</p>;
                          return (
                            <span className={cn(
                              "text-xs font-medium flex items-center gap-0.5",
                              change.isNeutral ? "text-slate-500" : change.isPositive ? "text-emerald-600" : "text-red-600"
                            )}>
                              {change.isNeutral ? (
                                <Minus className="w-3 h-3" />
                              ) : change.isPositive ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              {change.text} 7d
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                    
                    <div className="w-32 space-y-1">
                      <Badge variant="secondary" className={statusConfig.color}>
                        {statusConfig.label}
                      </Badge>
                      <Progress value={utilizationPercent} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Expanded Content */}
              <div 
                className={cn(
                  "grid transition-all duration-200 ease-out",
                  isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-slate-100 bg-slate-50/50">
                    {group.segments.map((segment, idx) => {
                      const segmentStatus = getSegmentStatus(segment.availableQuantity, segment.maxQuantity);
                      const segmentStatusConfig = getStatusConfig(segmentStatus);
                      const segmentUtilization = segment.maxQuantity > 0
                        ? (segment.availableQuantity / segment.maxQuantity) * 100
                        : 0;
                      
                      return (
                        <div
                          key={segment.id}
                          className={cn(
                            "p-4 pl-14 cursor-pointer hover:bg-slate-100 transition-colors flex items-center justify-between",
                            idx !== group.segments.length - 1 && "border-b border-slate-100"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSegmentSelect(segment.productKey, segment.id);
                          }}
                        >
                          <div className="flex items-center gap-8">
                            <div>
                              <p className="font-medium text-slate-800">{segment.ageBandLabel}</p>
                              <p className="text-sm text-slate-500">{formatPrice(segment.priceCents)} per record</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="font-semibold text-slate-900">{formatNumber(segment.availableQuantity)}</p>
                              {(() => {
                                const change = formatChange(segment.change7d, segment.changePercent7d);
                                if (!change) return <p className="text-xs text-slate-500">available</p>;
                                return (
                                  <span className={cn(
                                    "text-xs font-medium flex items-center justify-end gap-0.5",
                                    change.isNeutral ? "text-slate-500" : change.isPositive ? "text-emerald-600" : "text-red-600"
                                  )}>
                                    {change.isNeutral ? (
                                      <Minus className="w-3 h-3" />
                                    ) : change.isPositive ? (
                                      <TrendingUp className="w-3 h-3" />
                                    ) : (
                                      <TrendingDown className="w-3 h-3" />
                                    )}
                                    {change.text}
                                  </span>
                                );
                              })()}
                            </div>
                            
                            <div className="w-24 space-y-1">
                              <Progress value={segmentUtilization} className="h-1.5" />
                              <p className="text-xs text-slate-400">{segmentStatusConfig.caption}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

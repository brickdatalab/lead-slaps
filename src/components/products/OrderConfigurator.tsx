import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { InventorySegment, ProductKey, AgeBandKey } from '@/hooks/useInventorySegments';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  leadPrices,
  addOnPrices,
  productKeyToType,
  ageBandMap,
  type ProductType,
  type AgeBand,
  type AddOnType
} from '@/config/stripePriceMap';
import { Trash, Plus, Brain, ShieldCheck, FileText } from '@phosphor-icons/react';

interface OrderConfiguratorProps {
  segments: InventorySegment[];
  initialProductKey?: ProductKey;
  initialSegmentId?: string;
}

interface CartItem {
  id: string;
  segmentId: string;
  productKey: ProductKey;
  productLabel: string;
  ageBandKey: AgeBandKey;
  ageBandLabel: string;
  quantity: number;
  unitPriceCents: number;
  maxQuantity: number;
}

interface SelectedAddOns {
  fundsense: boolean;
  trustdial: boolean;
  statementsnap: boolean;
}

export function OrderConfigurator({ segments, initialProductKey, initialSegmentId }: OrderConfiguratorProps) {
  const { toast } = useToast();

  // Current selection state (for adding items)
  const [selectedProductKey, setSelectedProductKey] = useState<ProductKey | null>(initialProductKey || null);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(initialSegmentId || null);
  const [quantityInput, setQuantityInput] = useState<string>('');

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add-ons state
  const [selectedAddOns, setSelectedAddOns] = useState<SelectedAddOns>({
    fundsense: false,
    trustdial: false,
    statementsnap: false,
  });

  // Checkout state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProductKey) setSelectedProductKey(initialProductKey);
    if (initialSegmentId) setSelectedSegmentId(initialSegmentId);
  }, [initialProductKey, initialSegmentId]);

  const selectedSegment = segments.find((s) => s.id === selectedSegmentId);
  const filteredSegments = selectedProductKey
    ? segments.filter((s) => s.productKey === selectedProductKey)
    : [];

  const quantity = parseInt(quantityInput) || 0;
  const unitPrice = selectedSegment ? selectedSegment.priceCents / 100 : 0;

  // Calculate remaining quantity accounting for items already in cart
  const quantityInCart = cartItems
    .filter(item => item.segmentId === selectedSegmentId)
    .reduce((sum, item) => sum + item.quantity, 0);
  const maxQuantity = selectedSegment
    ? Math.max(0, selectedSegment.availableQuantity - quantityInCart)
    : 0;

  // Calculate totals
  const totalLeads = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const leadsSubtotal = cartItems.reduce((sum, item) => sum + (item.quantity * item.unitPriceCents), 0) / 100;

  // Add-ons costs
  const fundsenseCost = selectedAddOns.fundsense ? (totalLeads * addOnPrices.fundsense.unitAmountCents) / 100 : 0;
  const trustdialCost = selectedAddOns.trustdial ? (totalLeads * addOnPrices.trustdial.unitAmountCents) / 100 : 0;
  const statementSnapCost = selectedAddOns.statementsnap ? addOnPrices.statementsnap.unitAmountCents / 100 : 0;
  const addOnsSubtotal = fundsenseCost + trustdialCost + statementSnapCost;

  const estimatedTotal = leadsSubtotal + addOnsSubtotal;

  // Check if StatementSnap is available (only for Direct Submissions)
  const hasDirectSubmissions = cartItems.some(item => item.productKey === 'direct_submissions');

  const handleProductSelect = (productKey: ProductKey) => {
    setSelectedProductKey(productKey);
    setSelectedSegmentId(null);
    setQuantityInput('');
    setCheckoutError(null);
  };

  const handleSegmentSelect = (segmentId: string) => {
    const segment = segments.find((s) => s.id === segmentId);
    setSelectedSegmentId(segmentId);

    // Calculate available quantity for this segment
    const inCart = cartItems
      .filter(item => item.segmentId === segmentId)
      .reduce((sum, item) => sum + item.quantity, 0);
    const available = segment ? Math.max(0, segment.availableQuantity - inCart) : 0;

    if (segment && quantity > available) {
      setQuantityInput(available.toString());
    }
    setCheckoutError(null);
  };

  const handleQuantityChange = (value: string) => {
    if (value === '' || /^\d+$/.test(value)) {
      const numValue = parseInt(value) || 0;
      if (value === '' || numValue <= maxQuantity) {
        setQuantityInput(value);
      } else {
        setQuantityInput(maxQuantity.toString());
      }
    }
    setCheckoutError(null);
  };

  const handleAddToCart = () => {
    if (!selectedSegment || quantity <= 0) return;

    const existingItemIndex = cartItems.findIndex(item => item.segmentId === selectedSegmentId);

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      // Add new item
      const newItem: CartItem = {
        id: crypto.randomUUID(),
        segmentId: selectedSegment.id,
        productKey: selectedSegment.productKey,
        productLabel: selectedSegment.productLabel,
        ageBandKey: selectedSegment.ageBandKey,
        ageBandLabel: selectedSegment.ageBandLabel,
        quantity: quantity,
        unitPriceCents: selectedSegment.priceCents,
        maxQuantity: selectedSegment.availableQuantity,
      };
      setCartItems([...cartItems, newItem]);
    }

    // Reset selection
    setQuantityInput('');
    setSelectedSegmentId(null);

    toast({
      title: 'Added to order',
      description: `${quantity.toLocaleString()} ${selectedSegment.productLabel} (${selectedSegment.ageBandLabel}) added`,
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleUpdateCartQuantity = (itemId: string, newQuantity: number) => {
    const item = cartItems.find(i => i.id === itemId);
    if (!item) return;

    if (newQuantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }

    if (newQuantity > item.maxQuantity) {
      newQuantity = item.maxQuantity;
    }

    setCartItems(cartItems.map(i =>
      i.id === itemId ? { ...i, quantity: newQuantity } : i
    ));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setCheckoutError('Please add at least one product to your order.');
      return;
    }

    setIsSubmitting(true);
    setCheckoutError(null);

    // Push begin_checkout event to dataLayer for GA4
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'begin_checkout',
      ecommerce: {
        currency: 'USD',
        value: estimatedTotal,
        items: cartItems.map((item, index) => ({
          item_id: item.segmentId,
          item_name: item.productLabel,
          item_category: item.productKey,
          item_variant: item.ageBandLabel,
          price: item.unitPriceCents / 100,
          quantity: item.quantity,
          index: index,
        })),
      },
      // Custom dimensions
      product_types: [...new Set(cartItems.map(item => item.productKey))].join(','),
      age_bands: [...new Set(cartItems.map(item => item.ageBandKey))].join(','),
      addons_selected: Object.entries(selectedAddOns)
        .filter(([_, selected]) => selected)
        .map(([key]) => key)
        .join(',') || 'none',
      total_leads: totalLeads,
    });

    try {
      // Build line items for Stripe
      const lineItems: { priceId: string; quantity: number }[] = [];

      // Add lead products
      for (const item of cartItems) {
        const productType = productKeyToType[item.productKey.replace('_', '-')] ||
                           (item.productKey as unknown as ProductType);
        const ageBand = ageBandMap[item.ageBandKey] || (item.ageBandKey as AgeBand);

        const priceInfo = leadPrices[productType]?.[ageBand];
        if (!priceInfo) {
          throw new Error(`Price not found for ${item.productLabel} - ${item.ageBandLabel}`);
        }

        lineItems.push({
          priceId: priceInfo.priceId,
          quantity: item.quantity,
        });
      }

      // Add add-ons
      if (selectedAddOns.fundsense && totalLeads > 0) {
        lineItems.push({
          priceId: addOnPrices.fundsense.priceId,
          quantity: totalLeads,
        });
      }

      if (selectedAddOns.trustdial && totalLeads > 0) {
        lineItems.push({
          priceId: addOnPrices.trustdial.priceId,
          quantity: totalLeads,
        });
      }

      if (selectedAddOns.statementsnap && hasDirectSubmissions) {
        // StatementSnap is per-package, not per-lead
        lineItems.push({
          priceId: addOnPrices.statementsnap.priceId,
          quantity: 1,
        });
      }

      // Call Edge Function
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          lineItems,
          successUrl: `${window.location.origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/build-data-set`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError('Checkout failed. Please try again or contact support.');
      toast({
        title: 'Checkout Error',
        description: error instanceof Error ? error.message : 'Unable to create checkout. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const productOptions = [
    { key: 'direct_submissions' as ProductKey, label: 'Direct Submissions', subtext: 'Premium, real-time submissions' },
    { key: 'alpha_data' as ProductKey, label: 'Alpha Data', subtext: 'Smart-aged submissions at scale' },
    { key: 'pulse_data' as ProductKey, label: 'Pulse Data', subtext: 'Deep archive & triggers for big floors' },
  ];

  const addOnOptions = [
    {
      key: 'fundsense' as AddOnType,
      label: 'FundSense',
      description: 'AI-powered fundability scoring',
      price: '$0.40/lead',
      icon: Brain,
      color: 'text-accent',
      available: true,
    },
    {
      key: 'trustdial' as AddOnType,
      label: 'TrustDial',
      description: 'Phone verification & trust scoring',
      price: '$0.45/lead',
      icon: ShieldCheck,
      color: 'text-green-500',
      available: true,
    },
    {
      key: 'statementsnap' as AddOnType,
      label: 'StatementSnap',
      description: 'Bank statement analysis package',
      price: '$10.00/order',
      icon: FileText,
      color: 'text-blue-500',
      available: hasDirectSubmissions,
      tooltip: 'Only available with Direct Submissions',
    },
  ];

  const StepIndicator = ({ number, active }: { number: number; active: boolean }) => (
    <div className={`flex items-center justify-center h-10 w-10 rounded-full text-lg font-bold shrink-0 transition-colors ${
      active
        ? 'bg-primary text-primary-foreground'
        : 'bg-slate-200 text-slate-500'
    }`}>
      {number}
    </div>
  );

  return (
    <Card id="order-configurator" className="shadow-lg">
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            {/* Step 1: Choose Product */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <StepIndicator number={1} active={!!selectedProductKey} />
                <Label className="text-lg font-semibold">Choose product</Label>
              </div>
              <div role="radiogroup" className="grid gap-3 ml-14">
                {productOptions.map((option) => (
                  <button
                    key={option.key}
                    role="radio"
                    aria-checked={selectedProductKey === option.key}
                    onClick={() => handleProductSelect(option.key)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      selectedProductKey === option.key
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.subtext}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200 ml-5" />

            {/* Step 2: Choose Age Band & Quantity */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <StepIndicator number={2} active={!!selectedSegmentId} />
                <Label className="text-lg font-semibold">Choose age band & quantity</Label>
              </div>
              <div className="ml-14">
                {!selectedProductKey ? (
                  <p className="text-sm text-muted-foreground">Select a product first.</p>
                ) : filteredSegments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No active segments for this product. Try another tier or check back as new volume is added.
                  </p>
                ) : (
                  <>
                    <div role="radiogroup" className="grid gap-3">
                      {filteredSegments.map((segment) => {
                        const inCart = cartItems
                          .filter(item => item.segmentId === segment.id)
                          .reduce((sum, item) => sum + item.quantity, 0);
                        const remaining = segment.availableQuantity - inCart;

                        return (
                          <button
                            key={segment.id}
                            role="radio"
                            aria-checked={selectedSegmentId === segment.id}
                            onClick={() => handleSegmentSelect(segment.id)}
                            disabled={remaining <= 0}
                            className={`p-4 border-2 rounded-lg text-left transition-all ${
                              selectedSegmentId === segment.id
                                ? 'border-primary bg-primary/5'
                                : remaining <= 0
                                  ? 'border-border bg-slate-50 opacity-50 cursor-not-allowed'
                                  : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="font-semibold">{segment.ageBandLabel}</div>
                            <div className="text-sm text-muted-foreground">
                              ${(segment.priceCents / 100).toFixed(2)} / record · {remaining.toLocaleString()} available
                              {inCart > 0 && (
                                <span className="text-primary ml-1">({inCart.toLocaleString()} in cart)</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {selectedSegment && maxQuantity > 0 && (
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="quantity">Quantity (records)</Label>
                        <div className="flex gap-2">
                          <Input
                            id="quantity"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="Enter quantity"
                            value={quantityInput}
                            onChange={(e) => handleQuantityChange(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            onClick={handleAddToCart}
                            disabled={quantity <= 0}
                            className="shrink-0"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Max available: {maxQuantity.toLocaleString()} records
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200 ml-5" />

            {/* Step 3: Add-Ons */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <StepIndicator number={3} active={Object.values(selectedAddOns).some(Boolean)} />
                <Label className="text-lg font-semibold">Enhance with add-ons <span className="text-muted-foreground font-normal">(optional)</span></Label>
              </div>
              <div className="ml-14 space-y-3">
                {addOnOptions.map((addon) => (
                  <label
                    key={addon.key}
                    className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedAddOns[addon.key]
                        ? 'border-primary bg-primary/5'
                        : addon.available
                          ? 'border-border hover:border-primary/50'
                          : 'border-border bg-slate-50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <Checkbox
                      checked={selectedAddOns[addon.key]}
                      onCheckedChange={(checked) => {
                        if (addon.available) {
                          setSelectedAddOns(prev => ({ ...prev, [addon.key]: !!checked }));
                        }
                      }}
                      disabled={!addon.available}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <addon.icon className={`h-4 w-4 ${addon.color}`} />
                        <span className="font-semibold">{addon.label}</span>
                        <span className="text-sm text-muted-foreground">({addon.price})</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{addon.description}</p>
                      {!addon.available && addon.tooltip && (
                        <p className="text-xs text-amber-600 mt-1">{addon.tooltip}</p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200 ml-5" />

            {/* Step 4: Checkout */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <StepIndicator number={4} active={cartItems.length > 0} />
                <Label className="text-lg font-semibold">Review & proceed to checkout</Label>
              </div>
              <div className="ml-14">
                {checkoutError && (
                  <div className="p-3 border border-destructive/50 bg-destructive/10 rounded text-sm text-destructive mb-4">
                    {checkoutError}
                  </div>
                )}
                <Button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0 || isSubmitting}
                  className="w-full border-2 border-primary transition-all hover:bg-background hover:text-primary"
                  size="lg"
                >
                  {isSubmitting ? 'Creating checkout…' : 'Proceed to checkout'}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  You'll confirm details and complete payment on a secure checkout powered by Stripe.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <Card className="h-fit shadow-md bg-slate-50 sticky top-24">
            <CardHeader>
              <CardTitle>Order summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              {cartItems.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No products added yet. Select a product and quantity to get started.
                </p>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-2 p-3 bg-white rounded-lg border">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{item.productLabel}</div>
                        <div className="text-xs text-muted-foreground">{item.ageBandLabel}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleUpdateCartQuantity(item.id, parseInt(e.target.value) || 0)}
                            className="h-7 w-20 text-xs"
                            min={1}
                            max={item.maxQuantity}
                          />
                          <span className="text-xs text-muted-foreground">
                            × ${(item.unitPriceCents / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-sm">
                          ${((item.quantity * item.unitPriceCents) / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Leads Subtotal */}
              {cartItems.length > 0 && (
                <>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Leads subtotal ({totalLeads.toLocaleString()} records)</span>
                      <span className="font-medium">${leadsSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  {/* Add-ons Summary */}
                  {(selectedAddOns.fundsense || selectedAddOns.trustdial || selectedAddOns.statementsnap) && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Add-ons</div>
                      {selectedAddOns.fundsense && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">FundSense ({totalLeads.toLocaleString()} × $0.40)</span>
                          <span>${fundsenseCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                      )}
                      {selectedAddOns.trustdial && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">TrustDial ({totalLeads.toLocaleString()} × $0.45)</span>
                          <span>${trustdialCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                      )}
                      {selectedAddOns.statementsnap && hasDirectSubmissions && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">StatementSnap (1 package)</span>
                          <span>${statementSnapCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">Estimated total</span>
                  <span className="text-2xl font-bold text-primary">
                    {estimatedTotal > 0 ? `$${estimatedTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '—'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Final totals and any applicable taxes will be confirmed on the checkout screen.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

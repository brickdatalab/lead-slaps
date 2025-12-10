# Multi-Product Checkout with Stripe Integration

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Enable customers to order multiple lead products with add-ons and checkout via Stripe.

**Architecture:** Enhance the existing OrderConfigurator to support a cart of multiple items, add-ons selection, and integrate with Stripe Checkout via a Supabase Edge Function. Stripe products/prices are created via the Stripe MCP, and a price mapping enables the Edge Function to build checkout sessions.

**Tech Stack:** React/TypeScript (frontend), Supabase Edge Functions (Deno/TypeScript), Stripe Checkout (hosted), Stripe MCP tools

---

## Phase 1: Create Stripe Products & Prices

### Task 1.1: Create Lead Products in Stripe

**Goal:** Create the 3 lead product entries in Stripe

**Tools:** Use `mcp__stripe__create_product` for each product

**Step 1: Create Direct Submissions product**
```
mcp__stripe__create_product
  name: "Direct Submissions"
  description: "Premium MCA leads - real-time and near-real-time submissions for speed-to-contact teams"
```

**Step 2: Create Alpha Data product**
```
mcp__stripe__create_product
  name: "Alpha Data"
  description: "Growth MCA leads - smart-aged submissions from the last 6 months for sustainable pipelines"
```

**Step 3: Create Pulse Data product**
```
mcp__stripe__create_product
  name: "Pulse Data"
  description: "Scale MCA leads - 6-24 month data priced for high-volume dialing and nurture programs"
```

**Step 4: Record the product IDs**
Save the returned `id` values for each product. Format:
```
DIRECT_SUBMISSIONS_PRODUCT_ID=prod_xxx
ALPHA_DATA_PRODUCT_ID=prod_yyy
PULSE_DATA_PRODUCT_ID=prod_zzz
```

---

### Task 1.2: Create Add-On Products in Stripe

**Goal:** Create the 3 add-on product entries in Stripe

**Step 1: Create FundSense product**
```
mcp__stripe__create_product
  name: "FundSense - AI Fundability Scoring"
  description: "AI-powered fundability scores to prioritize your pipeline and focus on deals most likely to close"
```

**Step 2: Create TrustDial product**
```
mcp__stripe__create_product
  name: "TrustDial - Contact Verification"
  description: "Omnichannel contact verification to validate names and contact info before your first dial"
```

**Step 3: Create StatementSnap product**
```
mcp__stripe__create_product
  name: "StatementSnap - Pre-Underwriting"
  description: "AI-powered pre-underwriting that transforms raw data into underwriting-ready packages"
```

**Step 4: Record the product IDs**
```
FUNDSENSE_PRODUCT_ID=prod_aaa
TRUSTDIAL_PRODUCT_ID=prod_bbb
STATEMENTSNAP_PRODUCT_ID=prod_ccc
```

---

### Task 1.3: Create Direct Submissions Prices (6 age bands)

**Goal:** Create prices for each age band of Direct Submissions

**Tools:** Use `mcp__stripe__create_price` with the Direct Submissions product ID

**Step 1: Create lt_15 price ($3.50 = 350 cents)**
```
mcp__stripe__create_price
  product: [DIRECT_SUBMISSIONS_PRODUCT_ID]
  unit_amount: 350
  currency: "usd"
```

**Step 2: Create 15_30 price ($2.75 = 275 cents)**
```
mcp__stripe__create_price
  product: [DIRECT_SUBMISSIONS_PRODUCT_ID]
  unit_amount: 275
  currency: "usd"
```

**Step 3: Create 30_90 price ($1.75 = 175 cents)**
```
mcp__stripe__create_price
  product: [DIRECT_SUBMISSIONS_PRODUCT_ID]
  unit_amount: 175
  currency: "usd"
```

**Step 4: Create 90_180 price ($0.95 = 95 cents)**
```
mcp__stripe__create_price
  product: [DIRECT_SUBMISSIONS_PRODUCT_ID]
  unit_amount: 95
  currency: "usd"
```

**Step 5: Create 180_365 price ($0.55 = 55 cents)**
```
mcp__stripe__create_price
  product: [DIRECT_SUBMISSIONS_PRODUCT_ID]
  unit_amount: 55
  currency: "usd"
```

**Step 6: Create 1_2y price ($0.25 = 25 cents)**
```
mcp__stripe__create_price
  product: [DIRECT_SUBMISSIONS_PRODUCT_ID]
  unit_amount: 25
  currency: "usd"
```

**Step 7: Record price IDs**
```
PRICE_DIRECT_LT15=price_xxx
PRICE_DIRECT_15_30=price_xxx
PRICE_DIRECT_30_90=price_xxx
PRICE_DIRECT_90_180=price_xxx
PRICE_DIRECT_180_365=price_xxx
PRICE_DIRECT_1_2Y=price_xxx
```

---

### Task 1.4: Create Alpha Data Prices (6 age bands)

**Goal:** Create prices for each age band of Alpha Data

**Step 1: Create lt_15 price ($2.75 = 275 cents)**
```
mcp__stripe__create_price
  product: [ALPHA_DATA_PRODUCT_ID]
  unit_amount: 275
  currency: "usd"
```

**Step 2: Create 15_30 price ($1.95 = 195 cents)**
```
mcp__stripe__create_price
  product: [ALPHA_DATA_PRODUCT_ID]
  unit_amount: 195
  currency: "usd"
```

**Step 3: Create 30_90 price ($1.25 = 125 cents)**
```
mcp__stripe__create_price
  product: [ALPHA_DATA_PRODUCT_ID]
  unit_amount: 125
  currency: "usd"
```

**Step 4: Create 90_180 price ($0.65 = 65 cents)**
```
mcp__stripe__create_price
  product: [ALPHA_DATA_PRODUCT_ID]
  unit_amount: 65
  currency: "usd"
```

**Step 5: Create 180_365 price ($0.35 = 35 cents)**
```
mcp__stripe__create_price
  product: [ALPHA_DATA_PRODUCT_ID]
  unit_amount: 35
  currency: "usd"
```

**Step 6: Create 1_2y price ($0.15 = 15 cents)**
```
mcp__stripe__create_price
  product: [ALPHA_DATA_PRODUCT_ID]
  unit_amount: 15
  currency: "usd"
```

**Step 7: Record price IDs**
```
PRICE_ALPHA_LT15=price_xxx
PRICE_ALPHA_15_30=price_xxx
PRICE_ALPHA_30_90=price_xxx
PRICE_ALPHA_90_180=price_xxx
PRICE_ALPHA_180_365=price_xxx
PRICE_ALPHA_1_2Y=price_xxx
```

---

### Task 1.5: Create Pulse Data Prices (6 age bands)

**Goal:** Create prices for each age band of Pulse Data

**Step 1: Create lt_15 price ($2.25 = 225 cents)**
```
mcp__stripe__create_price
  product: [PULSE_DATA_PRODUCT_ID]
  unit_amount: 225
  currency: "usd"
```

**Step 2: Create 15_30 price ($1.65 = 165 cents)**
```
mcp__stripe__create_price
  product: [PULSE_DATA_PRODUCT_ID]
  unit_amount: 165
  currency: "usd"
```

**Step 3: Create 30_90 price ($0.95 = 95 cents)**
```
mcp__stripe__create_price
  product: [PULSE_DATA_PRODUCT_ID]
  unit_amount: 95
  currency: "usd"
```

**Step 4: Create 90_180 price ($0.45 = 45 cents)**
```
mcp__stripe__create_price
  product: [PULSE_DATA_PRODUCT_ID]
  unit_amount: 45
  currency: "usd"
```

**Step 5: Create 180_365 price ($0.25 = 25 cents)**
```
mcp__stripe__create_price
  product: [PULSE_DATA_PRODUCT_ID]
  unit_amount: 25
  currency: "usd"
```

**Step 6: Create 1_2y price ($0.10 = 10 cents)**
```
mcp__stripe__create_price
  product: [PULSE_DATA_PRODUCT_ID]
  unit_amount: 10
  currency: "usd"
```

**Step 7: Record price IDs**
```
PRICE_PULSE_LT15=price_xxx
PRICE_PULSE_15_30=price_xxx
PRICE_PULSE_30_90=price_xxx
PRICE_PULSE_90_180=price_xxx
PRICE_PULSE_180_365=price_xxx
PRICE_PULSE_1_2Y=price_xxx
```

---

### Task 1.6: Create Add-On Prices

**Goal:** Create prices for the 3 add-ons

**Step 1: Create FundSense price ($0.40 = 40 cents per lead)**
```
mcp__stripe__create_price
  product: [FUNDSENSE_PRODUCT_ID]
  unit_amount: 40
  currency: "usd"
```

**Step 2: Create TrustDial price ($0.45 = 45 cents per lead)**
```
mcp__stripe__create_price
  product: [TRUSTDIAL_PRODUCT_ID]
  unit_amount: 45
  currency: "usd"
```

**Step 3: Create StatementSnap price ($10.00 = 1000 cents per package)**
```
mcp__stripe__create_price
  product: [STATEMENTSNAP_PRODUCT_ID]
  unit_amount: 1000
  currency: "usd"
```

**Step 4: Record price IDs**
```
PRICE_FUNDSENSE=price_xxx
PRICE_TRUSTDIAL=price_xxx
PRICE_STATEMENTSNAP=price_xxx
```

---

### Task 1.7: Create Price Map Configuration File

**Files:**
- Create: `src/config/stripe-prices.ts`

**Goal:** Store all Stripe price IDs in a central configuration

**Step 1: Create the configuration file**

```typescript
// src/config/stripe-prices.ts
// Stripe Price IDs - mapped from inventory segments to Stripe prices
// Generated from Stripe product/price creation

export const STRIPE_PRICE_MAP: Record<string, string> = {
  // Direct Submissions prices by age band
  'direct_submissions:lt_15': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'direct_submissions:15_30': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'direct_submissions:30_90': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'direct_submissions:90_180': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'direct_submissions:180_365': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'direct_submissions:1_2y': 'REPLACE_WITH_ACTUAL_PRICE_ID',

  // Alpha Data prices by age band
  'alpha_data:lt_15': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'alpha_data:15_30': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'alpha_data:30_90': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'alpha_data:90_180': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'alpha_data:180_365': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'alpha_data:1_2y': 'REPLACE_WITH_ACTUAL_PRICE_ID',

  // Pulse Data prices by age band
  'pulse_data:lt_15': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'pulse_data:15_30': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'pulse_data:30_90': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'pulse_data:90_180': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'pulse_data:180_365': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'pulse_data:1_2y': 'REPLACE_WITH_ACTUAL_PRICE_ID',
};

export const ADDON_PRICE_MAP: Record<string, string> = {
  'fundsense': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'trustdial': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'statementsnap': 'REPLACE_WITH_ACTUAL_PRICE_ID',
};

// Helper to get Stripe price ID from product_key and age_band_key
export function getStripePriceId(productKey: string, ageBandKey: string): string | null {
  const key = `${productKey}:${ageBandKey}`;
  return STRIPE_PRICE_MAP[key] || null;
}

// Helper to get add-on price ID
export function getAddonPriceId(addonKey: string): string | null {
  return ADDON_PRICE_MAP[addonKey] || null;
}
```

**Step 2: Update with actual price IDs from Tasks 1.3-1.6**

Replace all `REPLACE_WITH_ACTUAL_PRICE_ID` values with the actual Stripe price IDs captured in previous tasks.

**Step 3: Commit**
```bash
git add src/config/stripe-prices.ts
git commit -m "feat: add Stripe price mapping configuration"
```

---

## Phase 2: Create Supabase Edge Function

### Task 2.1: Create Edge Function Directory Structure

**Files:**
- Create: `supabase/functions/create-checkout/index.ts`

**Step 1: Create the directory**
```bash
mkdir -p supabase/functions/create-checkout
```

**Step 2: Create the Edge Function**

```typescript
// supabase/functions/create-checkout/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Price mapping - copy from src/config/stripe-prices.ts after creating products
const STRIPE_PRICE_MAP: Record<string, string> = {
  // Direct Submissions
  'direct_submissions:lt_15': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'direct_submissions:15_30': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'direct_submissions:30_90': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'direct_submissions:90_180': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'direct_submissions:180_365': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'direct_submissions:1_2y': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  // Alpha Data
  'alpha_data:lt_15': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'alpha_data:15_30': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'alpha_data:30_90': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'alpha_data:90_180': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'alpha_data:180_365': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'alpha_data:1_2y': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  // Pulse Data
  'pulse_data:lt_15': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'pulse_data:15_30': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'pulse_data:30_90': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'pulse_data:90_180': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'pulse_data:180_365': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'pulse_data:1_2y': 'REPLACE_WITH_ACTUAL_PRICE_ID',
};

const ADDON_PRICE_MAP: Record<string, string> = {
  'fundsense': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'trustdial': 'REPLACE_WITH_ACTUAL_PRICE_ID',
  'statementsnap': 'REPLACE_WITH_ACTUAL_PRICE_ID',
};

interface CartItem {
  productKey: string;
  ageBandKey: string;
  quantity: number;
}

interface CheckoutRequest {
  items: CartItem[];
  addOns: {
    fundSense: boolean;
    trustDial: boolean;
    statementSnap: boolean;
  };
  successUrl: string;
  cancelUrl: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const { items, addOns, successUrl, cancelUrl }: CheckoutRequest = await req.json();

    // Validate request
    if (!items || items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No items in cart' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build line items for Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    // Add lead products
    let totalLeads = 0;
    let hasDirectSubmissions = false;

    for (const item of items) {
      const priceKey = `${item.productKey}:${item.ageBandKey}`;
      const priceId = STRIPE_PRICE_MAP[priceKey];

      if (!priceId || priceId === 'REPLACE_WITH_ACTUAL_PRICE_ID') {
        return new Response(
          JSON.stringify({ error: `Invalid product/age band: ${priceKey}` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      lineItems.push({
        price: priceId,
        quantity: item.quantity,
      });

      totalLeads += item.quantity;
      if (item.productKey === 'direct_submissions') {
        hasDirectSubmissions = true;
      }
    }

    // Add add-ons based on total leads
    if (addOns.fundSense && totalLeads > 0) {
      lineItems.push({
        price: ADDON_PRICE_MAP['fundsense'],
        quantity: totalLeads,
      });
    }

    if (addOns.trustDial && totalLeads > 0) {
      lineItems.push({
        price: ADDON_PRICE_MAP['trustdial'],
        quantity: totalLeads,
      });
    }

    // StatementSnap only applies to Direct Submissions (1 package per order with Direct)
    if (addOns.statementSnap && hasDirectSubmissions) {
      lineItems.push({
        price: ADDON_PRICE_MAP['statementsnap'],
        quantity: 1,
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        items: JSON.stringify(items),
        addOns: JSON.stringify(addOns),
        totalLeads: totalLeads.toString(),
      },
    });

    return new Response(
      JSON.stringify({ checkoutUrl: session.url }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

**Step 3: Commit**
```bash
git add supabase/functions/create-checkout/index.ts
git commit -m "feat: add Stripe checkout Edge Function"
```

---

### Task 2.2: Set Stripe Secret Key in Supabase

**Goal:** Configure the STRIPE_SECRET_KEY environment variable for the Edge Function

**Step 1: Get your Stripe secret key**
- Go to Stripe Dashboard → Developers → API keys
- Copy the Secret key (starts with `sk_test_` for test mode or `sk_live_` for production)

**Step 2: Set the secret in Supabase**
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_your_actual_key_here
```

Or via Supabase Dashboard:
- Project Settings → Edge Functions → Secrets
- Add `STRIPE_SECRET_KEY` with your Stripe secret key

**Step 3: Verify (do not commit secrets!)**
Secrets are NOT committed to git. This is set in Supabase's secure environment.

---

## Phase 3: Enhance OrderConfigurator Component

### Task 3.1: Define Cart Types

**Files:**
- Modify: `src/components/products/OrderConfigurator.tsx`

**Goal:** Add TypeScript interfaces for cart state

**Step 1: Add interfaces at top of file (after imports)**

```typescript
// Add after existing imports in OrderConfigurator.tsx

interface CartItem {
  id: string;
  segmentId: string;
  productKey: ProductKey;
  productLabel: string;
  ageBandKey: string;
  ageBandLabel: string;
  quantity: number;
  unitPriceCents: number;
}

interface AddOnsState {
  fundSense: boolean;
  trustDial: boolean;
  statementSnap: boolean;
}
```

---

### Task 3.2: Update Component State

**Files:**
- Modify: `src/components/products/OrderConfigurator.tsx`

**Goal:** Add cart state and add-ons state

**Step 1: Replace existing state declarations**

Find this code (around line 17-22):
```typescript
const [selectedProductKey, setSelectedProductKey] = useState<ProductKey | null>(initialProductKey || null);
const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(initialSegmentId || null);
const [quantityInput, setQuantityInput] = useState<string>('');
const [isSubmitting, setIsSubmitting] = useState(false);
const [checkoutError, setCheckoutError] = useState<string | null>(null);
```

Replace with:
```typescript
// Cart state - holds all items user wants to purchase
const [cartItems, setCartItems] = useState<CartItem[]>([]);

// Add-ons state
const [addOns, setAddOns] = useState<AddOnsState>({
  fundSense: false,
  trustDial: false,
  statementSnap: false,
});

// Current selection state (for adding items)
const [selectedProductKey, setSelectedProductKey] = useState<ProductKey | null>(initialProductKey || null);
const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(initialSegmentId || null);
const [quantityInput, setQuantityInput] = useState<string>('');

// UI state
const [isSubmitting, setIsSubmitting] = useState(false);
const [checkoutError, setCheckoutError] = useState<string | null>(null);
const [showAddOns, setShowAddOns] = useState(false);
```

---

### Task 3.3: Add Cart Helper Functions

**Files:**
- Modify: `src/components/products/OrderConfigurator.tsx`

**Goal:** Add functions to manage cart items

**Step 1: Add helper functions after state declarations**

```typescript
// Add after the state declarations

// Calculate totals
const totalLeads = cartItems.reduce((sum, item) => sum + item.quantity, 0);
const hasDirectSubmissions = cartItems.some(item => item.productKey === 'direct_submissions');

const subtotalCents = cartItems.reduce((sum, item) => sum + (item.quantity * item.unitPriceCents), 0);

const addOnsCents =
  (addOns.fundSense ? totalLeads * 40 : 0) +  // $0.40 per lead
  (addOns.trustDial ? totalLeads * 45 : 0) +  // $0.45 per lead
  (addOns.statementSnap && hasDirectSubmissions ? 1000 : 0);  // $10 per package

const totalCents = subtotalCents + addOnsCents;

// Add item to cart
const handleAddToCart = () => {
  if (!selectedSegment || quantity <= 0) return;

  const newItem: CartItem = {
    id: crypto.randomUUID(),
    segmentId: selectedSegment.id,
    productKey: selectedSegment.productKey,
    productLabel: selectedSegment.productLabel,
    ageBandKey: selectedSegment.ageBandKey,
    ageBandLabel: selectedSegment.ageBandLabel,
    quantity,
    unitPriceCents: selectedSegment.priceCents,
  };

  setCartItems(prev => [...prev, newItem]);

  // Reset selection for next item
  setSelectedProductKey(null);
  setSelectedSegmentId(null);
  setQuantityInput('');
  setCheckoutError(null);
};

// Remove item from cart
const handleRemoveFromCart = (itemId: string) => {
  setCartItems(prev => prev.filter(item => item.id !== itemId));
};

// Toggle add-on
const handleToggleAddOn = (addon: keyof AddOnsState) => {
  setAddOns(prev => ({ ...prev, [addon]: !prev[addon] }));
};
```

---

### Task 3.4: Update Checkout Handler

**Files:**
- Modify: `src/components/products/OrderConfigurator.tsx`

**Goal:** Update handleCheckout to use cart and call Edge Function

**Step 1: Replace the handleCheckout function**

Find the existing `handleCheckout` function and replace entirely:

```typescript
const handleCheckout = async () => {
  if (cartItems.length === 0) {
    setCheckoutError('Please add at least one product to your order.');
    return;
  }

  setIsSubmitting(true);
  setCheckoutError(null);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            productKey: item.productKey,
            ageBandKey: item.ageBandKey,
            quantity: item.quantity,
          })),
          addOns,
          successUrl: `${window.location.origin}/order-success`,
          cancelUrl: `${window.location.origin}/build-data-set`,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Checkout request failed');
    }

    const data = await response.json();

    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      throw new Error('No checkout URL returned');
    }
  } catch (error) {
    console.error('Checkout error:', error);
    setCheckoutError(error instanceof Error ? error.message : 'Checkout failed. Please try again.');
    toast({
      title: 'Checkout Error',
      description: 'Unable to create checkout. Please try again.',
      variant: 'destructive',
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

---

### Task 3.5: Update Step 2 UI - Add "Add to Order" Button

**Files:**
- Modify: `src/components/products/OrderConfigurator.tsx`

**Goal:** Replace "Proceed to checkout" with "Add to Order" and add cart flow

**Step 1: Find Step 3 section (around line 227-250) and replace**

Replace the entire Step 3 section with this updated version that changes the flow:

```typescript
{/* Step 2 continued - Add to Order button */}
{selectedSegment && quantity > 0 && (
  <div className="ml-14 mt-4">
    <Button
      onClick={handleAddToCart}
      className="w-full"
      size="lg"
    >
      Add to Order
    </Button>
  </div>
)}

{/* Divider */}
<div className="border-t border-slate-200 ml-5" />

{/* Step 3 - Add-ons (only show when cart has items) */}
{cartItems.length > 0 && (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <StepIndicator number={3} active={addOns.fundSense || addOns.trustDial || addOns.statementSnap} />
      <Label className="text-lg font-semibold">Enhance with Add-ons (Optional)</Label>
    </div>
    <div className="ml-14 space-y-3">
      {/* FundSense */}
      <button
        onClick={() => handleToggleAddOn('fundSense')}
        className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
          addOns.fundSense
            ? 'border-accent bg-accent/5'
            : 'border-border hover:border-accent/50'
        }`}
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="font-semibold">FundSense - AI Scoring</div>
            <div className="text-sm text-muted-foreground">Prioritize leads by fundability potential</div>
          </div>
          <div className="text-sm font-medium text-accent">
            +$0.40/lead
          </div>
        </div>
      </button>

      {/* TrustDial */}
      <button
        onClick={() => handleToggleAddOn('trustDial')}
        className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
          addOns.trustDial
            ? 'border-green-500 bg-green-50'
            : 'border-border hover:border-green-500/50'
        }`}
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="font-semibold">TrustDial - Contact Verification</div>
            <div className="text-sm text-muted-foreground">Verify names and contact info before dialing</div>
          </div>
          <div className="text-sm font-medium text-green-600">
            +$0.45/lead
          </div>
        </div>
      </button>

      {/* StatementSnap - only show if Direct Submissions in cart */}
      {hasDirectSubmissions && (
        <button
          onClick={() => handleToggleAddOn('statementSnap')}
          className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
            addOns.statementSnap
              ? 'border-blue-500 bg-blue-50'
              : 'border-border hover:border-blue-500/50'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold">StatementSnap - Pre-Underwriting</div>
              <div className="text-sm text-muted-foreground">AI-powered underwriting-ready packages</div>
            </div>
            <div className="text-sm font-medium text-blue-600">
              +$10.00/order
            </div>
          </div>
        </button>
      )}
    </div>
  </div>
)}

{/* Divider */}
{cartItems.length > 0 && <div className="border-t border-slate-200 ml-5" />}

{/* Step 4 - Checkout */}
{cartItems.length > 0 && (
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
        {isSubmitting ? 'Creating checkout…' : 'Proceed to Stripe Checkout'}
      </Button>
      <p className="text-xs text-muted-foreground text-center mt-3">
        You'll complete payment on a secure checkout page powered by Stripe.
      </p>
    </div>
  </div>
)}
```

---

### Task 3.6: Update Order Summary Panel

**Files:**
- Modify: `src/components/products/OrderConfigurator.tsx`

**Goal:** Show cart items in Order Summary with remove buttons

**Step 1: Replace the Order Summary Card section (around line 254-290)**

```typescript
{/* Order Summary */}
<Card className="h-fit shadow-md bg-slate-50">
  <CardHeader>
    <CardTitle>Order Summary</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    {cartItems.length === 0 ? (
      <p className="text-muted-foreground text-sm">No items added yet. Select a product and add it to your order.</p>
    ) : (
      <>
        {/* Cart Items */}
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-start p-3 bg-white rounded-lg border">
              <div className="flex-1">
                <div className="font-medium text-sm">{item.productLabel}</div>
                <div className="text-xs text-muted-foreground">{item.ageBandLabel}</div>
                <div className="text-xs text-muted-foreground">
                  {item.quantity.toLocaleString()} records × ${(item.unitPriceCents / 100).toFixed(2)}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm">
                  ${((item.quantity * item.unitPriceCents) / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-xs text-destructive hover:underline mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Another Product Link */}
        <button
          onClick={() => {
            setSelectedProductKey(null);
            setSelectedSegmentId(null);
            setQuantityInput('');
          }}
          className="text-sm text-primary hover:underline w-full text-center py-2"
        >
          + Add Another Product
        </button>

        {/* Subtotals */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Leads subtotal ({totalLeads.toLocaleString()} records)</span>
            <span>${(subtotalCents / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>

          {/* Add-ons breakdown */}
          {addOns.fundSense && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">FundSense ({totalLeads.toLocaleString()} × $0.40)</span>
              <span>${((totalLeads * 40) / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          )}
          {addOns.trustDial && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">TrustDial ({totalLeads.toLocaleString()} × $0.45)</span>
              <span>${((totalLeads * 45) / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          )}
          {addOns.statementSnap && hasDirectSubmissions && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">StatementSnap</span>
              <span>$10.00</span>
            </div>
          )}
        </div>

        {/* Grand Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold text-primary">
              ${(totalCents / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Final amount confirmed at checkout
          </p>
        </div>
      </>
    )}
  </CardContent>
</Card>
```

---

### Task 3.7: Commit OrderConfigurator Changes

**Step 1: Commit all changes**
```bash
git add src/components/products/OrderConfigurator.tsx
git commit -m "feat: enhance OrderConfigurator with multi-item cart and add-ons"
```

---

## Phase 4: Create Order Success Page

### Task 4.1: Create OrderSuccess Page Component

**Files:**
- Create: `src/pages/OrderSuccess.tsx`

**Step 1: Create the success page**

```typescript
// src/pages/OrderSuccess.tsx
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from '@phosphor-icons/react';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Order Confirmed | Lead Slaps</title>
        <meta name="description" content="Your order has been confirmed. Thank you for your purchase!" />
      </Helmet>
      <Navigation />

      <section className="section-padding">
        <div className="container-padding">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                {/* Success Icon */}
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" weight="fill" />
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-4">
                  Order Confirmed!
                </h1>

                <p className="text-lg text-slate-600 mb-6">
                  Thank you for your purchase. Your payment was successful and your order is being processed.
                </p>

                <div className="bg-slate-50 rounded-lg p-4 mb-8">
                  <p className="text-sm text-slate-600">
                    A confirmation email will be sent to you shortly with your order details and delivery information.
                  </p>
                  {sessionId && (
                    <p className="text-xs text-slate-500 mt-2">
                      Reference: {sessionId.slice(0, 20)}...
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link to="/products">
                      Browse More Products
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/contact">
                      Contact Support
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* What Happens Next */}
            <div className="mt-8 text-center">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">What Happens Next?</h2>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="step-number w-8 h-8 text-sm mb-3">1</div>
                  <h3 className="font-medium text-slate-900 mb-1">Order Processing</h3>
                  <p className="text-sm text-slate-600">We verify your order and prepare your data file.</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="step-number w-8 h-8 text-sm mb-3">2</div>
                  <h3 className="font-medium text-slate-900 mb-1">Quality Check</h3>
                  <p className="text-sm text-slate-600">Your leads go through our verification process.</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="step-number w-8 h-8 text-sm mb-3">3</div>
                  <h3 className="font-medium text-slate-900 mb-1">Delivery</h3>
                  <p className="text-sm text-slate-600">You'll receive your data via email within 24 hours.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default OrderSuccess;
```

**Step 2: Commit**
```bash
git add src/pages/OrderSuccess.tsx
git commit -m "feat: add order success page"
```

---

### Task 4.2: Add Route for Order Success Page

**Files:**
- Modify: `src/App.tsx`

**Step 1: Import the OrderSuccess component**

Add after the other page imports (around line 16):
```typescript
import OrderSuccess from "./pages/OrderSuccess";
```

**Step 2: Add the route**

Add before the catch-all route (around line 38):
```typescript
<Route path="/order-success" element={<OrderSuccess />} />
```

**Step 3: Commit**
```bash
git add src/App.tsx
git commit -m "feat: add order success route"
```

---

## Phase 5: Deploy and Test

### Task 5.1: Deploy Edge Function

**Goal:** Deploy the create-checkout Edge Function to Supabase

**Step 1: Deploy the function**
```bash
supabase functions deploy create-checkout
```

**Step 2: Verify deployment**
```bash
supabase functions list
```

Expected output should show `create-checkout` in the list.

---

### Task 5.2: Update Price Map with Real Stripe IDs

**Goal:** Replace placeholder price IDs with actual Stripe price IDs

**Step 1: Update `src/config/stripe-prices.ts`**

Replace all `REPLACE_WITH_ACTUAL_PRICE_ID` values with the real Stripe price IDs from Phase 1.

**Step 2: Update `supabase/functions/create-checkout/index.ts`**

Replace all `REPLACE_WITH_ACTUAL_PRICE_ID` values with the real Stripe price IDs.

**Step 3: Re-deploy Edge Function**
```bash
supabase functions deploy create-checkout
```

**Step 4: Commit**
```bash
git add src/config/stripe-prices.ts supabase/functions/create-checkout/index.ts
git commit -m "feat: add actual Stripe price IDs to configuration"
```

---

### Task 5.3: Test End-to-End Flow

**Goal:** Verify the complete checkout flow works

**Step 1: Start dev server**
```bash
npm run dev
```

**Step 2: Navigate to build-data-set page**
Open: `http://localhost:8080/build-data-set`

**Step 3: Add products to cart**
1. Select "Direct Submissions"
2. Select "< 15 Days" age band
3. Enter quantity: 100
4. Click "Add to Order"

**Step 4: Add another product**
1. Click "Add Another Product"
2. Select "Alpha Data"
3. Select "30-90 Days"
4. Enter quantity: 500
5. Click "Add to Order"

**Step 5: Select add-ons**
1. Toggle FundSense ON
2. Toggle TrustDial ON

**Step 6: Proceed to checkout**
1. Click "Proceed to Stripe Checkout"
2. Verify redirect to Stripe Checkout page
3. Use test card: 4242 4242 4242 4242
4. Complete payment
5. Verify redirect to /order-success page

**Step 7: Verify in Stripe Dashboard**
- Go to Stripe Dashboard → Payments
- Find the test payment
- Verify line items match what was ordered

---

### Task 5.4: Final Commit and Push

**Step 1: Final commit for any remaining changes**
```bash
git add .
git commit -m "feat: complete multi-product checkout with Stripe integration"
```

**Step 2: Push to trigger Lovable rebuild**
```bash
git push origin main
```

---

## Summary

**Files Created:**
- `src/config/stripe-prices.ts` - Stripe price ID mapping
- `supabase/functions/create-checkout/index.ts` - Edge Function for Stripe Checkout
- `src/pages/OrderSuccess.tsx` - Order confirmation page

**Files Modified:**
- `src/components/products/OrderConfigurator.tsx` - Enhanced with multi-item cart and add-ons
- `src/App.tsx` - Added /order-success route

**Stripe Resources Created:**
- 6 Products (3 lead tiers + 3 add-ons)
- 21 Prices (18 lead prices + 3 add-on prices)

**Supabase Resources:**
- 1 Edge Function (create-checkout)
- 1 Secret (STRIPE_SECRET_KEY)

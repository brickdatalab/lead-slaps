# Stripe Products Catalog
## MCA Lead Marketplace - Lead Slaps

**Last Updated:** December 9, 2024
**Status:** Database schema ready, Stripe products pending setup

---

## Executive Summary

This document provides a comprehensive overview of the Stripe integration for the Lead Slaps MCA lead marketplace. The platform is designed to sell Merchant Cash Advance (MCA) leads across three product tiers with six age bands, but **Stripe products and prices have not yet been created**.

### Current State

- **Database Schema:** ✅ Complete - Supabase tables for products, prices, subscriptions, coupons, and customers are defined
- **Stripe Products:** ❌ Not Created - No Stripe products exist yet
- **Stripe Prices:** ❌ Not Created - No Stripe prices exist yet
- **Stripe Coupons:** ❌ Not Created - No Stripe coupons exist yet
- **Active System:** Uses local `inventory_segments` table for managing lead inventory

---

## 1. Database Schema Overview

### Tables for Stripe Integration

#### `products` Table
Stores Stripe product information synchronized with Stripe's product catalog.

**Schema:**
```sql
- id: UUID (Primary Key)
- stripe_product_id: TEXT (Required, Stripe Product ID)
- name: TEXT (Required)
- description: TEXT (Optional)
- product_type: TEXT (Default: 'service')
- active: BOOLEAN (Default: true)
- search_vector: Full-text search
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
- deleted_at: TIMESTAMPTZ (Soft delete)
```

#### `prices` Table
Stores Stripe price information for each product.

**Schema:**
```sql
- id: UUID (Primary Key)
- stripe_price_id: TEXT (Required, Stripe Price ID)
- product_id: UUID (Foreign Key → products.id)
- unit_amount_cents: INTEGER (Required)
- currency: TEXT (Default: 'usd')
- price_type: TEXT (Required: 'one_time' or 'recurring')
- billing_interval: TEXT (For recurring: 'day', 'week', 'month', 'year')
- billing_interval_count: INTEGER (Default: 1)
- active: BOOLEAN (Default: true)
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

#### `coupons` Table
Stores Stripe coupon/discount information.

**Schema:**
```sql
- id: UUID (Primary Key)
- stripe_coupon_id: TEXT (Required, Stripe Coupon ID)
- name: TEXT (Optional)
- percent_off: NUMERIC (Percentage discount)
- amount_off_cents: INTEGER (Fixed amount discount)
- currency: TEXT (For amount_off)
- duration: TEXT (Required: 'once', 'repeating', 'forever')
- duration_in_months: INTEGER (For 'repeating')
- max_redemptions: INTEGER (Optional)
- times_redeemed: INTEGER (Default: 0)
- valid: BOOLEAN (Default: true)
- expires_at: TIMESTAMPTZ (Optional)
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

#### `subscriptions` Table
Tracks customer subscriptions.

**Schema:**
```sql
- id: UUID (Primary Key)
- stripe_subscription_id: TEXT (Required)
- customer_id: UUID (Foreign Key → customers.id)
- price_id: UUID (Foreign Key → prices.id)
- status: TEXT (e.g., 'active', 'canceled', 'past_due')
- current_period_start: TIMESTAMPTZ
- current_period_end: TIMESTAMPTZ
- cancel_at_period_end: BOOLEAN
- canceled_at: TIMESTAMPTZ
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
- deleted_at: TIMESTAMPTZ
```

#### `customers` Table
Stores customer information synced with Stripe.

**Schema:**
```sql
- id: UUID (Primary Key)
- stripe_customer_id: TEXT (Optional, Stripe Customer ID)
- email: TEXT
- name: TEXT
- company_name: TEXT
- phone: TEXT
- metadata: JSON
- search_vector: Full-text search
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
- deleted_at: TIMESTAMPTZ
```

#### `orders` Table
Tracks one-time purchases and invoices.

**Schema:**
```sql
- id: UUID (Primary Key)
- customer_id: UUID (Foreign Key → customers.id)
- subscription_id: UUID (Optional, Foreign Key → subscriptions.id)
- amount_cents: INTEGER (Required)
- currency: TEXT (Default: 'usd')
- status: TEXT (e.g., 'pending', 'paid', 'failed')
- stripe_payment_intent_id: TEXT
- stripe_invoice_id: TEXT
- coupon_id: UUID (Optional, Foreign Key → coupons.id)
- discount_cents: INTEGER
- paid_at: TIMESTAMPTZ
- metadata: JSON
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

#### `order_items` Table
Line items for each order.

**Schema:**
```sql
- id: UUID (Primary Key)
- order_id: UUID (Foreign Key → orders.id)
- product_id: UUID (Foreign Key → products.id)
- price_id: UUID (Foreign Key → prices.id)
- quantity: INTEGER (Default: 1)
- unit_amount_cents: INTEGER (Required)
- total_amount_cents: INTEGER (Required)
- created_at: TIMESTAMPTZ
```

---

## 2. Proposed Stripe Products Catalog

Based on the current inventory structure, here's the recommended Stripe product catalog:

### Product Tier 1: Direct Submissions
**Product Type:** Premium MCA leads (fresh submissions)
**Stripe Product ID:** `prod_direct_submissions` (to be created)
**Description:** Real-time and near-real-time MCA submissions for teams that win on speed-to-contact and disciplined follow-up. Strict caps to avoid oversold lists.

#### Pricing Structure (6 Age Bands):

| Age Band | Age Range | Current Price | Stripe Price ID (Proposed) |
|----------|-----------|---------------|----------------------------|
| lt_15 | < 15 days | $3.50/record | `price_direct_lt15` |
| 15_30 | 15-30 days | $2.75/record | `price_direct_15_30` |
| 30_90 | 30-90 days | $1.75/record | `price_direct_30_90` |
| 90_180 | 90-180 days | $0.95/record | `price_direct_90_180` |
| 180_365 | 180-365 days | $0.55/record | `price_direct_180_365` |
| 1_2y | 1-2 years | $0.25/record | `price_direct_1_2y` |

**Inventory (as of latest migration):**
- lt_15: 1,250 available / 2,000 max
- 15_30: 890 available / 1,500 max
- 30_90: 2,100 available / 3,000 max
- 90_180: 4,500 available / 5,000 max
- 180_365: 8,200 available / 10,000 max
- 1_2y: 15,000 available / 20,000 max

---

### Product Tier 2: Alpha Data
**Product Type:** Growth MCA leads (smart-aged data)
**Stripe Product ID:** `prod_alpha_data` (to be created)
**Description:** Smart-aged submissions from the last 6 months, ideal for blending phone, SMS, and email into one consistent pipeline. Built for sustainable, predictable volume.

#### Pricing Structure (6 Age Bands):

| Age Band | Age Range | Current Price | Stripe Price ID (Proposed) |
|----------|-----------|---------------|----------------------------|
| lt_15 | < 15 days | $2.75/record | `price_alpha_lt15` |
| 15_30 | 15-30 days | $1.95/record | `price_alpha_15_30` |
| 30_90 | 30-90 days | $1.25/record | `price_alpha_30_90` |
| 90_180 | 90-180 days | $0.65/record | `price_alpha_90_180` |
| 180_365 | 180-365 days | $0.35/record | `price_alpha_180_365` |
| 1_2y | 1-2 years | $0.15/record | `price_alpha_1_2y` |

**Inventory (as of latest migration):**
- lt_15: 680 available / 1,000 max
- 15_30: 1,450 available / 2,000 max
- 30_90: 3,200 available / 4,000 max
- 90_180: 5,800 available / 8,000 max
- 180_365: 12,500 available / 15,000 max
- 1_2y: 25,000 available / 30,000 max

---

### Product Tier 3: Pulse Data
**Product Type:** Scale MCA leads (aged data)
**Stripe Product ID:** `prod_pulse_data` (to be created)
**Description:** 6-24 month MCA data priced for high-volume dialing, SMS reactivation, and long-tail email campaigns. Optimized for big floors and nurture programs.

#### Pricing Structure (6 Age Bands):

| Age Band | Age Range | Current Price | Stripe Price ID (Proposed) |
|----------|-----------|---------------|----------------------------|
| lt_15 | < 15 days | $2.25/record | `price_pulse_lt15` |
| 15_30 | 15-30 days | $1.65/record | `price_pulse_15_30` |
| 30_90 | 30-90 days | $0.95/record | `price_pulse_30_90` |
| 90_180 | 90-180 days | $0.45/record | `price_pulse_90_180` |
| 180_365 | 180-365 days | $0.25/record | `price_pulse_180_365` |
| 1_2y | 1-2 years | $0.10/record | `price_pulse_1_2y` |

**Inventory (as of latest migration):**
- lt_15: 420 available / 800 max
- 15_30: 950 available / 1,200 max
- 30_90: 2,800 available / 3,500 max
- 90_180: 6,200 available / 7,000 max
- 180_365: 14,000 available / 18,000 max
- 1_2y: 32,000 available / 40,000 max

---

## 3. Product Catalog Summary

### Total Products: 3 (One per tier)
- Direct Submissions (Premium)
- Alpha Data (Growth)
- Pulse Data (Scale)

### Total Prices: 18 (6 age bands × 3 product tiers)

### Pricing Matrix Overview

| Product | lt_15 | 15_30 | 30_90 | 90_180 | 180_365 | 1_2y |
|---------|-------|-------|-------|--------|---------|------|
| **Direct Submissions** | $3.50 | $2.75 | $1.75 | $0.95 | $0.55 | $0.25 |
| **Alpha Data** | $2.75 | $1.95 | $1.25 | $0.65 | $0.35 | $0.15 |
| **Pulse Data** | $2.25 | $1.65 | $0.95 | $0.45 | $0.25 | $0.10 |

**Price Type:** One-time purchases (not recurring subscriptions)
**Currency:** USD
**Unit:** Per record (quantity-based pricing)

---

## 4. Coupons/Discounts (Proposed)

No Stripe coupons currently exist. Recommended initial coupons:

### Suggested Coupon Structure

#### 1. Welcome Discount
- **Coupon ID:** `WELCOME10`
- **Type:** Percentage off
- **Value:** 10% off
- **Duration:** Once
- **Max Redemptions:** Unlimited
- **Use Case:** First-time customer acquisition

#### 2. Volume Discount
- **Coupon ID:** `VOLUME20`
- **Type:** Percentage off
- **Value:** 20% off
- **Duration:** Once
- **Min Purchase:** $500
- **Use Case:** Encourage larger bulk purchases

#### 3. Seasonal Promotion
- **Coupon ID:** `Q1_2025`
- **Type:** Percentage off
- **Value:** 15% off
- **Duration:** Repeating (3 months)
- **Expires:** March 31, 2025
- **Use Case:** Quarterly promotional campaigns

#### 4. Referral Credit
- **Coupon ID:** `REFERRAL50`
- **Type:** Amount off
- **Value:** $50.00
- **Currency:** USD
- **Duration:** Once
- **Use Case:** Customer referral program

---

## 5. Product-Site Mapping

### How Products Map to Business Model

The platform operates on a **single clean pipeline model** where every MCA lead progresses through age bands:

```
Fresh Lead → Direct Submissions → Alpha Data → Pulse Data → Expired
    (0-30d)      (30-180d)        (180d-2y)
```

#### Age Band Mapping

| Age Band Key | Label | Age Range | Typical Use Case |
|--------------|-------|-----------|------------------|
| `lt_15` | < 15 Days | 0-14 days | Speed-to-contact teams, hot leads |
| `15_30` | 15-30 Days | 15-29 days | Follow-up campaigns, warm leads |
| `30_90` | 30-90 Days | 1-3 months | Nurture sequences, blend campaigns |
| `90_180` | 90-180 Days | 3-6 months | Re-engagement, SMS/email mix |
| `180_365` | 180-365 Days | 6-12 months | Long-tail campaigns, volume dialing |
| `1_2y` | 1-2 Years | 12-24 months | High-volume floors, reactivation |

#### Product Tier Positioning

**Direct Submissions** (Premium Tier)
- Target: Teams with fast underwriting and strong follow-up discipline
- Pricing Strategy: Premium pricing for freshest leads
- Expected Conversion: Highest (2-3× more funded deals per dollar)
- Inventory Control: Strict caps to maintain exclusivity

**Alpha Data** (Growth Tier)
- Target: ISOs building sustainable pipelines with multi-channel approach
- Pricing Strategy: Mid-tier pricing for balanced volume and quality
- Expected Conversion: Moderate to high
- Inventory Control: Predictable volume for consistent operations

**Pulse Data** (Scale Tier)
- Target: High-volume dialing operations, nurture programs
- Pricing Strategy: Volume pricing for aged inventory
- Expected Conversion: Lower but cost-effective at scale
- Inventory Control: Large capacity for big floors

---

## 6. Integration Architecture

### How Supabase Syncs with Stripe

#### Current Implementation Status: ❌ Not Implemented

The database schema supports full Stripe synchronization but the integration is **not yet active**. Here's how it should work:

#### Proposed Integration Flow

```
Stripe Product Creation
    ↓
Supabase `products` table (via webhook or API sync)
    ↓
Stripe Price Creation (18 prices for 3 products × 6 age bands)
    ↓
Supabase `prices` table (via webhook or API sync)
    ↓
Customer Checkout (Stripe Checkout or Payment Intent)
    ↓
Order Creation in Supabase `orders` + `order_items` tables
    ↓
Inventory Deduction in `inventory_segments` table
    ↓
Order Fulfillment (deliver lead data to customer)
```

#### Key Integration Points

1. **Product Sync**
   - Stripe products → `products` table
   - Fields: `stripe_product_id`, `name`, `description`, `product_type`

2. **Price Sync**
   - Stripe prices → `prices` table
   - Fields: `stripe_price_id`, `product_id`, `unit_amount_cents`, `price_type`

3. **Customer Sync**
   - Stripe customers → `customers` table
   - Fields: `stripe_customer_id`, `email`, `name`, `company_name`

4. **Order Processing**
   - Stripe Payment Intent → `orders` table
   - Create `order_items` for line items
   - Link to `prices` and `products`

5. **Subscription Management** (if recurring billing is added)
   - Stripe subscriptions → `subscriptions` table
   - Track billing cycles, cancellations

6. **Coupon Application**
   - Stripe coupons → `coupons` table
   - Apply to `orders` via `coupon_id` foreign key

#### Inventory Management Strategy

**Current System:** `inventory_segments` table
- Separate from Stripe products
- Tracks real-time availability by product/age band
- Handles capacity constraints (max_quantity)

**Integration Approach:**
```
Stripe Price ID ← Maps to → inventory_segments row
                             (via product_key + age_band_key)
```

**Mapping Logic:**
```typescript
// Example: Map Stripe price to inventory segment
const priceToSegment = {
  'price_direct_lt15': { product_key: 'direct_submissions', age_band_key: 'lt_15' },
  'price_alpha_30_90': { product_key: 'alpha_data', age_band_key: '30_90' },
  // ... etc
}
```

#### Webhook Handlers Needed

1. **`checkout.session.completed`**
   - Create order in `orders` table
   - Create order items in `order_items` table
   - Decrement inventory in `inventory_segments`

2. **`payment_intent.succeeded`**
   - Update order status to 'paid'
   - Trigger fulfillment process

3. **`customer.created` / `customer.updated`**
   - Sync customer data to `customers` table

4. **`product.created` / `product.updated` / `product.deleted`**
   - Sync product catalog to `products` table

5. **`price.created` / `price.updated`**
   - Sync pricing to `prices` table

6. **`coupon.created` / `coupon.updated` / `coupon.deleted`**
   - Sync coupons to `coupons` table

7. **`invoice.paid`** (for subscriptions, if added)
   - Create order record
   - Track recurring revenue

---

## 7. Database Views for Analytics

The schema includes several analytics views that leverage Stripe data:

### Revenue Analytics

**`v_monthly_revenue`**
- Monthly revenue totals
- Average order value
- Unique customer count
- Total order count

**`v_revenue_by_product`**
- Revenue breakdown by product
- Units sold per product
- Customer count per product
- Links to `stripe_product_id`

**`v_dashboard_stats`**
- Total revenue (cents and dollars)
- MRR (Monthly Recurring Revenue)
- Total customers
- Active subscriptions
- Orders in last 30 days

### Subscription Analytics

**`v_active_subscriptions`**
- Active subscription details
- Customer information
- Current billing period
- Monthly price
- Links to `stripe_subscription_id`

**`v_mrr`** (Monthly Recurring Revenue)
- Current MRR in cents and dollars
- ARR (Annual Run Rate)
- Active subscription count

### Customer Analytics

**`v_top_customers`**
- Customer lifetime value
- Total orders
- Average order value
- First/last order dates
- Subscription status

**`v_active_customers`**
- Non-deleted customers
- Full customer profiles

**`v_customer_cohorts`**
- Customers acquired per month
- Cohort LTV (Lifetime Value)
- Cohort revenue totals

### Activity Tracking

**`v_recent_activity`**
- Recent orders and subscriptions
- Customer details
- Activity type (order/subscription)
- Status and amounts

---

## 8. Implementation Checklist

### Phase 1: Stripe Product Setup ❌ NOT COMPLETE

- [ ] Create 3 Stripe products (Direct Submissions, Alpha Data, Pulse Data)
- [ ] Set product metadata to match `product_key` values
- [ ] Add product descriptions and images
- [ ] Set up product categories/tags

### Phase 2: Stripe Price Setup ❌ NOT COMPLETE

- [ ] Create 18 Stripe prices (6 age bands × 3 products)
- [ ] Configure prices as one-time (not recurring)
- [ ] Set price metadata with `age_band_key` for mapping
- [ ] Verify all prices in cents (e.g., $3.50 = 350 cents)

### Phase 3: Database Sync ❌ NOT COMPLETE

- [ ] Create Supabase Edge Function for Stripe webhook handling
- [ ] Sync Stripe products → `products` table
- [ ] Sync Stripe prices → `prices` table
- [ ] Create mapping table/logic: Stripe prices → inventory segments
- [ ] Test product/price updates

### Phase 4: Checkout Integration ❌ NOT COMPLETE

- [ ] Implement Stripe Checkout or Payment Intents API
- [ ] Build order creation flow: Stripe → `orders` + `order_items`
- [ ] Implement inventory deduction on successful payment
- [ ] Add order confirmation emails
- [ ] Build order history UI for customers

### Phase 5: Coupon System ❌ NOT COMPLETE

- [ ] Create initial Stripe coupons (WELCOME10, VOLUME20, etc.)
- [ ] Sync coupons → `coupons` table via webhook
- [ ] Implement coupon validation in checkout
- [ ] Track coupon usage in orders
- [ ] Build admin UI for coupon management

### Phase 6: Analytics & Reporting ❌ NOT COMPLETE

- [ ] Verify all analytics views work with real Stripe data
- [ ] Build revenue dashboard using `v_monthly_revenue`
- [ ] Build product performance report using `v_revenue_by_product`
- [ ] Build customer lifetime value report using `v_top_customers`
- [ ] Set up automated reporting (daily/weekly/monthly)

### Phase 7: Subscription Support (Optional) ❌ NOT PLANNED

- [ ] Define subscription products (e.g., monthly lead allocation)
- [ ] Create recurring Stripe prices
- [ ] Implement subscription checkout flow
- [ ] Handle subscription lifecycle (create, renew, cancel)
- [ ] Build subscription management UI

---

## 9. Environment Configuration

### Required Stripe Environment Variables

```bash
# Stripe API Keys (from Stripe Dashboard)
STRIPE_PUBLISHABLE_KEY=pk_live_... # or pk_test_... for testing
STRIPE_SECRET_KEY=sk_live_...      # or sk_test_... for testing
STRIPE_WEBHOOK_SECRET=whsec_...    # For webhook signature verification

# Supabase (already configured)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key # For webhooks
```

### Stripe Webhook Endpoint

**Production URL:** `https://your-domain.com/api/stripe-webhook`
**Local Testing:** Use Stripe CLI for webhook forwarding

```bash
stripe listen --forward-to localhost:8080/api/stripe-webhook
```

---

## 10. Security Considerations

### Row Level Security (RLS) Policies

All Stripe-related tables have RLS enabled:

**`products` table:**
- Public read access (product catalog is public)
- No write access from frontend (managed via Stripe sync)

**`prices` table:**
- Public read access (pricing is public)
- No write access from frontend (managed via Stripe sync)

**`coupons` table:**
- Service role only (coupons validated server-side)

**`customers` table:**
- Authenticated users can view their own profile
- No direct write access (managed via Stripe sync)

**`orders` table:**
- Service role can manage all orders
- No direct frontend access (created via Edge Functions)

**`subscriptions` table:**
- Authenticated users can view their own subscriptions
- No write access (managed via Stripe webhooks)

### Payment Security

- All payment processing handled by Stripe (PCI-compliant)
- No credit card data stored in Supabase
- Webhook signature verification for all Stripe events
- Server-side order validation before inventory deduction

---

## 11. Current vs. Proposed State

### What Exists Today

✅ **Database Schema**
- Complete table definitions in `/src/integrations/supabase/types.ts`
- RLS policies configured
- Analytics views set up

✅ **Inventory System**
- `inventory_segments` table with live data
- 7-day change tracking via `inventory_snapshots`
- Real-time availability dashboard

✅ **Frontend Components**
- Product tier cards (`ProductTierCard.tsx`)
- Inventory dashboard (`InventoryDashboard.tsx`)
- Products page (`/products`)

### What Needs to Be Created

❌ **Stripe Products**
- Create 3 products in Stripe dashboard
- Sync to `products` table

❌ **Stripe Prices**
- Create 18 prices in Stripe dashboard
- Sync to `prices` table

❌ **Stripe Integration**
- Webhook handler Edge Function
- Checkout flow implementation
- Order creation pipeline

❌ **Stripe Coupons**
- Create initial coupon set
- Implement coupon validation

---

## 12. Next Steps & Recommendations

### Immediate Actions

1. **Create Stripe Account & Configure Products**
   - Set up Stripe account if not already done
   - Create 3 products with metadata
   - Create 18 prices with age band metadata

2. **Build Webhook Handler**
   - Create Supabase Edge Function at `/functions/stripe-webhook`
   - Handle `checkout.session.completed` event
   - Implement product/price sync events

3. **Map Inventory to Prices**
   - Create mapping configuration
   - Link Stripe price IDs to inventory segment rows
   - Add validation to prevent overselling

4. **Implement Checkout**
   - Build Stripe Checkout integration
   - Create order confirmation page
   - Implement email notifications

5. **Test End-to-End Flow**
   - Test product catalog display
   - Test checkout with test cards
   - Verify inventory deduction
   - Confirm webhook processing

### Long-Term Enhancements

- **Subscription Model:** Add monthly lead allocation subscriptions
- **Volume Discounts:** Implement automatic tiered pricing
- **Loyalty Program:** Track customer spend and offer rewards
- **API Access:** Provide API for programmatic purchases
- **White-Label:** Allow resellers to white-label the platform

---

## Appendix A: Stripe Product Metadata Schema

To ensure proper mapping between Stripe and Supabase, use this metadata structure:

### Product Metadata
```json
{
  "product_key": "direct_submissions",
  "tier": "premium",
  "category": "mca_leads"
}
```

### Price Metadata
```json
{
  "age_band_key": "lt_15",
  "age_band_label": "< 15 Days",
  "product_key": "direct_submissions",
  "unit": "record"
}
```

---

## Appendix B: Sample Stripe CLI Commands

### Create Product
```bash
stripe products create \
  --name "Direct Submissions" \
  --description "Real-time and near-real-time MCA submissions" \
  --metadata[product_key]=direct_submissions \
  --metadata[tier]=premium
```

### Create Price
```bash
stripe prices create \
  --product prod_XXXXX \
  --unit-amount 350 \
  --currency usd \
  --metadata[age_band_key]=lt_15 \
  --metadata[product_key]=direct_submissions
```

### Create Coupon
```bash
stripe coupons create \
  --percent-off 10 \
  --duration once \
  --name "WELCOME10" \
  --max-redemptions 1000
```

---

## Appendix C: Database Migration for Products/Prices

**Migration not yet created.** Recommend creating:

`/supabase/migrations/YYYYMMDDHHMMSS_seed_stripe_products.sql`

```sql
-- Seed Stripe products (run after Stripe setup)
INSERT INTO products (stripe_product_id, name, description, product_type, active) VALUES
('prod_direct_submissions', 'Direct Submissions', 'Real-time and near-real-time MCA submissions for speed-to-contact teams', 'service', true),
('prod_alpha_data', 'Alpha Data', 'Smart-aged submissions from the last 6 months for sustainable pipeline building', 'service', true),
('prod_pulse_data', 'Pulse Data', '6-24 month MCA data priced for high-volume dialing and nurture campaigns', 'service', true);

-- Seed Stripe prices (replace price IDs with actual Stripe IDs)
INSERT INTO prices (stripe_price_id, product_id, unit_amount_cents, currency, price_type, active) VALUES
-- Direct Submissions prices
('price_direct_lt15', (SELECT id FROM products WHERE stripe_product_id = 'prod_direct_submissions'), 350, 'usd', 'one_time', true),
('price_direct_15_30', (SELECT id FROM products WHERE stripe_product_id = 'prod_direct_submissions'), 275, 'usd', 'one_time', true),
-- ... (continue for all 18 prices)
```

---

## Document Maintenance

**Owner:** Engineering Team
**Review Frequency:** Monthly or after major Stripe changes
**Last Reviewed:** December 9, 2024
**Next Review:** January 9, 2025

---

**End of Stripe Products Catalog**

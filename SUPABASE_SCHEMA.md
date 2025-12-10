# Supabase Database Schema Documentation

**Project:** clear_scrub (vnhauomvzjucxadrbywg)
**Last Updated:** 2025-12-09
**PostgreSQL Version:** 15+ (PostgREST 13.0.5)

---

## Table of Contents

1. [Database Tables](#database-tables)
2. [Database Views](#database-views)
3. [Functions and Stored Procedures](#functions-and-stored-procedures)
4. [Triggers](#triggers)
5. [Indexes](#indexes)
6. [Row Level Security Policies](#row-level-security-policies)
7. [Foreign Key Relationships](#foreign-key-relationships)
8. [Storage Buckets](#storage-buckets)
9. [Entity Relationship Diagram](#entity-relationship-diagram)

---

## Database Tables

### 1. `customers`

Stores customer information with Stripe integration.

| Column | Type | Nullable | Default | Constraints |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | PRIMARY KEY |
| `name` | `text` | YES | - | - |
| `email` | `text` | YES | - | - |
| `phone` | `text` | YES | - | - |
| `company_name` | `text` | YES | - | - |
| `stripe_customer_id` | `text` | YES | - | - |
| `metadata` | `jsonb` | YES | - | - |
| `search_vector` | `tsvector` | - | - | Full-text search |
| `deleted_at` | `timestamptz` | YES | - | Soft delete |
| `created_at` | `timestamptz` | NO | `now()` | - |
| `updated_at` | `timestamptz` | NO | `now()` | - |

---

### 2. `products`

Product catalog with Stripe integration.

| Column | Type | Nullable | Default | Constraints |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | PRIMARY KEY |
| `name` | `text` | NO | - | - |
| `description` | `text` | YES | - | - |
| `product_type` | `text` | NO | `'one_time'` | - |
| `stripe_product_id` | `text` | NO | - | - |
| `active` | `boolean` | NO | `true` | - |
| `search_vector` | `tsvector` | - | - | Full-text search |
| `deleted_at` | `timestamptz` | YES | - | Soft delete |
| `created_at` | `timestamptz` | NO | `now()` | - |
| `updated_at` | `timestamptz` | NO | `now()` | - |

---

### 3. `prices`

Pricing information linked to products with Stripe integration.

| Column | Type | Nullable | Default | Constraints |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | PRIMARY KEY |
| `product_id` | `uuid` | NO | - | FK -> products(id) |
| `stripe_price_id` | `text` | NO | - | - |
| `unit_amount_cents` | `integer` | NO | - | - |
| `currency` | `text` | NO | `'usd'` | - |
| `price_type` | `text` | NO | - | 'one_time' or 'recurring' |
| `billing_interval` | `text` | YES | - | 'month', 'year', etc. |
| `billing_interval_count` | `integer` | YES | - | - |
| `active` | `boolean` | NO | `true` | - |
| `created_at` | `timestamptz` | NO | `now()` | - |
| `updated_at` | `timestamptz` | NO | `now()` | - |

---

### 4. `orders`

Order records with payment tracking.

| Column | Type | Nullable | Default | Constraints |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | PRIMARY KEY |
| `customer_id` | `uuid` | NO | - | FK -> customers(id) |
| `subscription_id` | `uuid` | YES | - | FK -> subscriptions(id) |
| `coupon_id` | `uuid` | YES | - | FK -> coupons(id) |
| `amount_cents` | `integer` | NO | - | - |
| `discount_cents` | `integer` | YES | - | - |
| `currency` | `text` | NO | `'usd'` | - |
| `status` | `text` | NO | - | 'pending', 'paid', 'failed', 'cancelled' |
| `stripe_payment_intent_id` | `text` | YES | - | - |
| `stripe_invoice_id` | `text` | YES | - | - |
| `metadata` | `jsonb` | YES | - | - |
| `paid_at` | `timestamptz` | YES | - | - |
| `created_at` | `timestamptz` | NO | `now()` | - |
| `updated_at` | `timestamptz` | NO | `now()` | - |

---

### 5. `order_items`

Individual line items within an order.

| Column | Type | Nullable | Default | Constraints |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | PRIMARY KEY |
| `order_id` | `uuid` | NO | - | FK -> orders(id) |
| `product_id` | `uuid` | NO | - | FK -> products(id) |
| `price_id` | `uuid` | NO | - | FK -> prices(id) |
| `quantity` | `integer` | NO | `1` | - |
| `unit_amount_cents` | `integer` | NO | - | - |
| `total_amount_cents` | `integer` | NO | - | - |
| `created_at` | `timestamptz` | NO | `now()` | - |

---

### 6. `subscriptions`

Recurring subscription management with Stripe.

| Column | Type | Nullable | Default | Constraints |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | PRIMARY KEY |
| `customer_id` | `uuid` | NO | - | FK -> customers(id) |
| `price_id` | `uuid` | NO | - | FK -> prices(id) |
| `stripe_subscription_id` | `text` | NO | - | - |
| `status` | `text` | NO | - | 'active', 'canceled', 'past_due', etc. |
| `current_period_start` | `timestamptz` | YES | - | - |
| `current_period_end` | `timestamptz` | YES | - | - |
| `cancel_at_period_end` | `boolean` | YES | - | - |
| `canceled_at` | `timestamptz` | YES | - | - |
| `deleted_at` | `timestamptz` | YES | - | Soft delete |
| `created_at` | `timestamptz` | NO | `now()` | - |
| `updated_at` | `timestamptz` | NO | `now()` | - |

---

### 7. `coupons`

Discount coupons with Stripe integration.

| Column | Type | Nullable | Default | Constraints |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | PRIMARY KEY |
| `stripe_coupon_id` | `text` | NO | - | - |
| `name` | `text` | YES | - | - |
| `percent_off` | `numeric` | YES | - | - |
| `amount_off_cents` | `integer` | YES | - | - |
| `currency` | `text` | YES | - | - |
| `duration` | `text` | NO | - | 'forever', 'once', 'repeating' |
| `duration_in_months` | `integer` | YES | - | For 'repeating' duration |
| `max_redemptions` | `integer` | YES | - | - |
| `times_redeemed` | `integer` | YES | - | - |
| `expires_at` | `timestamptz` | YES | - | - |
| `valid` | `boolean` | NO | `true` | - |
| `created_at` | `timestamptz` | NO | `now()` | - |
| `updated_at` | `timestamptz` | NO | `now()` | - |

---

### 8. `customer_lifetime_spend`

Aggregated spending metrics per customer.

| Column | Type | Nullable | Default | Constraints |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | PRIMARY KEY |
| `customer_id` | `uuid` | NO | - | FK -> customers(id), UNIQUE |
| `total_spend_cents` | `integer` | NO | `0` | - |
| `total_orders` | `integer` | NO | `0` | - |
| `avg_order_value_cents` | `integer` | YES | - | - |
| `first_order_at` | `timestamptz` | YES | - | - |
| `last_order_at` | `timestamptz` | YES | - | - |
| `updated_at` | `timestamptz` | NO | `now()` | - |

---

### 9. `inventory_segments`

MCA lead inventory by product type and age band.

| Column | Type | Nullable | Default | Constraints |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | PRIMARY KEY |
| `product_key` | `text` | NO | - | CHECK: 'direct_submissions', 'alpha_data', 'pulse_data' |
| `product_label` | `text` | NO | - | - |
| `age_band_key` | `text` | NO | - | CHECK: 'lt_15', '15_30', '30_90', '90_180', '180_365', '1_2y' |
| `age_band_label` | `text` | NO | - | - |
| `price_cents` | `integer` | NO | - | - |
| `available_quantity` | `integer` | NO | `0` | - |
| `max_quantity` | `integer` | NO | `0` | - |
| `square_variation_id` | `text` | YES | - | Square POS integration |
| `created_at` | `timestamptz` | NO | `now()` | - |
| `updated_at` | `timestamptz` | NO | `now()` | - |

**Unique Constraint:** `(product_key, age_band_key)`

**Product Types:**
- `direct_submissions` - Direct Submissions (fresh leads)
- `alpha_data` - Alpha Data (processed lead data)
- `pulse_data` - Pulse Data (real-time lead intelligence)

**Age Bands:**
- `lt_15` - Under 15 days
- `15_30` - 15-30 days
- `30_90` - 30-90 days
- `90_180` - 90-180 days
- `180_365` - 180-365 days
- `1_2y` - 1-2 years

---

### 10. `inventory_snapshots`

Historical inventory tracking for 7-day change calculations.

| Column | Type | Nullable | Default | Constraints |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | PRIMARY KEY |
| `segment_id` | `uuid` | NO | - | FK -> inventory_segments(id) ON DELETE CASCADE |
| `available_quantity` | `integer` | NO | - | - |
| `captured_at` | `timestamptz` | NO | `now()` | - |

---

### 11. `profiles`

User profile information linked to auth.users.

| Column | Type | Nullable | Default | Constraints |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | NO | - | PRIMARY KEY, FK -> auth.users(id) ON DELETE CASCADE |
| `email` | `text` | YES | - | - |
| `full_name` | `text` | YES | - | - |
| `company_name` | `text` | YES | - | - |
| `created_at` | `timestamptz` | NO | `now()` | - |
| `updated_at` | `timestamptz` | NO | `now()` | - |

---

## Database Views

### 1. `v_active_customers`

Filters customers to show only non-deleted records.

```sql
SELECT * FROM customers WHERE deleted_at IS NULL
```

**Columns:** Same as `customers` table

---

### 2. `v_active_products`

Filters products to show only non-deleted records.

```sql
SELECT * FROM products WHERE deleted_at IS NULL
```

**Columns:** Same as `products` table

---

### 3. `v_active_subscriptions`

Active subscription details with customer and product information.

| Column | Type | Description |
|--------|------|-------------|
| `subscription_id` | `uuid` | Subscription ID |
| `stripe_subscription_id` | `text` | Stripe subscription ID |
| `status` | `text` | Subscription status |
| `customer_name` | `text` | Customer name |
| `customer_email` | `text` | Customer email |
| `company_name` | `text` | Customer company |
| `product_name` | `text` | Subscribed product name |
| `monthly_price_dollars` | `numeric` | Monthly price in dollars |
| `current_period_start` | `timestamptz` | Period start |
| `current_period_end` | `timestamptz` | Period end |
| `cancel_at_period_end` | `boolean` | Cancellation pending |
| `subscribed_at` | `timestamptz` | Subscription creation date |

---

### 4. `v_dashboard_stats`

Aggregated dashboard statistics.

| Column | Type | Description |
|--------|------|-------------|
| `total_customers` | `bigint` | Total active customers |
| `total_paid_orders` | `bigint` | Total paid orders |
| `total_revenue_cents` | `bigint` | Total revenue in cents |
| `total_revenue_dollars` | `numeric` | Total revenue in dollars |
| `mrr_cents` | `bigint` | Monthly recurring revenue (cents) |
| `mrr_dollars` | `numeric` | Monthly recurring revenue (dollars) |
| `active_subscriptions` | `bigint` | Count of active subscriptions |
| `orders_last_30_days` | `bigint` | Orders in last 30 days |
| `revenue_last_30_days_dollars` | `numeric` | Revenue in last 30 days |

---

### 5. `v_monthly_revenue`

Revenue breakdown by month.

| Column | Type | Description |
|--------|------|-------------|
| `month` | `text` | Month (YYYY-MM format) |
| `total_orders` | `bigint` | Orders in month |
| `total_revenue_cents` | `bigint` | Revenue in cents |
| `total_revenue_dollars` | `numeric` | Revenue in dollars |
| `avg_order_value_cents` | `numeric` | Average order value (cents) |
| `avg_order_value_dollars` | `numeric` | Average order value (dollars) |
| `unique_customers` | `bigint` | Unique customers |

---

### 6. `v_mrr`

Monthly Recurring Revenue metrics.

| Column | Type | Description |
|--------|------|-------------|
| `mrr_cents` | `bigint` | MRR in cents |
| `mrr_dollars` | `numeric` | MRR in dollars |
| `arr_dollars` | `numeric` | Annual recurring revenue |
| `active_subscriptions` | `bigint` | Active subscription count |

---

### 7. `v_recent_activity`

Recent orders and subscriptions activity feed.

| Column | Type | Description |
|--------|------|-------------|
| `record_id` | `uuid` | Record ID |
| `activity_type` | `text` | 'order' or 'subscription' |
| `customer_name` | `text` | Customer name |
| `customer_email` | `text` | Customer email |
| `amount_dollars` | `numeric` | Amount in dollars |
| `status` | `text` | Status |
| `created_at` | `timestamptz` | Activity timestamp |

---

### 8. `v_revenue_by_product`

Revenue breakdown by product.

| Column | Type | Description |
|--------|------|-------------|
| `product_id` | `uuid` | Product ID |
| `product_name` | `text` | Product name |
| `stripe_product_id` | `text` | Stripe product ID |
| `total_orders` | `bigint` | Order count |
| `total_units_sold` | `bigint` | Units sold |
| `total_revenue_cents` | `bigint` | Revenue in cents |
| `total_revenue_dollars` | `numeric` | Revenue in dollars |
| `unique_customers` | `bigint` | Unique customers |

---

### 9. `v_top_customers`

Top customers by lifetime spend.

| Column | Type | Description |
|--------|------|-------------|
| `customer_id` | `uuid` | Customer ID |
| `name` | `text` | Customer name |
| `email` | `text` | Customer email |
| `company_name` | `text` | Company name |
| `stripe_customer_id` | `text` | Stripe customer ID |
| `total_orders` | `integer` | Total order count |
| `lifetime_spend_dollars` | `numeric` | Lifetime value |
| `avg_order_value_dollars` | `numeric` | Average order value |
| `first_order_at` | `timestamptz` | First order date |
| `last_order_at` | `timestamptz` | Last order date |
| `has_active_subscription` | `boolean` | Subscription status |

---

### 10. `v_customer_cohorts`

Customer cohort analysis by acquisition month.

| Column | Type | Description |
|--------|------|-------------|
| `cohort_month` | `text` | Cohort month (YYYY-MM) |
| `customers_acquired` | `bigint` | Customers in cohort |
| `customers_with_orders` | `bigint` | Customers who ordered |
| `cohort_total_revenue_dollars` | `numeric` | Cohort total revenue |
| `avg_ltv_dollars` | `numeric` | Average lifetime value |

---

## Functions and Stored Procedures

### 1. `search_customers(search_query text)`

Full-text search for customers.

```sql
RETURNS SETOF customers
```

**Parameters:**
- `search_query` (text): Search term to match against customer name, email, company_name

**Usage:**
```sql
SELECT * FROM search_customers('john doe');
```

---

### 2. `search_products(search_query text)`

Full-text search for products.

```sql
RETURNS SETOF products
```

**Parameters:**
- `search_query` (text): Search term to match against product name and description

**Usage:**
```sql
SELECT * FROM search_products('mca leads');
```

---

### 3. `update_customer_lifetime_spend(p_customer_id uuid)`

Recalculates and updates customer lifetime spend metrics.

```sql
RETURNS void
```

**Parameters:**
- `p_customer_id` (uuid): Customer ID to update

**Description:** Aggregates all paid orders for the customer and updates the `customer_lifetime_spend` table.

---

### 4. `decrement_inventory(segment_uuid uuid, qty integer)`

Atomically decrements inventory for a segment.

```sql
RETURNS BOOLEAN
SECURITY DEFINER
```

**Parameters:**
- `segment_uuid` (uuid): Inventory segment ID
- `qty` (integer): Quantity to decrement

**Returns:** `true` if successful, `false` if insufficient inventory

**Description:** Uses optimistic locking to prevent overselling. Only decrements if `available_quantity >= qty`.

---

### 5. `update_inventory_segments_updated_at()`

Trigger function to auto-update `updated_at` timestamp.

```sql
RETURNS TRIGGER
```

---

### 6. `handle_updated_at()`

Generic trigger function for updating `updated_at` columns.

```sql
RETURNS TRIGGER
SECURITY DEFINER
```

---

## Triggers

### 1. `update_inventory_segments_updated_at`

**Table:** `inventory_segments`
**Timing:** BEFORE UPDATE
**Function:** `update_inventory_segments_updated_at()`

Automatically sets `updated_at` to `now()` on any update.

---

### 2. `set_updated_at`

**Table:** `profiles`
**Timing:** BEFORE UPDATE
**Function:** `handle_updated_at()`

Automatically sets `updated_at` to `now()` on any update.

---

## Indexes

### Explicit Indexes

| Index Name | Table | Columns | Type |
|------------|-------|---------|------|
| `idx_inventory_snapshots_segment_time` | `inventory_snapshots` | `(segment_id, captured_at DESC)` | B-tree |

### Implicit Indexes (from constraints)

| Table | Columns | Type | Notes |
|-------|---------|------|-------|
| `inventory_segments` | `(product_key, age_band_key)` | UNIQUE | Composite unique constraint |
| `customer_lifetime_spend` | `customer_id` | UNIQUE | One-to-one relationship |

### Full-Text Search Indexes

| Table | Column | Type |
|-------|--------|------|
| `customers` | `search_vector` | GIN (tsvector) |
| `products` | `search_vector` | GIN (tsvector) |

---

## Row Level Security Policies

### `inventory_segments`

| Policy Name | Operation | Role | Using | With Check |
|-------------|-----------|------|-------|------------|
| Allow public read access to inventory_segments | SELECT | `anon` | `true` | - |

---

### `inventory_snapshots`

| Policy Name | Operation | Role | Using | With Check |
|-------------|-----------|------|-------|------------|
| Allow public read access to inventory_snapshots | SELECT | `public` | `true` | - |
| Allow public insert to inventory_snapshots | INSERT | `public` | - | `true` |

---

### `orders`

| Policy Name | Operation | Role | Using | With Check |
|-------------|-----------|------|-------|------------|
| Service role can manage all orders | ALL | `service_role` | `true` | `true` |

**Note:** No direct access for `anon` or `authenticated` users. Orders should only be created via Edge Functions using the service role.

---

### `profiles`

| Policy Name | Operation | Role | Using | With Check |
|-------------|-----------|------|-------|------------|
| Users can view their own profile | SELECT | `authenticated` | `auth.uid() = id` | - |
| Users can update their own profile | UPDATE | `authenticated` | `auth.uid() = id` | `auth.uid() = id` |
| Users can insert their own profile | INSERT | `authenticated` | - | `auth.uid() = id` |

---

## Foreign Key Relationships

```
customers
    |
    +--< customer_lifetime_spend (customer_id -> customers.id) [1:1]
    |
    +--< orders (customer_id -> customers.id)
    |
    +--< subscriptions (customer_id -> customers.id)

products
    |
    +--< prices (product_id -> products.id)
    |
    +--< order_items (product_id -> products.id)

prices
    |
    +--< order_items (price_id -> prices.id)
    |
    +--< subscriptions (price_id -> prices.id)

orders
    |
    +--< order_items (order_id -> orders.id)
    |
    +-- coupons (coupon_id -> coupons.id) [nullable]
    |
    +-- subscriptions (subscription_id -> subscriptions.id) [nullable]

inventory_segments
    |
    +--< inventory_snapshots (segment_id -> inventory_segments.id) [CASCADE DELETE]

auth.users
    |
    +-- profiles (id -> auth.users.id) [CASCADE DELETE]
```

### Foreign Key Summary

| Table | Column | References | On Delete |
|-------|--------|------------|-----------|
| `customer_lifetime_spend` | `customer_id` | `customers.id` | - |
| `orders` | `customer_id` | `customers.id` | - |
| `orders` | `subscription_id` | `subscriptions.id` | - |
| `orders` | `coupon_id` | `coupons.id` | - |
| `order_items` | `order_id` | `orders.id` | - |
| `order_items` | `product_id` | `products.id` | - |
| `order_items` | `price_id` | `prices.id` | - |
| `prices` | `product_id` | `products.id` | - |
| `subscriptions` | `customer_id` | `customers.id` | - |
| `subscriptions` | `price_id` | `prices.id` | - |
| `inventory_snapshots` | `segment_id` | `inventory_segments.id` | CASCADE |
| `profiles` | `id` | `auth.users.id` | CASCADE |

---

## Storage Buckets

### `documents`

Private storage bucket for user documents.

| Setting | Value |
|---------|-------|
| Public | `false` |
| File Size Limit | 10MB (10485760 bytes) |
| Allowed MIME Types | `application/pdf`, `image/jpeg`, `image/png` |

**Storage Policies:**

| Policy | Operation | Role | Condition |
|--------|-----------|------|-----------|
| Authenticated users can upload their own documents | INSERT | `authenticated` | `bucket_id = 'documents' AND foldername[1] = auth.uid()::text` |
| Users can view their own documents | SELECT | `authenticated` | `bucket_id = 'documents' AND foldername[1] = auth.uid()::text` |
| Users can delete their own documents | DELETE | `authenticated` | `bucket_id = 'documents' AND foldername[1] = auth.uid()::text` |

---

## Entity Relationship Diagram

```
+------------------+       +------------------+       +------------------+
|    customers     |       |     products     |       |     coupons      |
+------------------+       +------------------+       +------------------+
| id (PK)          |       | id (PK)          |       | id (PK)          |
| name             |       | name             |       | stripe_coupon_id |
| email            |       | description      |       | name             |
| phone            |       | product_type     |       | percent_off      |
| company_name     |       | stripe_product_id|       | amount_off_cents |
| stripe_customer_id       | active           |       | duration         |
| metadata         |       | search_vector    |       | valid            |
| search_vector    |       | deleted_at       |       +------------------+
| deleted_at       |       | created_at       |
| created_at       |       | updated_at       |
| updated_at       |       +--------+---------+
+--------+---------+                |
         |                          |
         |    +------------------+  |
         |    |      prices      |  |
         |    +------------------+  |
         |    | id (PK)          |<-+
         |    | product_id (FK)  |
         |    | stripe_price_id  |
         |    | unit_amount_cents|
         |    | currency         |
         |    | price_type       |
         |    | billing_interval |
         |    | active           |
         |    +--------+---------+
         |             |
         v             v
+------------------+   |   +------------------+
|  subscriptions   |<--+   |     orders       |
+------------------+       +------------------+
| id (PK)          |<----->| id (PK)          |
| customer_id (FK) |       | customer_id (FK) |
| price_id (FK)    |       | subscription_id  |
| stripe_sub_id    |       | coupon_id (FK)   |
| status           |       | amount_cents     |
| current_period_* |       | status           |
| cancel_at_end    |       | stripe_payment_* |
+------------------+       | paid_at          |
                           +--------+---------+
                                    |
                                    v
                           +------------------+
                           |   order_items    |
                           +------------------+
                           | id (PK)          |
                           | order_id (FK)    |
                           | product_id (FK)  |
                           | price_id (FK)    |
                           | quantity         |
                           | unit_amount_cents|
                           | total_amount_cents
                           +------------------+

+------------------+       +----------------------+
| inventory_segments       | inventory_snapshots  |
+------------------+       +----------------------+
| id (PK)          |<------| id (PK)              |
| product_key      |       | segment_id (FK)      |
| product_label    |       | available_quantity   |
| age_band_key     |       | captured_at          |
| age_band_label   |       +----------------------+
| price_cents      |
| available_quantity
| max_quantity     |
| square_var_id    |
+------------------+

+------------------+       +----------------------+
|   auth.users     |       |  customer_lifetime   |
+------------------+       |      _spend          |
| id (PK)          |       +----------------------+
| ...              |       | id (PK)              |
+--------+---------+       | customer_id (FK,UQ)  |
         |                 | total_spend_cents    |
         v                 | total_orders         |
+------------------+       | avg_order_value_cents|
|    profiles      |       | first_order_at       |
+------------------+       | last_order_at        |
| id (PK, FK)      |       +----------------------+
| email            |              ^
| full_name        |              |
| company_name     |   +----------+
| created_at       |   |
| updated_at       |   | (customer_id references customers.id)
+------------------+
```

---

## Schema Grants

```sql
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.inventory_segments TO anon;
```

---

## Notes

1. **Soft Deletes:** The `customers` and `products` tables use soft deletes via `deleted_at` column. Always filter by `deleted_at IS NULL` or use the `v_active_*` views.

2. **Currency Handling:** All monetary values are stored in cents (integer) to avoid floating-point precision issues. Views provide dollar conversions.

3. **Full-Text Search:** The `customers` and `products` tables have `tsvector` columns for efficient full-text search. Use the `search_customers()` and `search_products()` functions.

4. **Inventory Management:** The `inventory_segments` table is the source of truth for available leads. Use `decrement_inventory()` for atomic inventory updates.

5. **7-Day Change Tracking:** Inventory changes are tracked via `inventory_snapshots`. Compare current `available_quantity` with snapshots from 7 days ago.

6. **Stripe Integration:** Multiple tables have Stripe ID columns for syncing with Stripe's payment system.

7. **Square Integration:** The `inventory_segments` table includes `square_variation_id` for Square POS integration.

-- Clear existing sample data
DELETE FROM inventory_segments;

-- Insert rows matching actual products table
INSERT INTO inventory_segments (product_key, product_label, age_band_key, age_band_label, price_cents, available_quantity, max_quantity) VALUES
-- Direct Submissions
('direct_submissions', 'Direct Submissions', 'lt_15', 'Under 15 Days', 350, 1250, 2000),
('direct_submissions', 'Direct Submissions', '15_30', '15-30 Days', 275, 890, 1500),
-- Alpha Data
('alpha_data', 'Alpha Data', '30_90', '30-90 Days', 125, 3200, 4000),
('alpha_data', 'Alpha Data', '90_180', '90-180 Days', 65, 5800, 8000),
-- Pulse Data
('pulse_data', 'Pulse Data', '180_365', '180-365 Days', 25, 14000, 18000),
('pulse_data', 'Pulse Data', '1_2y', '1-2 Years', 10, 32000, 40000);
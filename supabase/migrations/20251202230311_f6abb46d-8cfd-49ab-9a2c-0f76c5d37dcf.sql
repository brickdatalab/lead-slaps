INSERT INTO inventory_segments (product_key, product_label, age_band_key, age_band_label, price_cents, available_quantity, max_quantity) VALUES
-- Direct Submissions
('direct_submissions', 'Direct Submissions', 'lt_15', '< 15 Days', 350, 1250, 2000),
('direct_submissions', 'Direct Submissions', '15_30', '15-30 Days', 275, 890, 1500),
('direct_submissions', 'Direct Submissions', '30_90', '30-90 Days', 175, 2100, 3000),
('direct_submissions', 'Direct Submissions', '90_180', '90-180 Days', 95, 4500, 5000),
('direct_submissions', 'Direct Submissions', '180_365', '180-365 Days', 55, 8200, 10000),
('direct_submissions', 'Direct Submissions', '1_2y', '1-2 Years', 25, 15000, 20000),
-- Alpha Data
('alpha_data', 'Alpha Data', 'lt_15', '< 15 Days', 275, 680, 1000),
('alpha_data', 'Alpha Data', '15_30', '15-30 Days', 195, 1450, 2000),
('alpha_data', 'Alpha Data', '30_90', '30-90 Days', 125, 3200, 4000),
('alpha_data', 'Alpha Data', '90_180', '90-180 Days', 65, 5800, 8000),
('alpha_data', 'Alpha Data', '180_365', '180-365 Days', 35, 12500, 15000),
('alpha_data', 'Alpha Data', '1_2y', '1-2 Years', 15, 25000, 30000),
-- Pulse Data
('pulse_data', 'Pulse Data', 'lt_15', '< 15 Days', 225, 420, 800),
('pulse_data', 'Pulse Data', '15_30', '15-30 Days', 165, 950, 1200),
('pulse_data', 'Pulse Data', '30_90', '30-90 Days', 95, 2800, 3500),
('pulse_data', 'Pulse Data', '90_180', '90-180 Days', 45, 6200, 7000),
('pulse_data', 'Pulse Data', '180_365', '180-365 Days', 25, 14000, 18000),
('pulse_data', 'Pulse Data', '1_2y', '1-2 Years', 10, 32000, 40000);
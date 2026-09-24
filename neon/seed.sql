-- ==========================================================
-- 🌶️ SYLVIE DATABASE SEED (40-Swatch Inclusive Skin Tones)
-- Project: misty-feather-22730419 | Branch: production
-- ==========================================================

INSERT INTO skin_tones (code, display_name, hex_value, fitzpatrick_scale, undertone, season, complementary_colors, avoid_colors)
VALUES
  ('ST01', 'Porcelain Ivory', '#FAF0E6', 1, 'cool', 'winter', ARRAY['#1C3B57', '#800020', '#104E3B'], ARRAY['#F5DEB3', '#D2B48C']),
  ('ST02', 'Alabaster Rose', '#F9EBE1', 1, 'cool', 'summer', ARRAY['#4682B4', '#D87093', '#2E8B57'], ARRAY['#FFA500', '#FFFF00']),
  ('ST03', 'Warm Bisque', '#F5E6D3', 1, 'warm', 'spring', ARRAY['#FF7F50', '#2E8B57', '#8B4513'], ARRAY['#A9A9A9', '#708090']),
  ('ST04', 'Nordic Cream', '#F7ECD8', 1, 'neutral', 'spring', ARRAY['#2E4057', '#C0392B', '#27AE60'], ARRAY['#E6E6FA']),
  ('ST05', 'Fair Peach', '#F3DEC9', 2, 'warm', 'spring', ARRAY['#D35400', '#2C3E50', '#16A085'], ARRAY['#7F8C8D']),
  ('ST06', 'Pale Almond', '#EED7BE', 2, 'neutral', 'autumn', ARRAY['#8E44AD', '#2980B9', '#D35400'], ARRAY['#BDC3C7']),
  ('ST07', 'Light Beige', '#ECD0B5', 2, 'cool', 'summer', ARRAY['#34495E', '#C0392B', '#16A085'], ARRAY['#F39C12']),
  ('ST08', 'Soft Honey', '#EAC8A7', 2, 'warm', 'autumn', ARRAY['#8B0000', '#006400', '#191970'], ARRAY['#F0E68C']),
  ('ST09', 'Fair Olive', '#E4C9A8', 2, 'olive', 'autumn', ARRAY['#4B0082', '#800000', '#000080'], ARRAY['#ADFF2F']),
  ('ST10', 'Golden Cream', '#E5C49E', 2, 'warm', 'spring', ARRAY['#B22222', '#228B22', '#4169E1'], ARRAY['#D3D3D3']),
  ('ST11', 'Warm Sand', '#DFC09A', 3, 'warm', 'autumn', ARRAY['#800020', '#1F3A3D', '#4A235A'], ARRAY['#E0EEEE']),
  ('ST12', 'Golden Olive III', '#D8B88E', 3, 'olive', 'autumn', ARRAY['#8B0000', '#191970', '#556B2F'], ARRAY['#7FFFD4']),
  ('ST13', 'Sandalwood', '#D5B288', 3, 'warm', 'autumn', ARRAY['#990000', '#0B5345', '#1B4F72'], ARRAY['#F5F5DC']),
  ('ST14', 'Neutral Ochre', '#D0AA7E', 3, 'neutral', 'spring', ARRAY['#641E16', '#154360', '#1E8449'], ARRAY['#D5D8DC']),
  ('ST15', 'Sunlit Wheat', '#CCA577', 3, 'warm', 'spring', ARRAY['#78281F', '#1B4F72', '#145A32'], ARRAY['#EAEDED']),
  ('ST16', 'Cool Buff', '#C9A075', 3, 'cool', 'summer', ARRAY['#512E5F', '#1F618D', '#922B21'], ARRAY['#F9E79F']),
  ('ST17', 'Gilded Amber', '#C4986C', 3, 'warm', 'autumn', ARRAY['#6E2C00', '#1A5276', '#196F3D'], ARRAY['#FCF3CF']),
  ('ST18', 'Desi Olive', '#BF9264', 3, 'olive', 'autumn', ARRAY['#7B241C', '#0E6251', '#4A235A'], ARRAY['#D1F2EB']),
  ('ST19', 'Medium Tan', '#B88A58', 4, 'warm', 'autumn', ARRAY['#E83B2E', '#C9A826', '#1A365D'], ARRAY['#D5DBDB']),
  ('ST20', 'Golden Honey Tan', '#B2824F', 4, 'warm', 'spring', ARRAY['#C0271B', '#FDF5E6', '#0B5345'], ARRAY['#CCD1D1']),
  ('ST21', 'Warm Terracotta', '#AB7946', 4, 'warm', 'autumn', ARRAY['#1F0C0A', '#F7E8D0', '#1565C0'], ARRAY['#B2BABB']),
  ('ST22', 'Olive Bronzed', '#A3723E', 4, 'olive', 'autumn', ARRAY['#884EA0', '#2E4053', '#B03A2E'], ARRAY['#A2D9CE']),
  ('ST23', 'Cardamom Tan', '#9E6C38', 4, 'neutral', 'autumn', ARRAY['#E83B2E', '#FDF5E6', '#2874A6'], ARRAY['#A6ACAF']),
  ('ST24', 'Caramel Saffron', '#986532', 4, 'warm', 'autumn', ARRAY['#922B21', '#1A5276', '#C9A826'], ARRAY['#99A3A4']),
  ('ST25', 'Rich Copper', '#935F2D', 4, 'warm', 'autumn', ARRAY['#1C0A08', '#FDF5E6', '#1E8449'], ARRAY['#BDC3C7']),
  ('ST26', 'Cool Chai', '#8F5A29', 4, 'cool', 'winter', ARRAY['#512E5F', '#1F618D', '#D35400'], ARRAY['#85929E']),
  ('ST27', 'Chestnut Bronze', '#885424', 5, 'warm', 'autumn', ARRAY['#E83B2E', '#C9A826', '#FDF5E6'], ARRAY['#5D6D7E']),
  ('ST28', 'Deep Olive V', '#804E1F', 5, 'olive', 'winter', ARRAY['#FF6B47', '#C9A826', '#FFFFFF'], ARRAY['#424949']),
  ('ST29', 'Roasted Almond', '#79471A', 5, 'warm', 'autumn', ARRAY['#F56A60', '#FDF5E6', '#2E7D32'], ARRAY['#34495E']),
  ('ST30', 'Dark Caramel', '#724116', 5, 'warm', 'autumn', ARRAY['#E83B2E', '#C9A826', '#5499C7'], ARRAY['#283747']),
  ('ST31', 'Cacao Bean', '#6C3C12', 5, 'neutral', 'winter', ARRAY['#FDF5E6', '#E83B2E', '#C9A826'], ARRAY['#1B2631']),
  ('ST32', 'Mahogany Dusk', '#65360F', 5, 'cool', 'winter', ARRAY['#FF6B47', '#C9A826', '#E5E8E8'], ARRAY['#17202A']),
  ('ST33', 'Nutmeg Brown', '#5E310D', 5, 'warm', 'autumn', ARRAY['#C9A826', '#E83B2E', '#FFFFFF'], ARRAY['#2C3E50']),
  ('ST34', 'Tamarind Deep', '#572C0B', 5, 'neutral', 'winter', ARRAY['#FDF5E6', '#FF6B47', '#58D68D'], ARRAY['#212F3D']),
  ('ST35', 'Espresso Velvet', '#4F2609', 6, 'warm', 'winter', ARRAY['#FFFFFF', '#C9A826', '#E83B2E'], ARRAY['#1C1C1C']),
  ('ST36', 'Deep Umber', '#482107', 6, 'neutral', 'winter', ARRAY['#FDF5E6', '#FF6B47', '#F4D03F'], ARRAY['#171717']),
  ('ST37', 'Midnight Cacao', '#401C06', 6, 'cool', 'winter', ARRAY['#FFFFFF', '#E83B2E', '#48C9B0'], ARRAY['#121212']),
  ('ST38', 'Obsidian Rose', '#391805', 6, 'cool', 'winter', ARRAY['#C9A826', '#F56A60', '#FFFFFF'], ARRAY['#0B0B0B']),
  ('ST39', 'Rich Ebony', '#311304', 6, 'neutral', 'winter', ARRAY['#FDF5E6', '#C9A826', '#E83B2E'], ARRAY['#080808']),
  ('ST40', 'Pure Onyx Glow', '#280E03', 6, 'cool', 'winter', ARRAY['#FFFFFF', '#FF6B47', '#F1C40F'], ARRAY['#000000'])
ON CONFLICT (code) DO NOTHING;

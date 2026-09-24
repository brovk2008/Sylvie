-- ==========================================================
-- 🌶️ SYLVIE DATABASE SCHEMA (Neon Serverless PostgreSQL)
-- Project: misty-feather-22730419 | Branch: production
-- ==========================================================

-- Enable PostgreSQL extensions supported by Neon
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 0. AUTH USERS (Compatible with Neon Auth & Standalone JWT)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Identity
  display_name TEXT,
  avatar_url TEXT,
  date_of_birth DATE,
  gender TEXT,                          -- 'male','female','nonbinary','prefer_not'

  -- Body measurements
  height_cm NUMERIC(5,1),
  weight_kg NUMERIC(5,1),
  bmi NUMERIC(4,1) GENERATED ALWAYS AS (
    CASE WHEN height_cm > 0 THEN ROUND((weight_kg / ((height_cm/100)^2))::NUMERIC, 1) ELSE NULL END
  ) STORED,
  body_type TEXT,                       -- 'ectomorph','mesomorph','endomorph','hourglass', etc.
  chest_cm NUMERIC(5,1),
  waist_cm NUMERIC(5,1),
  hips_cm NUMERIC(5,1),
  shoulder_cm NUMERIC(5,1),
  inseam_cm NUMERIC(5,1),
  shoe_size_eu NUMERIC(4,1),

  -- Appearance
  skin_tone_code TEXT,
  skin_undertone TEXT,                  -- 'warm','cool','neutral','olive'
  hair_color TEXT,
  hair_length TEXT,                     -- 'bald','short','medium','long'
  eye_color TEXT,

  -- Face scan & body photos (Neon Object Storage bucket paths)
  face_photo_front TEXT,
  face_photo_left TEXT,
  face_photo_right TEXT,
  face_photo_back TEXT,
  body_photo_front TEXT,
  body_photo_side TEXT,

  -- Style profile
  primary_style_vector JSONB DEFAULT '{}'::jsonb,
  style_archetypes TEXT[] DEFAULT '{}',
  preferred_colors TEXT[] DEFAULT '{}',
  disliked_colors TEXT[] DEFAULT '{}',
  preferred_occasions TEXT[] DEFAULT '{}',
  formality_min NUMERIC(3,1) DEFAULT 2.0,
  formality_max NUMERIC(3,1) DEFAULT 7.0,

  -- Fashion knowledge from survey
  fashion_knowledge_level TEXT DEFAULT 'intermediate',
  survey_completed_at TIMESTAMPTZ,

  -- Completion state
  profile_completion_pct INTEGER DEFAULT 0,
  onboarding_done BOOLEAN DEFAULT FALSE,
  almirah_photo_count INTEGER DEFAULT 0,

  -- Location for live weather
  city TEXT DEFAULT 'Delhi NCR',
  country_code CHAR(2) DEFAULT 'IN',
  latitude NUMERIC(9,6) DEFAULT 28.6139,
  longitude NUMERIC(9,6) DEFAULT 77.2090
);

-- 2. SKIN TONES REFERENCE TABLE
CREATE TABLE IF NOT EXISTS skin_tones (
  code TEXT PRIMARY KEY,                -- e.g. 'ST01', 'ST18'
  display_name TEXT NOT NULL,
  hex_value CHAR(7) NOT NULL,
  fitzpatrick_scale INTEGER CHECK (fitzpatrick_scale BETWEEN 1 AND 6),
  undertone TEXT NOT NULL CHECK (undertone IN ('warm', 'cool', 'neutral', 'olive')),
  season TEXT CHECK (season IN ('spring', 'summer', 'autumn', 'winter')),
  complementary_colors TEXT[] DEFAULT '{}',
  avoid_colors TEXT[] DEFAULT '{}'
);

-- 3. GARMENTS TABLE (Physical Closet)
CREATE TABLE IF NOT EXISTS garments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Photo references
  photo_front TEXT NOT NULL,
  photo_back TEXT,
  photo_thumb TEXT,

  -- Garment identity
  garment_class TEXT NOT NULL,          -- 'top','bottom','one_piece','outerwear','footwear','accessory'
  category TEXT NOT NULL,               -- 'tshirt','jeans','sneaker','watch', etc.
  subcategory TEXT,
  custom_name TEXT,
  brand TEXT,

  -- Physical attributes
  fit TEXT DEFAULT 'regular',           -- 'ultra_slim','slim','fitted','regular','relaxed','loose','oversized','boxy','draped'
  length_torso TEXT,
  sleeve TEXT,                          -- 'sleeveless','short','3/4','long'
  neckline TEXT,
  closure TEXT,
  has_pockets BOOLEAN DEFAULT TRUE,
  waist_rise TEXT,                      -- 'low','mid','high'
  silhouette TEXT,                      -- 'straight','flared','tapered','boxy'

  -- Visual attributes
  dominant_color_hex CHAR(7) NOT NULL,
  dominant_color_name TEXT,
  dominant_hsl JSONB,                   -- {"h":220, "s":45, "l":30}
  secondary_color_hex CHAR(7),
  accent_color_hex CHAR(7),
  color_temperature TEXT DEFAULT 'neutral', -- 'warm','cool','neutral'
  pattern TEXT DEFAULT 'solid',         -- 'solid','horizontal_stripe','vertical_stripe','plaid',...
  pattern_scale TEXT,
  texture TEXT DEFAULT 'smooth',
  finish TEXT DEFAULT 'matte',

  -- Material
  primary_fiber TEXT DEFAULT 'cotton',
  weight TEXT DEFAULT 'medium',
  stretch TEXT DEFAULT 'low',
  opacity TEXT DEFAULT 'opaque',
  water_resistant BOOLEAN DEFAULT FALSE,

  -- Semantic attributes
  formality_score NUMERIC(3,1) DEFAULT 4.0,
  aesthetic_weights JSONB DEFAULT '{}'::jsonb,
  occasions TEXT[] DEFAULT '{}',
  seasons TEXT[] DEFAULT '{"all"}',
  cultural_style TEXT DEFAULT 'western',
  layering_role TEXT DEFAULT 'standalone', -- 'base','mid','outer','standalone'
  outfit_role TEXT DEFAULT 'foundation',   -- 'foundation','statement','accent','neutralizer'

  -- Weather / CLO
  clo_value NUMERIC(3,2) DEFAULT 0.15,
  weather_min_temp_c INTEGER DEFAULT 15,
  weather_max_temp_c INTEGER DEFAULT 35,

  -- User overrides & ratings
  user_confirmed BOOLEAN DEFAULT FALSE,
  user_custom_tags TEXT[] DEFAULT '{}',
  user_rating INTEGER,
  never_wear BOOLEAN DEFAULT FALSE,
  favorite BOOLEAN DEFAULT FALSE,

  -- Wardrobe state
  clean_status TEXT DEFAULT 'clean',    -- 'clean','dirty','washing','drying','ironed'
  is_available BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,

  -- Wear tracking
  wear_count INTEGER DEFAULT 0,
  last_worn_at DATE,

  -- Commercial & ROI
  purchase_price NUMERIC(10,2),
  purchase_currency CHAR(3) DEFAULT 'INR',
  purchased_at DATE
);

-- 4. OUTFITS TABLE (Generated & Saved Looks)
CREATE TABLE IF NOT EXISTS outfits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Context
  occasion TEXT NOT NULL,
  target_clo NUMERIC(4,2),
  actual_clo NUMERIC(4,2),
  weather_temp_c INTEGER,
  weather_condition TEXT,
  weather_humidity_pct INTEGER,

  -- Styling metrics
  color_harmony_type TEXT,              -- 'complementary','analogous','monochromatic','triadic'
  match_score NUMERIC(5,2),             -- 0 - 100
  formality_score NUMERIC(3,1),
  aesthetic_label TEXT,
  stylist_notes TEXT,

  -- User feedback
  is_favorite BOOLEAN DEFAULT FALSE,
  user_rating INTEGER CHECK (user_rating BETWEEN 1 AND 5),
  worn_at DATE
);

-- 5. OUTFIT ITEMS JUNCTION
CREATE TABLE IF NOT EXISTS outfit_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  outfit_id UUID REFERENCES outfits(id) ON DELETE CASCADE NOT NULL,
  garment_id UUID REFERENCES garments(id) ON DELETE CASCADE NOT NULL,
  slot TEXT NOT NULL,                   -- 'top','bottom','outerwear','footwear','accessory'
  layer_level INTEGER DEFAULT 1
);

-- 6. WEAR LOGS (Cost-per-wear analytics)
CREATE TABLE IF NOT EXISTS wear_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  outfit_id UUID REFERENCES outfits(id) ON DELETE SET NULL,
  garment_id UUID REFERENCES garments(id) ON DELETE CASCADE NOT NULL,
  worn_date DATE DEFAULT CURRENT_DATE,
  rating INTEGER,
  notes TEXT
);

-- 7. LAUNDRY QUEUE
CREATE TABLE IF NOT EXISTS laundry_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  garment_id UUID REFERENCES garments(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'dirty',          -- 'dirty','washing','drying','ironed'
  added_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning fast lookups
CREATE INDEX IF NOT EXISTS idx_garments_profile_class ON garments(profile_id, garment_class);
CREATE INDEX IF NOT EXISTS idx_garments_clean_status ON garments(profile_id, clean_status) WHERE is_available = TRUE;
CREATE INDEX IF NOT EXISTS idx_outfits_profile_created ON outfits(profile_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wear_logs_garment ON wear_logs(garment_id, worn_date DESC);

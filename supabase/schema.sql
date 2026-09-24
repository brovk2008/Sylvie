-- ==========================================================
-- 🌶️ SYLVIE DATABASE SCHEMA (Supabase PostgreSQL)
-- ==========================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
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

  -- Face scan photos (Supabase Storage paths)
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

  -- Location for weather
  city TEXT DEFAULT 'Delhi NCR',
  country_code CHAR(2) DEFAULT 'IN',
  latitude NUMERIC(9,6) DEFAULT 28.6139,
  longitude NUMERIC(9,6) DEFAULT 77.2090
);

-- 2. GARMENTS TABLE
CREATE TABLE IF NOT EXISTS garments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Photo references
  photo_front TEXT NOT NULL,
  photo_back TEXT,
  photo_left TEXT,
  photo_right TEXT,
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

  -- Commercial
  purchase_price NUMERIC(10,2),
  purchase_currency CHAR(3) DEFAULT 'INR',
  purchased_at DATE,

  -- AI metadata
  ai_confidence JSONB,
  ai_model_version TEXT,
  ai_processed_at TIMESTAMPTZ,
  embedding_id TEXT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_garments_user_id ON garments (user_id);
CREATE INDEX IF NOT EXISTS idx_garments_class ON garments (garment_class);
CREATE INDEX IF NOT EXISTS idx_garments_clean_status ON garments (clean_status);
CREATE INDEX IF NOT EXISTS idx_garments_available ON garments (is_available) WHERE is_available = TRUE AND is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_garments_occasions ON garments USING GIN (occasions);

-- 3. OUTFITS TABLE
CREATE TABLE IF NOT EXISTS outfits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Composition
  garment_ids UUID[] NOT NULL,
  occasion TEXT DEFAULT 'Casual',
  context_query TEXT,
  weather_at_gen JSONB,
  total_clo NUMERIC(3,2),
  color_harmony_type TEXT,
  color_harmony_score NUMERIC(4,1),
  formality_score NUMERIC(3,1),

  -- AI styling notes
  styling_notes TEXT,
  color_breakdown JSONB,

  -- User actions
  was_worn BOOLEAN DEFAULT FALSE,
  worn_at DATE,
  user_rating INTEGER,
  user_feedback TEXT,
  saved_as_favorite BOOLEAN DEFAULT FALSE,

  -- Generation metadata
  generation_time_ms INTEGER,
  model_version TEXT
);

CREATE INDEX IF NOT EXISTS idx_outfits_user_id ON outfits (user_id);
CREATE INDEX IF NOT EXISTS idx_outfits_created_at ON outfits (created_at DESC);

-- 4. STYLE SURVEY TABLE
CREATE TABLE IF NOT EXISTS style_survey (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),

  knows_color_theory BOOLEAN DEFAULT FALSE,
  describes_own_style BOOLEAN DEFAULT FALSE,
  shops_by_trend BOOLEAN DEFAULT FALSE,
  fashion_knowledge_level TEXT DEFAULT 'intermediate',

  selected_style_ids TEXT[] DEFAULT '{}',
  expanded_style_ids TEXT[] DEFAULT '{}',
  rejected_style_ids TEXT[] DEFAULT '{}',

  derived_style_vector JSONB DEFAULT '{}'::jsonb,
  boldness_score NUMERIC(3,1) DEFAULT 5.0,
  formality_preference NUMERIC(3,1) DEFAULT 5.0,
  pattern_tolerance NUMERIC(3,1) DEFAULT 5.0,
  color_bravery NUMERIC(3,1) DEFAULT 5.0
);

-- 5. SKIN TONES REFERENCE TABLE
CREATE TABLE IF NOT EXISTS skin_tones (
  code TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  hex_value CHAR(7) NOT NULL,
  fitzpatrick_scale INTEGER NOT NULL,
  undertone TEXT NOT NULL,
  season TEXT NOT NULL,
  complementary_colors TEXT[] DEFAULT '{}',
  avoid_colors TEXT[] DEFAULT '{}'
);

-- Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE garments ENABLE ROW LEVEL SECURITY;
ALTER TABLE outfits ENABLE ROW LEVEL SECURITY;
ALTER TABLE style_survey ENABLE ROW LEVEL SECURITY;
ALTER TABLE skin_tones ENABLE ROW LEVEL SECURITY;

-- Allow public read for skin tones
CREATE POLICY "Public skin tones access" ON skin_tones FOR SELECT USING (true);

-- User-scoped policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own garments" ON garments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own garments" ON garments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own garments" ON garments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own garments" ON garments FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own outfits" ON outfits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own outfits" ON outfits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own outfits" ON outfits FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own survey" ON style_survey FOR ALL USING (auth.uid() = user_id);

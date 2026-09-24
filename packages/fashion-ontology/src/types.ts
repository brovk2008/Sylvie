export type GarmentClass =
  | 'top'
  | 'bottom'
  | 'one_piece'
  | 'outerwear'
  | 'footwear'
  | 'accessory';

export type FitType =
  | 'ultra_slim'
  | 'slim'
  | 'fitted'
  | 'regular'
  | 'relaxed'
  | 'loose'
  | 'oversized'
  | 'boxy'
  | 'draped';

export type SleeveType =
  | 'sleeveless'
  | 'cap'
  | 'short'
  | 'elbow'
  | 'three_quarter'
  | 'long';

export type NecklineType =
  | 'crew'
  | 'v_neck'
  | 'scoop'
  | 'boat'
  | 'square'
  | 'turtleneck'
  | 'hooded'
  | 'mandarin'
  | 'collar'
  | 'polo'
  | 'henley';

export type ClosureType =
  | 'buttons'
  | 'zipper'
  | 'pullover'
  | 'drawstring'
  | 'wrap'
  | 'tie'
  | 'snap';

export type WaistRiseType = 'low' | 'mid' | 'high' | 'ultra_high';

export type SilhouetteType =
  | 'straight'
  | 'tapered'
  | 'flared'
  | 'boxy'
  | 'relaxed'
  | 'fitted'
  | 'wide_leg'
  | 'cargo';

export type ColorTemperature = 'warm' | 'cool' | 'neutral';

export type PatternType =
  | 'solid'
  | 'horizontal_stripe'
  | 'vertical_stripe'
  | 'plaid'
  | 'check'
  | 'floral'
  | 'geometric'
  | 'graphic'
  | 'camo'
  | 'tie_dye'
  | 'polka_dot';

export type TextureType =
  | 'smooth'
  | 'ribbed'
  | 'knit'
  | 'rough'
  | 'fuzzy'
  | 'crinkled'
  | 'quilted'
  | 'waffle';

export type CleanStatus = 'clean' | 'dirty' | 'washing' | 'drying' | 'ironed';

export type LayeringRole = 'base' | 'mid' | 'outer' | 'standalone';

export type OutfitRole = 'foundation' | 'statement' | 'accent' | 'neutralizer';

export interface HSLColor {
  h: number; // 0 - 360
  s: number; // 0 - 100
  l: number; // 0 - 100
}

export interface GarmentAttributes {
  garment_class: GarmentClass;
  category: string;
  subcategory?: string;
  custom_name?: string;
  brand?: string;

  // Physical
  fit: FitType;
  length_torso?: string;
  sleeve?: SleeveType;
  neckline?: NecklineType;
  closure?: ClosureType;
  has_pockets?: boolean;
  waist_rise?: WaistRiseType;
  silhouette?: SilhouetteType;

  // Visual
  dominant_color_hex: string;
  dominant_color_name: string;
  dominant_hsl: HSLColor;
  secondary_color_hex?: string;
  accent_color_hex?: string;
  color_temperature: ColorTemperature;
  pattern: PatternType;
  pattern_scale?: 'micro' | 'small' | 'medium' | 'large';
  texture: TextureType;
  finish?: 'matte' | 'gloss' | 'satin' | 'washed' | 'distressed';

  // Material
  primary_fiber: string;
  weight?: 'lightweight' | 'medium' | 'heavy';
  stretch?: 'none' | 'low' | 'medium' | 'high';
  opacity?: 'opaque' | 'semi_sheer' | 'sheer';
  water_resistant?: boolean;

  // Semantic
  formality_score: number; // 0.0 - 10.0
  aesthetic_weights: Record<string, number>;
  occasions: string[];
  seasons: string[];
  weather_temp_range_c: [number, number];
  cultural_style?: string;
  layering_role: LayeringRole;
  outfit_role: OutfitRole;
  clo_value: number;

  // Confidence flags from AI
  ai_confidence?: Record<string, number>;
}

export interface Garment extends GarmentAttributes {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;

  // Photos
  photo_front: string;
  photo_back?: string;
  photo_left?: string;
  photo_right?: string;
  photo_thumb?: string;

  // User state
  clean_status: CleanStatus;
  is_available: boolean;
  is_active: boolean;
  favorite: boolean;
  never_wear: boolean;
  user_rating?: number;
  user_confirmed: boolean;
  user_custom_tags: string[];

  // Wear tracking
  wear_count: number;
  last_worn_at?: string;
  days_since_worn?: number;

  // Commercial
  purchase_price?: number;
  purchase_currency?: string;
  purchased_at?: string;
  cost_per_wear?: number;

  embedding_id?: string;
}

export interface ColorHarmonyResult {
  harmony_type: 'analogous' | 'complementary' | 'monochromatic' | 'triadic' | 'neutral_accent';
  score: number; // 0 - 100
  dominant_ratio: { primary_hex: string; pct: number };
  secondary_ratio?: { secondary_hex: string; pct: number };
  accent_ratio?: { accent_hex: string; pct: number };
  description: string;
}

export interface OutfitLayer {
  layer_type: 'base' | 'mid' | 'outer' | 'bottom' | 'footwear' | 'accessory';
  garment: Garment;
}

export interface Outfit {
  id: string;
  user_id: string;
  created_at: string;
  garment_ids: string[];
  layers: OutfitLayer[];
  occasion: string;
  context_query?: string;
  weather_at_gen?: WeatherData;
  total_clo: number;
  color_harmony: ColorHarmonyResult;
  formality_score: number;
  styling_notes: string;
  was_worn?: boolean;
  worn_at?: string;
  user_rating?: number;
  saved_as_favorite?: boolean;
}

export interface UserProfile {
  id: string;
  created_at: string;
  updated_at: string;
  display_name: string;
  avatar_url?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'nonbinary' | 'prefer_not';

  // Measurements
  height_cm?: number;
  weight_kg?: number;
  bmi?: number;
  body_type?: 'ectomorph' | 'mesomorph' | 'endomorph' | 'hourglass' | 'rectangle' | 'triangle' | 'inverted_triangle';
  chest_cm?: number;
  waist_cm?: number;
  hips_cm?: number;
  shoulder_cm?: number;
  inseam_cm?: number;
  shoe_size_eu?: number;

  // Appearance
  skin_tone_code?: string;
  skin_undertone?: 'warm' | 'cool' | 'neutral' | 'olive';
  hair_color?: string;
  hair_length?: 'bald' | 'short' | 'medium' | 'long';
  eye_color?: string;

  // Photos
  face_photo_front?: string;
  face_photo_left?: string;
  face_photo_right?: string;
  face_photo_back?: string;
  body_photo_front?: string;
  body_photo_side?: string;

  // Style Profile
  primary_style_vector: Record<string, number>;
  style_archetypes: string[];
  preferred_colors: string[];
  disliked_colors: string[];
  preferred_occasions: string[];
  formality_range: [number, number];

  fashion_knowledge_level: 'beginner' | 'intermediate' | 'advanced';
  survey_completed_at?: string;
  profile_completion_pct: number;
  onboarding_done: boolean;
  almirah_photo_count: number;

  city?: string;
  country_code?: string;
  latitude?: number;
  longitude?: number;
}

export interface StyleSurveyResult {
  id?: string;
  user_id: string;
  completed_at: string;
  knows_color_theory: boolean;
  describes_own_style: boolean;
  shops_by_trend: boolean;
  fashion_knowledge_level: 'beginner' | 'intermediate' | 'advanced';
  selected_style_ids: string[];
  expanded_style_ids: string[];
  rejected_style_ids: string[];
  derived_style_vector: Record<string, number>;
  boldness_score: number;
  formality_preference: number;
  pattern_tolerance: number;
  color_bravery: number;
}

export interface SkinTone {
  code: string;
  name: string;
  hex: string;
  fitzpatrick: number;
  undertone: 'warm' | 'cool' | 'neutral' | 'olive';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  complementary_colors: string[];
  avoid_colors: string[];
}

export interface WeatherData {
  temp_c: number;
  feels_like_c: number;
  humidity_pct: number;
  wind_kmh: number;
  rain_probability: number;
  description: string;
  recommended_clo: number;
  city?: string;
}

export interface CompatibilityCheckResult {
  score: number;
  color_score: number;
  style_score: number;
  formality_score: number;
  clo_score: number;
  issues: string[];
  suggestions: string[];
}

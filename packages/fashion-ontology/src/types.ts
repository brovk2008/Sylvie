export type GarmentClass =
  | 'top'
  | 'bottom'
  | 'one_piece'
  | 'outerwear'
  | 'footwear'
  | 'accessory'
  | 'traditional_ethnic'
  | 'activewear'
  | 'sleepwear'
  | 'swimwear'
  | 'underwear';

export type TopSubcategory =
  | 't_shirt'
  | 'polo'
  | 'shirt'
  | 'blouse'
  | 'tank_top'
  | 'camisole'
  | 'crop_top'
  | 'tube_top'
  | 'halter_top'
  | 'bodysuit'
  | 'sweater'
  | 'cardigan'
  | 'hoodie'
  | 'sweatshirt'
  | 'tunic'
  | 'kurta';

export type BottomSubcategory =
  | 'jeans'
  | 'trousers'
  | 'chinos'
  | 'cargo_pants'
  | 'joggers'
  | 'sweatpants'
  | 'leggings'
  | 'shorts'
  | 'skirt'
  | 'dhoti'
  | 'lungi'
  | 'palazzo'
  | 'culottes';

export type OnePieceSubcategory =
  | 'dress'
  | 'jumpsuit'
  | 'romper'
  | 'overalls'
  | 'kurta_pajama_set'
  | 'saree'
  | 'lehenga'
  | 'anarkali'
  | 'sherwani';

export type OuterwearSubcategory =
  | 'jacket'
  | 'coat'
  | 'blazer'
  | 'trench_coat'
  | 'bomber'
  | 'denim_jacket'
  | 'puffer'
  | 'nehru_jacket';

export type FootwearSubcategory =
  | 'sneakers'
  | 'boots'
  | 'loafers'
  | 'sandals'
  | 'oxfords'
  | 'mules'
  | 'derbies'
  | 'chelsea_boots'
  | 'juttis'
  | 'kolhapuris';

export type FitType =
  | 'ultra_slim'
  | 'slim'
  | 'fitted'
  | 'regular'
  | 'relaxed'
  | 'loose'
  | 'oversized'
  | 'boxy'
  | 'tailored'
  | 'athletic'
  | 'compression'
  | 'draped'
  | 'bodycon'
  | 'a_line';

export type SleeveType =
  | 'sleeveless'
  | 'cap'
  | 'short'
  | 'elbow'
  | 'three_quarter'
  | 'long'
  | 'extra_long';

export type NecklineType =
  | 'crew'
  | 'v_neck'
  | 'scoop'
  | 'boat'
  | 'square'
  | 'sweetheart'
  | 'halter'
  | 'hooded'
  | 'turtleneck'
  | 'mock_neck'
  | 'mandarin'
  | 'collar'
  | 'polo'
  | 'spread_collar'
  | 'button_down'
  | 'peter_pan'
  | 'notched_lapel'
  | 'shawl_collar'
  | 'henley';

export type ClosureType =
  | 'buttons'
  | 'zipper'
  | 'snaps'
  | 'hooks'
  | 'velcro'
  | 'drawstring'
  | 'tie'
  | 'wrap'
  | 'pullover'
  | 'open_front'
  | 'half_zip'
  | 'full_zip';

export type WaistRiseType = 'low' | 'mid' | 'high' | 'ultra_high';

export type SilhouetteType =
  | 'straight'
  | 'tapered'
  | 'flared'
  | 'boxy'
  | 'relaxed'
  | 'fitted'
  | 'wide_leg'
  | 'cargo'
  | 'skinny'
  | 'bootcut';

export type ColorTemperature = 'warm' | 'cool' | 'neutral';

export type PatternType =
  | 'solid'
  | 'horizontal_stripe'
  | 'vertical_stripe'
  | 'diagonal_stripe'
  | 'plaid'
  | 'check'
  | 'gingham'
  | 'tartan'
  | 'houndstooth'
  | 'polka_dot'
  | 'floral'
  | 'paisley'
  | 'geometric'
  | 'abstract'
  | 'animal_print'
  | 'camo'
  | 'tie_dye'
  | 'ombre'
  | 'argyle'
  | 'damask'
  | 'tropical'
  | 'graphic'
  | 'logo'
  | 'typography';

export type TextureType =
  | 'smooth'
  | 'ribbed'
  | 'knit'
  | 'woven'
  | 'rough'
  | 'fuzzy'
  | 'furry'
  | 'nubby'
  | 'crinkled'
  | 'pleated'
  | 'quilted'
  | 'embossed'
  | 'shiny'
  | 'matte'
  | 'glossy'
  | 'metallic'
  | 'leather_like'
  | 'suede_like'
  | 'waffle';

export type FinishType =
  | 'matte'
  | 'gloss'
  | 'satin'
  | 'washed'
  | 'distressed'
  | 'faded'
  | 'raw'
  | 'coated'
  | 'waxed'
  | 'brushed'
  | 'polished'
  | 'stonewashed'
  | 'acid_washed';

export type CleanStatus =
  | 'clean'
  | 'dirty'
  | 'needs_washing'
  | 'drying'
  | 'ironed'
  | 'wrinkled'
  | 'damaged'
  | 'repair_needed'
  | 'missing'
  | 'packed'
  | 'stored'
  | 'available'
  | 'unavailable';

export type LayeringRole =
  | 'base'
  | 'mid'
  | 'outer'
  | 'standalone'
  | 'layerable'
  | 'non_layerable';

export type OutfitRole =
  | 'foundation'
  | 'statement'
  | 'accent'
  | 'neutralizer'
  | 'focal_point'
  | 'supporting'
  | 'transition';

export type SeasonType =
  | 'spring'
  | 'summer'
  | 'monsoon'
  | 'autumn'
  | 'winter'
  | 'all_season'
  | 'hot_dry'
  | 'hot_humid'
  | 'mild'
  | 'cool'
  | 'cold';

export type ObservabilityLevel =
  | 'level_a' // Directly observable: Color, Pattern, Sleeve, Garment Category, Logo, Length
  | 'level_b' // Visually inferable: Material, Fit, Texture, Formality, Silhouette, Season suitability
  | 'level_c' // Context-dependent: Occasion, Aesthetic, Style, Cultural meaning, Weather suitability
  | 'level_d'; // User-dependent: Comfort, Confidence, Favorite, Personal taste, Emotional association

export type ConfidenceActionTier =
  | 'auto_accept'        // Confidence > 0.90
  | 'confirm_with_user'  // Confidence 0.60 - 0.90
  | 'ask_user';          // Confidence < 0.60

export interface HSLColor {
  h: number; // 0 - 360
  s: number; // 0 - 100
  l: number; // 0 - 100
}

export interface ColorDistribution {
  rule: '60_30_10' | 'monochrome' | 'bicolor' | 'multicolor';
  dominant_area_pct: number;
  secondary_area_pct?: number;
  accent_area_pct?: number;
}

export interface PatternCharacteristics {
  scale: 'micro' | 'small' | 'medium' | 'large';
  density: 'low' | 'medium' | 'high';
  contrast: 'low' | 'medium' | 'high';
  direction?: 'horizontal' | 'vertical' | 'diagonal' | 'multidirectional';
}

export interface BodyProportionEffect {
  volume: 'fitted' | 'regular' | 'oversized_volume';
  emphasis:
    | 'vertical_emphasis'
    | 'horizontal_emphasis'
    | 'shoulder_emphasis'
    | 'waist_emphasis'
    | 'leg_lengthening'
    | 'torso_lengthening'
    | 'balanced';
  structure: 'structured' | 'draped' | 'relaxed';
}

export interface GarmentAttributes {
  garment_class: GarmentClass;
  category: string;
  subcategory?: string;
  custom_name?: string;
  brand?: string;

  // 03-05. Structural, Fit, Dimensions
  fit: FitType;
  length_torso?: string;
  sleeve?: SleeveType;
  neckline?: NecklineType;
  closure?: ClosureType;
  has_pockets?: boolean;
  waist_rise?: WaistRiseType;
  silhouette?: SilhouetteType;

  // 10-15. Color, Distribution, Pattern, Texture, Finish
  dominant_color_hex: string;
  dominant_color_name: string;
  dominant_hsl: HSLColor;
  secondary_color_hex?: string;
  accent_color_hex?: string;
  color_temperature: ColorTemperature;
  color_distribution?: ColorDistribution;
  pattern: PatternType;
  pattern_meta?: PatternCharacteristics;
  texture: TextureType;
  finish?: FinishType;

  // 08-09. Material & Properties
  primary_fiber: string;
  fabric_construction?: string;
  weight?: 'lightweight' | 'medium' | 'heavy';
  stretch?: 'none' | 'low' | 'medium' | 'high';
  breathability?: 'high' | 'moderate' | 'low';
  opacity?: 'opaque' | 'semi_sheer' | 'sheer';
  water_resistant?: boolean;
  wind_resistant?: boolean;

  // 17-27. Semantic & Contextual
  formality_score: number; // 0.0 - 10.0 continuous scale
  aesthetic_weights: Record<string, number>;
  occasions: string[];
  seasons: SeasonType[];
  weather_temp_range_c: [number, number];
  cultural_style?: string;
  cultural_formality?: string;
  layering_role: LayeringRole;
  outfit_role: OutfitRole;
  clo_value: number;
  body_effect?: BodyProportionEffect;

  // 28. Color Psychology & Perception probabilities
  color_psychology?: Record<string, number>;

  // 35-37. AI Metadata & Observability Confidence
  ai_confidence?: Record<string, number>;
  observability_levels?: Record<string, ObservabilityLevel>;
  action_tiers?: Record<string, ConfidenceActionTier>;
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

  // 32. Wear tracking & Cost-Per-Wear
  wear_count: number;
  last_worn_at?: string;
  days_since_worn?: number;

  // 33. Commercial Data
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

export interface WardrobeGraphScore {
  compatibilityScore: number; // 0 - 100 (color, silhouette, pattern compatibility)
  weatherScore: number;       // 0 - 100 (CLO thermal match)
  occasionScore: number;      // 0 - 100 (formality & dress code match)
  preferenceScore: number;    // 0 - 100 (user liked aesthetics & favorite pieces)
  rotationScore: number;      // 0 - 100 (boosts pieces unworn >14 days)
  totalScore: number;         // Weighted aggregate match score
}

export interface Outfit {
  id: string;
  user_id: string;
  created_at: string;
  garment_ids: string[];
  layers: OutfitLayer[];
  occasion: string;
  context_query?: string; // "I'M GOING HERE" dynamic context (e.g. "College presentation", "Date ❤️")
  weather_at_gen?: WeatherData;
  total_clo: number;
  color_harmony: ColorHarmonyResult;
  formality_score: number;
  styling_notes: string;
  wardrobe_graph_score?: WardrobeGraphScore;
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

export interface WardrobeAnalytics {
  totalItems: number;
  colorDistribution: { name: string; hex: string; percentage: number }[];
  topsToBottomsRatio: { tops: number; bottoms: number; ratio: string };
  unwornOver30Days: number;
  neutralityPercentage: number;
  avgCostPerWear: number;
  totalInvestment: number;
}

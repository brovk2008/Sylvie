export interface StyleCardMeta {
  id: string;
  name: string;
  tagline: string;
  category: string;
  formalityDefault: number;
  palette: string[];
}

export const INITIAL_STYLE_CARDS: StyleCardMeta[] = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    tagline: 'Clean neutrals & structured silhouettes',
    category: 'Modern',
    formalityDefault: 5.5,
    palette: ['#FFFFFF', '#E0E0E0', '#333333', '#111111'],
  },
  {
    id: 'streetwear',
    name: 'Streetwear',
    tagline: 'Oversized, graphic statements & sneakers',
    category: 'Urban',
    formalityDefault: 3.0,
    palette: ['#E83B2E', '#1C0A08', '#F56A60', '#FDF5E6'],
  },
  {
    id: 'old_money',
    name: 'Old Money',
    tagline: 'Quiet luxury, cashmere & tailored heritage',
    category: 'Classic',
    formalityDefault: 7.5,
    palette: ['#0A2540', '#F7E8D0', '#3D3935', '#C9A826'],
  },
  {
    id: 'bohemian',
    name: 'Bohemian',
    tagline: 'Flowy fabrics, artisanal patterns & earth tones',
    category: 'Free Spirit',
    formalityDefault: 3.5,
    palette: ['#D35400', '#C9A826', '#8B5A2B', '#FDF5E6'],
  },
  {
    id: 'preppy',
    name: 'Preppy',
    tagline: 'Oxford collars, cable-knits & varsity poise',
    category: 'Collegiate',
    formalityDefault: 6.0,
    palette: ['#1A365D', '#9E1F15', '#F7E8D0', '#2E7D32'],
  },
  {
    id: 'dark_academia',
    name: 'Dark Academia',
    tagline: 'Houndstooth, trench coats & candlelit libraries',
    category: 'Vintage',
    formalityDefault: 6.8,
    palette: ['#280706', '#4A1C18', '#8B5A2B', '#C9A826'],
  },
  {
    id: 'techwear',
    name: 'Techwear',
    tagline: 'Waterproof shells, modular strapping & midnight black',
    category: 'Futurism',
    formalityDefault: 4.0,
    palette: ['#0E0504', '#1F0C0A', '#333333', '#FF6B47'],
  },
  {
    id: 'cottagecore',
    name: 'Cottagecore',
    tagline: 'Soft linens, puff sleeves & garden flora',
    category: 'Romantic',
    formalityDefault: 3.5,
    palette: ['#FDF5E6', '#FCC4BF', '#7A9A7B', '#F7E8D0'],
  },
  {
    id: 'y2k',
    name: 'Y2K',
    tagline: 'Baby tees, metallic sheens & futuristic nostalgia',
    category: 'Retro',
    formalityDefault: 2.8,
    palette: ['#F56A60', '#C9A826', '#87CEEB', '#E83B2E'],
  },
  {
    id: 'athleisure',
    name: 'Athleisure',
    tagline: 'Performance nylon meets effortless weekend styling',
    category: 'Sport',
    formalityDefault: 2.0,
    palette: ['#1C0A08', '#7B1810', '#DDF2D1', '#FFFFFF'],
  },
  {
    id: 'smart_casual',
    name: 'Smart Casual',
    tagline: 'Unstructured blazers, knit polos & sharp chinos',
    category: 'Elevated',
    formalityDefault: 6.5,
    palette: ['#2C3E50', '#7F8C8D', '#ECF0F1', '#D35400'],
  },
  {
    id: 'avant_garde',
    name: 'Avant-Garde',
    tagline: 'Asymmetric cuts, sculptural folds & daring proportions',
    category: 'High Fashion',
    formalityDefault: 7.0,
    palette: ['#0E0504', '#E83B2E', '#FFFFFF', '#4A0E0A'],
  },
  {
    id: 'gorpcore',
    name: 'Gorpcore',
    tagline: 'Trail jackets, fleece vests & technical utilitarianism',
    category: 'Outdoor',
    formalityDefault: 2.5,
    palette: ['#556B2F', '#8B4513', '#FF6B47', '#1C0A08'],
  },
  {
    id: 'indian_ethnic',
    name: 'Indian Ethnic',
    tagline: 'Handloom kurtas, bandhgalas & regal silhouettes',
    category: 'Heritage',
    formalityDefault: 7.2,
    palette: ['#C0271B', '#C9A826', '#1A365D', '#FDF5E6'],
  },
  {
    id: 'maximalist',
    name: 'Maximalist',
    tagline: 'Print-clashing, stacked accessories & saturated joy',
    category: 'Eclectic',
    formalityDefault: 4.5,
    palette: ['#E83B2E', '#C9A826', '#8E44AD', '#27AE60'],
  },
];

export const STYLE_EXPANSION_MAP: Record<string, string[]> = {
  minimalist: ['old_money', 'normcore', 'quiet_luxury', 'preppy', 'smart_casual'],
  streetwear: ['techwear', 'gorpcore', 'y2k', 'athleisure', 'avant_garde'],
  old_money: ['quiet_luxury', 'preppy', 'dark_academia', 'minimalist', 'smart_casual'],
  bohemian: ['cottagecore', 'vintage', 'maximalist', 'indie', 'aesthetic_tumblr'],
  preppy: ['smart_casual', 'old_money', 'light_academia', 'classic', 'country'],
  dark_academia: ['light_academia', 'gothic', 'vintage', 'grunge', 'old_money'],
  techwear: ['gorpcore', 'streetwear', 'cyberpunk', 'military', 'utility'],
  cottagecore: ['bohemian', 'vintage', 'aesthetic_tumblr', 'romantic', 'indie'],
  y2k: ['party_girl', '90s_grunge', 'emo', 'pop_punk', 'aesthetic'],
  athleisure: ['sporty', 'streetwear', 'normcore', 'casual_cool', 'gym_wear'],
  indian_ethnic: ['festive_indian', 'fusion', 'traditional', 'bridal', 'indo_western'],
  smart_casual: ['old_money', 'minimalist', 'preppy', 'elevated_basics', 'tailored'],
  avant_garde: ['techwear', 'dark_academia', 'maximalist', 'high_fashion'],
  gorpcore: ['techwear', 'athleisure', 'streetwear', 'utility'],
  maximalist: ['bohemian', 'y2k', 'avant_garde', 'streetwear'],
};

export const OBSERVABILITY_CLASSIFICATION = {
  level_a: [
    { key: 'dominant_color_hex', name: 'Dominant Color & HSL', desc: 'Direct pixel extraction in LAB/HSL space' },
    { key: 'pattern', name: 'Pattern Type', desc: 'Classification of stripes, plaid, solid, floral' },
    { key: 'sleeve', name: 'Sleeve Length', desc: 'Short, long, sleeveless geometric detection' },
    { key: 'length_torso', name: 'Hem Length', desc: 'Relative proportion against body landmark' },
    { key: 'garment_class', name: 'Garment Class', desc: 'Top, bottom, footwear, outerwear segmentation' },
    { key: 'closure', name: 'Closure Type', desc: 'Button, zipper, pullover visual detection' },
  ],
  level_b: [
    { key: 'primary_fiber', name: 'Fabric / Fiber', desc: 'Inferable via texture, sheen, drape folds' },
    { key: 'fit', name: 'Fit Silhouette', desc: 'Oversized, slim, boxy contour estimation' },
    { key: 'texture', name: 'Surface Texture', desc: 'Ribbed, knit, denim twill, smooth finish' },
    { key: 'formality_score', name: 'Formality (0-10)', desc: 'Structural rating derived from garment type & cut' },
    { key: 'clo_value', name: 'Thermal CLO', desc: 'Calculated insulation rating from fiber and thickness' },
  ],
  level_c: [
    { key: 'occasions', name: 'Occasion Mapping', desc: 'Context match (College, Date, Hackathon, Party)' },
    { key: 'seasons', name: 'Climate Suitability', desc: 'Hot-dry, monsoon, cool winter alignment' },
    { key: 'aesthetic_weights', name: 'Aesthetic Vector', desc: 'Probabilistic style affinity (Streetwear, Old Money)' },
    { key: 'layering_role', name: 'Layering Stack', desc: 'Base, mid, or outer layer role' },
    { key: 'outfit_role', name: 'Outfit Semantic Role', desc: 'Foundation (60%), Statement (30%), Accent (10%)' },
  ],
  level_d: [
    { key: 'user_rating', name: 'Personal Sentiment', desc: 'User affinity and confidence rating' },
    { key: 'favorite', name: 'Wardrobe Favorites', desc: 'Priority inclusion in shuffle algorithm' },
    { key: 'clean_status', name: 'Laundry State', desc: 'Clean vs in laundry queue filtering' },
    { key: 'cost_per_wear', name: 'Cost-Per-Wear', desc: 'Purchase price divided by logged wear count' },
  ],
};

export const CONFIDENCE_THRESHOLDS = {
  AUTO_ACCEPT: 0.90,
  CONFIRM_REQUIRED: 0.60,
  ASK_USER: 0.60,
};

export const CONTEXT_OCCASIONS_MAP: Record<string, {
  targetFormality: number;
  formalityRange: [number, number];
  preferredAesthetics: string[];
  vibeText: string;
}> = {
  'College Presentation': {
    targetFormality: 7.0,
    formalityRange: [6.0, 8.5],
    preferredAesthetics: ['smart_casual', 'preppy', 'minimalist'],
    vibeText: 'Structured, confident, and authoritative without feeling stuffy.',
  },
  'First Date 💕': {
    targetFormality: 5.5,
    formalityRange: [4.5, 7.0],
    preferredAesthetics: ['old_money', 'smart_casual', 'minimalist'],
    vibeText: 'Effortlessly polished, tactile textures, and subtle charm.',
  },
  'Hackathon ⚡': {
    targetFormality: 2.5,
    formalityRange: [1.5, 4.0],
    preferredAesthetics: ['streetwear', 'techwear', 'athleisure'],
    vibeText: 'Maximum comfort, breathable fabrics, and high mobility for late-night sprints.',
  },
  'Party Night 🌙': {
    targetFormality: 6.0,
    formalityRange: [4.5, 8.0],
    preferredAesthetics: ['streetwear', 'avant_garde', 'y2k'],
    vibeText: 'High visual impact, rich contrast, and sleek silhouettes.',
  },
  'Casual Hangout ☕': {
    targetFormality: 3.5,
    formalityRange: [2.5, 5.0],
    preferredAesthetics: ['minimalist', 'streetwear', 'bohemian'],
    vibeText: 'Relaxed proportions, breathable cotton, and everyday ease.',
  },
};

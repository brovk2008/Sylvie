import { SkinTone } from './types';

export const CHILI_THEME = {
  colors: {
    chili: {
      50: '#FEF2F1',
      100: '#FDDFDC',
      200: '#FCC4BF',
      300: '#F99892',
      400: '#F56A60',
      500: '#E83B2E', // Primary Brand
      600: '#C0271B',
      700: '#9E1F15',
      800: '#7B1810',
      900: '#4A0E0A',
      950: '#280706',
    },
    spice: {
      cream: '#FDF5E6',
      parchment: '#F7E8D0',
      paprika: '#D35400',
      terracotta: '#CB4335',
      gold: '#C9A826',
      charcoal: '#1C0A08',
      ember: '#FF6B47',
    },
    dark: {
      bg: '#0E0504',
      surface: '#1F0C0A',
      elevated: '#2E1410',
      border: '#4A1C18',
      muted: '#B87E78',
    },
    semantic: {
      success: '#2E7D32',
      warning: '#E65100',
      error: '#B71C1C',
      info: '#1565C0',
    },
  },
  typography: {
    display: 'Playfair Display, Georgia, serif',
    body: 'DM Sans, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
    accent: 'Cormorant Garamond, serif',
  },
  motion: {
    fast: 150,
    normal: 300,
    slow: 500,
    cinematic: 800,
    logo: 1800,
  },
};

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
  avant_garde: ['techwear', 'streetwear', 'high_fashion', 'deconstructed', 'monochrome'],
  gorpcore: ['techwear', 'streetwear', 'utilitarian', 'workwear', 'hikercore'],
  maximalist: ['bohemian', 'y2k', 'dopamine_dressing', 'eclectic', 'art_school'],
};

export const CLO_REFERENCE_TABLE: Record<string, number> = {
  underwear: 0.03,
  bra: 0.01,
  tshirt_short: 0.08,
  tshirt_long: 0.20,
  shirt_formal: 0.25,
  knit_sweater_light: 0.26,
  sweater_heavy: 0.36,
  jeans_light: 0.20,
  jeans_heavy: 0.28,
  trousers_formal: 0.25,
  shorts: 0.08,
  jacket_light: 0.25,
  jacket_denim: 0.30,
  blazer: 0.35,
  hoodie: 0.34,
  coat_wool: 0.55,
  jacket_down: 0.60,
  parka: 0.70,
  kurta_cotton: 0.15,
  kurta_silk: 0.22,
  socks: 0.02,
  shoes_sneakers: 0.04,
  boots: 0.06,
  cap_hat: 0.02,
};

export function getTargetCLO(tempC: number): number {
  if (tempC > 35) return 0.3;
  if (tempC >= 28) return 0.5;
  if (tempC >= 22) return 0.7;
  if (tempC >= 15) return 1.0;
  if (tempC >= 8) return 1.5;
  if (tempC >= 0) return 2.0;
  return 2.5;
}

export const OCCASIONS_LIST = [
  'College',
  'Office / Work',
  'First Date 💕',
  'Night Out / Party',
  'Weekend Casual',
  'Gym & Training',
  'Festival / Celebration',
  'Airport / Travel',
  'Wedding & Reception',
  'Formal Presentation',
  'Brunch with Friends',
];

export const BODY_TYPES = [
  { id: 'ectomorph', name: 'Slim / Ectomorph', desc: 'Lean build with fast metabolism' },
  { id: 'mesomorph', name: 'Athletic / Mesomorph', desc: 'Muscular, well-defined shoulders and waist' },
  { id: 'endomorph', name: 'Full / Endomorph', desc: 'Broader frame with higher muscle & curve density' },
  { id: 'hourglass', name: 'Hourglass', desc: 'Balanced shoulders and hips with narrow waist' },
  { id: 'rectangle', name: 'Athletic Rectangle', desc: 'Uniform proportions across shoulders, chest, and waist' },
  { id: 'inverted_triangle', name: 'V-Taper / Broad Shoulders', desc: 'Shoulders significantly wider than hips' },
];

export const SKIN_TONES_40: SkinTone[] = [
  // Fitzpatrick I - II (Fair to Light)
  { code: 'ST01', name: 'Porcelain Ivory', hex: '#FAF0E6', fitzpatrick: 1, undertone: 'cool', season: 'winter', complementary_colors: ['#1C3B57', '#800020', '#104E3B'], avoid_colors: ['#F5DEB3', '#D2B48C'] },
  { code: 'ST02', name: 'Alabaster Rose', hex: '#F9EBE1', fitzpatrick: 1, undertone: 'cool', season: 'summer', complementary_colors: ['#4682B4', '#D87093', '#2E8B57'], avoid_colors: ['#FFA500', '#FFFF00'] },
  { code: 'ST03', name: 'Warm Bisque', hex: '#F5E6D3', fitzpatrick: 1, undertone: 'warm', season: 'spring', complementary_colors: ['#FF7F50', '#2E8B57', '#8B4513'], avoid_colors: ['#A9A9A9', '#708090'] },
  { code: 'ST04', name: 'Nordic Cream', hex: '#F7ECD8', fitzpatrick: 1, undertone: 'neutral', season: 'spring', complementary_colors: ['#2E4057', '#C0392B', '#27AE60'], avoid_colors: ['#E6E6FA'] },
  { code: 'ST05', name: 'Fair Peach', hex: '#F3DEC9', fitzpatrick: 2, undertone: 'warm', season: 'spring', complementary_colors: ['#D35400', '#2C3E50', '#16A085'], avoid_colors: ['#7F8C8D'] },
  { code: 'ST06', name: 'Pale Almond', hex: '#EED7BE', fitzpatrick: 2, undertone: 'neutral', season: 'autumn', complementary_colors: ['#8E44AD', '#2980B9', '#D35400'], avoid_colors: ['#BDC3C7'] },
  { code: 'ST07', name: 'Light Beige', hex: '#ECD0B5', fitzpatrick: 2, undertone: 'cool', season: 'summer', complementary_colors: ['#34495E', '#C0392B', '#16A085'], avoid_colors: ['#F39C12'] },
  { code: 'ST08', name: 'Soft Honey', hex: '#EAC8A7', fitzpatrick: 2, undertone: 'warm', season: 'autumn', complementary_colors: ['#8B0000', '#006400', '#191970'], avoid_colors: ['#F0E68C'] },
  { code: 'ST09', name: 'Fair Olive', hex: '#E4C9A8', fitzpatrick: 2, undertone: 'olive', season: 'autumn', complementary_colors: ['#4B0082', '#800000', '#000080'], avoid_colors: ['#ADFF2F'] },
  { code: 'ST10', name: 'Golden Cream', hex: '#E5C49E', fitzpatrick: 2, undertone: 'warm', season: 'spring', complementary_colors: ['#B22222', '#228B22', '#4169E1'], avoid_colors: ['#D3D3D3'] },

  // Fitzpatrick III (Medium Light / South Asian Fair)
  { code: 'ST11', name: 'Warm Sand', hex: '#DFC09A', fitzpatrick: 3, undertone: 'warm', season: 'autumn', complementary_colors: ['#800020', '#1F3A3D', '#4A235A'], avoid_colors: ['#E0EEEE'] },
  { code: 'ST12', name: 'Golden Olive III', hex: '#D8B88E', fitzpatrick: 3, undertone: 'olive', season: 'autumn', complementary_colors: ['#8B0000', '#191970', '#556B2F'], avoid_colors: ['#7FFFD4'] },
  { code: 'ST13', name: 'Sandalwood', hex: '#D5B288', fitzpatrick: 3, undertone: 'warm', season: 'autumn', complementary_colors: ['#990000', '#0B5345', '#1B4F72'], avoid_colors: ['#F5F5DC'] },
  { code: 'ST14', name: 'Neutral Ochre', hex: '#D0AA7E', fitzpatrick: 3, undertone: 'neutral', season: 'spring', complementary_colors: ['#641E16', '#154360', '#1E8449'], avoid_colors: ['#D5D8DC'] },
  { code: 'ST15', name: 'Sunlit Wheat', hex: '#CCA577', fitzpatrick: 3, undertone: 'warm', season: 'spring', complementary_colors: ['#78281F', '#1B4F72', '#145A32'], avoid_colors: ['#EAEDED'] },
  { code: 'ST16', name: 'Cool Buff', hex: '#C9A075', fitzpatrick: 3, undertone: 'cool', season: 'summer', complementary_colors: ['#512E5F', '#1F618D', '#922B21'], avoid_colors: ['#F9E79F'] },
  { code: 'ST17', name: 'Gilded Amber', hex: '#C4986C', fitzpatrick: 3, undertone: 'warm', season: 'autumn', complementary_colors: ['#6E2C00', '#1A5276', '#196F3D'], avoid_colors: ['#FCF3CF'] },
  { code: 'ST18', name: 'Desi Olive', hex: '#BF9264', fitzpatrick: 3, undertone: 'olive', season: 'autumn', complementary_colors: ['#7B241C', '#0E6251', '#4A235A'], avoid_colors: ['#D1F2EB'] },

  // Fitzpatrick IV (Medium / Mediterranean / South Asian Tan)
  { code: 'ST19', name: 'Medium Tan', hex: '#B88A58', fitzpatrick: 4, undertone: 'warm', season: 'autumn', complementary_colors: ['#E83B2E', '#C9A826', '#1A365D'], avoid_colors: ['#D5DBDB'] },
  { code: 'ST20', name: 'Golden Honey Tan', hex: '#B2824F', fitzpatrick: 4, undertone: 'warm', season: 'spring', complementary_colors: ['#C0271B', '#FDF5E6', '#0B5345'], avoid_colors: ['#CCD1D1'] },
  { code: 'ST21', name: 'Warm Terracotta', hex: '#AB7946', fitzpatrick: 4, undertone: 'warm', season: 'autumn', complementary_colors: ['#1F0C0A', '#F7E8D0', '#1565C0'], avoid_colors: ['#B2BABB'] },
  { code: 'ST22', name: 'Olive Bronzed', hex: '#A3723E', fitzpatrick: 4, undertone: 'olive', season: 'autumn', complementary_colors: ['#884EA0', '#2E4053', '#B03A2E'], avoid_colors: ['#A2D9CE'] },
  { code: 'ST23', name: 'Cardamom Tan', hex: '#9E6C38', fitzpatrick: 4, undertone: 'neutral', season: 'autumn', complementary_colors: ['#E83B2E', '#FDF5E6', '#2874A6'], avoid_colors: ['#A6ACAF'] },
  { code: 'ST24', name: 'Caramel Saffron', hex: '#986532', fitzpatrick: 4, undertone: 'warm', season: 'autumn', complementary_colors: ['#922B21', '#1A5276', '#C9A826'], avoid_colors: ['#99A3A4'] },
  { code: 'ST25', name: 'Rich Copper', hex: '#935F2D', fitzpatrick: 4, undertone: 'warm', season: 'autumn', complementary_colors: ['#1C0A08', '#FDF5E6', '#1E8449'], avoid_colors: ['#BDC3C7'] },
  { code: 'ST26', name: 'Cool Chai', hex: '#8F5A29', fitzpatrick: 4, undertone: 'cool', season: 'winter', complementary_colors: ['#512E5F', '#1F618D', '#D35400'], avoid_colors: ['#85929E'] },

  // Fitzpatrick V (Deep / Rich South Asian / African-Descent Medium)
  { code: 'ST27', name: 'Chestnut Bronze', hex: '#885424', fitzpatrick: 5, undertone: 'warm', season: 'autumn', complementary_colors: ['#E83B2E', '#C9A826', '#FDF5E6'], avoid_colors: ['#5D6D7E'] },
  { code: 'ST28', name: 'Deep Olive V', hex: '#804E1F', fitzpatrick: 5, undertone: 'olive', season: 'winter', complementary_colors: ['#FF6B47', '#C9A826', '#FFFFFF'], avoid_colors: ['#424949'] },
  { code: 'ST29', name: 'Roasted Almond', hex: '#79471A', fitzpatrick: 5, undertone: 'warm', season: 'autumn', complementary_colors: ['#F56A60', '#FDF5E6', '#2E7D32'], avoid_colors: ['#34495E'] },
  { code: 'ST30', name: 'Dark Caramel', hex: '#724116', fitzpatrick: 5, undertone: 'warm', season: 'autumn', complementary_colors: ['#E83B2E', '#C9A826', '#5499C7'], avoid_colors: ['#283747'] },
  { code: 'ST31', name: 'Cacao Bean', hex: '#6C3C12', fitzpatrick: 5, undertone: 'neutral', season: 'winter', complementary_colors: ['#FDF5E6', '#E83B2E', '#C9A826'], avoid_colors: ['#1B2631'] },
  { code: 'ST32', name: 'Mahogany Dusk', hex: '#65360F', fitzpatrick: 5, undertone: 'cool', season: 'winter', complementary_colors: ['#FF6B47', '#C9A826', '#E5E8E8'], avoid_colors: ['#17202A'] },
  { code: 'ST33', name: 'Nutmeg Brown', hex: '#5E310D', fitzpatrick: 5, undertone: 'warm', season: 'autumn', complementary_colors: ['#C9A826', '#E83B2E', '#FFFFFF'], avoid_colors: ['#2C3E50'] },
  { code: 'ST34', name: 'Tamarind Deep', hex: '#572C0B', fitzpatrick: 5, undertone: 'neutral', season: 'winter', complementary_colors: ['#FDF5E6', '#FF6B47', '#58D68D'], avoid_colors: ['#212F3D'] },

  // Fitzpatrick VI (Deepest / Rich Ebony)
  { code: 'ST35', name: 'Espresso Velvet', hex: '#4F2609', fitzpatrick: 6, undertone: 'warm', season: 'winter', complementary_colors: ['#FFFFFF', '#C9A826', '#E83B2E'], avoid_colors: ['#1C1C1C'] },
  { code: 'ST36', name: 'Deep Umber', hex: '#482107', fitzpatrick: 6, undertone: 'neutral', season: 'winter', complementary_colors: ['#FDF5E6', '#FF6B47', '#F4D03F'], avoid_colors: ['#171717'] },
  { code: 'ST37', name: 'Midnight Cacao', hex: '#401C06', fitzpatrick: 6, undertone: 'cool', season: 'winter', complementary_colors: ['#FFFFFF', '#E83B2E', '#48C9B0'], avoid_colors: ['#121212'] },
  { code: 'ST38', name: 'Obsidian Rose', hex: '#391805', fitzpatrick: 6, undertone: 'cool', season: 'winter', complementary_colors: ['#C9A826', '#F56A60', '#FFFFFF'], avoid_colors: ['#0B0B0B'] },
  { code: 'ST39', name: 'Rich Ebony', hex: '#311304', fitzpatrick: 6, undertone: 'neutral', season: 'winter', complementary_colors: ['#FDF5E6', '#C9A826', '#E83B2E'], avoid_colors: ['#080808'] },
  { code: 'ST40', name: 'Pure Onyx Glow', hex: '#280E03', fitzpatrick: 6, undertone: 'cool', season: 'winter', complementary_colors: ['#FFFFFF', '#FF6B47', '#F1C40F'], avoid_colors: ['#000000'] },
];

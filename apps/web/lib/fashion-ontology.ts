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

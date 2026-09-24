import { create } from 'zustand';

export interface WardrobeGarment {
  id: string;
  category: string;
  customName: string;
  garmentClass: 'top' | 'bottom' | 'outerwear' | 'footwear' | 'accessory';
  dominantColorHex: string;
  dominantColorName: string;
  cloValue: number;
  formalityScore: number;
  fit: string;
  material: string;
  cleanStatus: 'clean' | 'dirty';
  wearCount: number;
  lastWornAt: string;
  purchasePrice: number;
  favorite: boolean;
  photoEmoji: string;
}

interface WardrobeState {
  garments: WardrobeGarment[];
  activeFilter: string;
  searchQuery: string;
  setFilter: (filter: string) => void;
  setSearch: (query: string) => void;
  addGarment: (garment: Omit<WardrobeGarment, 'id' | 'wearCount' | 'lastWornAt'>) => void;
  toggleFavorite: (id: string) => void;
  toggleCleanStatus: (id: string) => void;
  markWorn: (id: string) => void;
  removeGarment: (id: string) => void;
}

const INITIAL_GARMENTS: WardrobeGarment[] = [
  {
    id: 'g-1',
    category: 'Heavyweight Boxy Tee',
    customName: 'Everyday Charcoal Tee',
    garmentClass: 'top',
    dominantColorHex: '#1C0A08',
    dominantColorName: 'Charcoal',
    cloValue: 0.12,
    formalityScore: 3.5,
    fit: 'oversized',
    material: 'Organic 240gsm Cotton',
    cleanStatus: 'clean',
    wearCount: 14,
    lastWornAt: '2 days ago',
    purchasePrice: 1800,
    favorite: true,
    photoEmoji: '👕',
  },
  {
    id: 'g-2',
    category: 'Wide-Leg Selvedge Jeans',
    customName: 'Vintage Indigo Denim',
    garmentClass: 'bottom',
    dominantColorHex: '#1A365D',
    dominantColorName: 'Deep Navy',
    cloValue: 0.28,
    formalityScore: 4.0,
    fit: 'wide_leg',
    material: '14oz Raw Denim',
    cleanStatus: 'clean',
    wearCount: 22,
    lastWornAt: 'Yesterday',
    purchasePrice: 3400,
    favorite: true,
    photoEmoji: '👖',
  },
  {
    id: 'g-3',
    category: 'Canvas Workwear Jacket',
    customName: 'Chili Utility Overshirt',
    garmentClass: 'outerwear',
    dominantColorHex: '#E83B2E',
    dominantColorName: 'Chili Red',
    cloValue: 0.35,
    formalityScore: 5.0,
    fit: 'relaxed',
    material: 'Duck Canvas',
    cleanStatus: 'clean',
    wearCount: 8,
    lastWornAt: '5 days ago',
    purchasePrice: 4200,
    favorite: true,
    photoEmoji: '🧥',
  },
  {
    id: 'g-4',
    category: 'Minimalist Leather Sneakers',
    customName: 'Cream Low-Tops',
    garmentClass: 'footwear',
    dominantColorHex: '#FDF5E6',
    dominantColorName: 'Cream',
    cloValue: 0.04,
    formalityScore: 4.5,
    fit: 'regular',
    material: 'Full-Grain Calfskin',
    cleanStatus: 'clean',
    wearCount: 31,
    lastWornAt: 'Yesterday',
    purchasePrice: 4900,
    favorite: true,
    photoEmoji: '👟',
  },
  {
    id: 'g-5',
    category: 'Pleated Tapered Chinos',
    customName: 'Dark Olive Slacks',
    garmentClass: 'bottom',
    dominantColorHex: '#2E4033',
    dominantColorName: 'Dark Olive',
    cloValue: 0.24,
    formalityScore: 6.5,
    fit: 'tapered',
    material: 'Cotton Twill',
    cleanStatus: 'clean',
    wearCount: 9,
    lastWornAt: '6 days ago',
    purchasePrice: 2800,
    favorite: false,
    photoEmoji: '👖',
  },
  {
    id: 'g-6',
    category: 'Ribbed Knit Crewneck',
    customName: 'Sandalwood Sweater',
    garmentClass: 'top',
    dominantColorHex: '#D5B288',
    dominantColorName: 'Sandalwood',
    cloValue: 0.32,
    formalityScore: 5.5,
    fit: 'regular',
    material: 'Merino Wool',
    cleanStatus: 'dirty',
    wearCount: 11,
    lastWornAt: '3 days ago',
    purchasePrice: 3800,
    favorite: false,
    photoEmoji: '🧶',
  },
  {
    id: 'g-7',
    category: 'Minimalist Steel Chronograph',
    customName: 'Classic Gold Watch',
    garmentClass: 'accessory',
    dominantColorHex: '#C9A826',
    dominantColorName: 'Gold Shimmer',
    cloValue: 0.01,
    formalityScore: 7.0,
    fit: 'fitted',
    material: 'Stainless Steel',
    cleanStatus: 'clean',
    wearCount: 45,
    lastWornAt: 'Today',
    purchasePrice: 7500,
    favorite: true,
    photoEmoji: '⌚',
  },
  {
    id: 'g-8',
    category: 'Tailored Linen Kurta',
    customName: 'Ivory Festive Kurta',
    garmentClass: 'top',
    dominantColorHex: '#FAF0E6',
    dominantColorName: 'Alabaster',
    cloValue: 0.18,
    formalityScore: 7.5,
    fit: 'straight',
    material: 'Pure Handloom Linen',
    cleanStatus: 'clean',
    wearCount: 4,
    lastWornAt: '12 days ago',
    purchasePrice: 3200,
    favorite: false,
    photoEmoji: '🥻',
  },
];

export const useWardrobeStore = create<WardrobeState>((set) => ({
  garments: INITIAL_GARMENTS,
  activeFilter: 'all',
  searchQuery: '',

  setFilter: (filter) => set({ activeFilter: filter }),
  setSearch: (query) => set({ searchQuery: query }),

  addGarment: (item) =>
    set((state) => ({
      garments: [
        {
          ...item,
          id: `g-${Date.now()}`,
          wearCount: 0,
          lastWornAt: 'Never',
        },
        ...state.garments,
      ],
    })),

  toggleFavorite: (id) =>
    set((state) => ({
      garments: state.garments.map((g) =>
        g.id === id ? { ...g, favorite: !g.favorite } : g
      ),
    })),

  toggleCleanStatus: (id) =>
    set((state) => ({
      garments: state.garments.map((g) =>
        g.id === id
          ? { ...g, cleanStatus: g.cleanStatus === 'clean' ? 'dirty' : 'clean' }
          : g
      ),
    })),

  markWorn: (id) =>
    set((state) => ({
      garments: state.garments.map((g) =>
        g.id === id
          ? { ...g, wearCount: g.wearCount + 1, lastWornAt: 'Today' }
          : g
      ),
    })),

  removeGarment: (id) =>
    set((state) => ({
      garments: state.garments.filter((g) => g.id !== id),
    })),
}));

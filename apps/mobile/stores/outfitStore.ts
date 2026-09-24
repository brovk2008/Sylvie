import { create } from 'zustand';
import { WardrobeGarment } from './wardrobeStore';

export interface MobileOutfit {
  id: string;
  occasion: string;
  weatherSummary: string;
  totalClo: number;
  matchScore: number;
  harmonyType: string;
  formalityScore: number;
  layers: {
    role: string;
    name: string;
    colorHex: string;
    colorName: string;
    clo: number;
  }[];
  stylingNotes: string;
}

interface OutfitState {
  activeOutfitIndex: number;
  outfits: MobileOutfit[];
  shuffleOutfit: () => void;
  setOutfits: (outfits: MobileOutfit[]) => void;
}

const DEFAULT_OUTFITS: MobileOutfit[] = [
  {
    id: 'outfit-1',
    occasion: 'College Tomorrow',
    weatherSummary: 'Sunny · 28°C',
    totalClo: 0.68,
    matchScore: 96,
    harmonyType: 'Analogous Flow',
    formalityScore: 4.2,
    layers: [
      { role: 'Base Top', name: 'Everyday Charcoal Tee', colorHex: '#1C0A08', colorName: 'Charcoal', clo: 0.12 },
      { role: 'Bottom', name: 'Vintage Indigo Denim', colorHex: '#1A365D', colorName: 'Navy', clo: 0.28 },
      { role: 'Footwear', name: 'Cream Low-Tops', colorHex: '#FDF5E6', colorName: 'Cream', clo: 0.04 },
      { role: 'Outer Layer', name: 'Chili Utility Overshirt', colorHex: '#E83B2E', colorName: 'Chili Red', clo: 0.35 },
    ],
    stylingNotes:
      'Grounded by your oversized charcoal tee and structured denim, the chili canvas overshirt injects signature warmth without overheating your 0.68 CLO target.',
  },
  {
    id: 'outfit-2',
    occasion: 'First Date 💕',
    weatherSummary: 'Clear Evening · 24°C',
    totalClo: 0.74,
    matchScore: 98,
    harmonyType: 'Complementary Contrast',
    formalityScore: 6.8,
    layers: [
      { role: 'Base Top', name: 'Ivory Festive Kurta', colorHex: '#FAF0E6', colorName: 'Alabaster', clo: 0.18 },
      { role: 'Bottom', name: 'Dark Olive Slacks', colorHex: '#2E4033', colorName: 'Dark Olive', clo: 0.24 },
      { role: 'Footwear', name: 'Cream Low-Tops', colorHex: '#FDF5E6', colorName: 'Cream', clo: 0.04 },
      { role: 'Accessory', name: 'Classic Gold Watch', colorHex: '#C9A826', colorName: 'Gold', clo: 0.01 },
    ],
    stylingNotes:
      'The crisp ivory linen against deep olive chinos commands understated sophistication. Gold timepiece accents the warm undertones of your skin.',
  },
  {
    id: 'outfit-3',
    occasion: 'Weekend Hangout',
    weatherSummary: 'Pleasant · 26°C',
    totalClo: 0.64,
    matchScore: 92,
    harmonyType: 'Monochromatic Depth',
    formalityScore: 3.8,
    layers: [
      { role: 'Base Top', name: 'Everyday Charcoal Tee', colorHex: '#1C0A08', colorName: 'Charcoal', clo: 0.12 },
      { role: 'Bottom', name: 'Vintage Indigo Denim', colorHex: '#1A365D', colorName: 'Navy', clo: 0.28 },
      { role: 'Footwear', name: 'Cream Low-Tops', colorHex: '#FDF5E6', colorName: 'Cream', clo: 0.04 },
    ],
    stylingNotes:
      'Clean casual minimalism. The cream leather sneakers break the deep torso palette and keep the silhouette balanced.',
  },
];

export const useOutfitStore = create<OutfitState>((set) => ({
  activeOutfitIndex: 0,
  outfits: DEFAULT_OUTFITS,
  shuffleOutfit: () =>
    set((state) => ({
      activeOutfitIndex: (state.activeOutfitIndex + 1) % state.outfits.length,
    })),
  setOutfits: (outfits) => set({ outfits, activeOutfitIndex: 0 }),
}));

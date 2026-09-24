import { create } from 'zustand';

interface UserProfileState {
  displayName: string;
  avatarUrl: string | null;
  heightCm: number;
  weightKg: number;
  bmi: number;
  bodyType: string;
  skinToneCode: string;
  skinUndertone: string;
  hairColor: string;
  eyeColor: string;
  preferredOccasions: string[];
  favoriteColors: string[];
  avoidedColors: string[];
  formalityLevel: number; // 1-10
  profileCompletionPct: number;

  updateMeasurements: (height: number, weight: number, bodyType: string) => void;
  updateSkinTone: (code: string, undertone: string) => void;
  updateAppearance: (hair: string, eyes: string) => void;
  updatePreferences: (occasions: string[], favorites: string[], avoided: string[], formality: number) => void;
}

export const useUserStore = create<UserProfileState>((set) => ({
  displayName: 'Vaibhav',
  avatarUrl: null,
  heightCm: 178,
  weightKg: 72,
  bmi: 22.7,
  bodyType: 'mesomorph',
  skinToneCode: 'ST19', // Medium Tan
  skinUndertone: 'warm',
  hairColor: '#1C0A08',
  eyeColor: '#4A2311',
  preferredOccasions: ['College', 'Weekend Casual', 'First Date 💕'],
  favoriteColors: ['#1C0A08', '#E83B2E', '#1A365D', '#FDF5E6'],
  avoidedColors: ['#ADFF2F', '#FFFF00'],
  formalityLevel: 4.5,
  profileCompletionPct: 85,

  updateMeasurements: (height, weight, bodyType) =>
    set(() => {
      const bmiCalc = height > 0 ? Number((weight / Math.pow(height / 100, 2)).toFixed(1)) : 22.0;
      return {
        heightCm: height,
        weightKg: weight,
        bmi: bmiCalc,
        bodyType,
        profileCompletionPct: 90,
      };
    }),

  updateSkinTone: (code, undertone) =>
    set({ skinToneCode: code, skinUndertone: undertone }),

  updateAppearance: (hair, eyes) =>
    set({ hairColor: hair, eyeColor: eyes }),

  updatePreferences: (occasions, favorites, avoided, formality) =>
    set({
      preferredOccasions: occasions,
      favoriteColors: favorites,
      avoidedColors: avoided,
      formalityLevel: formality,
    }),
}));

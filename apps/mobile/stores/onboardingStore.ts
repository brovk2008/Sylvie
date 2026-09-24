import { create } from 'zustand';
import { STYLE_EXPANSION_MAP } from '@sylvie/fashion-ontology';

interface OnboardingState {
  surveyAnswers: Record<string, string>;
  selectedStyles: string[];
  knowledgeLevel: 'beginner' | 'intermediate' | 'advanced';
  setSurveyAnswer: (questionId: string, answer: string) => void;
  toggleStyle: (styleId: string) => void;
  getExpandedStyles: () => string[];
  calculateKnowledgeLevel: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  surveyAnswers: {},
  selectedStyles: ['streetwear', 'minimalist'],
  knowledgeLevel: 'intermediate',

  setSurveyAnswer: (questionId, answer) =>
    set((state) => ({
      surveyAnswers: { ...state.surveyAnswers, [questionId]: answer },
    })),

  toggleStyle: (styleId) =>
    set((state) => {
      const exists = state.selectedStyles.includes(styleId);
      return {
        selectedStyles: exists
          ? state.selectedStyles.filter((s) => s !== styleId)
          : [...state.selectedStyles, styleId],
      };
    }),

  getExpandedStyles: () => {
    const { selectedStyles } = get();
    const expanded = Array.from(
      new Set(selectedStyles.flatMap((id) => STYLE_EXPANSION_MAP[id] || []))
    ).filter((id) => !selectedStyles.includes(id));
    return expanded.slice(0, 5);
  },

  calculateKnowledgeLevel: () => {
    const { surveyAnswers } = get();
    const values = Object.values(surveyAnswers);
    const countC = values.filter((v) => v === 'C').length;
    const countB = values.filter((v) => v === 'B').length;

    let level: 'beginner' | 'intermediate' | 'advanced' = 'intermediate';
    if (countC >= 3) {
      level = 'advanced';
    } else if (countB >= 2 || countC >= 1) {
      level = 'intermediate';
    } else {
      level = 'beginner';
    }

    set({ knowledgeLevel: level });
  },
}));

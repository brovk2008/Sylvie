import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  userName: string;
  userEmail: string;
  hasCompletedOnboarding: boolean;
  login: (name?: string, email?: string) => void;
  logout: () => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true, // Default authenticated for frictionless preview
  userId: 'usr-sylvie-demo-1',
  userName: 'Vaibhav',
  userEmail: 'vaibhav@example.com',
  hasCompletedOnboarding: true,
  login: (name = 'Vaibhav', email = 'vaibhav@example.com') =>
    set({
      isAuthenticated: true,
      userId: 'usr-sylvie-demo-1',
      userName: name,
      userEmail: email,
    }),
  logout: () => set({ isAuthenticated: false, userId: null }),
  completeOnboarding: () => set({ hasCompletedOnboarding: true }),
}));

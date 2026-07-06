import { create } from 'zustand';

interface IAPStore {
  isPremium: boolean;
  isFullUnlock: boolean;
  isLoading: boolean;
  offerings: any[];
  error: string | null;
  setIsPremium: (premium: boolean) => void;
  setIsFullUnlock: (unlock: boolean) => void;
  setLoading: (loading: boolean) => void;
  setOfferings: (offerings: any[]) => void;
  setError: (error: string | null) => void;
  isPaywallVisible: boolean;
  setPaywallVisible: (visible: boolean) => void;
}

export const useIAPStore = create<IAPStore>((set) => ({
  isPremium: false,
  isFullUnlock: false,
  isLoading: true,
  offerings: [],
  error: null,
  isPaywallVisible: false,

  setIsPremium: (premium) => set({ isPremium: premium }),
  setIsFullUnlock: (unlock) => set({ isFullUnlock: unlock }),
  setLoading: (loading) => set({ isLoading: loading }),
  setOfferings: (offerings) => set({ offerings }),
  setError: (error) => set({ error }),
  setPaywallVisible: (visible) => set({ isPaywallVisible: visible }),
}));

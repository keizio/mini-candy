import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@minicandy/player';

interface PlayerStore {
  totalStars: number;
  coins: number;
  lives: number;
  maxLives: number;
  lastLifeRefill: string;
  completedLevels: number[];
  levelStars: Record<number, number>;
  displayName: string;
  deviceId: string;
  dailyChallengeDate: string;
  dailyChallengeCompleted: boolean;
  dailyStreak: number;

  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  useLife: () => boolean;
  refillLives: () => void;
  setLives: (lives: number) => void;
  completeLevel: (levelId: number, stars: number) => void;
  setDisplayName: (name: string) => void;
  setDeviceId: (id: string) => void;
  completeDailyChallenge: (date: string) => void;
  setDailyStreak: (streak: number) => void;
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
  resetAll: () => void;
}

function getDefaultState() {
  return {
    totalStars: 0,
    coins: 500,
    lives: 5,
    maxLives: 5,
    lastLifeRefill: new Date().toISOString(),
    completedLevels: [] as number[],
    levelStars: {} as Record<number, number>,
    displayName: 'Player',
    deviceId: '',
    dailyChallengeDate: '',
    dailyChallengeCompleted: false,
    dailyStreak: 0,
  };
}

const DEFAULT_STATE = getDefaultState();

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  ...DEFAULT_STATE,

  addCoins: (amount) => {
    set((s) => ({ coins: s.coins + amount }));
    get().saveToStorage();
  },

  spendCoins: (amount) => {
    const state = get();
    if (state.coins < amount) return false;
    set({ coins: state.coins - amount });
    get().saveToStorage();
    return true;
  },

  useLife: () => {
    const state = get();
    if (state.lives <= 0) return false;
    set({ lives: state.lives - 1 });
    get().saveToStorage();
    return true;
  },

  refillLives: () => {
    const state = get();
    set({ lives: state.maxLives });
    get().saveToStorage();
  },

  setLives: (lives) => {
    set({ lives: Math.min(lives, get().maxLives) });
    get().saveToStorage();
  },

  completeLevel: (levelId, stars) => {
    set((s) => {
      const existingStars = s.levelStars[levelId] || 0;
      const newStars = Math.max(existingStars, stars);
      const newCompleted = s.completedLevels.includes(levelId)
        ? s.completedLevels
        : [...s.completedLevels, levelId];
      return {
        completedLevels: newCompleted,
        levelStars: { ...s.levelStars, [levelId]: newStars },
        totalStars: Object.values({ ...s.levelStars, [levelId]: newStars }).reduce((a, b) => a + b, 0),
      };
    });
    get().saveToStorage();
  },

  setDisplayName: (name) => {
    set({ displayName: name });
    get().saveToStorage();
  },
  setDeviceId: (id) => {
    set({ deviceId: id });
    get().saveToStorage();
  },

  completeDailyChallenge: (date) => {
    set({ dailyChallengeDate: date, dailyChallengeCompleted: true });
    get().saveToStorage();
  },

  setDailyStreak: (streak) => {
    set({ dailyStreak: streak });
    get().saveToStorage();
  },

  loadFromStorage: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        set({ ...getDefaultState(), ...data });
      }
    } catch {}
  },

  saveToStorage: async () => {
    try {
      const state = get();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
        totalStars: state.totalStars,
        coins: state.coins,
        lives: state.lives,
        lastLifeRefill: state.lastLifeRefill,
        completedLevels: state.completedLevels,
        levelStars: state.levelStars,
        displayName: state.displayName,
        deviceId: state.deviceId,
        dailyChallengeDate: state.dailyChallengeDate,
        dailyChallengeCompleted: state.dailyChallengeCompleted,
        dailyStreak: state.dailyStreak,
      }));
    } catch {}
  },

  resetAll: () => set({ ...getDefaultState() }),
}));

import { create } from 'zustand';

interface SettingsStore {
  musicVolume: number;
  sfxVolume: number;
  vibrationEnabled: boolean;
  hasSeenTutorial: boolean;
  setMusicVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  setVibrationEnabled: (enabled: boolean) => void;
  setHasSeenTutorial: (seen: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  musicVolume: 0.7,
  sfxVolume: 0.8,
  vibrationEnabled: true,
  hasSeenTutorial: false,

  setMusicVolume: (volume) => set({ musicVolume: Math.max(0, Math.min(1, volume)) }),
  setSfxVolume: (volume) => set({ sfxVolume: Math.max(0, Math.min(1, volume)) }),
  setVibrationEnabled: (enabled) => set({ vibrationEnabled: enabled }),
  setHasSeenTutorial: (seen) => set({ hasSeenTutorial: seen }),
}));

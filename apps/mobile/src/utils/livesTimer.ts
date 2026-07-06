import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePlayerStore } from '../store/playerStore';
import { useIAPStore } from '../store/iapStore';

const LIVES_KEY = '@minicandy/lives_state';
const REFILL_INTERVAL = 30 * 60 * 1000;
const MAX_LIVES = 5;

interface LivesState {
  lives: number;
  lastRefillTime: number;
  maxLives: number;
}

async function loadLivesState(): Promise<LivesState> {
  try {
    const raw = await AsyncStorage.getItem(LIVES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { lives: MAX_LIVES, lastRefillTime: Date.now(), maxLives: MAX_LIVES };
}

async function saveLivesState(state: LivesState): Promise<void> {
  await AsyncStorage.setItem(LIVES_KEY, JSON.stringify(state));
}

function calculateRefilledLives(state: LivesState): LivesState {
  const now = Date.now();
  const elapsed = now - state.lastRefillTime;
  const refills = Math.floor(elapsed / REFILL_INTERVAL);

  if (refills <= 0) return state;

  const newLives = Math.min(state.lives + refills, MAX_LIVES);
  const lastRefill = state.lastRefillTime + refills * REFILL_INTERVAL;

  return { ...state, lives: newLives, lastRefillTime: lastRefill };
}

export function useLivesTimer() {
  const setLives = usePlayerStore((s) => s.setLives);
  const isPremium = useIAPStore((s) => s.isPremium);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [nextRefillIn, setNextRefillIn] = useState(0);

  useEffect(() => {
    if (isPremium) {
      setLives(MAX_LIVES);
      return;
    }

    loadLivesState().then((state) => {
      const updated = calculateRefilledLives(state);
      setLives(updated.lives);
      saveLivesState(updated);
    });

    const handleAppState = (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        loadLivesState().then((state) => {
          const updated = calculateRefilledLives(state);
          setLives(updated.lives);
          saveLivesState(updated);
        });
      }
    };

    const subscription = AppState.addEventListener('change', handleAppState);

    intervalRef.current = setInterval(() => {
      loadLivesState().then((state) => {
        const updated = calculateRefilledLives(state);
        setLives(updated.lives);
        saveLivesState(updated);
      });
    }, 60000);

    return () => {
      subscription.remove();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPremium]);

  const useLife = async () => {
    if (isPremium) return true;
    const state = await loadLivesState();
    if (state.lives <= 0) return false;
    const updated = { ...state, lives: state.lives - 1, lastRefillTime: Date.now() };
    setLives(updated.lives);
    await saveLivesState(updated);
    return true;
  };

  const refillAll = async () => {
    const state = { lives: MAX_LIVES, lastRefillTime: Date.now(), maxLives: MAX_LIVES };
    setLives(MAX_LIVES);
    await saveLivesState(state);
  };

  return { useLife, refillAll, nextRefillIn };
}

import { create } from 'zustand';
import { Cell, CandyType, LevelGoal, GameState, GRID_SIZE, CANDY_COUNT } from '../game/engine/types';
import { generateBoard } from '../game/engine/Grid';

interface GameStore extends GameState {
  setGrid: (grid: Cell[][]) => void;
  setScore: (score: number) => void;
  addScore: (points: number) => void;
  setMovesLeft: (moves: number) => void;
  decrementMoves: () => void;
  setStars: (stars: number) => void;
  setAnimating: (animating: boolean) => void;
  setGameOver: (isGameOver: boolean) => void;
  setWin: (won: boolean) => void;
  setLevel: (levelId: number) => void;
  setComboCount: (count: number) => void;
  resetGame: (levelId: number, moves: number, candyTypes?: number) => void;
  isPaused: boolean;
  setPaused: (paused: boolean) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  grid: [],
  score: 0,
  movesLeft: 0,
  stars: 0,
  isAnimating: false,
  isGameOver: false,
  isWin: false,
  levelId: 0,
  comboCount: 0,
  isPaused: false,

  setGrid: (grid) => set({ grid }),
  setScore: (score) => set({ score }),
  addScore: (points) => set((s) => ({ score: s.score + points })),
  setMovesLeft: (moves) => set({ movesLeft: moves }),
  decrementMoves: () => set((s) => ({ movesLeft: Math.max(0, s.movesLeft - 1) })),
  setStars: (stars) => set({ stars }),
  setAnimating: (animating) => set({ isAnimating: animating }),
  setGameOver: (isGameOver) => set({ isGameOver }),
  setWin: (won) => set({ isWin: won }),
  setLevel: (levelId) => set({ levelId }),
  setComboCount: (count) => set({ comboCount: count }),
  setPaused: (paused) => set({ isPaused: paused }),

  resetGame: (levelId, moves, candyTypes) => set({
    grid: generateBoard(candyTypes ?? CANDY_COUNT),
    score: 0,
    movesLeft: moves,
    stars: 0,
    isAnimating: false,
    isGameOver: false,
    isWin: false,
    levelId,
    comboCount: 0,
    isPaused: false,
  }),
}));

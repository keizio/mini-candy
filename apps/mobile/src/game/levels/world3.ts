import { LevelDefinition } from '../engine/types';

export const world3Levels: LevelDefinition[] = [
  { id: 21, world: 3, name: 'Mint Spark', rows: 8, cols: 8, candyTypes: 5, moves: 20, targetScore: 4000, goal: { type: 'score', targetScore: 4000 }, starThresholds: [1600, 2600, 4000], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 22, world: 3, name: 'Green Garden', rows: 8, cols: 8, candyTypes: 5, moves: 20, targetScore: 4400, goal: { type: 'score', targetScore: 4400 }, starThresholds: [1760, 2860, 4400], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 23, world: 3, name: 'Pistachio', rows: 8, cols: 8, candyTypes: 5, moves: 19, targetScore: 4800, goal: { type: 'score', targetScore: 4800 }, starThresholds: [1920, 3120, 4800], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 24, world: 3, name: 'Forest Fresh', rows: 8, cols: 8, candyTypes: 6, moves: 19, targetScore: 5200, goal: { type: 'score', targetScore: 5200 }, starThresholds: [2080, 3380, 5200], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 25, world: 3, name: 'Spearmint', rows: 8, cols: 8, candyTypes: 6, moves: 18, targetScore: 5600, goal: { type: 'score', targetScore: 5600 }, starThresholds: [2240, 3640, 5600], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 26, world: 3, name: 'Clover Field', rows: 8, cols: 8, candyTypes: 6, moves: 18, targetScore: 6000, goal: { type: 'score', targetScore: 6000 }, starThresholds: [2400, 3900, 6000], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 27, world: 3, name: 'Jade Forest', rows: 8, cols: 8, candyTypes: 6, moves: 17, targetScore: 6500, goal: { type: 'score', targetScore: 6500 }, starThresholds: [2600, 4225, 6500], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 28, world: 3, name: 'Emerald', rows: 8, cols: 8, candyTypes: 6, moves: 17, targetScore: 7000, goal: { type: 'score', targetScore: 7000 }, starThresholds: [2800, 4550, 7000], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 29, world: 3, name: 'Minty Maze', rows: 8, cols: 8, candyTypes: 6, moves: 16, targetScore: 7500, goal: { type: 'score', targetScore: 7500 }, starThresholds: [3000, 4875, 7500], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 30, world: 3, name: 'Forest King', rows: 8, cols: 8, candyTypes: 6, moves: 15, targetScore: 8000, goal: { type: 'score', targetScore: 8000 }, starThresholds: [3200, 5200, 8000], allowSpecialCandies: true, unlockedByDefault: false },
];

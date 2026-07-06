import { LevelDefinition } from '../engine/types';

export const world4Levels: LevelDefinition[] = [
  { id: 31, world: 4, name: 'Berry Burst', rows: 8, cols: 8, candyTypes: 5, moves: 18, targetScore: 6000, goal: { type: 'score', targetScore: 6000 }, starThresholds: [2400, 3900, 6000], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 32, world: 4, name: 'Plum Perfect', rows: 8, cols: 8, candyTypes: 5, moves: 18, targetScore: 6600, goal: { type: 'score', targetScore: 6600 }, starThresholds: [2640, 4290, 6600], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 33, world: 4, name: 'Grape Escape', rows: 8, cols: 8, candyTypes: 5, moves: 17, targetScore: 7200, goal: { type: 'score', targetScore: 7200 }, starThresholds: [2880, 4680, 7200], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 34, world: 4, name: 'Raspberry', rows: 8, cols: 8, candyTypes: 6, moves: 17, targetScore: 7800, goal: { type: 'score', targetScore: 7800 }, starThresholds: [3120, 5070, 7800], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 35, world: 4, name: 'Blueberry', rows: 8, cols: 8, candyTypes: 6, moves: 16, targetScore: 8400, goal: { type: 'score', targetScore: 8400 }, starThresholds: [3360, 5460, 8400], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 36, world: 4, name: 'Mulberry', rows: 8, cols: 8, candyTypes: 6, moves: 16, targetScore: 9000, goal: { type: 'score', targetScore: 9000 }, starThresholds: [3600, 5850, 9000], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 37, world: 4, name: 'Berry Patch', rows: 8, cols: 8, candyTypes: 6, moves: 15, targetScore: 9600, goal: { type: 'score', targetScore: 9600 }, starThresholds: [3840, 6240, 9600], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 38, world: 4, name: 'Cranberry', rows: 8, cols: 8, candyTypes: 6, moves: 15, targetScore: 10200, goal: { type: 'score', targetScore: 10200 }, starThresholds: [4080, 6630, 10200], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 39, world: 4, name: 'Elderberry', rows: 8, cols: 8, candyTypes: 6, moves: 15, targetScore: 10800, goal: { type: 'score', targetScore: 10800 }, starThresholds: [4320, 7020, 10800], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 40, world: 4, name: 'Berry King', rows: 8, cols: 8, candyTypes: 6, moves: 15, targetScore: 11500, goal: { type: 'score', targetScore: 11500 }, starThresholds: [4600, 7475, 11500], allowSpecialCandies: true, unlockedByDefault: false },
];

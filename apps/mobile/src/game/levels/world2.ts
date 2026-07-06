import { LevelDefinition } from '../engine/types';

export const world2Levels: LevelDefinition[] = [
  { id: 11, world: 2, name: 'Lemon Drop', rows: 8, cols: 8, candyTypes: 5, moves: 22, targetScore: 2000, goal: { type: 'score', targetScore: 2000 }, starThresholds: [800, 1300, 2000], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 12, world: 2, name: 'Citrus Squeeze', rows: 8, cols: 8, candyTypes: 5, moves: 22, targetScore: 2300, goal: { type: 'score', targetScore: 2300 }, starThresholds: [920, 1495, 2300], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 13, world: 2, name: 'Yellow Brick', rows: 8, cols: 8, candyTypes: 5, moves: 21, targetScore: 2600, goal: { type: 'score', targetScore: 2600 }, starThresholds: [1040, 1690, 2600], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 14, world: 2, name: 'Honeycomb', rows: 8, cols: 8, candyTypes: 6, moves: 21, targetScore: 2900, goal: { type: 'score', targetScore: 2900 }, starThresholds: [1160, 1885, 2900], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 15, world: 2, name: 'Sunshine', rows: 8, cols: 8, candyTypes: 6, moves: 20, targetScore: 3200, goal: { type: 'score', targetScore: 3200 }, starThresholds: [1280, 2080, 3200], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 16, world: 2, name: 'Golden Syrup', rows: 8, cols: 8, candyTypes: 6, moves: 20, targetScore: 3500, goal: { type: 'score', targetScore: 3500 }, starThresholds: [1400, 2275, 3500], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 17, world: 2, name: 'Buttercup', rows: 8, cols: 8, candyTypes: 6, moves: 19, targetScore: 3800, goal: { type: 'score', targetScore: 3800 }, starThresholds: [1520, 2470, 3800], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 18, world: 2, name: 'Lemon Tart', rows: 8, cols: 8, candyTypes: 6, moves: 19, targetScore: 4100, goal: { type: 'score', targetScore: 4100 }, starThresholds: [1640, 2665, 4100], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 19, world: 2, name: 'Pineapple', rows: 8, cols: 8, candyTypes: 6, moves: 18, targetScore: 4500, goal: { type: 'score', targetScore: 4500 }, starThresholds: [1800, 2925, 4500], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 20, world: 2, name: 'Sun King', rows: 8, cols: 8, candyTypes: 6, moves: 18, targetScore: 5000, goal: { type: 'score', targetScore: 5000 }, starThresholds: [2000, 3250, 5000], allowSpecialCandies: true, unlockedByDefault: false },
];

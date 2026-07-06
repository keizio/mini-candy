import { LevelDefinition } from '../engine/types';

export const world1Levels: LevelDefinition[] = [
  { id: 1, world: 1, name: 'Sugar Start', rows: 8, cols: 8, candyTypes: 4, moves: 25, targetScore: 500, goal: { type: 'score', targetScore: 500 }, starThresholds: [200, 325, 500], allowSpecialCandies: false, unlockedByDefault: true },
  { id: 2, world: 1, name: 'Cotton Clouds', rows: 8, cols: 8, candyTypes: 4, moves: 25, targetScore: 700, goal: { type: 'score', targetScore: 700 }, starThresholds: [280, 455, 700], allowSpecialCandies: false, unlockedByDefault: false },
  { id: 3, world: 1, name: 'Sweet Swirl', rows: 8, cols: 8, candyTypes: 5, moves: 24, targetScore: 900, goal: { type: 'score', targetScore: 900 }, starThresholds: [360, 585, 900], allowSpecialCandies: false, unlockedByDefault: false },
  { id: 4, world: 1, name: 'Pink Puff', rows: 8, cols: 8, candyTypes: 5, moves: 23, targetScore: 1100, goal: { type: 'score', targetScore: 1100 }, starThresholds: [440, 715, 1100], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 5, world: 1, name: 'Candy Lane', rows: 8, cols: 8, candyTypes: 5, moves: 23, targetScore: 1300, goal: { type: 'score', targetScore: 1300 }, starThresholds: [520, 845, 1300], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 6, world: 1, name: 'Marshmallow', rows: 8, cols: 8, candyTypes: 5, moves: 22, targetScore: 1500, goal: { type: 'score', targetScore: 1500 }, starThresholds: [600, 975, 1500], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 7, world: 1, name: 'Lollipop', rows: 8, cols: 8, candyTypes: 5, moves: 22, targetScore: 1700, goal: { type: 'score', targetScore: 1700 }, starThresholds: [680, 1105, 1700], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 8, world: 1, name: 'Gumdrop', rows: 8, cols: 8, candyTypes: 5, moves: 21, targetScore: 1900, goal: { type: 'score', targetScore: 1900 }, starThresholds: [760, 1235, 1900], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 9, world: 1, name: 'Jelly Bean', rows: 8, cols: 8, candyTypes: 6, moves: 21, targetScore: 2100, goal: { type: 'score', targetScore: 2100 }, starThresholds: [840, 1365, 2100], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 10, world: 1, name: 'Candy King', rows: 8, cols: 8, candyTypes: 6, moves: 20, targetScore: 2400, goal: { type: 'score', targetScore: 2400 }, starThresholds: [960, 1560, 2400], allowSpecialCandies: true, unlockedByDefault: false },
];

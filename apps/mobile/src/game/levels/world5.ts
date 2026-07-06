import { LevelDefinition } from '../engine/types';

export const world5Levels: LevelDefinition[] = [
  { id: 41, world: 5, name: 'Cocoa Start', rows: 8, cols: 8, candyTypes: 5, moves: 15, targetScore: 8000, goal: { type: 'score', targetScore: 8000 }, starThresholds: [3200, 5200, 8000], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 42, world: 5, name: 'Dark Chocolate', rows: 8, cols: 8, candyTypes: 5, moves: 15, targetScore: 8800, goal: { type: 'score', targetScore: 8800 }, starThresholds: [3520, 5720, 8800], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 43, world: 5, name: 'Fudge Factory', rows: 8, cols: 8, candyTypes: 5, moves: 14, targetScore: 9600, goal: { type: 'score', targetScore: 9600 }, starThresholds: [3840, 6240, 9600], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 44, world: 5, name: 'Caramel Swirl', rows: 8, cols: 8, candyTypes: 6, moves: 14, targetScore: 10400, goal: { type: 'score', targetScore: 10400 }, starThresholds: [4160, 6760, 10400], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 45, world: 5, name: 'Truffle Town', rows: 8, cols: 8, candyTypes: 6, moves: 13, targetScore: 11200, goal: { type: 'score', targetScore: 11200 }, starThresholds: [4480, 7280, 11200], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 46, world: 5, name: 'Brownie Boss', rows: 8, cols: 8, candyTypes: 6, moves: 13, targetScore: 12000, goal: { type: 'score', targetScore: 12000 }, starThresholds: [4800, 7800, 12000], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 47, world: 5, name: 'Mocha Manor', rows: 8, cols: 8, candyTypes: 6, moves: 12, targetScore: 13000, goal: { type: 'score', targetScore: 13000 }, starThresholds: [5200, 8450, 13000], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 48, world: 5, name: 'Toffee Tower', rows: 8, cols: 8, candyTypes: 6, moves: 12, targetScore: 14000, goal: { type: 'score', targetScore: 14000 }, starThresholds: [5600, 9100, 14000], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 49, world: 5, name: 'Chocolate Falls', rows: 8, cols: 8, candyTypes: 6, moves: 12, targetScore: 15000, goal: { type: 'score', targetScore: 15000 }, starThresholds: [6000, 9750, 15000], allowSpecialCandies: true, unlockedByDefault: false },
  { id: 50, world: 5, name: 'Grand Finale', rows: 8, cols: 8, candyTypes: 6, moves: 12, targetScore: 20000, goal: { type: 'score', targetScore: 20000 }, starThresholds: [8000, 13000, 20000], allowSpecialCandies: true, unlockedByDefault: false },
];

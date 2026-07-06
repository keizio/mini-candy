import { LevelDefinition } from '../engine/types';
import { world1Levels } from './world1';
import { world2Levels } from './world2';
import { world3Levels } from './world3';
import { world4Levels } from './world4';
import { world5Levels } from './world5';

export const allLevels: LevelDefinition[] = [
  ...world1Levels,
  ...world2Levels,
  ...world3Levels,
  ...world4Levels,
  ...world5Levels,
];

const levelMap = new Map<number, LevelDefinition>();
for (const level of allLevels) {
  levelMap.set(level.id, level);
}

export function getLevel(id: number): LevelDefinition | undefined {
  return levelMap.get(id);
}

export function getLevelsByWorld(world: number): LevelDefinition[] {
  return allLevels.filter(l => l.world === world);
}

export function isLevelUnlocked(
  levelId: number,
  completedLevels: Set<number>
): boolean {
  const level = getLevel(levelId);
  if (!level) return false;
  if (level.unlockedByDefault) return true;
  return completedLevels.has(levelId - 1);
}

export const WORLD_NAMES: Record<number, string> = {
  1: 'Cotton Candy',
  2: 'Lemon Grove',
  3: 'Mint Forest',
  4: 'Berry Patch',
  5: 'Chocolate Factory',
};

export const WORLD_COLORS: Record<number, string> = {
  1: '#FFB5D8',
  2: '#FFE68F',
  3: '#A8E6CF',
  4: '#C9B1FF',
  5: '#D4A574',
};

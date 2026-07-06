import { LevelDefinition } from '../types/game';

export const ALL_LEVELS: LevelDefinition[] = [
  ...(Array.from({ length: 50 }, (_, i) => {
    const id = i + 1;
    const world = Math.floor(i / 10) + 1;
    const worldIndex = i % 10;
    const difficulty = (id - 1) / 49;
    const moves = Math.max(12, Math.round(25 - difficulty * 13));
    const targetScore = Math.round(500 + difficulty * 19500);
    const candyTypes = Math.min(6, 4 + Math.floor(difficulty * 3));

    return {
      id,
      world,
      name: `Level ${id}`,
      rows: 8,
      cols: 8,
      candyTypes,
      moves,
      targetScore,
      goal: { type: 'score' as const, targetScore },
      starThresholds: [
        Math.floor(targetScore * 0.4),
        Math.floor(targetScore * 0.65),
        targetScore,
      ] as [number, number, number],
      allowSpecialCandies: id > 3,
      unlockedByDefault: id === 1,
    };
  })),
];

export function getLevelById(id: number): LevelDefinition | undefined {
  return ALL_LEVELS.find(l => l.id === id);
}

export function getLevelsByWorld(world: number): LevelDefinition[] {
  return ALL_LEVELS.filter(l => l.world === world);
}

export function isLevelUnlocked(
  levelId: number,
  completedLevelIds: Set<number>
): boolean {
  if (levelId === 1) return true;
  return completedLevelIds.has(levelId - 1);
}

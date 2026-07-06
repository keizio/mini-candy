import { Hono } from 'hono';
import { Env, DailyChallengeData } from '../types';

function hashSeed(dateStr: string): number {
  let hash = 0;
  const salt = 'MINI_CANDY_SALT';
  const combined = dateStr + salt;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) % 100000;
}

function generateDailyConfig(seed: number): DailyChallengeData['configuration'] {
  const candyTypes = [0, 1, 2, 3, 4];
  const moves = 15 + (seed % 10);
  const targetScore = 2000 + (seed % 3000);
  const goalType = seed % 3 === 0 ? 'collect' : 'score';

  return { moves, candyTypes, targetScore, goalType };
}

export const dailyRoutes = new Hono<{ Bindings: Env }>();

dailyRoutes.get('/', async (c) => {
  const today = new Date().toISOString().split('T')[0];
  const seed = hashSeed(today);

  const cacheKey = `daily:${today}`;
  const cached = await c.env.KV.get(cacheKey, 'json');

  if (cached) {
    return c.json(cached);
  }

  const levelData: DailyChallengeData = {
    date: today,
    seed,
    configuration: generateDailyConfig(seed),
  };

  await c.env.KV.put(cacheKey, JSON.stringify(levelData), {
    expirationTtl: 86400,
  });

  return c.json(levelData);
});

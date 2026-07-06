import { Hono } from 'hono';
import { Env, LeaderboardEntry, ScoreSubmitPayload } from '../types';

export const leaderboardRoutes = new Hono<{ Bindings: Env }>();

leaderboardRoutes.get('/', async (c) => {
  const period = c.req.query('period') || 'all';
  const limit = parseInt(c.req.query('limit') || '100');

  const key = `leaderboard:${period}`;
  const data = await c.env.KV.get(key, 'json');

  if (!data) {
    return c.json({ scores: [] });
  }

  const scores = (data as LeaderboardEntry[]).slice(0, limit);
  return c.json({ scores });
});

leaderboardRoutes.post('/submit', async (c) => {
  const body = await c.req.json<ScoreSubmitPayload>();

  if (!body || typeof body.score !== 'number') {
    return c.json({ error: 'Invalid payload' }, 400);
  }

  const entry: LeaderboardEntry = {
    deviceId: body.deviceId,
    score: body.score,
    levelId: body.levelId,
    stars: body.stars,
    displayName: body.displayName || 'Player',
    submittedAt: new Date().toISOString(),
  };

  const allTimeKey = 'leaderboard:all';
  const weekKey = 'leaderboard:week';

  const updateList = async (key: string) => {
    const existing = (await c.env.KV.get(key, 'json')) as LeaderboardEntry[] | null;
    const list = existing || [];
    list.push(entry);
    list.sort((a, b) => b.score - a.score);
    await c.env.KV.put(key, JSON.stringify(list.slice(0, 1000)));
  };

  await updateList(allTimeKey);
  await updateList(weekKey);

  return c.json({ success: true, entry });
});

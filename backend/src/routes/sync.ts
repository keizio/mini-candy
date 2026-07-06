import { Hono } from 'hono';
import { Env } from '../types';

export const syncRoutes = new Hono<{ Bindings: Env }>();

syncRoutes.post('/save', async (c) => {
  const body = await c.req.json<{
    deviceId: string;
    saveData: Record<string, any>;
  }>();

  if (!body?.deviceId || typeof body.saveData !== 'object') {
    return c.json({ error: 'Invalid payload' }, 400);
  }

  if (!c.env.KV) {
    return c.json({ error: 'KV not configured' }, 500);
  }

  const key = `save:${body.deviceId}`;
  await c.env.KV.put(key, JSON.stringify({
    ...body.saveData,
    updatedAt: new Date().toISOString(),
  }));

  return c.json({ success: true });
});

syncRoutes.get('/load/:deviceId', async (c) => {
  const deviceId = c.req.param('deviceId');

  if (!deviceId || !c.env.KV) {
    return c.json({ error: 'Invalid deviceId' }, 400);
  }

  const key = `save:${deviceId}`;
  const raw = await c.env.KV.get(key, 'json');

  return c.json({ saveData: raw ?? null });
});

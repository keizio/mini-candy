import { Context, Next } from 'hono';
import { Env } from '../types';

export async function requireDeviceId(c: Context<{ Bindings: Env }>, next: Next) {
  const deviceId = c.req.header('X-Device-Id');
  if (!deviceId) {
    return c.json({ error: 'Missing X-Device-Id header' }, 401);
  }
  c.set('deviceId', deviceId);
  await next();
}

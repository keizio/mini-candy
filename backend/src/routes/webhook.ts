import { Hono } from 'hono';
import { Env } from '../types';

export const webhookRoutes = new Hono<{ Bindings: Env }>();

webhookRoutes.post('/revenuecat', async (c) => {
  const signature = c.req.header('X-RevenueCat-Signature');
  const body = await c.req.text();

  if (!signature) {
    return c.json({ error: 'Missing signature' }, 401);
  }

  const secret = c.env.REVENUECAT_WEBHOOK_SECRET;
  if (secret) {
    const crypto = await import('node:crypto');
    const computed = crypto.createHmac('sha256', secret).update(body).digest('base64');
    if (computed !== signature) {
      return c.json({ error: 'Invalid signature' }, 401);
    }
  }

  try {
    const event = JSON.parse(body);
    const eventType = event.type || event.event;

    const entitlement = event.entitlement_id;
    const productIdentifier = event.product_identifier;
    const expirationAt = event.expiration_at_ms;
    const userId = event.aliased_member_id || event.original_app_user_id;

    if (!userId) {
      return c.json({ error: 'Missing user identifier' }, 400);
    }

    const cacheKey = `entitlement:${userId}`;
    const existing = await c.env.KV.get(cacheKey, 'json');

    await c.env.KV.put(cacheKey, JSON.stringify({
      entitlement,
      productIdentifier,
      expirationAt,
      eventType,
      updatedAt: new Date().toISOString(),
    }));

    return c.json({ success: true, received: eventType });
  } catch {
    return c.json({ error: 'Invalid payload' }, 400);
  }
});

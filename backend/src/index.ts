import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Env } from './types';
import { leaderboardRoutes } from './routes/leaderboard';
import { syncRoutes } from './routes/sync';
import { dailyRoutes } from './routes/daily';
import { webhookRoutes } from './routes/webhook';

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors());

app.route('/api/leaderboard', leaderboardRoutes);
app.route('/api/sync', syncRoutes);
app.route('/api/daily', dailyRoutes);
app.route('/api/webhook', webhookRoutes);

app.get('/health', (c) => c.json({ status: 'ok' }));

export default app;

import { LeaderboardEntry, DailyChallengeResponse } from '@shared/types/api';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8787';

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function submitScore(
  deviceId: string,
  score: number,
  levelId: number,
  stars: number,
  displayName?: string
): Promise<void> {
  await request('/api/leaderboard/submit', {
    method: 'POST',
    body: JSON.stringify({ deviceId, score, levelId, stars, displayName }),
  });
}

export async function getLeaderboard(
  period: 'week' | 'all' = 'all'
): Promise<LeaderboardEntry[]> {
  const data = await request<{ scores: LeaderboardEntry[] }>(
    `/api/leaderboard?period=${period}`
  );
  return data.scores;
}

export async function saveGameState(
  deviceId: string,
  saveData: Record<string, unknown>
): Promise<void> {
  await request('/api/sync/save', {
    method: 'POST',
    body: JSON.stringify({ deviceId, saveData }),
  });
}

export async function loadGameState(
  deviceId: string
): Promise<Record<string, unknown> | null> {
  const data = await request<{ saveData: Record<string, unknown> | null }>(
    `/api/sync/load/${deviceId}`
  );
  return data.saveData;
}

export async function getDailyChallenge(): Promise<DailyChallengeResponse> {
  return request<DailyChallengeResponse>('/api/daily');
}

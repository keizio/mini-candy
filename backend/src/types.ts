export interface Env {
  KV: KVNamespace;
  DB: D1Database;
  ENVIRONMENT: string;
  REVENUECAT_WEBHOOK_SECRET?: string;
}

export interface LeaderboardEntry {
  deviceId: string;
  score: number;
  levelId: number;
  stars: number;
  displayName: string;
  submittedAt: string;
}

export interface SavePayload {
  deviceId: string;
  saveData: Record<string, unknown>;
}

export interface ScoreSubmitPayload {
  deviceId: string;
  score: number;
  levelId: number;
  stars: number;
  displayName?: string;
}

export interface DailyChallengeData {
  date: string;
  seed: number;
  configuration: {
    moves: number;
    candyTypes: number[];
    targetScore: number;
    goalType: string;
  };
}

export interface SubmitScoreRequest {
  deviceId: string;
  score: number;
  levelId: number;
  stars: number;
  displayName?: string;
}

export interface LeaderboardEntry {
  displayName: string;
  score: number;
  stars: number;
  levelId: number;
}

export interface LeaderboardResponse {
  scores: LeaderboardEntry[];
}

export interface SaveGameRequest {
  deviceId: string;
  saveData: Record<string, unknown>;
}

export interface LoadGameResponse {
  saveData: Record<string, unknown> | null;
}

export interface DailyChallengeResponse {
  date: string;
  seed: number;
  configuration: {
    moves: number;
    candyTypes: number[];
    targetScore: number;
    goalType: string;
  };
}

export interface WebhookPayload {
  event: string;
  entitlement_id?: string;
  product_identifier?: string;
  expiration_at_ms?: number;
  aliased_member_id?: string;
  original_app_user_id?: string;
}

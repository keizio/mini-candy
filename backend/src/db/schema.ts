export const CREATE_USERS_TABLE = `
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT UNIQUE NOT NULL,
  display_name TEXT DEFAULT 'Player',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_played_at TIMESTAMPTZ DEFAULT NOW()
);
`;

export const CREATE_SCORES_TABLE = `
CREATE TABLE IF NOT EXISTS scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  score INTEGER NOT NULL,
  stars INTEGER NOT NULL DEFAULT 0,
  level_id INTEGER NOT NULL,
  played_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scores_user ON scores(user_id);
CREATE INDEX IF NOT EXISTS idx_scores_global ON scores(score DESC);
`;

export const CREATE_GAME_SAVES_TABLE = `
CREATE TABLE IF NOT EXISTS game_saves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE,
  save_data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
`;

export const CREATE_DAILY_CHALLENGES_TABLE = `
CREATE TABLE IF NOT EXISTS daily_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL,
  seed INTEGER NOT NULL,
  level_data JSONB NOT NULL
);
`;

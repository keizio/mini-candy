export const INSERT_SCORE = `
INSERT INTO scores (user_id, score, stars, level_id)
VALUES ($1, $2, $3, $4)
RETURNING id;
`;

export const FETCH_LEADERBOARD = `
SELECT u.display_name, s.score, s.stars, s.level_id
FROM scores s
JOIN users u ON s.user_id = u.id
ORDER BY s.score DESC
LIMIT $1;
`;

export const UPSERT_GAME_SAVE = `
INSERT INTO game_saves (user_id, save_data)
VALUES ($1, $2)
ON CONFLICT (user_id) DO UPDATE
SET save_data = EXCLUDED.save_data, updated_at = NOW();
`;

export const FETCH_DAILY_CHALLENGE = `
SELECT * FROM daily_challenges
WHERE date = CURRENT_DATE;
`;

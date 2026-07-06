export enum CandyType {
  Red = 0,
  Blue = 1,
  Green = 2,
  Yellow = 3,
  Purple = 4,
  Orange = 5,
}

export enum SpecialType {
  None = 0,
  StripedHorizontal = 1,
  StripedVertical = 2,
  Wrapped = 3,
  ColorBomb = 4,
}

export interface Position {
  row: number;
  col: number;
}

export interface LevelGoal {
  type: 'score' | 'collect' | 'clear';
  targetScore?: number;
  collectTypes?: CandyType[];
  collectCounts?: number[];
}

export interface LevelDefinition {
  id: number;
  world: number;
  name: string;
  rows: number;
  cols: number;
  candyTypes: number;
  moves: number;
  targetScore: number;
  goal: LevelGoal;
  starThresholds: [number, number, number];
  allowSpecialCandies: boolean;
  unlockedByDefault: boolean;
}

export interface PlayerProgress {
  completedLevels: number[];
  levelStars: Record<number, number>;
  totalStars: number;
  coins: number;
  lives: number;
  lastLifeRefill: string;
}

export interface GameSession {
  levelId: number;
  score: number;
  movesLeft: number;
  stars: number;
  won: boolean;
  timestamp: string;
}

export interface DailyChallengeProgress {
  date: string;
  completed: boolean;
  score: number;
  stars: number;
  streak: number;
  lastClaimedDate: string;
}

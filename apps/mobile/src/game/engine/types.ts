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

export interface Cell {
  candyType: CandyType | null;
  specialType: SpecialType;
  row: number;
  col: number;
  id: number;
}

export interface Position {
  row: number;
  col: number;
}

export interface Swap {
  from: Position;
  to: Position;
}

export interface Match {
  positions: Position[];
  length: number;
  isHorizontal: boolean;
  specialCreated?: {
    at: Position;
    type: SpecialType;
  };
}

export interface CascadeStep {
  type: 'remove' | 'gravity' | 'refill' | 'special_activate';
  positions?: Position[];
  matches?: Match[];
  movements?: Movement[];
  specialType?: SpecialType;
}

export interface Movement {
  from: Position;
  to: Position;
  candyType: CandyType;
  specialType: SpecialType;
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

export interface GameState {
  grid: Cell[][];
  score: number;
  movesLeft: number;
  stars: number;
  isAnimating: boolean;
  isGameOver: boolean;
  isWin: boolean;
  levelId: number;
  comboCount: number;
}

export const GRID_SIZE = 8;
export const CANDY_COUNT = 6;
export const CELL_SIZE = 64;
export const SWAP_DURATION = 200;
export const MATCH_DURATION = 300;
export const GRAVITY_DURATION = 200;
export const REFILL_DURATION = 200;
export const SPECIAL_DURATION = 400;
export const MIN_SWAP_INTERVAL = 500;
export const INPUT_QUEUE_TIMEOUT = 300;

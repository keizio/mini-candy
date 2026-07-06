import { CandyType, Cell, Position, Match, GRID_SIZE } from './types';

export interface MatchResult {
  matches: Match[];
  matchedPositions: Set<string>;
}

function posKey(row: number, col: number): string {
  return `${row},${col}`;
}

function scanRow(grid: Cell[][], row: number): Match[] {
  const matches: Match[] = [];
  let runStart = 0;
  let runType = grid[row][0]?.candyType;

  for (let col = 1; col <= GRID_SIZE; col++) {
    const currentType = col < GRID_SIZE ? grid[row][col]?.candyType : null;

    if (currentType === runType && runType !== null) {
      continue;
    }

    const runLength = col - runStart;
    if (runLength >= 3 && runType !== null) {
      const positions: Position[] = [];
      for (let c = runStart; c < col; c++) {
        positions.push({ row, col: c });
      }
      matches.push({
        positions,
        length: runLength,
        isHorizontal: true,
      });
    }

    runStart = col;
    runType = currentType;
  }

  return matches;
}

function scanColumn(grid: Cell[][], col: number): Match[] {
  const matches: Match[] = [];
  let runStart = 0;
  let runType = grid[0]?.[col]?.candyType;

  for (let row = 1; row <= GRID_SIZE; row++) {
    const currentType = row < GRID_SIZE ? grid[row]?.[col]?.candyType : null;

    if (currentType === runType && runType !== null) {
      continue;
    }

    const runLength = row - runStart;
    if (runLength >= 3 && runType !== null) {
      const positions: Position[] = [];
      for (let r = runStart; r < row; r++) {
        positions.push({ row: r, col });
      }
      matches.push({
        positions,
        length: runLength,
        isHorizontal: false,
      });
    }

    runStart = row;
    runType = currentType;
  }

  return matches;
}

export function findMatches(grid: Cell[][]): MatchResult {
  const allMatches: Match[] = [];
  const matched = new Set<string>();

  for (let row = 0; row < GRID_SIZE; row++) {
    const rowMatches = scanRow(grid, row);
    allMatches.push(...rowMatches);
    for (const m of rowMatches) {
      for (const p of m.positions) {
        matched.add(posKey(p.row, p.col));
      }
    }
  }

  for (let col = 0; col < GRID_SIZE; col++) {
    const colMatches = scanColumn(grid, col);
    allMatches.push(...colMatches);
    for (const m of colMatches) {
      for (const p of m.positions) {
        matched.add(posKey(p.row, p.col));
      }
    }
  }

  return { matches: allMatches, matchedPositions: matched };
}

export function hasMatches(grid: Cell[][]): boolean {
  return findMatches(grid).matches.length > 0;
}

export function getMatchedPositions(grid: Cell[][]): Position[] {
  const result = findMatches(grid);
  return Array.from(result.matchedPositions).map(key => {
    const [r, c] = key.split(',').map(Number);
    return { row: r, col: c };
  });
}

export function getCandyTypeAt(grid: Cell[][], row: number, col: number): CandyType | null {
  if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) return null;
  return grid[row][col].candyType;
}

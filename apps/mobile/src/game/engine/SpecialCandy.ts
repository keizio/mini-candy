import { CandyType, SpecialType, Cell, Position, Match, GRID_SIZE } from './types';

function isStraightLine(positions: Position[]): boolean {
  if (positions.length === 0) return true;
  const sameRow = positions.every(p => p.row === positions[0].row);
  const sameCol = positions.every(p => p.col === positions[0].col);
  return sameRow || sameCol;
}

function isLShape(positions: Position[]): boolean {
  const rows = new Set(positions.map(p => p.row));
  const cols = new Set(positions.map(p => p.col));
  return rows.size >= 2 && cols.size >= 2;
}

export function determineSpecialFromMatch(match: Match): SpecialType {
  if (match.length === 5 && isStraightLine(match.positions)) {
    return SpecialType.ColorBomb;
  }
  if (match.length === 5 && !isStraightLine(match.positions)) {
    return SpecialType.Wrapped;
  }
  if (match.length === 4) {
    return match.isHorizontal ? SpecialType.StripedHorizontal : SpecialType.StripedVertical;
  }
  return SpecialType.None;
}

export function createSpecialAt(grid: Cell[][], pos: Position, specialType: SpecialType): void {
  if (pos.row < 0 || pos.row >= GRID_SIZE || pos.col < 0 || pos.col >= GRID_SIZE) return;
  grid[pos.row][pos.col].specialType = specialType;
}

export function getSpecialActivationCells(
  grid: Cell[][],
  pos: Position,
  specialType: SpecialType
): Position[] {
  const cells: Position[] = [];

  switch (specialType) {
    case SpecialType.StripedHorizontal:
      for (let col = 0; col < GRID_SIZE; col++) {
        cells.push({ row: pos.row, col });
      }
      break;

    case SpecialType.StripedVertical:
      for (let row = 0; row < GRID_SIZE; row++) {
        cells.push({ row, col: pos.col });
      }
      break;

    case SpecialType.Wrapped: {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const r = pos.row + dr;
          const c = pos.col + dc;
          if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
            cells.push({ row: r, col: c });
          }
        }
      }
      break;
    }

    case SpecialType.ColorBomb:
      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          cells.push({ row, col });
        }
      }
      break;
  }

  return cells;
}

export function activateColorBomb(
  grid: Cell[][],
  targetType: CandyType
): Position[] {
  const cells: Position[] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col].candyType === targetType) {
        cells.push({ row, col });
      }
    }
  }
  return cells;
}

export function combineSpecialEffects(
  specialA: SpecialType,
  specialB: SpecialType
): { clears: Position[]; type: SpecialType } | null {
  if (specialA === SpecialType.ColorBomb || specialB === SpecialType.ColorBomb) {
    return { clears: [], type: SpecialType.ColorBomb };
  }

  const bothStriped =
    (specialA === SpecialType.StripedHorizontal || specialA === SpecialType.StripedVertical) &&
    (specialB === SpecialType.StripedHorizontal || specialB === SpecialType.StripedVertical);

  if (bothStriped) {
    const allCells: Position[] = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        allCells.push({ row, col });
      }
    }
    return { clears: allCells, type: SpecialType.Wrapped };
  }

  const oneWrapped =
    specialA === SpecialType.Wrapped || specialB === SpecialType.Wrapped;
  const oneStriped =
    specialA === SpecialType.StripedHorizontal || specialA === SpecialType.StripedVertical ||
    specialB === SpecialType.StripedHorizontal || specialB === SpecialType.StripedVertical;

  if (oneWrapped && oneStriped) {
    const allCells: Position[] = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        allCells.push({ row, col });
      }
    }
    return { clears: allCells, type: SpecialType.Wrapped };
  }

  return null;
}

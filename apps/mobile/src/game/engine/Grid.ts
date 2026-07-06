import { CandyType, SpecialType, Cell, Position, GRID_SIZE, CANDY_COUNT } from './types';

let cellIdCounter = 0;

function nextCellId(): number {
  return ++cellIdCounter;
}

function resetCellIdCounter(): void {
  cellIdCounter = 0;
}

export function createEmptyGrid(): Cell[][] {
  const grid: Cell[][] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    grid[row] = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      grid[row][col] = {
        candyType: null,
        specialType: SpecialType.None,
        row,
        col,
        id: nextCellId(),
      };
    }
  }
  return grid;
}

export function randomCandyType(maxTypes: number = CANDY_COUNT): CandyType {
  return Math.floor(Math.random() * maxTypes) as CandyType;
}

export function generateBoard(maxTypes: number = CANDY_COUNT): Cell[][] {
  resetCellIdCounter();
  const grid = createEmptyGrid();
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      let candyType: CandyType;
      let attempts = 0;
      do {
        candyType = randomCandyType(maxTypes);
        grid[row][col].candyType = candyType;
        attempts++;
      } while (hasInitialMatchAt(grid, row, col) && attempts < 10);
      grid[row][col].candyType = candyType;
    }
  }
  return grid;
}

function hasInitialMatchAt(grid: Cell[][], row: number, col: number): boolean {
  if (col >= 2) {
    const t = grid[row][col].candyType;
    if (t !== null && grid[row][col - 1].candyType === t && grid[row][col - 2].candyType === t) {
      return true;
    }
  }
  if (row >= 2) {
    const t = grid[row][col].candyType;
    if (t !== null && grid[row - 1][col].candyType === t && grid[row - 2][col].candyType === t) {
      return true;
    }
  }
  return false;
}

export function getCell(grid: Cell[][], row: number, col: number): Cell | null {
  if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) return null;
  return grid[row][col];
}

export function setCell(grid: Cell[][], row: number, col: number, cell: Cell): void {
  if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
    grid[row][col] = { ...cell, row, col };
  }
}

export function swapCells(grid: Cell[][], a: Position, b: Position): void {
  const temp = grid[a.row][a.col];
  grid[a.row][a.col] = { ...grid[b.row][b.col], row: a.row, col: a.col };
  grid[b.row][b.col] = { ...temp, row: b.row, col: b.col };
}

export function isAdjacent(a: Position, b: Position): boolean {
  const dr = Math.abs(a.row - b.row);
  const dc = Math.abs(a.col - b.col);
  return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
}

export function getNeighbors(pos: Position): Position[] {
  const neighbors: Position[] = [];
  if (pos.row > 0) neighbors.push({ row: pos.row - 1, col: pos.col });
  if (pos.row < GRID_SIZE - 1) neighbors.push({ row: pos.row + 1, col: pos.col });
  if (pos.col > 0) neighbors.push({ row: pos.row, col: pos.col - 1 });
  if (pos.col < GRID_SIZE - 1) neighbors.push({ row: pos.row, col: pos.col + 1 });
  return neighbors;
}

export function cloneGrid(grid: Cell[][]): Cell[][] {
  return grid.map(row => row.map(cell => ({ ...cell })));
}

export function isCellEmpty(cell: Cell): boolean {
  return cell.candyType === null;
}

export function countCandyType(grid: Cell[][], candyType: CandyType): number {
  let count = 0;
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col].candyType === candyType) count++;
    }
  }
  return count;
}

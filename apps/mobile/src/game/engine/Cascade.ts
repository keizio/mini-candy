import { Cell, Position, Movement, CandyType, SpecialType, CascadeStep, GRID_SIZE, CANDY_COUNT } from './types';
import { findMatches } from './Matcher';
import { randomCandyType } from './Grid';

export function removeMatches(grid: Cell[][], positions: Position[]): void {
  for (const pos of positions) {
    grid[pos.row][pos.col] = {
      ...grid[pos.row][pos.col],
      candyType: null,
    };
  }
}

export function applyGravity(grid: Cell[][]): Movement[] {
  const movements: Movement[] = [];

  for (let col = 0; col < GRID_SIZE; col++) {
    let writeRow = GRID_SIZE - 1;

    for (let row = GRID_SIZE - 1; row >= 0; row--) {
      if (grid[row][col].candyType !== null) {
        if (row !== writeRow) {
          const cell = grid[row][col];
          movements.push({
            from: { row, col },
            to: { row: writeRow, col },
            candyType: cell.candyType!,
            specialType: cell.specialType,
          });
          grid[writeRow][col] = { ...cell, row: writeRow, col };
          grid[row][col] = {
            ...grid[row][col],
            candyType: null,
            specialType: SpecialType.None,
          };
        }
        writeRow--;
      }
    }
  }

  return movements;
}

export function refillEmpty(grid: Cell[][], maxTypes: number = CANDY_COUNT): Movement[] {
  const movements: Movement[] = [];

  for (let col = 0; col < GRID_SIZE; col++) {
    for (let row = 0; row < GRID_SIZE; row++) {
      if (grid[row][col].candyType === null) {
        const candyType = randomCandyType(maxTypes);
        grid[row][col] = {
          ...grid[row][col],
          candyType,
          specialType: SpecialType.None,
        };
        movements.push({
          from: { row: -1, col },
          to: { row, col },
          candyType,
          specialType: SpecialType.None,
        });
      }
    }
  }

  return movements;
}

export function runCascade(grid: Cell[][], maxTypes: number = CANDY_COUNT): CascadeStep[] {
  const steps: CascadeStep[] = [];

  let iteration = 0;
  const maxIterations = 20;

  while (iteration < maxIterations) {
    const matchResult = findMatches(grid);

    if (matchResult.matches.length === 0) {
      break;
    }

    const positions = Array.from(matchResult.matchedPositions).map(key => {
      const [r, c] = key.split(',').map(Number);
      return { row: r, col: c };
    });

    steps.push({
      type: 'remove',
      positions,
      matches: matchResult.matches,
    });

    removeMatches(grid, positions);

    const gravityMoves = applyGravity(grid);
    if (gravityMoves.length > 0) {
      steps.push({
        type: 'gravity',
        movements: gravityMoves,
      });
    }

    const refillMoves = refillEmpty(grid, maxTypes);
    if (refillMoves.length > 0) {
      steps.push({
        type: 'refill',
        movements: refillMoves,
      });
    }

    iteration++;
  }

  return steps;
}

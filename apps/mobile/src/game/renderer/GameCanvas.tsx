import React, { useCallback, useRef, useState, useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas, RoundedRect, Group, Text, useFont, Circle, Path, Skia, processTransform3d } from '@shopify/react-native-skia';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { CandyType, SpecialType, Cell, Position, GRID_SIZE, CELL_SIZE, GameState, LevelGoal } from '../engine/types';
import { generateBoard, swapCells, isAdjacent, cloneGrid } from '../engine/Grid';
import { findMatches } from '../engine/Matcher';
import { runCascade } from '../engine/Cascade';
import { determineSpecialFromMatch, createSpecialAt, getSpecialActivationCells, activateColorBomb } from '../engine/SpecialCandy';
import { getCandyPath, getCandySwirlPath, getSpecialIndicatorPaths, CANDY_COLORS } from './CandyRenderer';
import { createMatchParticles, createSpecialParticles, updateParticles, Particle } from './ParticleSystem';
import {
  createSwapAnimation, createMatchAnimation, createGravityAnimation, createSpecialAnimation,
  createComboText, createShakeAnimation, AnimatedState, lerpPos, easeOutCubic, lerp
} from './Animations';

interface GameCanvasProps {
  levelId: number;
  levelGoal: LevelGoal;
  targetScore: number;
  moves: number;
  candyTypes: number;
  onScoreChange: (score: number) => void;
  onMovesChange: (moves: number) => void;
  onGameOver: (won: boolean, stars: number) => void;
  onCombo: (count: number) => void;
}

interface GameCanvasState {
  grid: Cell[][];
  score: number;
  movesLeft: number;
  isAnimating: boolean;
  comboCount: number;
  particles: Particle[];
  selectedCell: Position | null;
  gameOver: boolean;
  won: boolean;
  maxScore: number;
  starThresholds: [number, number, number];
}

export default function GameCanvas({
  levelId,
  levelGoal,
  targetScore,
  moves,
  candyTypes,
  onScoreChange,
  onMovesChange,
  onGameOver,
  onCombo,
}: GameCanvasProps) {
  const canvasSize = GRID_SIZE * CELL_SIZE;

  const fredokaFont = require('@expo-google-fonts/fredoka/600SemiBold/Fredoka_600SemiBold.ttf');
  const fredoka16 = useFont(fredokaFont, 16);
  const fredoka24 = useFont(fredokaFont, 24);
  const fredoka36 = useFont(fredokaFont, 36);

  const candySkPaths = useMemo(() => {
    const paths: Record<number, ReturnType<typeof Skia.Path.MakeFromSVGString>> = {};
    for (const type of [CandyType.Red, CandyType.Blue, CandyType.Green, CandyType.Yellow, CandyType.Purple, CandyType.Orange]) {
      const pathStr = getCandyPath(type);
      paths[type] = Skia.Path.MakeFromSVGString(pathStr);
    }
    return paths;
  }, []);

  const candySwirlPaths = useMemo(() => {
    const paths: Record<number, ReturnType<typeof Skia.Path.MakeFromSVGString>> = {};
    for (const type of [CandyType.Red, CandyType.Blue, CandyType.Green, CandyType.Yellow, CandyType.Purple, CandyType.Orange]) {
      const swirlStr = getCandySwirlPath(type);
      paths[type] = swirlStr ? Skia.Path.MakeFromSVGString(swirlStr) : null;
    }
    return paths;
  }, []);

  const stateRef = useRef<GameCanvasState>({
    grid: generateBoard(candyTypes),
    score: 0,
    movesLeft: moves,
    isAnimating: false,
    comboCount: 0,
    particles: [],
    selectedCell: null,
    gameOver: false,
    won: false,
    maxScore: targetScore,
    starThresholds: [Math.floor(targetScore * 0.4), Math.floor(targetScore * 0.65), targetScore],
  });

  const animStateRef = useRef<AnimatedState>({
    swaps: [],
    matchAnim: [],
    gravityAnims: [],
    specialAnims: [],
    comboText: null,
    shake: null,
  });

  const lastSwapRef = useRef(0);
  const inputBufferRef = useRef<Position[]>([]);

  const [renderTick, setRenderTick] = useState(0);

  const requestRender = useCallback(() => {
    setRenderTick(t => t + 1);
  }, []);

  const executeSwap = useCallback((from: Position, to: Position) => {
    const state = stateRef.current;
    if (state.isAnimating || state.gameOver) return;

    const now = Date.now();
    if (now - lastSwapRef.current < 500) {
      inputBufferRef.current = [from, to];
      return;
    }

    if (!isAdjacent(from, to)) return;

    state.isAnimating = true;
    lastSwapRef.current = now;

    const testGrid = cloneGrid(stateRef.current.grid);
    swapCells(testGrid, from, to);

    const matchResult = findMatches(testGrid);
    if (matchResult.matches.length === 0) {
      state.isAnimating = false;
      animStateRef.current.shake = createShakeAnimation(now, 4, 200);
      requestRender();
      return;
    }

    swapCells(stateRef.current.grid, from, to);
    state.movesLeft--;
    onMovesChange(state.movesLeft);
    animStateRef.current.swaps = [createSwapAnimation(from, to, now)];

    setTimeout(() => {
      processMatches();
    }, 250);

    requestRender();
  }, [onMovesChange, requestRender]);

  const processMatches = useCallback(() => {
    const state = stateRef.current;
    const now = Date.now();

    const matchResult = findMatches(state.grid);
    if (matchResult.matches.length === 0) {
      if (state.movesLeft <= 0) {
        const stars = calculateStars(state.score, state.starThresholds);
        state.won = state.score >= state.starThresholds[1];
        state.gameOver = true;
        onGameOver(state.won, stars);
      }
      state.isAnimating = false;
      requestRender();
      return;
    }

    state.comboCount++;

    for (const match of matchResult.matches) {
      if (match.length >= 4) {
        const specialType = determineSpecialFromMatch(match);
        const lastPos = match.positions[Math.floor(match.positions.length / 2)];
        createSpecialAt(state.grid, lastPos, specialType);
      }
    }

    const matchedPositions = Array.from(matchResult.matchedPositions).map(key => {
      const [r, c] = key.split(',').map(Number);
      return { row: r, col: c };
    });

    const candyTypesForParticles = matchedPositions.map(p => state.grid[p.row][p.col].candyType);
    const newParticles = createMatchParticles(matchedPositions, candyTypesForParticles);
    state.particles.push(...newParticles);

    const matchScore = matchedPositions.length * 10 * state.comboCount;
    state.score += matchScore;
    onScoreChange(state.score);

    if (state.comboCount > 1) {
      animStateRef.current.comboText = createComboText(state.comboCount, now);
      onCombo(state.comboCount);
    }

    animStateRef.current.matchAnim = [createMatchAnimation(matchedPositions, now, 300)];

    setTimeout(() => {
      runAndAnimateCascade();
    }, 350);

    requestRender();
  }, [onScoreChange, onGameOver, requestRender]);

  const runAndAnimateCascade = useCallback(() => {
    const state = stateRef.current;
    const now = Date.now();

    const gridClone = cloneGrid(state.grid);
    const steps = runCascade(gridClone, candyTypes);

    if (steps.length === 0) {
      state.isAnimating = false;
      if (state.movesLeft <= 0) {
        const stars = calculateStars(state.score, state.starThresholds);
        state.won = state.score >= state.starThresholds[1];
        state.gameOver = true;
        onGameOver(state.won, stars);
      }
      requestRender();
      return;
    }

    const gravityAnims = [];
    for (const step of steps) {
      if (step.movements) {
        for (const mv of step.movements) {
          gravityAnims.push(createGravityAnimation(mv, now, 200));
        }
      }
    }
    animStateRef.current.gravityAnims = gravityAnims;

    state.grid = gridClone;

    setTimeout(() => {
      processMatches();
    }, 500);

    requestRender();
  }, [candyTypes, onGameOver, processMatches, requestRender]);

  function calculateStars(score: number, thresholds: [number, number, number]): number {
    if (score >= thresholds[2]) return 3;
    if (score >= thresholds[1]) return 2;
    if (score >= thresholds[0]) return 1;
    return 0;
  }

  const panGesture = Gesture.Pan()
    .onBegin((e) => {
      const col = Math.floor(e.x / CELL_SIZE);
      const row = Math.floor(e.y / CELL_SIZE);
      if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
        runOnJS(setSelectedCell)({ row, col });
      }
    })
    .onUpdate((e) => {
      if (!stateRef.current.selectedCell) return;
      const dx = e.translationX;
      const dy = e.translationY;
      const threshold = CELL_SIZE * 0.35;

      let targetCol = stateRef.current.selectedCell.col;
      let targetRow = stateRef.current.selectedCell.row;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > threshold) targetCol++;
        else if (dx < -threshold) targetCol--;
      } else {
        if (dy > threshold) targetRow++;
        else if (dy < -threshold) targetRow--;
      }

      if (targetCol !== stateRef.current.selectedCell.col || targetRow !== stateRef.current.selectedCell.row) {
        const from = stateRef.current.selectedCell;
        const to = { row: targetRow, col: targetCol };
        runOnJS(setSelectedCell)(null);
        runOnJS(executeSwap)(from, to);
      }
    })
    .onEnd(() => {
      runOnJS(setSelectedCell)(null);
    });

  function setSelectedCell(pos: Position | null) {
    stateRef.current.selectedCell = pos;
    requestRender();
  }

  const cellBackgrounds = useCallback(() => {
    const cells: React.ReactNode[] = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const x = col * CELL_SIZE;
        const y = row * CELL_SIZE;
        const isLight = (row + col) % 2 === 0;
        cells.push(
          <RoundedRect
            key={`bg-${row}-${col}`}
            x={x}
            y={y}
            width={CELL_SIZE}
            height={CELL_SIZE}
            r={2}
            color={isLight ? '#FFF0E0' : '#FFE8D0'}
          />
        );
      }
    }
    return cells;
  }, []);

  const candyElements = useCallback(() => {
    const state = stateRef.current;
    const elements: React.ReactNode[] = [];
    const now = Date.now();
    const scale = (CELL_SIZE - 8) / 24;
    const padding = 4;

    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const cell = state.grid[row][col];
        if (cell.candyType === null) continue;

        const x = col * CELL_SIZE;
        const y = row * CELL_SIZE;
        const gx = x + CELL_SIZE / 2;
        const gy = y + CELL_SIZE / 2;
        const color = CANDY_COLORS[cell.candyType];

        const basePath = candySkPaths[cell.candyType];
        const swirlPath = candySwirlPaths[cell.candyType];

        const matrix = processTransform3d([
          { translate: [x + padding, y + padding] },
          { scale: scale },
        ]);

        const scaledPath = basePath?.copy()?.transform(matrix) ?? null;

        elements.push(
          <Group key={`candy-${cell.id}`}>
            {scaledPath && <Path path={scaledPath} color={color} />}
            {swirlPath && (
              <Path
                path={swirlPath.copy().transform(matrix)}
                color="rgba(255,255,255,0.3)"
                style="stroke"
                strokeWidth={1.5}
              />
            )}
            <Circle cx={gx - 8} cy={gy - 8} r={8} color="rgba(255,255,255,0.25)" />
            {scaledPath && <Path path={scaledPath} color="rgba(255,255,255,0.15)" style="stroke" strokeWidth={2} />}
          </Group>
        );

        if (cell.specialType !== SpecialType.None) {
          const indicatorPaths = getSpecialIndicatorPaths(cell.specialType, cell.candyType);
          for (const indicator of indicatorPaths) {
            const indicatorSkPath = Skia.Path.MakeFromSVGString(indicator.path);
            if (indicatorSkPath) {
              elements.push(
                <Path
                  key={`${SpecialType[cell.specialType]}-${cell.id}-${indicator.path.length}`}
                  path={indicatorSkPath.copy().transform(matrix)}
                  color={indicator.color}
                  style={indicator.style || 'fill'}
                  strokeWidth={indicator.strokeWidth || 1}
                />
              );
            }
          }
        }
      }
    }

    return elements;
  }, [renderTick, candySkPaths, candySwirlPaths]);

  const particleElements = useCallback(() => {
    const now = Date.now();
    stateRef.current.particles = updateParticles(stateRef.current.particles, now);

    return stateRef.current.particles.map(p => (
      <Circle
        key={`p-${p.id}`}
        cx={p.x}
        cy={p.y}
        r={p.radius}
        color={p.color}
        opacity={p.opacity}
      />
    ));
  }, [renderTick]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    const tick = () => {
      if (stateRef.current.particles.length > 0) {
        requestRender();
      } else if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
    if (stateRef.current.particles.length > 0) {
      interval = setInterval(tick, 33);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [renderTick, requestRender]);

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Canvas style={{ width: canvasSize, height: canvasSize }}>
          {cellBackgrounds()}
          {candyElements()}
          {particleElements()}
        </Canvas>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
});

import { Position, Movement, Match, CascadeStep, SpecialType, CELL_SIZE } from '../engine/types';

export interface AnimatedState {
  swaps: SwapAnim[];
  matchAnim: MatchAnim[];
  gravityAnims: GravityAnim[];
  specialAnims: SpecialAnim[];
  comboText: ComboText | null;
  shake: ShakeAnim | null;
}

export interface SwapAnim {
  from: Position;
  to: Position;
  startTime: number;
  duration: number;
  progress: number;
}

export interface MatchAnim {
  positions: Position[];
  startTime: number;
  duration: number;
  progress: number;
}

export interface GravityAnim {
  from: Position;
  to: Position;
  startTime: number;
  duration: number;
  progress: number;
}

export interface SpecialAnim {
  position: Position;
  specialType: SpecialType;
  startTime: number;
  duration: number;
  progress: number;
}

export interface ComboText {
  text: string;
  startTime: number;
  duration: number;
  progress: number;
}

export interface ShakeAnim {
  intensity: number;
  startTime: number;
  duration: number;
  progress: number;
}

export const COMBO_TEXTS = ['Nice!', 'Great!', 'Amazing!', 'INCREDIBLE!'];

export function createSwapAnimation(a: Position, b: Position, now: number, duration = 200): SwapAnim {
  return {
    from: a,
    to: b,
    startTime: now,
    duration,
    progress: 0,
  };
}

export function createMatchAnimation(positions: Position[], now: number, duration = 300): MatchAnim {
  return {
    positions,
    startTime: now,
    duration,
    progress: 0,
  };
}

export function createGravityAnimation(movement: Movement, now: number, duration = 200): GravityAnim {
  return {
    from: movement.from,
    to: movement.to,
    startTime: now,
    duration,
    progress: 0,
  };
}

export function createSpecialAnimation(pos: Position, specialType: SpecialType, now: number, duration = 400): SpecialAnim {
  return {
    position: pos,
    specialType,
    startTime: now,
    duration,
    progress: 0,
  };
}

export function createComboText(comboCount: number, now: number): ComboText {
  const index = Math.min(comboCount - 1, COMBO_TEXTS.length - 1);
  return {
    text: COMBO_TEXTS[index],
    startTime: now,
    duration: 800,
    progress: 0,
  };
}

export function createShakeAnimation(now: number, intensity = 4, duration = 200): ShakeAnim {
  return {
    intensity,
    startTime: now,
    duration,
    progress: 0,
  };
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function easeOutBounce(t: number): number {
  if (t < 1 / 2.75) return 7.5625 * t * t;
  if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
  if (t < 2.5 / 2.75) return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
  return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpPos(a: Position, b: Position, t: number): { x: number; y: number } {
  return {
    x: lerp(a.col * CELL_SIZE, b.col * CELL_SIZE, t),
    y: lerp(a.row * CELL_SIZE, b.row * CELL_SIZE, t),
  };
}

export function formatComboCount(count: number): string {
  if (count >= 10) return `x${count}`;
  const text = count <= 4 ? COMBO_TEXTS[count - 1] : `${count}x Combo!`;
  return text;
}

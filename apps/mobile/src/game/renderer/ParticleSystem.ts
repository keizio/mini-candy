import { CandyType, Position } from '../engine/types';
import { CANDY_COLORS } from './CandyRenderer';

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  life: number;
  maxLife: number;
  opacity: number;
}

let particleIdCounter = 0;

export function createMatchParticles(
  positions: Position[],
  candyTypes: (CandyType | null)[]
): Particle[] {
  const particles: Particle[] = [];
  const now = Date.now();

  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    const candyType = candyTypes[i] ?? CandyType.Red;
    const color = CANDY_COLORS[candyType];
    const count = 6;

    for (let j = 0; j < count; j++) {
      const angle = (Math.PI * 2 * j) / count + Math.random() * 0.5;
      const speed = 2 + Math.random() * 3;

      particles.push({
        id: ++particleIdCounter,
        x: pos.col * 64 + 32,
        y: pos.row * 64 + 32,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        radius: 3 + Math.random() * 3,
        color,
        life: now,
        maxLife: 400 + Math.random() * 200,
        opacity: 1,
      });
    }
  }

  return particles;
}

export function createSpecialParticles(pos: Position): Particle[] {
  const particles: Particle[] = [];
  const now = Date.now();
  const colors = ['#FFD700', '#FFFFFF', '#FF6B9D', '#44CC44'];

  for (let i = 0; i < 20; i++) {
    const angle = (Math.PI * 2 * i) / 20;
    const speed = 4 + Math.random() * 4;

    particles.push({
      id: ++particleIdCounter,
      x: pos.col * 64 + 32,
      y: pos.row * 64 + 32,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 2 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: now,
      maxLife: 600 + Math.random() * 300,
      opacity: 1,
    });
  }

  return particles;
}

export function updateParticles(particles: Particle[], now: number): Particle[] {
  return particles.filter(p => {
    const elapsed = now - p.life;
    if (elapsed >= p.maxLife) return false;

    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.15;
    p.opacity = 1 - elapsed / p.maxLife;

    return true;
  });
}

export function createCoinRainParticles(x: number, y: number): Particle[] {
  const particles: Particle[] = [];
  const now = Date.now();

  for (let i = 0; i < 15; i++) {
    particles.push({
      id: ++particleIdCounter,
      x: x + (Math.random() - 0.5) * 60,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: -3 - Math.random() * 3,
      radius: 4,
      color: '#FFD700',
      life: now,
      maxLife: 800 + Math.random() * 400,
      opacity: 1,
    });
  }

  return particles;
}

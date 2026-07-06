import { CandyType, SpecialType, CELL_SIZE } from '../engine/types';

export const CANDY_COLORS: Record<CandyType, string> = {
  [CandyType.Red]: '#FF4444',
  [CandyType.Blue]: '#4488FF',
  [CandyType.Green]: '#44CC44',
  [CandyType.Yellow]: '#FFDD44',
  [CandyType.Purple]: '#BB44FF',
  [CandyType.Orange]: '#FF8844',
};

export const CANDY_HIGHLIGHT: Record<CandyType, string> = {
  [CandyType.Red]: '#FF8888',
  [CandyType.Blue]: '#88BBFF',
  [CandyType.Green]: '#88EE88',
  [CandyType.Yellow]: '#FFEE88',
  [CandyType.Purple]: '#DD88FF',
  [CandyType.Orange]: '#FFBB88',
};

const PADDING = 4;

export function getCandyPath(candyType: CandyType): string {
  switch (candyType) {
    case CandyType.Red:
      return 'M12,2 C18.6,2 24,7.4 24,12 C24,18.6 18.6,24 12,24 C5.4,24 0,18.6 0,12 C0,7.4 5.4,2 12,2 Z';
    case CandyType.Blue:
      return 'M12,1 C14.5,4 22,9.5 23,12 C22,14.5 14.5,20 12,23 C9.5,20 2,14.5 1,12 C2,9.5 9.5,4 12,1 Z';
    case CandyType.Green:
      return 'M12,0 C18,0 24,6 24,13 C24,19 18,23 12,24 C6,23 0,19 0,13 C0,6 6,0 12,0 Z';
    case CandyType.Yellow:
      return 'M12,0 L15.5,8.5 L24,9.5 L17.5,15.5 L19.5,24 L12,19.5 L4.5,24 L6.5,15.5 L0,9.5 L8.5,8.5 Z';
    case CandyType.Purple:
      return 'M12,22 C10,20 2,14 2,8 C2,4 5,2 8,3 C10,4 11,6 12,8 C13,6 14,4 16,3 C19,2 22,4 22,8 C22,14 14,20 12,22 Z';
    case CandyType.Orange:
      return 'M6,2 L18,2 C21,2 24,5 24,12 C24,19 21,22 18,22 L6,22 C3,22 0,19 0,12 C0,5 3,2 6,2 Z';
  }
}

export function getCandySwirlPath(candyType: CandyType): string | null {
  if (candyType !== CandyType.Red) return null;
  return 'M12,5 C15.9,5 19,8.1 19,12 C19,15.9 15.9,19 12,19 C8.1,19 5,15.9 5,12 C5,9.2 6.8,6.8 9.5,6';
}

export function getCandyHighlightPoints(candyType: CandyType): { cx: number; cy: number; r: number } | null {
  return { cx: 7, cy: 7, r: 5 };
}

export function getSpecialIndicatorPaths(
  specialType: SpecialType,
  candyType: CandyType
): Array<{ path: string; color: string; strokeWidth?: number; style?: 'fill' | 'stroke' }> {
  switch (specialType) {
    case SpecialType.StripedHorizontal:
      return [
        { path: 'M2,8 L22,8', color: 'rgba(255,255,255,0.5)', strokeWidth: 3, style: 'stroke' },
        { path: 'M2,12 L22,12', color: 'rgba(255,255,255,0.5)', strokeWidth: 3, style: 'stroke' },
        { path: 'M2,16 L22,16', color: 'rgba(255,255,255,0.5)', strokeWidth: 3, style: 'stroke' },
      ];
    case SpecialType.StripedVertical:
      return [
        { path: 'M8,2 L8,22', color: 'rgba(255,255,255,0.5)', strokeWidth: 3, style: 'stroke' },
        { path: 'M12,2 L12,22', color: 'rgba(255,255,255,0.5)', strokeWidth: 3, style: 'stroke' },
        { path: 'M16,2 L16,22', color: 'rgba(255,255,255,0.5)', strokeWidth: 3, style: 'stroke' },
      ];
    case SpecialType.Wrapped:
      return [
        { path: 'M4,4 L20,20', color: '#FFD700', strokeWidth: 2.5, style: 'stroke' },
        { path: 'M20,4 L4,20', color: '#FFD700', strokeWidth: 2.5, style: 'stroke' },
        { path: 'M4,4 C4,4 12,4 12,12 C12,20 20,20 20,20', color: '#FFD700', strokeWidth: 2, style: 'stroke' },
        { path: 'M20,4 C20,4 12,4 12,12 C12,20 4,20 4,20', color: '#FFD700', strokeWidth: 2, style: 'stroke' },
      ];
    case SpecialType.ColorBomb:
      return [
        { path: 'M12,2 C17.5,2 22,6.5 22,12 C22,17.5 17.5,22 12,22 C6.5,22 2,17.5 2,12 C2,6.5 6.5,2 12,2 Z', color: '#1a1a2e' },
        { path: 'M12,4 C16.4,4 20,7.6 20,12 C20,16.4 16.4,20 12,20 C7.6,20 4,16.4 4,12 C4,7.6 7.6,4 12,4 Z', color: 'rgba(255,215,0,0.6)', strokeWidth: 2, style: 'stroke' },
        { path: 'M12,6 C15.3,6 18,8.7 18,12 C18,15.3 15.3,18 12,18 C8.7,18 6,15.3 6,12 C6,8.7 8.7,6 12,6 Z', color: 'rgba(255,215,0,0.8)', strokeWidth: 1.5, style: 'stroke' },
        { path: 'M6,6 L8,8', color: '#FFD700', strokeWidth: 1.5, style: 'stroke' },
        { path: 'M18,6 L16,8', color: '#FFD700', strokeWidth: 1.5, style: 'stroke' },
        { path: 'M6,18 L8,16', color: '#FFD700', strokeWidth: 1.5, style: 'stroke' },
        { path: 'M18,18 L16,16', color: '#FFD700', strokeWidth: 1.5, style: 'stroke' },
      ];
    default:
      return [];
  }
}
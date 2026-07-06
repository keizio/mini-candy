import { Position } from '../engine/types';

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  highlight?: 'grid' | 'candy' | 'score' | 'moves' | 'goal';
  highlightPosition?: Position;
  highlightPositions?: Position[];
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
  action?: 'swap' | 'wait' | 'tap';
  waitForMatch?: boolean;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Mini Candy!',
    description: 'Match 3 or more candies of the same color to score points.',
    highlight: 'grid',
    autoAdvance: true,
    autoAdvanceDelay: 1500,
  },
  {
    id: 'swap',
    title: 'Swap Candies',
    description: 'Drag a candy to swap it with an adjacent candy. Make a match of 3 or more!',
    highlight: 'grid',
    action: 'swap',
  },
  {
    id: 'match',
    title: 'Match!',
    description: 'When 3 or more candies line up, they disappear and you earn points!',
    highlight: 'grid',
    waitForMatch: true,
    autoAdvance: true,
    autoAdvanceDelay: 1000,
  },
  {
    id: 'cascade',
    title: 'Chain Reactions!',
    description: 'Candies fall down to fill gaps, creating chain reactions. Plan ahead!',
    highlight: 'grid',
    autoAdvance: true,
    autoAdvanceDelay: 1500,
  },
  {
    id: 'goal',
    title: 'Level Goal',
    description: 'Reach the target score within the given moves to win. More stars for higher scores!',
    highlight: 'goal',
    autoAdvance: true,
    autoAdvanceDelay: 2000,
  },
  {
    id: 'special',
    title: 'Special Candies',
    description: 'Match 4 candies to create striped candies. Match 5 for color bombs!',
    highlight: 'grid',
    autoAdvance: true,
    autoAdvanceDelay: 2000,
  },
  {
    id: 'complete',
    title: 'You Got This!',
    description: 'Complete the tutorial to earn 100 bonus coins!',
    highlight: 'grid',
    action: 'tap',
  },
];

export const TUTORIAL_LEVEL_CONFIG = {
  id: 0,
  world: 0,
  name: 'Tutorial',
  rows: 6,
  cols: 6,
  candyTypes: 3,
  moves: 10,
  targetScore: 300,
  goal: { type: 'score', targetScore: 300 } as const,
  starThresholds: [120, 195, 300] as [number, number, number],
  allowSpecialCandies: false,
  unlockedByDefault: true,
};

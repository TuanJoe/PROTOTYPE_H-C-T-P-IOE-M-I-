export enum MasteryLevel {
  STARTER = 'Starter',
  EXPLORER = 'Explorer',
  CHALLENGER = 'Challenger',
  ACHIEVER = 'Achiever',
  CHAMPION = 'Champion',
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  masteryPoints: number;
  bestScore: number; // 0-10
  attempts: number;
  unlocked: boolean;
}

export interface UserProgress {
  totalPoints: number;
  units: Record<string, Unit>;
  streak: number;
  lastActive: string;
}

export const getMasteryLevel = (points: number): MasteryLevel => {
  if (points >= 100) return MasteryLevel.CHAMPION;
  if (points >= 80) return MasteryLevel.ACHIEVER;
  if (points >= 60) return MasteryLevel.CHALLENGER;
  if (points >= 50) return MasteryLevel.EXPLORER;
  return MasteryLevel.STARTER;
};

export const getLevelBadge = (level: MasteryLevel): string => {
  switch (level) {
    case MasteryLevel.EXPLORER: return '🍎';
    case MasteryLevel.CHALLENGER: return '⚔️';
    case MasteryLevel.ACHIEVER: return '🏅';
    case MasteryLevel.CHAMPION: return '🏆';
    default: return '🌱';
  }
};

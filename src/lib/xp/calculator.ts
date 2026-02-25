import type { Difficulty } from "@/types";

const BASE_XP: Record<Difficulty, number> = {
  leicht: 5,
  mittel: 10,
  schwer: 20,
};

const PERFECT_BONUS = 10;

export function calcXp({
  difficulty,
  grade,
  correct,
  total,
}: {
  difficulty: Difficulty;
  grade: number;
  correct: number;
  total: number;
}): number {
  if (total === 0) return 0;
  const base = BASE_XP[difficulty];
  const gradeMult = Math.max(1, Math.floor(grade / 3));
  const accuracy = correct / total;
  const perfectBonus = correct === total ? PERFECT_BONUS : 0;
  return Math.round(base * gradeMult * accuracy) + perfectBonus;
}

export function xpForLevel(level: number): number {
  return level * 100;
}

export function levelFromXp(xpTotal: number): number {
  return Math.floor(xpTotal / 100) + 1;
}

export function xpProgressInLevel(xpTotal: number): { current: number; needed: number; percent: number } {
  const level = levelFromXp(xpTotal);
  const xpAtLevelStart = (level - 1) * 100;
  const current = xpTotal - xpAtLevelStart;
  const needed = 100;
  return { current, needed, percent: Math.min(100, Math.round((current / needed) * 100)) };
}

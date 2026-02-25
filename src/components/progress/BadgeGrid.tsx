"use client";

import { BADGES } from "@/lib/badges/definitions";
import type { BadgeEarned } from "@/types";

interface BadgeGridProps {
  earned: BadgeEarned[];
  showAll?: boolean;
}

export default function BadgeGrid({ earned, showAll = false }: BadgeGridProps) {
  const earnedIds = new Set(earned.map((b) => b.badgeId));

  const badges = showAll ? BADGES : BADGES.filter((b) => earnedIds.has(b.id));

  if (badges.length === 0) {
    return (
      <div className="text-center py-6 text-gray-400 dark:text-gray-500">
        <p className="text-3xl mb-2">🏅</p>
        <p className="text-kids-sm">Noch keine Abzeichen – spiel weiter!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {badges.map((badge) => {
        const isEarned = earnedIds.has(badge.id);
        return (
          <div
            key={badge.id}
            className={`rounded-kids p-3 text-center transition-all ${
              isEarned
                ? "bg-kidsYellow/20 dark:bg-yellow-900/30 border-2 border-kidsYellow"
                : "bg-gray-100 dark:bg-slate-700 opacity-40 grayscale"
            }`}
          >
            <div className="text-3xl mb-1">{badge.emoji}</div>
            <p className="text-xs font-bold text-gray-700 dark:text-gray-200 leading-tight">{badge.name}</p>
            {isEarned && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">✓ Verdient!</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

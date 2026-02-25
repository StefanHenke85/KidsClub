"use client";

import { xpProgressInLevel } from "@/lib/xp/calculator";

interface XpBarProps {
  xpTotal: number;
  level: number;
  compact?: boolean;
}

export default function XpBar({ xpTotal, level, compact = false }: XpBarProps) {
  const { current, needed, percent } = xpProgressInLevel(xpTotal);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-kids-sm font-black text-kidsYellow">Lv.{level}</span>
        <div className="flex-1 h-3 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-kidsYellow to-kidsOrange rounded-full transition-all duration-700"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">{current}/{needed}</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-kids p-4 shadow-kids">
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <div>
            <p className="text-kids-sm font-black text-gray-800 dark:text-white">Level {level}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{xpTotal} XP gesamt</p>
          </div>
        </div>
        <p className="text-kids-sm text-gray-600 dark:text-gray-300 self-end">
          {current}/{needed} XP
        </p>
      </div>
      <div className="h-5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-kidsYellow to-kidsOrange rounded-full transition-all duration-700 flex items-center justify-end pr-2"
          style={{ width: `${Math.max(percent, 5)}%` }}
        >
          {percent > 15 && (
            <span className="text-xs font-black text-white">{percent}%</span>
          )}
        </div>
      </div>
    </div>
  );
}

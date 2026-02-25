"use client";

interface StreakDisplayProps {
  streak: number;
  compact?: boolean;
}

export default function StreakDisplay({ streak, compact = false }: StreakDisplayProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <span className="text-xl">{streak > 0 ? "🔥" : "💤"}</span>
        <span className="text-kids-sm font-black text-orange-500">{streak}</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-kids p-4 shadow-kids text-center">
      <div className="text-4xl mb-1">{streak >= 7 ? "🏆" : streak >= 3 ? "🔥" : "💤"}</div>
      <p className="text-kids-lg font-black text-orange-500">{streak} Tage</p>
      <p className="text-kids-sm text-gray-500 dark:text-gray-400">Streak</p>
      {streak >= 3 && (
        <p className="text-xs text-orange-400 mt-1">
          {streak >= 7 ? "🏆 Mega-Streak!" : streak >= 5 ? "🔥🔥 Super-Streak!" : "🔥 Toll!"}
        </p>
      )}
    </div>
  );
}

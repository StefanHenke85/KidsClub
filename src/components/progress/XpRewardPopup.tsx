"use client";

import { useEffect } from "react";
import { getBadge } from "@/lib/badges/definitions";
import type { XpRewardResult } from "@/types";

interface XpRewardPopupProps {
  result: XpRewardResult;
  onClose: () => void;
}

export default function XpRewardPopup({ result, onClose }: XpRewardPopupProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-kids-lg p-6 max-w-xs w-full mx-4 text-center shadow-2xl animate-pop"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-5xl mb-3">🎉</div>
        <p className="text-kids-lg font-black text-gray-800 dark:text-white mb-1">
          +{result.xpEarned} XP!
        </p>
        <p className="text-kids-sm text-gray-600 dark:text-gray-300 mb-3">
          Gesamt: {result.newTotal} XP · Level {result.newLevel}
        </p>

        {result.leveledUp && (
          <div className="bg-kidsYellow/20 dark:bg-yellow-900/30 rounded-kids p-3 mb-3">
            <p className="text-kids-sm font-black text-yellow-600 dark:text-yellow-400">
              🚀 Level Up! Du bist jetzt Level {result.newLevel}!
            </p>
          </div>
        )}

        {result.newBadges.length > 0 && (
          <div className="mt-2">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">Neue Abzeichen:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {result.newBadges.map((b) => {
                const def = getBadge(b.badgeId);
                return def ? (
                  <div key={b.badgeId} className="bg-kidsYellow/20 rounded-kids px-3 py-1">
                    <span className="text-lg">{def.emoji}</span>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-200 ml-1">{def.name}</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 bg-kidsGreen text-white rounded-kids px-6 py-2 text-kids-sm font-black"
        >
          Weiter! 🎮
        </button>
      </div>
    </div>
  );
}

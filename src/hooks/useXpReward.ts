"use client";

import { useState } from "react";
import { useChildSessionStore } from "@/store/useChildSessionStore";
import type { Difficulty, XpRewardResult } from "@/types";

interface GameCompleteParams {
  game: "mathe" | "deutsch" | "logik" | "englisch" | "sachkunde";
  difficulty: Difficulty;
  correct: number;
  total: number;
  durationSeconds?: number;
}

export function useXpReward() {
  const { session, updateXp } = useChildSessionStore();
  const [result, setResult] = useState<XpRewardResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function submitGame(params: GameCompleteParams) {
    if (!session) return null;

    setLoading(true);
    try {
      const res = await fetch("/api/progress/game-complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (!res.ok) return null;

      const data: XpRewardResult = await res.json();
      setResult(data);
      updateXp(data.newTotal, data.newLevel);
      return data;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { submitGame, result, loading, clearResult: () => setResult(null) };
}

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameScore } from "@/types";

interface GameStore {
  scores: GameScore[];
  addScore: (score: GameScore) => void;
  getBestScore: (game: GameScore["game"]) => number;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      scores: [],
      addScore: (score) =>
        set((s) => ({ scores: [...s.scores.slice(-50), score] })),
      getBestScore: (game) => {
        const scores = get().scores.filter((s) => s.game === game);
        return scores.length ? Math.max(...scores.map((s) => s.score)) : 0;
      },
    }),
    { name: "kidsclub-games" }
  )
);

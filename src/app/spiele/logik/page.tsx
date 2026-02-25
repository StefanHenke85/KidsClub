"use client";

import { useState, useCallback } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import KidsCard from "@/components/ui/KidsCard";
import BigButton from "@/components/ui/BigButton";
import XpRewardPopup from "@/components/progress/XpRewardPopup";
import { generateLogikPattern } from "@/lib/gameLogic/logikPatterns";
import { useGameStore } from "@/store/useGameStore";
import { useChildSessionStore } from "@/store/useChildSessionStore";
import { useXpReward } from "@/hooks/useXpReward";
import type { LogikPattern } from "@/types";

const MAX_ROUNDS = 10;

export default function LogikPage() {
  const { addScore, getBestScore } = useGameStore();
  const { session } = useChildSessionStore();
  const { submitGame, result: xpResult, clearResult } = useXpReward();

  const [started, setStarted] = useState(false);
  const [pattern, setPattern] = useState<LogikPattern | null>(null);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const nextPattern = useCallback(() => {
    setPattern(generateLogikPattern());
    setFeedback(null);
    setSelected(null);
  }, []);

  const start = () => {
    setScore(0);
    setCorrect(0);
    setRound(0);
    setGameOver(false);
    setStarted(true);
    nextPattern();
  };

  const answer = (choice: string) => {
    if (feedback || !pattern) return;
    setSelected(choice);
    const isCorrect = choice === pattern.correct;
    setFeedback(isCorrect ? "correct" : "wrong");
    const newScore = isCorrect ? score + 10 : score;
    const newCorrect = isCorrect ? correct + 1 : correct;
    if (isCorrect) { setScore(newScore); setCorrect(newCorrect); }

    const nextRound = round + 1;
    if (nextRound >= MAX_ROUNDS) {
      setTimeout(() => {
        setGameOver(true);
        addScore({ game: "logik", score: newScore, level: 1, date: Date.now() });
        if (session) {
          submitGame({ game: "logik", difficulty: "mittel", correct: newCorrect, total: MAX_ROUNDS });
        }
      }, 900);
    } else {
      setRound(nextRound);
      setTimeout(nextPattern, 900);
    }
  };

  const best = getBestScore("logik");

  if (!started) {
    return (
      <PageWrapper emoji="🧩" title="Logik" color="bg-purple-50 dark:bg-slate-900" backHref="/spiele">
        <KidsCard className="text-center py-8 dark:bg-slate-800">
          <p className="text-kids-md font-bold text-gray-600 dark:text-gray-300 mb-4">
            Erkenne das Muster und finde das nächste Zeichen!
          </p>
          {best > 0 && <p className="text-kids-sm text-gray-400 mb-4">Dein Rekord: {best} Punkte ⭐</p>}
          <BigButton color="purple" size="lg" onClick={start}>Spielen! 🧩</BigButton>
        </KidsCard>
      </PageWrapper>
    );
  }

  if (gameOver) {
    return (
      <PageWrapper emoji="🧩" title="Logik" color="bg-purple-50 dark:bg-slate-900" backHref="/spiele">
        {xpResult && <XpRewardPopup result={xpResult} onClose={clearResult} />}
        <KidsCard className="text-center py-8 dark:bg-slate-800">
          <div className="text-6xl mb-4">{score >= 80 ? "🎉" : "💪"}</div>
          <p className="text-kids-xl font-black text-gray-800 dark:text-white mb-2">{score} / 100 Punkte</p>
          {score > best && <p className="text-kids-md font-bold text-kidsOrange mb-2">Neuer Rekord! ⭐</p>}
          <p className="text-kids-sm text-gray-500 dark:text-gray-400 mb-6">
            {score >= 80 ? "Großartig! 🌟" : score >= 50 ? "Gut gemacht! 👍" : "Weiter üben! 💪"}
          </p>
          <BigButton color="purple" size="md" onClick={start}>Nochmal</BigButton>
        </KidsCard>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper emoji="🧩" title="Logik" color="bg-purple-50 dark:bg-slate-900" backHref="/spiele">
      <div className="flex justify-between mb-4">
        <span className="text-kids-md font-black text-gray-700 dark:text-gray-200">⭐ {score}</span>
        <span className="text-kids-sm font-bold text-gray-500 dark:text-gray-400">Runde {round + 1}/{MAX_ROUNDS}</span>
      </div>

      {pattern && (
        <>
          <KidsCard className="text-center mb-5 dark:bg-slate-800">
            <p className="text-kids-sm font-bold text-gray-500 dark:text-gray-400 mb-3">Was kommt als nächstes?</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {pattern.sequence.map((s, i) => (
                <span key={i} className="text-4xl">{s}</span>
              ))}
              <span className="text-4xl font-black text-gray-300 border-4 border-dashed border-gray-300 rounded-kids w-14 h-14 flex items-center justify-center">?</span>
            </div>
          </KidsCard>

          <div className="grid grid-cols-2 gap-3">
            {pattern.choices.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => answer(c)}
                className={`
                  rounded-kids-lg py-5 text-4xl transition-all
                  ${selected === c && feedback === "correct" ? "bg-kidsGreen scale-105" : ""}
                  ${selected === c && feedback === "wrong" ? "bg-red-200" : ""}
                  ${selected !== c && feedback === "correct" && c === pattern.correct ? "bg-kidsGreen" : ""}
                  ${!feedback ? "bg-white dark:bg-slate-700 shadow-kids active:translate-y-1" : ""}
                `}
              >
                {c}
              </button>
            ))}
          </div>
        </>
      )}
    </PageWrapper>
  );
}

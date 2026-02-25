"use client";

import { useState, useCallback } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import KidsCard from "@/components/ui/KidsCard";
import BigButton from "@/components/ui/BigButton";
import { generateLogikPattern } from "@/lib/gameLogic/logikPatterns";
import { useGameStore } from "@/store/useGameStore";
import type { LogikPattern } from "@/types";

export default function LogikPage() {
  const { addScore, getBestScore } = useGameStore();
  const [started, setStarted] = useState(false);
  const [pattern, setPattern] = useState<LogikPattern | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const MAX_ROUNDS = 10;

  const nextPattern = useCallback(() => {
    setPattern(generateLogikPattern());
    setFeedback(null);
    setSelected(null);
  }, []);

  const start = () => {
    setScore(0);
    setRound(0);
    setGameOver(false);
    setStarted(true);
    nextPattern();
  };

  const answer = (choice: string) => {
    if (feedback || !pattern) return;
    setSelected(choice);
    const correct = choice === pattern.correct;
    setFeedback(correct ? "correct" : "wrong");
    if (correct) setScore((p) => p + 10);

    const nextRound = round + 1;
    if (nextRound >= MAX_ROUNDS) {
      setTimeout(() => {
        setGameOver(true);
        addScore({ game: "logik", score: correct ? score + 10 : score, level: 1, date: Date.now() });
      }, 900);
    } else {
      setRound(nextRound);
      setTimeout(nextPattern, 900);
    }
  };

  const best = getBestScore("logik");

  if (!started) {
    return (
      <PageWrapper emoji="🧩" title="Logik" color="bg-purple-50">
        <KidsCard className="text-center py-8">
          <p className="text-kids-md font-bold text-gray-600 mb-4">
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
      <PageWrapper emoji="🧩" title="Logik" color="bg-purple-50">
        <KidsCard className="text-center py-8">
          <div className="text-6xl mb-4">{score >= 80 ? "🎉" : "💪"}</div>
          <p className="text-kids-xl font-black text-gray-800 mb-2">{score} / 100 Punkte</p>
          {score > best && <p className="text-kids-md font-bold text-kidsOrange mb-2">Neuer Rekord! ⭐</p>}
          <p className="text-kids-sm text-gray-500 mb-6">
            {score >= 80 ? "Großartig!" : score >= 50 ? "Gut gemacht!" : "Weiter üben!"}
          </p>
          <BigButton color="purple" size="md" onClick={start}>Nochmal</BigButton>
        </KidsCard>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper emoji="🧩" title="Logik" color="bg-purple-50">
      <div className="flex justify-between mb-4">
        <span className="text-kids-md font-black text-gray-700">⭐ {score}</span>
        <span className="text-kids-sm font-bold text-gray-500">Runde {round + 1}/{MAX_ROUNDS}</span>
      </div>

      {pattern && (
        <>
          {/* Muster anzeigen */}
          <KidsCard className="text-center mb-5">
            <p className="text-kids-sm font-bold text-gray-500 mb-3">Was kommt als nächstes?</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {pattern.sequence.map((s, i) => (
                <span key={i} className="text-4xl">{s}</span>
              ))}
              <span className="text-4xl font-black text-gray-300 border-4 border-dashed border-gray-300 rounded-kids w-14 h-14 flex items-center justify-center">?</span>
            </div>
          </KidsCard>

          {/* Antwortmöglichkeiten */}
          <div className="grid grid-cols-2 gap-3">
            {pattern.choices.map((c) => (
              <button
                key={c}
                onClick={() => answer(c)}
                className={`
                  rounded-kids-lg py-5 text-4xl transition-all
                  ${selected === c && feedback === "correct" ? "bg-kidsGreen scale-105" : ""}
                  ${selected === c && feedback === "wrong" ? "bg-red-200" : ""}
                  ${selected !== c && feedback === "correct" && c === pattern.correct ? "bg-kidsGreen" : ""}
                  ${!feedback ? "bg-white shadow-kids active:translate-y-1" : ""}
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

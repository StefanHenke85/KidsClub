"use client";

import { useState, useEffect, useCallback } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import KidsCard from "@/components/ui/KidsCard";
import BigButton from "@/components/ui/BigButton";
import { generateMathQuestion, generateChoices } from "@/lib/gameLogic/mathGenerator";
import { useGameStore } from "@/store/useGameStore";
import type { Difficulty, MathQuestion } from "@/types";

const DIFFICULTIES: { id: Difficulty; label: string; emoji: string }[] = [
  { id: "leicht", label: "Leicht",  emoji: "🌱" },
  { id: "mittel", label: "Mittel",  emoji: "🌟" },
  { id: "schwer", label: "Schwer",  emoji: "🔥" },
];

const TIMER_START = 30;

export default function MathePage() {
  const { addScore, getBestScore } = useGameStore();
  const [difficulty, setDifficulty] = useState<Difficulty>("leicht");
  const [started, setStarted] = useState(false);
  const [question, setQuestion] = useState<MathQuestion | null>(null);
  const [choices, setChoices] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [timer, setTimer] = useState(TIMER_START);
  const [gameOver, setGameOver] = useState(false);

  const nextQuestion = useCallback(() => {
    const q = generateMathQuestion(difficulty);
    setQuestion(q);
    setChoices(generateChoices(q.answer));
    setFeedback(null);
  }, [difficulty]);

  useEffect(() => {
    if (!started || gameOver) return;
    if (timer <= 0) {
      setGameOver(true);
      addScore({ game: "mathe", score, level: streak, date: Date.now() });
      return;
    }
    const t = setTimeout(() => setTimer((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, started, gameOver, score, streak, addScore]);

  const start = () => {
    setScore(0);
    setStreak(0);
    setTimer(TIMER_START);
    setGameOver(false);
    setStarted(true);
    nextQuestion();
  };

  const answer = (val: number) => {
    if (feedback || !question) return;
    const correct = val === question.answer;
    setFeedback(correct ? "correct" : "wrong");
    if (correct) {
      setScore((p) => p + 10 + streak * 2);
      setStreak((p) => p + 1);
    } else {
      setStreak(0);
    }
    setTimeout(nextQuestion, 700);
  };

  const best = getBestScore("mathe");

  if (!started) {
    return (
      <PageWrapper emoji="🔢" title="Mathe" color="bg-blue-50">
        <KidsCard className="text-center mb-4">
          <p className="text-kids-md font-bold text-gray-600 mb-4">
            Beantworte so viele Aufgaben wie möglich in {TIMER_START} Sekunden!
          </p>
          {best > 0 && <p className="text-kids-sm text-gray-400 mb-3">Dein Rekord: {best} Punkte ⭐</p>}
          <div className="flex gap-2 justify-center mb-5">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.id}
                onClick={() => setDifficulty(d.id)}
                className={`px-4 py-2 rounded-kids font-bold text-kids-sm ${
                  difficulty === d.id ? "bg-kidsBlue shadow-kids" : "bg-gray-100"
                }`}
              >
                {d.emoji} {d.label}
              </button>
            ))}
          </div>
          <BigButton color="blue" size="lg" onClick={start}>Starten! 🚀</BigButton>
        </KidsCard>
      </PageWrapper>
    );
  }

  if (gameOver) {
    return (
      <PageWrapper emoji="🔢" title="Mathe" color="bg-blue-50">
        <KidsCard className="text-center py-8">
          <div className="text-6xl mb-4">{score >= 50 ? "🎉" : "💪"}</div>
          <p className="text-kids-xl font-black text-gray-800 mb-2">{score} Punkte!</p>
          {score > best && <p className="text-kids-md font-bold text-kidsOrange mb-2">Neuer Rekord! ⭐</p>}
          <p className="text-kids-sm text-gray-500 mb-6">
            {score >= 80 ? "Super gemacht!" : score >= 40 ? "Toll!" : "Weiter üben!"}
          </p>
          <BigButton color="blue" size="md" onClick={start}>Nochmal spielen</BigButton>
        </KidsCard>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper emoji="🔢" title="Mathe" color="bg-blue-50">
      {/* Kopfzeile */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-kids-md font-black text-gray-700">⭐ {score}</span>
        <span className={`text-kids-lg font-black ${timer <= 10 ? "text-red-500 animate-pulse" : "text-gray-700"}`}>
          ⏱ {timer}s
        </span>
        {streak >= 3 && <span className="text-kids-sm font-bold text-kidsOrange">🔥 {streak}x</span>}
      </div>

      {/* Frage */}
      {question && (
        <KidsCard className="text-center mb-5 py-8">
          <p className="text-kids-xl font-black text-gray-800">
            {question.num1} {question.operator} {question.num2} = ?
          </p>
        </KidsCard>
      )}

      {/* Antworten */}
      <div className="grid grid-cols-2 gap-3">
        {choices.map((c) => (
          <button
            key={c}
            onClick={() => answer(c)}
            className={`
              rounded-kids-lg py-5 text-kids-lg font-black transition-all
              ${feedback && c === question?.answer ? "bg-kidsGreen shadow-[0_5px_0_#2daa7a] scale-105" : ""}
              ${feedback === "wrong" && c !== question?.answer ? "opacity-40" : ""}
              ${!feedback ? "bg-white shadow-kids active:translate-y-1 hover:brightness-95" : ""}
            `}
          >
            {c}
          </button>
        ))}
      </div>
    </PageWrapper>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import KidsCard from "@/components/ui/KidsCard";
import BigButton from "@/components/ui/BigButton";
import XpRewardPopup from "@/components/progress/XpRewardPopup";
import { generateMathQuestion } from "@/lib/curriculum/mathByGrade";
import { generateChoices } from "@/lib/gameLogic/mathGenerator";
import { useGameStore } from "@/store/useGameStore";
import { useChildSessionStore } from "@/store/useChildSessionStore";
import { useXpReward } from "@/hooks/useXpReward";
import type { Difficulty, MathQuestion, GradeLevel } from "@/types";

const DIFFICULTIES: { id: Difficulty; label: string; emoji: string }[] = [
  { id: "leicht", label: "Leicht", emoji: "🌱" },
  { id: "mittel", label: "Mittel", emoji: "🌟" },
  { id: "schwer", label: "Schwer", emoji: "🔥" },
];

const GRADES = Array.from({ length: 13 }, (_, i) => (i + 1) as GradeLevel);
const TIMER_START = 30;

export default function MathePage() {
  const { addScore, getBestScore } = useGameStore();
  const { session } = useChildSessionStore();
  const { submitGame, result: xpResult, clearResult } = useXpReward();

  const [difficulty, setDifficulty] = useState<Difficulty>("leicht");
  const [grade, setGrade] = useState(session?.grade ?? 1);
  const [started, setStarted] = useState(false);
  const [question, setQuestion] = useState<MathQuestion | null>(null);
  const [choices, setChoices] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [timer, setTimer] = useState(TIMER_START);
  const [gameOver, setGameOver] = useState(false);
  const startTime = useRef<number>(0);

  // Sync grade with session
  useEffect(() => {
    if (session?.grade) setGrade(session.grade);
  }, [session?.grade]);

  const nextQuestion = useCallback(() => {
    const q = generateMathQuestion(grade, difficulty);
    setQuestion(q);
    setChoices(generateChoices(q.answer));
    setFeedback(null);
  }, [grade, difficulty]);

  useEffect(() => {
    if (!started || gameOver) return;
    if (timer <= 0) {
      setGameOver(true);
      addScore({ game: "mathe", score, level: streak, date: Date.now() });
      if (session) {
        submitGame({
          game: "mathe",
          difficulty,
          correct,
          total,
          durationSeconds: TIMER_START,
        });
      }
      return;
    }
    const t = setTimeout(() => setTimer((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, started, gameOver, score, streak, correct, total, difficulty, session, addScore, submitGame]);

  const start = () => {
    setScore(0);
    setCorrect(0);
    setTotal(0);
    setStreak(0);
    setTimer(TIMER_START);
    setGameOver(false);
    setStarted(true);
    startTime.current = Date.now();
    nextQuestion();
  };

  const answerQ = (val: number) => {
    if (feedback || !question) return;
    const isCorrect = val === question.answer;
    setFeedback(isCorrect ? "correct" : "wrong");
    setTotal((p) => p + 1);
    if (isCorrect) {
      setScore((p) => p + 10 + streak * 2);
      setCorrect((p) => p + 1);
      setStreak((p) => p + 1);
    } else {
      setStreak(0);
    }
    setTimeout(nextQuestion, 700);
  };

  const best = getBestScore("mathe");

  if (!started) {
    return (
      <PageWrapper emoji="🔢" title="Mathe" color="bg-blue-50 dark:bg-slate-900" backHref="/spiele">
        <KidsCard className="text-center mb-4 dark:bg-slate-800">
          <p className="text-kids-md font-bold text-gray-600 dark:text-gray-300 mb-4">
            Beantworte Aufgaben in {TIMER_START} Sekunden!
          </p>
          {best > 0 && <p className="text-kids-sm text-gray-400 mb-3">Dein Rekord: {best} Punkte ⭐</p>}

          {/* Grade selector (only if not logged in with fixed grade) */}
          {!session && (
            <div className="mb-4">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">Klasse:</p>
              <div className="flex flex-wrap gap-1 justify-center">
                {GRADES.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrade(g)}
                    className={`w-9 h-9 rounded-kids text-xs font-black transition-all ${
                      grade === g ? "bg-kidsBlue text-white shadow-kids" : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}
          {session && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
              Aufgaben für Klasse {grade} 📚
            </p>
          )}

          <div className="flex gap-2 justify-center mb-5">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDifficulty(d.id)}
                className={`px-4 py-2 rounded-kids font-bold text-kids-sm transition-all ${
                  difficulty === d.id ? "bg-kidsBlue text-white shadow-kids" : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
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
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    return (
      <PageWrapper emoji="🔢" title="Mathe" color="bg-blue-50 dark:bg-slate-900" backHref="/spiele">
        {xpResult && <XpRewardPopup result={xpResult} onClose={clearResult} />}
        <KidsCard className="text-center py-8 dark:bg-slate-800">
          <div className="text-6xl mb-4">{score >= 50 ? "🎉" : "💪"}</div>
          <p className="text-kids-xl font-black text-gray-800 dark:text-white mb-2">{score} Punkte!</p>
          {score > best && <p className="text-kids-md font-bold text-kidsOrange mb-2">Neuer Rekord! ⭐</p>}
          <p className="text-kids-sm text-gray-500 dark:text-gray-400 mb-1">
            {correct}/{total} richtig ({accuracy}%)
          </p>
          <p className="text-kids-sm text-gray-500 dark:text-gray-400 mb-6">
            {score >= 80 ? "Super gemacht! 🌟" : score >= 40 ? "Toll! 👍" : "Weiter üben! 💪"}
          </p>
          <BigButton color="blue" size="md" onClick={start}>Nochmal spielen</BigButton>
        </KidsCard>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper emoji="🔢" title="Mathe" color="bg-blue-50 dark:bg-slate-900" backHref="/spiele">
      <div className="flex justify-between items-center mb-4">
        <span className="text-kids-md font-black text-gray-700 dark:text-gray-200">⭐ {score}</span>
        <span className={`text-kids-lg font-black ${timer <= 10 ? "text-red-500 animate-pulse" : "text-gray-700 dark:text-gray-200"}`}>
          ⏱ {timer}s
        </span>
        {streak >= 3 && <span className="text-kids-sm font-bold text-kidsOrange">🔥 {streak}x</span>}
      </div>

      {question && (
        <KidsCard className="text-center mb-5 py-8 dark:bg-slate-800">
          <p className="text-kids-xl font-black text-gray-800 dark:text-white">
            {question.num1} {question.operator} {question.num2} = ?
          </p>
        </KidsCard>
      )}

      <div className="grid grid-cols-2 gap-3">
        {choices.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => answerQ(c)}
            className={`
              rounded-kids-lg py-5 text-kids-lg font-black transition-all
              ${feedback && c === question?.answer ? "bg-kidsGreen shadow-[0_5px_0_#2daa7a] scale-105 text-white" : ""}
              ${feedback === "wrong" && c !== question?.answer ? "opacity-40" : ""}
              ${!feedback ? "bg-white dark:bg-slate-700 shadow-kids active:translate-y-1 hover:brightness-95 text-gray-800 dark:text-white" : ""}
            `}
          >
            {c}
          </button>
        ))}
      </div>
    </PageWrapper>
  );
}

"use client";

import { useState, useCallback } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import KidsCard from "@/components/ui/KidsCard";
import BigButton from "@/components/ui/BigButton";
import XpRewardPopup from "@/components/progress/XpRewardPopup";
import { getRandomSachkundeQuestion } from "@/lib/curriculum/sachkundeQuiz";
import type { SachkundeQuestion } from "@/lib/curriculum/sachkundeQuiz";
import { useGameStore } from "@/store/useGameStore";
import { useChildSessionStore } from "@/store/useChildSessionStore";
import { useXpReward } from "@/hooks/useXpReward";
import type { GradeLevel } from "@/types";

const GRADES = Array.from({ length: 13 }, (_, i) => (i + 1) as GradeLevel);
const MAX_ROUNDS = 10;

export default function SachkundePage() {
  const { addScore, getBestScore } = useGameStore();
  const { session } = useChildSessionStore();
  const { submitGame, result: xpResult, clearResult } = useXpReward();

  const [grade, setGrade] = useState<GradeLevel>((session?.grade ?? 1) as GradeLevel);
  const [started, setStarted] = useState(false);
  const [question, setQuestion] = useState<SachkundeQuestion | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [round, setRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const nextQuestion = useCallback(() => {
    setQuestion(getRandomSachkundeQuestion(grade));
    setSelected(null);
    setFeedback(null);
  }, [grade]);

  const start = () => {
    setScore(0);
    setCorrect(0);
    setRound(0);
    setGameOver(false);
    setStarted(true);
    nextQuestion();
  };

  const answer = (choice: string) => {
    if (feedback || !question) return;
    const isCorrect = choice === question.correct;
    setSelected(choice);
    setFeedback(isCorrect ? "correct" : "wrong");
    const newScore = isCorrect ? score + 10 : score;
    const newCorrect = isCorrect ? correct + 1 : correct;
    if (isCorrect) { setScore(newScore); setCorrect(newCorrect); }

    const nextRound = round + 1;
    if (nextRound >= MAX_ROUNDS) {
      setTimeout(() => {
        setGameOver(true);
        addScore({ game: "sachkunde", score: newScore, level: 1, date: Date.now() });
        if (session) {
          submitGame({ game: "sachkunde", difficulty: grade <= 4 ? "leicht" : grade <= 7 ? "mittel" : "schwer", correct: newCorrect, total: MAX_ROUNDS });
        }
      }, 900);
    } else {
      setRound(nextRound);
      setTimeout(nextQuestion, 1200);
    }
  };

  const best = getBestScore("sachkunde");

  if (!started) {
    return (
      <PageWrapper emoji="🌍" title="Sachkunde" color="bg-teal-50 dark:bg-slate-900" backHref="/spiele">
        <KidsCard className="text-center py-6 dark:bg-slate-800">
          <p className="text-kids-md font-bold text-gray-600 dark:text-gray-300 mb-2">
            Natur · Geografie · Geschichte · Gesellschaft
          </p>
          <p className="text-xs text-gray-400 mb-4">Beantworte {MAX_ROUNDS} Fragen richtig!</p>
          {best > 0 && <p className="text-kids-sm text-gray-400 mb-4">Dein Rekord: {best} Punkte ⭐</p>}

          <div className="mb-4">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">Klasse wählen:</p>
            <div className="flex flex-wrap gap-1 justify-center">
              {GRADES.map((g) => (
                <button key={g} type="button" onClick={() => setGrade(g)}
                  className={`w-9 h-9 rounded-kids text-xs font-black transition-all ${
                    grade === g ? "bg-teal-500 text-white shadow-kids" : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                  }`}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          <BigButton color="green" size="lg" onClick={start}>Spielen! 🌍</BigButton>
        </KidsCard>
      </PageWrapper>
    );
  }

  if (gameOver) {
    return (
      <PageWrapper emoji="🌍" title="Sachkunde" color="bg-teal-50 dark:bg-slate-900" backHref="/spiele">
        {xpResult && <XpRewardPopup result={xpResult} onClose={clearResult} />}
        <KidsCard className="text-center py-8 dark:bg-slate-800">
          <div className="text-6xl mb-4">{score >= 80 ? "🎉" : score >= 50 ? "👍" : "💪"}</div>
          <p className="text-kids-xl font-black text-gray-800 dark:text-white mb-2">{score} / {MAX_ROUNDS * 10} Punkte</p>
          {score > best && <p className="text-kids-md font-bold text-kidsOrange mb-2">Neuer Rekord! ⭐</p>}
          <p className="text-kids-sm text-gray-500 dark:text-gray-400 mb-6">
            {correct}/{MAX_ROUNDS} richtig · {score >= 80 ? "Toll! 🌟" : score >= 50 ? "Gut gemacht! 👍" : "Weiter üben! 💪"}
          </p>
          <BigButton color="green" size="md" onClick={start}>Nochmal</BigButton>
        </KidsCard>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper emoji="🌍" title="Sachkunde" color="bg-teal-50 dark:bg-slate-900" backHref="/spiele">
      <div className="flex justify-between mb-4">
        <span className="text-kids-md font-black text-gray-700 dark:text-gray-200">⭐ {score}</span>
        <span className="text-kids-sm font-bold text-gray-500 dark:text-gray-400">
          {round + 1}/{MAX_ROUNDS}
        </span>
      </div>

      {question && (
        <>
          <KidsCard className="mb-5 dark:bg-slate-800">
            <div className="text-5xl text-center mb-2">{question.emoji}</div>
            <p className="text-kids-md font-black text-gray-800 dark:text-white text-center leading-snug">
              {question.question}
            </p>
          </KidsCard>

          <div className="flex flex-col gap-3">
            {question.choices.map((c) => (
              <button key={c} type="button" onClick={() => answer(c)}
                className={`
                  rounded-kids-lg py-4 px-5 text-kids-sm font-black transition-all text-left
                  ${selected === c && feedback === "correct" ? "bg-kidsGreen text-white scale-[1.02]" : ""}
                  ${selected === c && feedback === "wrong" ? "bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200" : ""}
                  ${selected !== c && feedback === "correct" && c === question.correct ? "bg-kidsGreen/60 text-green-900 dark:text-green-200" : ""}
                  ${!feedback ? "bg-white dark:bg-slate-700 shadow-kids active:translate-y-1 text-gray-800 dark:text-white" : "opacity-70"}
                `}>
                {c}
              </button>
            ))}
          </div>

          {feedback === "wrong" && (
            <p className="text-center text-kids-sm font-bold text-kidsGreen mt-3">
              ✓ Richtig wäre: {question.correct}
            </p>
          )}
        </>
      )}
    </PageWrapper>
  );
}

"use client";

import { useState, useCallback } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import KidsCard from "@/components/ui/KidsCard";
import BigButton from "@/components/ui/BigButton";
import XpRewardPopup from "@/components/progress/XpRewardPopup";
import { getRandomEnglischWord } from "@/lib/curriculum/englischWords";
import type { EnglischWord } from "@/lib/curriculum/englischWords";
import { getEnglischWordsForGrade } from "@/lib/curriculum/englischWords";
import { useGameStore } from "@/store/useGameStore";
import { useChildSessionStore } from "@/store/useChildSessionStore";
import { useXpReward } from "@/hooks/useXpReward";
import type { GradeLevel } from "@/types";

const GRADES = Array.from({ length: 13 }, (_, i) => (i + 1) as GradeLevel);
const MAX_ROUNDS = 10;

function buildChoices(correct: string, grade: number, field: "german" | "english"): string[] {
  const pool = getEnglischWordsForGrade(grade)
    .map((w) => w[field])
    .filter((v) => v !== correct);
  const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 3);
  const all = [...shuffled, correct].sort(() => Math.random() - 0.5);
  return all;
}

export default function EnglischPage() {
  const { addScore, getBestScore } = useGameStore();
  const { session } = useChildSessionStore();
  const { submitGame, result: xpResult, clearResult } = useXpReward();

  const [grade, setGrade] = useState<GradeLevel>((session?.grade ?? 3) as GradeLevel);
  const [mode, setMode] = useState<"en→de" | "de→en">("en→de");
  const [started, setStarted] = useState(false);
  const [word, setWord] = useState<EnglischWord | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [round, setRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const nextWord = useCallback(() => {
    const effectiveGrade = Math.max(grade, 3); // Englisch ab Kl. 3
    const w = getRandomEnglischWord(effectiveGrade);
    const field = mode === "en→de" ? "german" : "english";
    setWord(w);
    setChoices(buildChoices(w[field], effectiveGrade, field));
    setSelected(null);
    setFeedback(null);
  }, [grade, mode]);

  const start = () => {
    setScore(0);
    setCorrect(0);
    setRound(0);
    setGameOver(false);
    setStarted(true);
    nextWord();
  };

  const answer = (choice: string) => {
    if (feedback || !word) return;
    const correctAnswer = mode === "en→de" ? word.german : word.english;
    const isCorrect = choice === correctAnswer;
    setSelected(choice);
    setFeedback(isCorrect ? "correct" : "wrong");
    const newScore = isCorrect ? score + 10 : score;
    const newCorrect = isCorrect ? correct + 1 : correct;
    if (isCorrect) { setScore(newScore); setCorrect(newCorrect); }

    const nextRound = round + 1;
    if (nextRound >= MAX_ROUNDS) {
      setTimeout(() => {
        setGameOver(true);
        addScore({ game: "englisch", score: newScore, level: 1, date: Date.now() });
        if (session) {
          submitGame({ game: "englisch", difficulty: grade <= 4 ? "leicht" : grade <= 7 ? "mittel" : "schwer", correct: newCorrect, total: MAX_ROUNDS });
        }
      }, 900);
    } else {
      setRound(nextRound);
      setTimeout(nextWord, 900);
    }
  };

  const best = getBestScore("englisch");
  const effectiveGrade = Math.max(grade, 3);

  if (!started) {
    return (
      <PageWrapper emoji="🇬🇧" title="Englisch" color="bg-orange-50 dark:bg-slate-900" backHref="/spiele">
        <KidsCard className="text-center py-6 dark:bg-slate-800">
          <p className="text-kids-md font-bold text-gray-600 dark:text-gray-300 mb-4">
            Übersetze die Vokabeln!
          </p>
          {best > 0 && <p className="text-kids-sm text-gray-400 mb-4">Dein Rekord: {best} Punkte ⭐</p>}

          <div className="mb-4">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">Klasse wählen (ab Kl. 3):</p>
              <div className="flex flex-wrap gap-1 justify-center">
                {GRADES.filter((g) => g >= 3).map((g) => (
                  <button key={g} type="button" onClick={() => setGrade(g)}
                    className={`w-9 h-9 rounded-kids text-xs font-black transition-all ${
                      grade === g ? "bg-kidsOrange text-white shadow-kids" : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                    }`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>

          <div className="flex gap-2 justify-center mb-5">
            <button type="button" onClick={() => setMode("en→de")}
              className={`px-4 py-2 rounded-kids font-bold text-kids-sm transition-all ${
                mode === "en→de" ? "bg-kidsOrange text-white shadow-kids" : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
              }`}>
              🇬🇧 → 🇩🇪
            </button>
            <button type="button" onClick={() => setMode("de→en")}
              className={`px-4 py-2 rounded-kids font-bold text-kids-sm transition-all ${
                mode === "de→en" ? "bg-kidsOrange text-white shadow-kids" : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
              }`}>
              🇩🇪 → 🇬🇧
            </button>
          </div>

          <p className="text-xs text-gray-400 mb-4">{MAX_ROUNDS} Vokabeln · Klasse {effectiveGrade}</p>
          <BigButton color="orange" size="lg" onClick={start}>Spielen! 🇬🇧</BigButton>
        </KidsCard>
      </PageWrapper>
    );
  }

  if (gameOver) {
    return (
      <PageWrapper emoji="🇬🇧" title="Englisch" color="bg-orange-50 dark:bg-slate-900" backHref="/spiele">
        {xpResult && <XpRewardPopup result={xpResult} onClose={clearResult} />}
        <KidsCard className="text-center py-8 dark:bg-slate-800">
          <div className="text-6xl mb-4">{score >= 80 ? "🎉" : score >= 50 ? "👍" : "💪"}</div>
          <p className="text-kids-xl font-black text-gray-800 dark:text-white mb-2">{score} / {MAX_ROUNDS * 10} Punkte</p>
          {score > best && <p className="text-kids-md font-bold text-kidsOrange mb-2">Neuer Rekord! ⭐</p>}
          <p className="text-kids-sm text-gray-500 dark:text-gray-400 mb-6">
            {correct}/{MAX_ROUNDS} richtig · {score >= 80 ? "Toll! 🌟" : score >= 50 ? "Gut gemacht! 👍" : "Weiter üben! 💪"}
          </p>
          <BigButton color="orange" size="md" onClick={start}>Nochmal</BigButton>
        </KidsCard>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper emoji="🇬🇧" title="Englisch" color="bg-orange-50 dark:bg-slate-900" backHref="/spiele">
      <div className="flex justify-between mb-4">
        <span className="text-kids-md font-black text-gray-700 dark:text-gray-200">⭐ {score}</span>
        <span className="text-kids-sm font-bold text-gray-500 dark:text-gray-400">
          {round + 1}/{MAX_ROUNDS}
        </span>
      </div>

      {word && (
        <>
          <KidsCard className="text-center mb-5 dark:bg-slate-800">
            <p className="text-xs font-bold text-gray-400 mb-2">
              {mode === "en→de" ? "Was bedeutet auf Deutsch?" : "Wie heißt das auf Englisch?"}
            </p>
            <div className="text-6xl mb-2">{word.emoji}</div>
            <p className="text-kids-xl font-black text-gray-800 dark:text-white">
              {mode === "en→de" ? word.english : word.german}
            </p>
          </KidsCard>

          <div className="grid grid-cols-2 gap-3">
            {choices.map((c) => {
              const correctAnswer = mode === "en→de" ? word.german : word.english;
              return (
                <button key={c} type="button" onClick={() => answer(c)}
                  className={`
                    rounded-kids-lg py-4 px-3 text-kids-sm font-black transition-all text-center leading-tight
                    ${selected === c && feedback === "correct" ? "bg-kidsGreen text-white scale-105" : ""}
                    ${selected === c && feedback === "wrong" ? "bg-red-200 dark:bg-red-800" : ""}
                    ${selected !== c && feedback === "correct" && c === correctAnswer ? "bg-kidsGreen text-white" : ""}
                    ${!feedback ? "bg-white dark:bg-slate-700 shadow-kids active:translate-y-1 text-gray-800 dark:text-white" : ""}
                  `}>
                  {c}
                </button>
              );
            })}
          </div>
        </>
      )}
    </PageWrapper>
  );
}

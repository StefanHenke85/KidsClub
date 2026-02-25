"use client";

import { useState, useCallback, useEffect } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import KidsCard from "@/components/ui/KidsCard";
import BigButton from "@/components/ui/BigButton";
import XpRewardPopup from "@/components/progress/XpRewardPopup";
import { getWordsForGrade, scrambleWord } from "@/lib/curriculum/deutschByGrade";
import type { DeutschWord } from "@/lib/curriculum/deutschByGrade";
import { useGameStore } from "@/store/useGameStore";
import { useChildSessionStore } from "@/store/useChildSessionStore";
import { useXpReward } from "@/hooks/useXpReward";
import type { GradeLevel } from "@/types";

const GRADES = Array.from({ length: 13 }, (_, i) => (i + 1) as GradeLevel);
const MAX_ROUNDS = 8;

export default function DeutschPage() {
  const { addScore, getBestScore } = useGameStore();
  const { session } = useChildSessionStore();
  const { submitGame, result: xpResult, clearResult } = useXpReward();

  const [grade, setGrade] = useState<GradeLevel>((session?.grade ?? 1) as GradeLevel);
  const [started, setStarted] = useState(false);
  const [word, setWord] = useState<DeutschWord | null>(null);
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [round, setRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (session?.grade) setGrade(session.grade as GradeLevel);
  }, [session?.grade]);

  const nextWord = useCallback(() => {
    const words = getWordsForGrade(grade);
    const w = words[Math.floor(Math.random() * words.length)];
    setWord(w);
    setShuffled(scrambleWord(w.word));
    setSelected([]);
    setFeedback(null);
  }, [grade]);

  const start = () => {
    setScore(0);
    setCorrect(0);
    setRound(0);
    setGameOver(false);
    setStarted(true);
    nextWord();
  };

  const pickLetter = (letter: string, idx: number) => {
    if (feedback) return;
    setSelected((prev) => {
      const newSel = [...prev, letter];
      setShuffled((sh) => sh.filter((_, i) => i !== idx));
      if (newSel.length === word!.word.length) {
        const built = newSel.join("");
        const isCorrect = built === word!.word;
        setFeedback(isCorrect ? "correct" : "wrong");
        const newScore = isCorrect ? score + 10 : score;
        const newCorrect = isCorrect ? correct + 1 : correct;
        if (isCorrect) { setScore(newScore); setCorrect(newCorrect); }

        const nextRound = round + 1;
        if (nextRound >= MAX_ROUNDS) {
          setTimeout(() => {
            setGameOver(true);
            addScore({ game: "deutsch", score: newScore, level: 1, date: Date.now() });
            if (session) {
              submitGame({ game: "deutsch", difficulty: grade <= 4 ? "leicht" : grade <= 7 ? "mittel" : "schwer", correct: newCorrect, total: MAX_ROUNDS });
            }
          }, 900);
        } else {
          setRound(nextRound);
          setTimeout(nextWord, 900);
        }
      }
      return newSel;
    });
  };

  const removeLetter = (idx: number) => {
    if (feedback) return;
    const letter = selected[idx];
    setSelected((prev) => prev.filter((_, i) => i !== idx));
    setShuffled((prev) => [...prev, letter]);
  };

  const best = getBestScore("deutsch");

  if (!started) {
    return (
      <PageWrapper emoji="📝" title="Deutsch" color="bg-green-50 dark:bg-slate-900" backHref="/spiele">
        <KidsCard className="text-center py-6 dark:bg-slate-800">
          <p className="text-kids-md font-bold text-gray-600 dark:text-gray-300 mb-4">
            Setze die Buchstaben in der richtigen Reihenfolge zusammen!
          </p>
          {best > 0 && <p className="text-kids-sm text-gray-400 mb-4">Dein Rekord: {best} Punkte ⭐</p>}

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
                      grade === g ? "bg-kidsGreen text-white shadow-kids" : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
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
              Wörter für Klasse {grade} 📚
            </p>
          )}

          <BigButton color="green" size="lg" onClick={start}>Spielen! 📝</BigButton>
        </KidsCard>
      </PageWrapper>
    );
  }

  if (gameOver) {
    return (
      <PageWrapper emoji="📝" title="Deutsch" color="bg-green-50 dark:bg-slate-900" backHref="/spiele">
        {xpResult && <XpRewardPopup result={xpResult} onClose={clearResult} />}
        <KidsCard className="text-center py-8 dark:bg-slate-800">
          <div className="text-6xl mb-4">{score >= 60 ? "🎉" : "💪"}</div>
          <p className="text-kids-xl font-black text-gray-800 dark:text-white mb-2">{score} / {MAX_ROUNDS * 10} Punkte</p>
          {score > best && <p className="text-kids-md font-bold text-kidsOrange mb-2">Neuer Rekord! ⭐</p>}
          <p className="text-kids-sm text-gray-500 dark:text-gray-400 mb-6">
            {score >= 60 ? "Toll! 🌟" : "Weiter üben! 💪"}
          </p>
          <BigButton color="green" size="md" onClick={start}>Nochmal</BigButton>
        </KidsCard>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper emoji="📝" title="Deutsch" color="bg-green-50 dark:bg-slate-900" backHref="/spiele">
      <div className="flex justify-between mb-4">
        <span className="text-kids-md font-black text-gray-700 dark:text-gray-200">⭐ {score}</span>
        <span className="text-kids-sm font-bold text-gray-500 dark:text-gray-400">Wort {round + 1}/{MAX_ROUNDS}</span>
      </div>

      {word && (
        <>
          <KidsCard className="text-center mb-4 dark:bg-slate-800">
            <span className="text-6xl">{word.emoji}</span>
            <p className="text-kids-sm text-gray-500 dark:text-gray-400 mt-2 font-semibold">{word.hint}</p>
          </KidsCard>

          <div className="flex gap-2 justify-center flex-wrap mb-4 min-h-[64px] bg-white dark:bg-slate-800 rounded-kids-lg p-3 shadow-kids">
            {selected.map((l, i) => (
              <button
                key={i}
                type="button"
                onClick={() => removeLetter(i)}
                className={`w-12 h-12 rounded-kids font-black text-kids-md transition-all
                  ${feedback === "correct" ? "bg-kidsGreen text-white" : ""}
                  ${feedback === "wrong" ? "bg-red-300 text-white" : ""}
                  ${!feedback ? "bg-kidsPurple text-white shadow-[0_3px_0_#8b36d4] active:translate-y-1" : ""}
                `}
              >
                {l}
              </button>
            ))}
            {Array.from({ length: word.word.length - selected.length }).map((_, i) => (
              <div key={i} className="w-12 h-12 rounded-kids border-4 border-dashed border-gray-200 dark:border-slate-600" />
            ))}
          </div>

          <div className="flex gap-2 justify-center flex-wrap">
            {shuffled.map((l, i) => (
              <button
                key={i}
                type="button"
                onClick={() => pickLetter(l, i)}
                disabled={!!feedback}
                className="w-12 h-12 bg-kidsYellow rounded-kids font-black text-kids-md shadow-[0_3px_0_#c9a800] active:translate-y-1 transition-transform disabled:opacity-40"
              >
                {l}
              </button>
            ))}
          </div>

          {feedback === "wrong" && (
            <p className="text-center text-kids-sm font-bold text-red-500 mt-3">
              Das richtige Wort: {word.word}
            </p>
          )}
        </>
      )}
    </PageWrapper>
  );
}

"use client";

import { useState, useCallback } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import KidsCard from "@/components/ui/KidsCard";
import BigButton from "@/components/ui/BigButton";
import { getRandomWord, scrambleWord, type DeutschWord } from "@/lib/gameLogic/deutschWords";
import { useGameStore } from "@/store/useGameStore";

export default function DeutschPage() {
  const { addScore, getBestScore } = useGameStore();
  const [started, setStarted] = useState(false);
  const [word, setWord] = useState<DeutschWord | null>(null);
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const MAX_ROUNDS = 8;

  const nextWord = useCallback(() => {
    const w = getRandomWord();
    setWord(w);
    setShuffled(scrambleWord(w.word));
    setSelected([]);
    setFeedback(null);
  }, []);

  const start = () => {
    setScore(0);
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
        const correct = built === word!.word;
        setFeedback(correct ? "correct" : "wrong");
        if (correct) setScore((p) => p + 10);

        const nextRound = round + 1;
        if (nextRound >= MAX_ROUNDS) {
          setTimeout(() => {
            setGameOver(true);
            addScore({ game: "deutsch", score: correct ? score + 10 : score, level: 1, date: Date.now() });
          }, 1000);
        } else {
          setRound(nextRound);
          setTimeout(nextWord, 1000);
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
      <PageWrapper emoji="📝" title="Deutsch" color="bg-green-50">
        <KidsCard className="text-center py-8">
          <p className="text-kids-md font-bold text-gray-600 mb-4">
            Setze die Buchstaben in der richtigen Reihenfolge zusammen!
          </p>
          {best > 0 && <p className="text-kids-sm text-gray-400 mb-4">Dein Rekord: {best} Punkte ⭐</p>}
          <BigButton color="green" size="lg" onClick={start}>Spielen! 📝</BigButton>
        </KidsCard>
      </PageWrapper>
    );
  }

  if (gameOver) {
    return (
      <PageWrapper emoji="📝" title="Deutsch" color="bg-green-50">
        <KidsCard className="text-center py-8">
          <div className="text-6xl mb-4">{score >= 60 ? "🎉" : "💪"}</div>
          <p className="text-kids-xl font-black text-gray-800 mb-2">{score} / 80 Punkte</p>
          {score > best && <p className="text-kids-md font-bold text-kidsOrange mb-2">Neuer Rekord! ⭐</p>}
          <p className="text-kids-sm text-gray-500 mb-6">
            {score >= 60 ? "Toll!" : "Weiter üben!"}
          </p>
          <BigButton color="green" size="md" onClick={start}>Nochmal</BigButton>
        </KidsCard>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper emoji="📝" title="Deutsch" color="bg-green-50">
      <div className="flex justify-between mb-4">
        <span className="text-kids-md font-black text-gray-700">⭐ {score}</span>
        <span className="text-kids-sm font-bold text-gray-500">Wort {round + 1}/{MAX_ROUNDS}</span>
      </div>

      {word && (
        <>
          {/* Hinweis */}
          <KidsCard className="text-center mb-4">
            <span className="text-6xl">{word.emoji}</span>
            <p className="text-kids-sm text-gray-500 mt-2 font-semibold">{word.hint}</p>
          </KidsCard>

          {/* Ausgewählte Buchstaben */}
          <div className="flex gap-2 justify-center flex-wrap mb-4 min-h-[64px] bg-white rounded-kids-lg p-3 shadow-kids">
            {selected.map((l, i) => (
              <button
                key={i}
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
              <div key={i} className="w-12 h-12 rounded-kids border-4 border-dashed border-gray-200" />
            ))}
          </div>

          {/* Buchstabenauswahl */}
          <div className="flex gap-2 justify-center flex-wrap">
            {shuffled.map((l, i) => (
              <button
                key={i}
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

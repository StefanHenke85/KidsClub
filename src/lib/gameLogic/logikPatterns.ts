import type { LogikPattern } from "@/types";

const SHAPE_SEQUENCES = [
  ["🔴", "🔵", "🔴", "🔵", "🔴", "🔵"],
  ["⭐", "⭐", "❤️", "⭐", "⭐", "❤️"],
  ["🟡", "🟢", "🟣", "🟡", "🟢", "🟣"],
  ["🔺", "🔺", "🔷", "🔺", "🔺", "🔷"],
  ["🐱", "🐶", "🐱", "🐶", "🐱", "🐶"],
  ["🍎", "🍌", "🍎", "🍌", "🍎", "🍌"],
  ["🌟", "🌙", "☀️", "🌟", "🌙", "☀️"],
  ["🎈", "🎈", "🎉", "🎈", "🎈", "🎉"],
];

export function generateLogikPattern(): LogikPattern {
  const seq = SHAPE_SEQUENCES[Math.floor(Math.random() * SHAPE_SEQUENCES.length)];
  const correct = seq[seq.length - 1];
  const sequence = seq.slice(0, -1);

  // Falsche Antworten aus anderen Sequenzen
  const wrong = new Set<string>();
  while (wrong.size < 3) {
    const other = SHAPE_SEQUENCES[Math.floor(Math.random() * SHAPE_SEQUENCES.length)];
    const pick = other[Math.floor(Math.random() * other.length)];
    if (pick !== correct) wrong.add(pick);
  }

  const choices = [correct, ...Array.from(wrong)].sort(() => Math.random() - 0.5);
  return { sequence, choices, correct };
}

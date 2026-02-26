import type { MathQuestion, Difficulty } from "@/types";

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateMathQuestion(difficulty: Difficulty): MathQuestion {
  if (difficulty === "leicht") {
    // Addition/Subtraktion bis 20
    const num1 = rand(1, 15);
    const num2 = rand(1, Math.min(20 - num1, 10));
    const useAdd = Math.random() > 0.4;
    if (useAdd) {
      return { num1, num2, operator: "+", answer: num1 + num2 };
    } else {
      const a = Math.max(num1, num2);
      const b = Math.min(num1, num2);
      return { num1: a, num2: b, operator: "-", answer: a - b };
    }
  }

  if (difficulty === "mittel") {
    // Kleine Einmaleins + dreistellige Addition
    const useMulti = Math.random() > 0.5;
    if (useMulti) {
      const num1 = rand(2, 5);
      const num2 = rand(2, 10);
      return { num1, num2, operator: "*", answer: num1 * num2 };
    } else {
      const num1 = rand(10, 50);
      const num2 = rand(10, 50);
      return { num1, num2, operator: "+", answer: num1 + num2 };
    }
  }

  // schwer: Einmaleins bis 10x10 + Division
  const num2 = rand(2, 10);
  const answer = rand(2, 10);
  const num1 = num2 * answer;
  return { num1, num2, operator: "*", answer };
}

export function generateChoices(correct: number, count = 4): number[] {
  const choices = new Set<number>([correct]);
  // Scale offset to the magnitude of the answer
  const magnitude = Math.max(3, Math.ceil(Math.abs(correct) * 0.3));
  let tries = 0;
  while (choices.size < count && tries < 100) {
    tries++;
    const offset = rand(-magnitude, magnitude);
    if (offset === 0) continue;
    const val = correct + offset;
    if (val !== correct) choices.add(val);
  }
  return Array.from(choices).sort(() => Math.random() - 0.5);
}

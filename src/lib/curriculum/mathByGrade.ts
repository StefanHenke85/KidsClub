import type { Difficulty, MathQuestion } from "@/types";

// Generates a math question appropriate for the given grade
export function generateMathQuestion(grade: number, difficulty: Difficulty): MathQuestion {
  if (grade <= 2) return genBasicAddSub(difficulty);
  if (grade <= 4) return genPrimaryMath(difficulty);
  if (grade <= 6) return genMiddleMath(difficulty);
  if (grade <= 9) return genSecondaryMath(difficulty);
  return genAdvancedMath(difficulty);
}

function rnd(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Klasse 1-2: einfaches Addieren/Subtrahieren
function genBasicAddSub(d: Difficulty): MathQuestion {
  const max = d === "leicht" ? 10 : d === "mittel" ? 20 : 50;
  const num1 = rnd(1, max);
  const num2 = rnd(1, max - num1);
  const op = Math.random() < 0.5 ? "+" : "-";
  if (op === "-") {
    const a = Math.max(num1, num2);
    const b = Math.min(num1, num2);
    return { num1: a, num2: b, operator: "-", answer: a - b };
  }
  return { num1, num2, operator: "+", answer: num1 + num2 };
}

// Klasse 3-4: Mal + Geteilt hinzu
function genPrimaryMath(d: Difficulty): MathQuestion {
  const ops: Array<"+" | "-" | "*"> = ["+", "-", "*"];
  const op = ops[rnd(0, d === "leicht" ? 1 : 2)];
  if (op === "*") {
    const num1 = rnd(2, d === "leicht" ? 5 : d === "mittel" ? 10 : 12);
    const num2 = rnd(2, d === "leicht" ? 5 : d === "mittel" ? 10 : 12);
    return { num1, num2, operator: "*", answer: num1 * num2 };
  }
  return genBasicAddSub(d);
}

// Klasse 5-6: Größere Zahlen, alle Ops
function genMiddleMath(d: Difficulty): MathQuestion {
  const ops: Array<"+" | "-" | "*"> = ["+", "-", "*"];
  const op = ops[rnd(0, 2)];
  if (op === "*") {
    const num1 = rnd(d === "leicht" ? 2 : 5, d === "leicht" ? 12 : d === "mittel" ? 25 : 50);
    const num2 = rnd(2, d === "leicht" ? 12 : 15);
    return { num1, num2, operator: "*", answer: num1 * num2 };
  }
  const max = d === "leicht" ? 100 : d === "mittel" ? 500 : 1000;
  const num1 = rnd(10, max);
  const num2 = rnd(1, num1);
  if (op === "-") return { num1, num2, operator: "-", answer: num1 - num2 };
  return { num1, num2: rnd(1, max - num1), operator: "+", answer: num1 + (rnd(1, max - num1)) };
}

// Klasse 7-9
function genSecondaryMath(d: Difficulty): MathQuestion {
  return genMiddleMath(d === "leicht" ? "mittel" : "schwer");
}

// Klasse 10-13
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function genAdvancedMath(_d: Difficulty): MathQuestion {
  return genMiddleMath("schwer");
}

export function getGradeMathLabel(grade: number): string {
  if (grade <= 2) return "Addition & Subtraktion";
  if (grade <= 4) return "Einmaleins & Grundrechenarten";
  if (grade <= 6) return "Große Zahlen & Rechenoperationen";
  if (grade <= 9) return "Terme & Gleichungen (vereinfacht)";
  return "Fortgeschrittene Mathematik";
}

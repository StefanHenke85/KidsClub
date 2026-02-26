import type { Difficulty, MathQuestion } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// Lehrplan-gerechte Mathe-Aufgaben nach KMK-Bildungsstandards
// Klasse 1: Zahlen bis 20, +/-
// Klasse 2: Zahlen bis 100, +/-/×/÷ Einmaleins
// Klasse 3: Zahlen bis 1000, schriftl. Rechnen, Einmaleins sicher
// Klasse 4: Zahlen bis 1.000.000, alle Grundrechenarten, einfache Brüche
// Klasse 5: Natürliche Zahlen, ggT/kgV, einfache Brüche + Dezimalzahlen
// Klasse 6: Brüche, Dezimalzahlen, Prozent (Grundbegriffe), negative Zahlen
// Klasse 7: Rationale Zahlen, Prozent/Zins, Terme, lineare Gleichungen
// Klasse 8: Lineare Gleichungssysteme, Potenzen, Pythagoras
// Klasse 9: Quadratische Gleichungen, Wurzeln, Ähnlichkeit
// Klasse 10: Lineare + quadratische Funktionen, Trigonometrie
// Klasse 11: Differential-/Integralrechnung (Grundlagen)
// Klasse 12-13: Analysis, Stochastik, Lineare Algebra
// ─────────────────────────────────────────────────────────────────────────────

function rnd(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateMathQuestion(grade: number, difficulty: Difficulty): MathQuestion {
  if (grade === 1) return genKlasse1(difficulty);
  if (grade === 2) return genKlasse2(difficulty);
  if (grade === 3) return genKlasse3(difficulty);
  if (grade === 4) return genKlasse4(difficulty);
  if (grade === 5) return genKlasse5(difficulty);
  if (grade === 6) return genKlasse6(difficulty);
  if (grade === 7) return genKlasse7(difficulty);
  if (grade === 8) return genKlasse8(difficulty);
  if (grade === 9) return genKlasse9(difficulty);
  if (grade === 10) return genKlasse10(difficulty);
  if (grade === 11) return genKlasse11(difficulty);
  return genKlasse12(difficulty);
}

// ── Klasse 1: Addition & Subtraktion im Zahlenraum bis 20 ─────────────────
function genKlasse1(d: Difficulty): MathQuestion {
  const max = d === "leicht" ? 10 : d === "mittel" ? 15 : 20;
  const type = rnd(0, 2);
  if (type === 0 || type === 1) {
    // Aufgaben des kleinen Einspluseins: a + b
    const a = rnd(1, max - 1);
    const b = rnd(1, max - a);
    return { num1: a, num2: b, operator: "+", answer: a + b };
  }
  // Subtraktion (Umkehraufgaben)
  const a = rnd(2, max);
  const b = rnd(1, a);
  return { num1: a, num2: b, operator: "-", answer: a - b };
}

// ── Klasse 2: Zahlenraum bis 100, Einmaleins (2er, 3er, 5er, 10er Reihe) ──
function genKlasse2(d: Difficulty): MathQuestion {
  const type = rnd(0, 3);
  if (type === 0) {
    // Addition bis 100
    const a = rnd(10, d === "leicht" ? 50 : 90);
    const b = rnd(1, 100 - a);
    return { num1: a, num2: b, operator: "+", answer: a + b };
  }
  if (type === 1) {
    // Subtraktion bis 100
    const a = rnd(20, 100);
    const b = rnd(1, a - 1);
    return { num1: a, num2: b, operator: "-", answer: a - b };
  }
  if (type === 2) {
    // Kleines Einmaleins: 2er, 3er, 5er, 10er Reihe
    const reihen = d === "leicht" ? [2, 5, 10] : [2, 3, 5, 10];
    const a = pick(reihen);
    const b = rnd(1, 10);
    return { num1: a, num2: b, operator: "*", answer: a * b };
  }
  // Verdoppeln / Halbieren
  const a = rnd(1, d === "leicht" ? 10 : 25) * 2;
  return { num1: a, num2: 2, operator: "/", answer: a / 2 };
}

// ── Klasse 3: Zahlenraum bis 1.000, schriftl. Rechnen, Einmaleins komplett ─
function genKlasse3(d: Difficulty): MathQuestion {
  const type = rnd(0, 4);
  if (type === 0) {
    // Schriftliche Addition bis 1000
    const a = rnd(100, d === "leicht" ? 500 : 999);
    const b = rnd(10, 1000 - a);
    return { num1: a, num2: b, operator: "+", answer: a + b };
  }
  if (type === 1) {
    // Schriftliche Subtraktion bis 1000
    const a = rnd(200, 999);
    const b = rnd(10, a - 1);
    return { num1: a, num2: b, operator: "-", answer: a - b };
  }
  if (type === 2) {
    // Einmaleins komplett (1–10)
    const a = rnd(d === "leicht" ? 2 : 1, 10);
    const b = rnd(2, 10);
    return { num1: a, num2: b, operator: "*", answer: a * b };
  }
  if (type === 3) {
    // Division als Umkehrung des Einmaleins
    const b = rnd(2, 10);
    const result = rnd(2, 10);
    return { num1: b * result, num2: b, operator: "/", answer: result };
  }
  // Rechengesetze: Kommutativgesetz — gleiche Aufgabe, nur gedreht
  const a = rnd(3, 9);
  const b = rnd(3, 9);
  return { num1: a, num2: b, operator: "*", answer: a * b };
}

// ── Klasse 4: Zahlen bis 1.000.000, Grundrechenarten, Größen, einfache Brüche
function genKlasse4(d: Difficulty): MathQuestion {
  const type = rnd(0, 4);
  if (type === 0) {
    // Große Zahlen addieren
    const a = rnd(1000, d === "leicht" ? 50000 : 999999);
    const b = rnd(100, d === "leicht" ? 5000 : 99999);
    return { num1: a, num2: b, operator: "+", answer: a + b };
  }
  if (type === 1) {
    // Große Zahlen subtrahieren
    const a = rnd(5000, d === "leicht" ? 50000 : 999999);
    const b = rnd(100, a - 1);
    return { num1: a, num2: b, operator: "-", answer: a - b };
  }
  if (type === 2) {
    // Mehrstell. Multiplikation: a × b (ein- mal zweistellig)
    const a = rnd(d === "leicht" ? 10 : 10, 99);
    const b = rnd(2, d === "leicht" ? 5 : 9);
    return { num1: a, num2: b, operator: "*", answer: a * b };
  }
  if (type === 3) {
    // Division (Rest 0): a ÷ b
    const b = rnd(2, d === "leicht" ? 5 : 9);
    const result = rnd(d === "leicht" ? 10 : 10, 99);
    return { num1: b * result, num2: b, operator: "/", answer: result };
  }
  // Halbiere eine Zahl (÷ 2, ganzzahlig)
  const a = rnd(10, 100) * 2;
  return { num1: a, num2: 2, operator: "/", answer: a / 2 };
}

// ── Klasse 5: Natürliche Zahlen, ggT, kgV, einfache Brüche, Dezimalzahlen ──
function genKlasse5(d: Difficulty): MathQuestion {
  const type = rnd(0, 4);
  if (type === 0) {
    // Dezimalzahlen addieren (1 Stelle)
    const a = rnd(1, 99);
    const b = rnd(1, 99);
    const ans = (a * 10 + b * 10) / 10;
    return { num1: a, num2: b, operator: "dec+", answer: ans };
  }
  if (type === 1) {
    // Einfache Brüche addieren (gleicher Nenner)
    const nenner = pick([2, 4, 5, 8, 10]);
    const z1 = rnd(1, nenner - 1);
    const z2 = rnd(1, nenner - z1);
    return { num1: z1 * 100 + nenner, num2: z2 * 100 + nenner, operator: "frac+", answer: z1 + z2 };
  }
  if (type === 2) {
    // Größere Multiplikation (zweistellig × zweistellig)
    const a = rnd(d === "leicht" ? 10 : 10, d === "leicht" ? 20 : 50);
    const b = rnd(d === "leicht" ? 10 : 10, d === "leicht" ? 20 : 30);
    return { num1: a, num2: b, operator: "*", answer: a * b };
  }
  if (type === 3) {
    // Division mit Rest 0 (größere Zahlen)
    const b = rnd(2, d === "leicht" ? 10 : 20);
    const result = rnd(d === "leicht" ? 10 : 20, d === "schwer" ? 100 : 50);
    return { num1: b * result, num2: b, operator: "/", answer: result };
  }
  // Prozentrechnung: einfache Anteile (10%, 25%, 50%)
  const prozent = pick(d === "leicht" ? [10, 50] : [10, 20, 25, 50]);
  const basis = rnd(2, 20) * 10;
  return { num1: prozent, num2: basis, operator: "%", answer: Math.round((prozent / 100) * basis) };
}

// ── Klasse 6: Brüche +/-/×/÷, Dezimalzahlen, Prozent, negative Zahlen ─────
function genKlasse6(d: Difficulty): MathQuestion {
  const type = rnd(0, 4);
  if (type === 0) {
    // Negative Zahlen: Addition mit negativem Ergebnis
    const a = rnd(1, d === "leicht" ? 20 : 50);
    const b = rnd(a + 1, a + rnd(1, d === "leicht" ? 10 : 30));
    return { num1: a, num2: b, operator: "-", answer: a - b };
  }
  if (type === 1) {
    // Brüche subtrahieren (gleicher Nenner)
    const nenner = pick([3, 4, 6, 8, 12]);
    const z1 = rnd(2, nenner);
    const z2 = rnd(1, z1 - 1);
    return { num1: z1 * 100 + nenner, num2: z2 * 100 + nenner, operator: "frac-", answer: z1 - z2 };
  }
  if (type === 2) {
    // Prozent (beliebig)
    const prozent = pick(d === "leicht" ? [10, 20, 25, 50] : [5, 10, 15, 20, 25, 30, 50, 75]);
    const basis = rnd(2, d === "leicht" ? 10 : 20) * 100;
    return { num1: prozent, num2: basis, operator: "%", answer: Math.round((prozent / 100) * basis) };
  }
  if (type === 3) {
    // Brüche multiplizieren: a/b × c/d = ? (Ergebnis ganzzahlig oder einfach)
    const b = pick([2, 4, 5]);
    const d2 = pick([2, 4, 5]);
    const a = rnd(1, b);
    const c = rnd(1, d2);
    // Ergebnis als ganzzahliger Zähler über (b*d2) — codieren als frac*
    const zaehler = a * c;
    const nenner2 = b * d2;
    return { num1: a * 100 + b, num2: c * 100 + d2, operator: "frac*", answer: zaehler * 100 + nenner2 };
  }
  // Dezimalzahlen multiplizieren (vereinfacht)
  const a = rnd(1, 9);
  const b = rnd(1, 9);
  return { num1: a, num2: b, operator: "dec*", answer: a * b };
}

// ── Klasse 7: Rationale Zahlen, Terme, lineare Gleichungen, Prozentrechnung ─
function genKlasse7(d: Difficulty): MathQuestion {
  const type = rnd(0, 4);
  if (type === 0) {
    // Lineare Gleichung: ax = b → x = ?
    const a = rnd(2, d === "leicht" ? 5 : 12);
    const x = rnd(1, d === "leicht" ? 10 : 25);
    return { num1: a, num2: a * x, operator: "ax=b", answer: x };
  }
  if (type === 1) {
    // Gleichung: x + b = c → x = ?
    const b = rnd(1, d === "leicht" ? 30 : 100);
    const x = rnd(d === "schwer" ? -30 : 1, d === "leicht" ? 30 : 100);
    return { num1: x + b, num2: b, operator: "x+b=c", answer: x };
  }
  if (type === 2) {
    // Zinsrechnung: Z = K × p/100 × t
    const k = pick([100, 200, 500, 1000]) * (d === "leicht" ? 1 : rnd(1, 5));
    const p = pick(d === "leicht" ? [2, 5, 10] : [3, 4, 5, 7, 8, 10]);
    const z = Math.round(k * p / 100);
    return { num1: k, num2: p, operator: "zins", answer: z };
  }
  if (type === 3) {
    // Potenzen: a² oder a³ (laut Lehrplan Kl.7)
    const base = rnd(2, d === "leicht" ? 7 : 12);
    const exp = pick(d === "schwer" ? [2, 3] : [2]);
    return { num1: base, num2: exp, operator: "^", answer: Math.pow(base, exp) };
  }
  // Negativzahlen multiplizieren
  const a = rnd(1, d === "leicht" ? 5 : 15);
  const b = rnd(1, d === "leicht" ? 5 : 15);
  return { num1: -a, num2: b, operator: "neg*", answer: -a * b };
}

// ── Klasse 8: Potenzen, Pythagoras, lineare Gleichungssysteme ──────────────
function genKlasse8(d: Difficulty): MathQuestion {
  const type = rnd(0, 4);
  if (type === 0) {
    // Pythagoras: a² + b² = c² → c = ?
    const pythagorean = [[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,40,41]];
    const [a, b, c] = pick(d === "leicht" ? pythagorean.slice(0, 2) : pythagorean);
    return { num1: a, num2: b, operator: "pyth", answer: c };
  }
  if (type === 1) {
    // Potenzrechnung: a^n
    const base = rnd(2, d === "leicht" ? 8 : 15);
    const exp = pick([2, 3, 4]);
    const ans = Math.pow(base, exp);
    if (ans > 100000) return genKlasse8(d); // zu groß, nochmal
    return { num1: base, num2: exp, operator: "^", answer: ans };
  }
  if (type === 2) {
    // Gleichungssystem (2 Gleichungen, durch Einsetzen): x + y = a, x - y = b → x = ?
    const x = rnd(1, d === "leicht" ? 10 : 20);
    const y = rnd(1, d === "leicht" ? 10 : 20);
    return { num1: x + y, num2: x - y, operator: "gleich2", answer: x };
  }
  if (type === 3) {
    // Wurzel (perfekte Quadrate)
    const perfekt = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225];
    const s = pick(d === "leicht" ? perfekt.slice(0, 8) : perfekt);
    return { num1: s, num2: 0, operator: "√", answer: Math.sqrt(s) };
  }
  // Terme auflösen: a(x + b) → ax + ab
  const a = rnd(2, d === "leicht" ? 5 : 10);
  const b = rnd(1, d === "leicht" ? 8 : 15);
  const c = rnd(1, d === "leicht" ? 8 : 15);
  return { num1: a * 100 + b, num2: c, operator: "term", answer: a * b + a * c };
}

// ── Klasse 9: Quadratische Gleichungen, Ähnlichkeit, Trigonometrie Grundlagen
function genKlasse9(d: Difficulty): MathQuestion {
  const type = rnd(0, 3);
  if (type === 0) {
    // Quadratische Gleichung: x² = a → x = √a
    const perfekt = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100];
    const a = pick(d === "leicht" ? perfekt.slice(0, 6) : perfekt);
    return { num1: a, num2: 0, operator: "x2=a", answer: Math.sqrt(a) };
  }
  if (type === 1) {
    // Quadratische Gleichung: x² + bx = 0 → x = ?
    const b = rnd(1, d === "leicht" ? 8 : 15);
    return { num1: 1, num2: b, operator: "x2+bx=0", answer: -b }; // Lösung: x = 0 oder x = -b → Hauptlösung ≠ 0
  }
  if (type === 2) {
    // Ähnlichkeit: a/b = c/x → x = ?
    const a = rnd(2, d === "leicht" ? 5 : 10);
    const b = rnd(2, d === "leicht" ? 5 : 10);
    const c = a * rnd(2, 4);
    const x = b * (c / a);
    if (!Number.isInteger(x)) return genKlasse9(d);
    return { num1: a * 100 + b, num2: c, operator: "aehnl", answer: x };
  }
  // Potenzen mit Variablen: a^n × a^m = a^?
  const n = rnd(1, 4);
  const m = rnd(1, 4);
  return { num1: n, num2: m, operator: "pot+", answer: n + m };
}

// ── Klasse 10: Lineare & quadratische Funktionen, Trigonometrie ────────────
function genKlasse10(d: Difficulty): MathQuestion {
  const type = rnd(0, 3);
  if (type === 0) {
    // Lineare Funktion: f(x) = mx + b → f(x) = ? für x = n
    const m = rnd(1, d === "leicht" ? 3 : 7);
    const b = rnd(0, d === "leicht" ? 5 : 15);
    const x = rnd(1, d === "leicht" ? 5 : 10);
    return { num1: m * 100 + b, num2: x, operator: "linear", answer: m * x + b };
  }
  if (type === 1) {
    // Quadratische Funktion: f(x) = x² + bx → f(x) = ? für x = n
    const b = rnd(1, d === "leicht" ? 3 : 7);
    const x = rnd(1, d === "leicht" ? 4 : 8);
    return { num1: b, num2: x, operator: "quad", answer: x * x + b * x };
  }
  if (type === 2) {
    // Trigonometrie: sin/cos der Standardwinkel (0°, 30°, 45°, 60°, 90°)
    const angles: Array<[number, string, number]> = [
      [0, "sin", 0], [30, "sin", 50], [45, "sin", 71], [60, "sin", 87], [90, "sin", 100],
      [0, "cos", 100], [30, "cos", 87], [45, "cos", 71], [60, "cos", 50], [90, "cos", 0],
    ];
    const [angle, fn, ans] = pick(d === "leicht" ? angles.filter(a2 => [0, 90].includes(a2[0])) : angles);
    return { num1: angle, num2: fn === "sin" ? 0 : 1, operator: "trig", answer: ans };
  }
  // Steigung einer Geraden: m = (y2-y1)/(x2-x1)
  const m = rnd(1, d === "leicht" ? 4 : 8);
  const x1 = rnd(0, 5);
  const y1 = rnd(0, 10);
  return { num1: y1 + m * 2, num2: x1 + 2, operator: "slope", answer: m };
}

// ── Klasse 11: Differentialrechnung Grundlagen ─────────────────────────────
function genKlasse11(d: Difficulty): MathQuestion {
  const type = rnd(0, 3);
  if (type === 0) {
    // Ableitung: f(x) = x^n → f'(x) = n·x^(n-1) — Ergebnis Koeffizient bei x=1
    const n = rnd(2, d === "leicht" ? 4 : 7);
    const a = rnd(1, d === "leicht" ? 3 : 6);
    return { num1: a, num2: n, operator: "deriv", answer: a * n }; // Koeffizient der Ableitung
  }
  if (type === 1) {
    // Stammfunktion: ∫x^n dx → x^(n+1)/(n+1), Ergebnis = n+1 (Potenz)
    const n = rnd(1, d === "leicht" ? 4 : 6);
    return { num1: n, num2: 0, operator: "integral", answer: n + 1 };
  }
  if (type === 2) {
    // Grenzwert / Extremum: f(x) = ax² + bx → x_max = -b/(2a)
    const a = pick([1, 2, 3]);
    const b = pick([2, 4, 6, 8, 10, 12]) * (Math.random() < 0.5 ? 1 : -1);
    const xext = Math.abs(b) / (2 * a);
    if (!Number.isInteger(xext)) return genKlasse11(d);
    return { num1: a * 100 + Math.abs(b), num2: b < 0 ? 1 : 0, operator: "extremum", answer: xext };
  }
  // Exponentialfunktion: e^0 = 1, e^1 ≈ 2.718 → vereinfacht: 2^n
  const n = rnd(1, d === "leicht" ? 5 : 8);
  return { num1: 2, num2: n, operator: "^", answer: Math.pow(2, n) };
}

// ── Klasse 12-13: Analysis, Stochastik, Lineare Algebra ────────────────────
function genKlasse12(d: Difficulty): MathQuestion {
  const type = rnd(0, 4);
  if (type === 0) {
    // Kombinatorik: n! — Faktorielle
    const n = rnd(2, d === "leicht" ? 6 : 8);
    const fak = (x: number): number => x <= 1 ? 1 : x * fak(x - 1);
    return { num1: n, num2: 0, operator: "fak", answer: fak(n) };
  }
  if (type === 1) {
    // Stochastik: Wahrscheinlichkeit P = günstige/mögliche Fälle (×100 = %)
    const moeg = pick([2, 4, 6, 8, 10, 12]);
    const guens = rnd(1, moeg - 1);
    return { num1: guens, num2: moeg, operator: "prob", answer: Math.round((guens / moeg) * 100) };
  }
  if (type === 2) {
    // Skalarprodukt zweier 2D-Vektoren
    const a1 = rnd(1, d === "leicht" ? 5 : 8);
    const a2 = rnd(1, d === "leicht" ? 5 : 8);
    const b1 = rnd(1, d === "leicht" ? 5 : 8);
    const b2 = rnd(1, d === "leicht" ? 5 : 8);
    return { num1: a1 * 100 + a2, num2: b1 * 100 + b2, operator: "skalarprod", answer: a1 * b1 + a2 * b2 };
  }
  if (type === 3) {
    // Binomialkoeffizient: C(n, k) = n! / (k! × (n-k)!)
    const pairs: Array<[number, number, number]> = [
      [4,2,6],[5,2,10],[5,3,10],[6,2,15],[6,3,20],[4,1,4],[5,1,5],[6,1,6]
    ];
    const [n, k, result] = pick(pairs);
    return { num1: n, num2: k, operator: "binom", answer: result };
  }
  // Grenzwert einer Folge: a_n = 1/n → 0 (×1000 = 1000/n → 0), vereinfacht: Potenz
  const base = rnd(2, d === "leicht" ? 5 : 9);
  const exp = rnd(2, 4);
  return { num1: base, num2: exp, operator: "^", answer: Math.pow(base, exp) };
}

// ─────────────────────────────────────────────────────────────────────────────
// Lehrplan-Label pro Klasse
// ─────────────────────────────────────────────────────────────────────────────
export function getGradeMathLabel(grade: number): string {
  const labels: Record<number, string> = {
    1: "Addition & Subtraktion bis 20",
    2: "Zahlen bis 100 · Kleines Einmaleins",
    3: "Zahlen bis 1.000 · Einmaleins komplett",
    4: "Zahlen bis 1.000.000 · Grundrechenarten",
    5: "Dezimalzahlen · Brüche · Prozent",
    6: "Brüche · Negative Zahlen · Prozent",
    7: "Lineare Gleichungen · Potenzen · Zins",
    8: "Potenzen · Pythagoras · LGS",
    9: "Quadratische Gleichungen · Ähnlichkeit",
    10: "Lineare & quadrat. Funktionen · Trig.",
    11: "Differential- & Integralrechnung",
    12: "Analysis · Stochastik",
    13: "Lineare Algebra · Stochastik",
  };
  return labels[grade] ?? "Mathematik";
}

// ─────────────────────────────────────────────────────────────────────────────
// Frage-Formatierung
// ─────────────────────────────────────────────────────────────────────────────
export function formatQuestion(q: MathQuestion): string {
  const { num1, num2, operator: op, answer } = q;
  switch (op) {
    case "+":   return `${num1} + ${num2} = ?`;
    case "-":   return `${num1} − ${num2} = ?`;
    case "*":   return `${num1} × ${num2} = ?`;
    case "/":   return `${num1} ÷ ${num2} = ?`;
    case "^":   return `${num1}${sup(num2)} = ?`;
    case "√":   return `√${num1} = ?`;
    case "%":   return `${num1}% von ${num2} = ?`;
    case "%+":  return `${num1} + ${num2}% Aufschlag = ?`;
    case "dec+":return `${num1/10} + ${num2/10} = ?`;
    case "dec*":return `${num1} × 0,${num2} = ?`;
    case "frac+": {
      const [z1, n1] = [Math.floor(num1 / 100), num1 % 100];
      const [z2, n2] = [Math.floor(num2 / 100), num2 % 100];
      return `${z1}/${n1} + ${z2}/${n2} = ?/${n1}`;
    }
    case "frac-": {
      const [z1, n1] = [Math.floor(num1 / 100), num1 % 100];
      const [z2, n2] = [Math.floor(num2 / 100), num2 % 100];
      return `${z1}/${n1} − ${z2}/${n2} = ?/${n1}`;
    }
    case "frac*": {
      const [z1, n1] = [Math.floor(num1 / 100), num1 % 100];
      const [z2, n2] = [Math.floor(num2 / 100), num2 % 100];
      return `${z1}/${n1} × ${z2}/${n2} = ?`;
    }
    case "ax=b":      return `${num1}x = ${num2}  →  x = ?`;
    case "x+b=c":     return `x + ${num2} = ${num1}  →  x = ?`;
    case "zins":      return `Zinsen: K=${num1}€, p=${num2}%  →  Z = ?`;
    case "neg*":      return `(${num1}) × ${num2} = ?`;
    case "pyth":      return `Dreieck: a=${num1}, b=${num2}  →  c = ?`;
    case "gleich2":   return `x+y=${num1}, x−y=${num2}  →  x = ?`;
    case "term":      {
      const [a, b] = [Math.floor(num1 / 100), num1 % 100];
      return `${a}·(${b} + ${num2}) = ?`;
    }
    case "x2=a":      return `x² = ${num1}  →  x = ?`;
    case "x2+bx=0":   return `x² + ${num2}x = 0  →  x ≠ 0 → x = ?`;
    case "aehnl":     {
      const [a, b] = [Math.floor(num1 / 100), num1 % 100];
      return `${a}/x = ${num2}/${b * (num2 / a)}  →  x = ?`;
    }
    case "pot+":      return `a${sup(num1)} × a${sup(num2)} = a${sup(answer)}  →  Exp. = ?`;
    case "linear":    {
      const [m, b] = [Math.floor(num1 / 100), num1 % 100];
      return `f(x) = ${m}x + ${b}  →  f(${num2}) = ?`;
    }
    case "quad":      return `f(x) = x² + ${num1}x  →  f(${num2}) = ?`;
    case "trig":      return `${num2 === 0 ? "sin" : "cos"}(${num1}°) × 100 ≈ ?`;
    case "slope":     return `Steigung durch (x₁,y₁) und (${num2},${num1})  →  m = ?`;
    case "deriv":     return `f(x) = ${num1}x${sup(num2)}  →  f'(x) Koeff. = ?`;
    case "integral":  return `∫ x${sup(num1)} dx → Potenz der Stammfkt. = ?`;
    case "extremum":  {
      const [a, b] = [Math.floor(num1 / 100), num1 % 100];
      return `f(x) = ${a}x² ${num2 ? "−" : "+"} ${b}x  →  Extremstelle x = ?`;
    }
    case "fak":       return `${num1}! = ?`;
    case "prob":      return `P = ${num1}/${num2}  →  in % = ?`;
    case "skalarprod":{
      const [a1, a2] = [Math.floor(num1 / 100), num1 % 100];
      const [b1, b2] = [Math.floor(num2 / 100), num2 % 100];
      return `(${a1};${a2}) · (${b1};${b2}) = ?`;
    }
    case "binom":     return `C(${num1},${num2}) = ?`;
    default:          return `${num1} ${op} ${num2} = ?`;
  }
}

function sup(n: number): string {
  const map: Record<number, string> = { 0:"⁰",1:"¹",2:"²",3:"³",4:"⁴",5:"⁵",6:"⁶",7:"⁷",8:"⁸" };
  return map[n] ?? `^${n}`;
}

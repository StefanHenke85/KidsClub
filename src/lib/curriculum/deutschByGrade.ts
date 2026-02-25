export interface DeutschWord {
  word: string;
  emoji: string;
  hint: string;
  grade: number; // minimum grade
}

export const DEUTSCH_WORDS: DeutschWord[] = [
  // Klasse 1-2
  { word: "KATZE",    emoji: "🐱", hint: "Ein Tier, das miaut",         grade: 1 },
  { word: "HUND",     emoji: "🐶", hint: "Bester Freund des Menschen",  grade: 1 },
  { word: "BAUM",     emoji: "🌳", hint: "Wächst im Wald",              grade: 1 },
  { word: "HAUS",     emoji: "🏠", hint: "Darin wohnst du",             grade: 1 },
  { word: "BALL",     emoji: "⚽", hint: "Damit spielst du",            grade: 1 },
  { word: "SONNE",    emoji: "☀️", hint: "Sie scheint am Himmel",        grade: 1 },
  { word: "APFEL",    emoji: "🍎", hint: "Ein Obst",                     grade: 1 },
  { word: "BROT",     emoji: "🍞", hint: "Das essen wir zum Frühstück", grade: 1 },
  // Klasse 3-4
  { word: "SCHULE",   emoji: "🏫", hint: "Hier lernst du",              grade: 3 },
  { word: "BLEISTIFT",emoji: "✏️", hint: "Zum Schreiben",               grade: 3 },
  { word: "FREUND",   emoji: "👫", hint: "Jemand den du magst",         grade: 3 },
  { word: "HERBST",   emoji: "🍂", hint: "Eine Jahreszeit",             grade: 3 },
  { word: "FAHRRAD",  emoji: "🚲", hint: "Hat zwei Räder",              grade: 3 },
  { word: "FENSTER",  emoji: "🪟", hint: "Lässt Licht rein",            grade: 3 },
  // Klasse 5-6
  { word: "ABENTEUER",emoji: "🗺️", hint: "Eine spannende Reise",        grade: 5 },
  { word: "GEHEIMNIS",emoji: "🤫", hint: "Das weiß nicht jeder",        grade: 5 },
  { word: "BIBLIOTEK",emoji: "📚", hint: "Viele Bücher",                grade: 5 },
  { word: "KOMPASSROSE",emoji: "🧭", hint: "Zeigt Himmelsrichtungen",   grade: 5 },
  // Klasse 7+
  { word: "EXPERIMENT",emoji: "🧪", hint: "Wissenschaftlicher Versuch", grade: 7 },
  { word: "PHILOSOPHIE",emoji: "🤔", hint: "Lehre vom Denken",         grade: 7 },
  { word: "ATMOSPHAERE",emoji: "🌍", hint: "Lufthülle der Erde",        grade: 7 },
  { word: "DEMOKRATIE",emoji: "🗳️", hint: "Volksherrschaft",           grade: 9 },
];

export function getWordsForGrade(grade: number): DeutschWord[] {
  return DEUTSCH_WORDS.filter((w) => w.grade <= grade);
}

export function scrambleWord(word: string): string[] {
  const letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters;
}

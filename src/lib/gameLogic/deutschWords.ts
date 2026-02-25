export interface DeutschWord {
  word: string;
  emoji: string;
  hint: string;
}

export const DEUTSCH_WORDS: DeutschWord[] = [
  { word: "APFEL", emoji: "🍎", hint: "Eine rote oder grüne Frucht" },
  { word: "HUND", emoji: "🐶", hint: "Ein treues Haustier" },
  { word: "HAUS", emoji: "🏠", hint: "Hier wohnt eine Familie" },
  { word: "SCHULE", emoji: "🏫", hint: "Hier lernst du" },
  { word: "BAUM", emoji: "🌳", hint: "Wächst im Wald" },
  { word: "BLUME", emoji: "🌸", hint: "Riecht schön im Garten" },
  { word: "KATZE", emoji: "🐱", hint: "Sagt 'Miau'" },
  { word: "VOGEL", emoji: "🐦", hint: "Kann fliegen" },
  { word: "SONNE", emoji: "☀️", hint: "Scheint am Himmel" },
  { word: "MOND", emoji: "🌙", hint: "Leuchtet nachts" },
  { word: "FISCH", emoji: "🐟", hint: "Schwimmt im Wasser" },
  { word: "BUCH", emoji: "📚", hint: "Darin stehen Geschichten" },
  { word: "BALL", emoji: "⚽", hint: "Damit spielst du" },
  { word: "AUTO", emoji: "🚗", hint: "Fährt auf der Straße" },
  { word: "HERZ", emoji: "❤️", hint: "Symbol der Liebe" },
  { word: "STERN", emoji: "⭐", hint: "Leuchtet am Nachthimmel" },
  { word: "REGEN", emoji: "🌧️", hint: "Kommt aus Wolken" },
  { word: "PFERD", emoji: "🐴", hint: "Größeres Tier zum Reiten" },
  { word: "TIGER", emoji: "🐯", hint: "Hat orange-schwarze Streifen" },
  { word: "PIZZA", emoji: "🍕", hint: "Leckeres Essen aus Italien" },
];

export function getRandomWord(): DeutschWord {
  return DEUTSCH_WORDS[Math.floor(Math.random() * DEUTSCH_WORDS.length)];
}

export function scrambleWord(word: string): string[] {
  const letters = word.split("");
  // Sicherstellen, dass es nicht zufällig das Originalwort ergibt
  let shuffled: string[];
  let attempts = 0;
  do {
    shuffled = [...letters].sort(() => Math.random() - 0.5);
    attempts++;
  } while (shuffled.join("") === word && attempts < 10);
  return shuffled;
}
